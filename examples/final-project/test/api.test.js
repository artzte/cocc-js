import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { VamApiService } from '../src/api'
import { fetchJson } from '../src/wrapped-fetch'

// fetchJson has its own tests in wrapped-fetch.test.js, so here it is replaced with a mock
vi.mock('../src/wrapped-fetch', () => ({ fetchJson: vi.fn() }))

function searchRecord(overrides = {}) {
  return {
    _primaryTitle: 'Teapot',
    systemNumber: 'O1',
    _primaryImageId: '2006AA1',
    _images: { _primary_thumbnail: 'https://example.com/thumb.jpg' },
    _primaryMaker: { name: 'Wedgwood' },
    ...overrides,
  }
}

function detailResponse(recordOverrides = {}) {
  return {
    record: {
      systemNumber: 'O1',
      titles: [{ title: 'Teapot' }],
      artistMakerPerson: [{ name: { text: 'Josiah Wedgwood' } }],
      objectHistory: 'Bought in 1900',
      briefDescription: 'A small teapot',
      ...recordOverrides,
    },
    meta: { images: { _images_meta: [{ assetRef: '2006AA1' }] } },
  }
}

describe('VamApiService.buildSearchResult', () => {
  it('maps a V&A search record to { title, id, imageId, thumbnailUrl, maker }', () => {
    expect(VamApiService.buildSearchResult(searchRecord())).toEqual({
      title: 'Teapot',
      id: 'O1',
      imageId: '2006AA1',
      thumbnailUrl: 'https://example.com/thumb.jpg',
      maker: 'Wedgwood',
    })
  })

  it('leaves thumbnailUrl and maker undefined when _images or _primaryMaker are missing', () => {
    const result = VamApiService.buildSearchResult(
      searchRecord({ _images: undefined, _primaryMaker: undefined }),
    )

    expect(result.thumbnailUrl, 'no _images').toBeUndefined()
    expect(result.maker, 'no _primaryMaker').toBeUndefined()
  })
})

describe('VamApiService.buildSearchResults', () => {
  it('maps every complete record', () => {
    const records = [searchRecord(), searchRecord({ systemNumber: 'O2' })]

    const results = VamApiService.buildSearchResults({ records })

    expect(results.map((result) => result.id)).toEqual(['O1', 'O2'])
  })

  it('drops records missing a title, imageId, thumbnailUrl or maker', () => {
    const records = [
      searchRecord({ systemNumber: 'keep' }),
      searchRecord({ _primaryTitle: '' }),
      searchRecord({ _primaryImageId: undefined }),
      searchRecord({ _images: {} }),
      searchRecord({ _primaryMaker: undefined }),
    ]

    const results = VamApiService.buildSearchResults({ records })

    expect(results.map((result) => result.id)).toEqual(['keep'])
  })

  it('returns an empty array when there are no records', () => {
    expect(VamApiService.buildSearchResults({ records: [] })).toEqual([])
  })
})

describe('VamApiService.buildDetailResult', () => {
  it('maps a V&A detail response to the fields the detail page uses', () => {
    expect(VamApiService.buildDetailResult(detailResponse())).toEqual({
      title: 'Teapot',
      id: 'O1',
      imageId: '2006AA1',
      imageUrl:
        'https://framemark.vam.ac.uk/collections/2006AA1/full/full/0/default.jpg',
      maker: 'Josiah Wedgwood',
      history: 'Bought in 1900',
      description: 'A small teapot',
    })
  })

  it('prefers artistMakerPerson, then artistMakerPeople, then artistMakerOrganisations for maker', () => {
    const person = [{ name: { text: 'A person' } }]
    const people = [{ name: { text: 'Some people' } }]
    const organisations = [{ name: { text: 'An organisation' } }]

    const maker = (overrides) =>
      VamApiService.buildDetailResult(detailResponse(overrides)).maker

    expect(
      maker({
        artistMakerPerson: person,
        artistMakerPeople: people,
        artistMakerOrganisations: organisations,
      }),
      'person comes first',
    ).toBe('A person')
    expect(
      maker({
        artistMakerPerson: [],
        artistMakerPeople: people,
        artistMakerOrganisations: organisations,
      }),
      'then people',
    ).toBe('Some people')
    expect(
      maker({
        artistMakerPerson: [],
        artistMakerPeople: [],
        artistMakerOrganisations: organisations,
      }),
      'then organisations',
    ).toBe('An organisation')
  })

  it('leaves maker undefined when no maker arrays have entries', () => {
    const result = VamApiService.buildDetailResult(
      detailResponse({
        artistMakerPerson: [],
        artistMakerPeople: [],
        artistMakerOrganisations: [],
      }),
    )

    expect(result.maker).toBeUndefined()
  })

  it('does not throw when optional arrays such as titles or makers are missing', () => {
    const result = VamApiService.buildDetailResult({
      record: { systemNumber: 'O1' },
      meta: {},
    })

    expect(result.id).toBe('O1')
    expect(result.title, 'no titles').toBeUndefined()
    expect(result.maker, 'no makers').toBeUndefined()
    expect(result.imageId, 'no images').toBeUndefined()
  })
})

describe('VamApiService#search', () => {
  const response = { records: [searchRecord()] }
  let api

  beforeEach(() => {
    api = new VamApiService()
    fetchJson.mockReset()
    fetchJson.mockResolvedValue(response)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('requests the search URL with the query as the q param and a page size of 50', async () => {
    await api.search('blue vase')

    expect(fetchJson).toHaveBeenCalledWith(VamApiService.vamSearchUrl, {
      query: { q: 'blue vase', page_size: 50 },
    })
  })

  it('builds its results with buildSearchResults', async () => {
    const buildSpy = vi.spyOn(VamApiService, 'buildSearchResults')

    const results = await api.search('teapot')

    expect(buildSpy, 'passes the raw response').toHaveBeenCalledWith(response)
    expect(results, 'returns what the builder returned').toBe(
      buildSpy.mock.results[0].value,
    )
  })

  it('returns cached results for a repeated query without calling fetch again', async () => {
    const first = await api.search('teapot')
    const second = await api.search('teapot')

    expect(fetchJson, 'fetched once').toHaveBeenCalledTimes(1)
    expect(second, 'same cached array').toBe(first)
  })

  it('treats queries that differ only by case as the same query', async () => {
    await api.search('Teapot')
    await api.search('teapot')

    expect(fetchJson).toHaveBeenCalledTimes(1)
  })

  it('fetches again for a different query', async () => {
    await api.search('teapot')
    await api.search('vase')

    expect(fetchJson).toHaveBeenCalledTimes(2)
  })

  it('does not share its cache with other instances', async () => {
    await api.search('teapot')
    await new VamApiService().search('teapot')

    expect(fetchJson).toHaveBeenCalledTimes(2)
  })

  it('does not cache a failed request', async () => {
    fetchJson.mockRejectedValueOnce(new Error('Bad Gateway'))

    await expect(api.search('teapot'), 'first call fails').rejects.toThrow(
      'Bad Gateway',
    )
    await api.search('teapot')

    expect(fetchJson, 'retried after the failure').toHaveBeenCalledTimes(2)
  })
})

describe('VamApiService#detail', () => {
  const response = detailResponse()
  let api

  beforeEach(() => {
    api = new VamApiService()
    fetchJson.mockReset()
    fetchJson.mockResolvedValue(response)
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('requests the detail URL with {{id}} replaced by the id', async () => {
    await api.detail('O1')

    expect(fetchJson).toHaveBeenCalledWith(
      'https://api.vam.ac.uk/v2/museumobject/O1',
    )
  })

  it('URL-encodes the id', async () => {
    await api.detail('O1/../x')

    expect(fetchJson).toHaveBeenCalledWith(
      'https://api.vam.ac.uk/v2/museumobject/O1%2F..%2Fx',
    )
  })

  it('builds its record with buildDetailResult', async () => {
    const buildSpy = vi.spyOn(VamApiService, 'buildDetailResult')

    const record = await api.detail('O1')

    expect(buildSpy, 'passes the raw response').toHaveBeenCalledWith(response)
    expect(record, 'returns what the builder returned').toBe(
      buildSpy.mock.results[0].value,
    )
  })

  it('returns a cached record for a repeated id without calling fetch again', async () => {
    const first = await api.detail('O1')
    const second = await api.detail('O1')

    expect(fetchJson, 'fetched once').toHaveBeenCalledTimes(1)
    expect(second, 'same cached record').toBe(first)
  })

  it('fetches again for a different id', async () => {
    await api.detail('O1')
    await api.detail('O2')

    expect(fetchJson).toHaveBeenCalledTimes(2)
  })

  it('rejects when the API responds with an error status, and does not cache it', async () => {
    const error = Object.assign(new Error('Not Found'), { status: 404 })
    fetchJson.mockRejectedValueOnce(error)

    await expect(api.detail('O1'), 'passes the error through').rejects.toBe(
      error,
    )
    await api.detail('O1')

    expect(fetchJson, 'retried after the failure').toHaveBeenCalledTimes(2)
  })
})
