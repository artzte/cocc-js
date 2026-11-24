import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import {
  MainRenderer,
  DetailRenderer,
  NotFoundRenderer,
  buildErrorHtml,
  nav,
  routerPath,
} from '../src/renderer'
import { VamApiService } from '../src/api'

// The renderers call the V&A API through VamApiService and route with Navigo, so both
// are stubbed here: no test hits the network or changes the URL.

const record = {
  title: 'Teapot',
  id: 'O1',
  imageId: '2006AA1',
  thumbnailUrl: 'https://example.com/thumb.jpg',
  maker: 'Wedgwood',
}

// lets an un-awaited search() or render() finish
const flush = () => new Promise((resolve) => setTimeout(resolve))

// a promise the test resolves itself, to look at the page while a request is loading
function deferred() {
  let resolve
  const promise = new Promise((res) => (resolve = res))
  return { promise, resolve }
}

let app

beforeEach(() => {
  app = document.querySelector('#app')
  vi.spyOn(nav, 'navigate').mockImplementation(() => {})
})

afterEach(() => {
  vi.restoreAllMocks()
})

describe('MainRenderer', () => {
  describe('static buildUrl', () => {
    it("returns '/' for an empty search", () => {
      expect(MainRenderer.buildUrl('')).toBe('/')
      expect(MainRenderer.buildUrl(), 'no argument').toBe('/')
    })

    it("returns '/?search=<term>' for a non-empty search", () => {
      expect(MainRenderer.buildUrl('teapot')).toBe('/?search=teapot')
    })

    it('encodes special characters in the search term', () => {
      expect(MainRenderer.buildUrl('blue & white')).toBe(
        '/?search=blue%20%26%20white',
      )
    })
  })

  describe('static buildArtUrl', () => {
    it('links to /art/:id with the encoded search term', () => {
      expect(MainRenderer.buildArtUrl('O1', 'blue vase')).toBe(
        '/art/O1?search=blue%20vase',
      )
    })
  })

  describe('static buildSearchResults', () => {
    it("shows 'Nothing found by that name' for an empty result list", () => {
      expect(MainRenderer.buildSearchResults([], 'teapot')).toBe(
        'Nothing found by that name',
      )
    })

    it('renders one .art-gallery-results-item per record', () => {
      app.innerHTML = MainRenderer.buildSearchResults(
        [record, { ...record, id: 'O2' }],
        'teapot',
      )

      expect(app.querySelectorAll('.art-gallery-results-item')).toHaveLength(2)
    })

    it('links each result to its detail URL', () => {
      app.innerHTML = MainRenderer.buildSearchResults([record], 'blue vase')

      expect(app.querySelector('a').getAttribute('href')).toBe(
        '/art/O1?search=blue%20vase',
      )
    })
  })

  describe('instance', () => {
    let renderer
    let searchSpy

    beforeEach(() => {
      renderer = new MainRenderer(app)
      searchSpy = vi
        .spyOn(VamApiService.prototype, 'search')
        .mockResolvedValue([record])
    })

    const input = () => app.querySelector('input[name="search"]')
    const results = () => app.querySelector('.art-gallery-results')
    const submit = () =>
      app
        .querySelector('form')
        .dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }))

    it('fills the search input with the current searchText', () => {
      renderer.render({ searchText: 'blue vase' })

      expect(input().value).toBe('blue vase')
    })

    it('searches and renders the results', async () => {
      renderer.render({ searchText: 'teapot' })
      await flush()

      expect(searchSpy).toHaveBeenCalledWith('teapot')
      expect(
        results().querySelectorAll('.art-gallery-results-item'),
      ).toHaveLength(1)
    })

    it('does not call the API when searchText is empty', () => {
      renderer.render({ searchText: '' })

      expect(searchSpy).not.toHaveBeenCalled()
    })

    it('adds the loading class during a search and removes it afterwards', async () => {
      const request = deferred()
      searchSpy.mockReturnValue(request.promise)

      renderer.render({ searchText: 'teapot' })
      expect(app.classList.contains('loading'), 'loading while waiting').toBe(
        true,
      )

      request.resolve([record])
      await flush()

      expect(app.classList.contains('loading'), 'done loading').toBe(false)
    })

    it('removes the loading class and shows the error view when the search fails', async () => {
      searchSpy.mockRejectedValue(
        Object.assign(new Error('Bad Gateway'), { status: 502 }),
      )

      renderer.render({ searchText: 'teapot' })
      await flush()

      expect(app.classList.contains('loading'), 'done loading').toBe(false)
      expect(results().querySelector('.whoops-status').textContent).toBe(
        '502 Bad Gateway',
      )
      expect(input(), 'the form stays on the page').not.toBeNull()
    })

    it('keeps the previous results on screen while a new search loads', async () => {
      renderer.render({ searchText: 'teapot' })
      await flush()

      searchSpy.mockReturnValue(deferred().promise)
      renderer.render({ searchText: 'vase' })

      expect(
        results().querySelectorAll('.art-gallery-results-item'),
      ).toHaveLength(1)
    })

    it('shows the latest search when an older one finishes after it', async () => {
      const older = deferred()
      const newer = deferred()
      searchSpy.mockReturnValueOnce(older.promise)
      searchSpy.mockReturnValueOnce(newer.promise)

      // e.g. the back button pressed while the first search is still loading
      renderer.render({ searchText: 'teapot' })
      renderer.render({ searchText: 'vase' })

      newer.resolve([{ ...record, title: 'Vase' }])
      await flush()
      older.resolve([record])
      await flush()

      expect(searchSpy, 'both searches ran').toHaveBeenCalledTimes(2)
      expect(results().querySelector('h3').textContent, 'latest wins').toBe(
        'Vase',
      )
      expect(app.classList.contains('loading'), 'done loading').toBe(false)
    })

    it('clears the input and results when rendered with an empty searchText', async () => {
      renderer.render({ searchText: 'teapot' })
      await flush()

      renderer.render({ searchText: '' })

      expect(input().value, 'input cleared').toBe('')
      expect(results().innerHTML, 'results cleared').toBe('')
    })

    it('navigates to /?search=<term> on submit, trimming the input', () => {
      renderer.render({ searchText: '' })
      renderer.bind()

      input().value = '  teapot  '
      submit()

      expect(nav.navigate).toHaveBeenCalledWith('/?search=teapot')
    })

    it("navigates to '/' on submit with an empty input", () => {
      renderer.render({ searchText: '' })
      renderer.bind()

      submit()

      expect(nav.navigate).toHaveBeenCalledWith('/')
    })

    it('ignores submit while a search is loading', () => {
      searchSpy.mockReturnValue(deferred().promise)
      renderer.render({ searchText: 'teapot' })
      renderer.bind()

      input().value = 'vase'
      submit()

      expect(nav.navigate).not.toHaveBeenCalled()
    })

    it("clear() empties the page and navigates to '/'", async () => {
      renderer.render({ searchText: 'teapot' })
      await flush()

      renderer.clear()

      expect(input().value, 'input cleared').toBe('')
      expect(results().innerHTML, 'results cleared').toBe('')
      expect(nav.navigate).toHaveBeenCalledWith('/')
    })

    it('clear() does nothing while a search is loading', () => {
      searchSpy.mockReturnValue(deferred().promise)
      renderer.render({ searchText: 'teapot' })

      renderer.clear()

      expect(input().value, 'input untouched').toBe('teapot')
      expect(nav.navigate).not.toHaveBeenCalled()
    })

    it('attaches its listeners only once, however many times bind() is called', () => {
      renderer.render({ searchText: '' })
      renderer.bind()
      renderer.bind()

      submit()

      expect(nav.navigate).toHaveBeenCalledTimes(1)
    })
  })
})

describe('DetailRenderer', () => {
  const detail = {
    title: 'Teapot',
    id: 'O1',
    imageId: '2006AA1',
    imageUrl:
      'https://framemark.vam.ac.uk/collections/2006AA1/full/full/0/default.jpg',
    maker: 'Josiah Wedgwood',
    history: 'Bought in 1900',
    description: 'A small teapot',
  }

  let renderer
  let detailSpy

  beforeEach(() => {
    renderer = new DetailRenderer(app)
    detailSpy = vi
      .spyOn(VamApiService.prototype, 'detail')
      .mockResolvedValue(detail)
  })

  it('renders the title, maker, description and full-size image URL', async () => {
    await renderer.render({ id: 'O1', search: 'teapot' })

    expect(detailSpy).toHaveBeenCalledWith('O1')
    expect(app.querySelector('.detail-header h2').textContent, 'title').toBe(
      'Teapot',
    )
    expect(app.querySelector('.maker').textContent, 'maker').toBe(
      'Josiah Wedgwood',
    )
    expect(app.querySelector('.info').textContent, 'description').toBe(
      'A small teapot',
    )
    expect(app.querySelector('.image img').getAttribute('src'), 'image').toBe(
      detail.imageUrl,
    )
  })

  it("shows 'Maker unspecified' when the record has no maker", async () => {
    detailSpy.mockResolvedValue({ ...detail, maker: undefined })

    await renderer.render({ id: 'O1', search: '' })

    expect(app.querySelector('.maker').textContent).toBe('Maker unspecified')
  })

  it('leaves out the image and blank fields instead of showing broken or unknown values', async () => {
    detailSpy.mockResolvedValue({
      id: 'O1',
      title: undefined,
      imageUrl: undefined,
    })

    await renderer.render({ id: 'O1', search: '' })

    expect(app.querySelector('.detail-header h2').textContent, 'title').toBe(
      'Untitled',
    )
    expect(app.querySelector('.image'), 'no image').toBeNull()
    expect(app.querySelector('.info').textContent, 'description').toBe('')
    expect(app.querySelector('.history').textContent, 'history').toBe('')
  })

  it('points the back link at the home URL with the search term preserved', async () => {
    await renderer.render({ id: 'O1', search: 'blue vase' })

    expect(app.querySelector('.detail-header a').getAttribute('href')).toBe(
      '/?search=blue%20vase',
    )
  })

  it('adds the loading class while the request runs and removes it afterwards', async () => {
    const request = deferred()
    detailSpy.mockReturnValue(request.promise)

    const rendering = renderer.render({ id: 'O1', search: '' })
    expect(app.classList.contains('loading'), 'loading while waiting').toBe(
      true,
    )

    request.resolve(detail)
    await rendering

    expect(app.classList.contains('loading'), 'done loading').toBe(false)
  })

  it('replaces the whole page with the error view when the request fails', async () => {
    detailSpy.mockRejectedValue(
      Object.assign(new Error('Not Found'), { status: 404 }),
    )

    await renderer.render({ id: 'nope', search: 'teapot' })

    expect(app.querySelector('.whoops-status').textContent).toBe(
      '404 Not Found',
    )
    expect(
      app.querySelector('.not-found-button').getAttribute('href'),
      'back to the search',
    ).toBe('/?search=teapot')
  })
})

describe('NotFoundRenderer', () => {
  it('renders the not-found view', () => {
    new NotFoundRenderer(app).render()

    expect(app.querySelector('.not-found h2').textContent).toMatch(
      /doesn’t exist/,
    )
  })

  it('links home and to the pictured object through the router', () => {
    new NotFoundRenderer(app).render()

    const links = [...app.querySelectorAll('a[data-action="route"]')]

    expect(links.map((link) => link.getAttribute('href'))).toEqual([
      '/',
      '/art/O26384',
    ])
  })
})

describe('buildErrorHtml', () => {
  it('shows the status, status text and the detail from a JSON body', () => {
    const error = Object.assign(new Error('Not Found'), {
      status: 404,
      body: { detail: 'no such object' },
    })

    app.innerHTML = buildErrorHtml(error, '/')

    expect(app.querySelector('.whoops-status').textContent).toBe(
      '404 Not Found',
    )
    expect(app.querySelector('.whoops-detail').textContent).toBe(
      'no such object',
    )
  })

  it('describes a network failure that has no status', () => {
    app.innerHTML = buildErrorHtml(new TypeError('Failed to fetch'), '/')

    expect(app.querySelector('.whoops-status').textContent).toBe(
      'Request failed: Failed to fetch',
    )
  })

  it('shows a text body as text, not markup', () => {
    const error = Object.assign(new Error('Bad Gateway'), {
      status: 502,
      body: '<h1>Bad Gateway</h1>',
    })

    app.innerHTML = buildErrorHtml(error, '/')

    expect(app.querySelector('.whoops-detail h1'), 'no h1 element').toBeNull()
    expect(app.querySelector('.whoops-detail').textContent).toBe(
      '<h1>Bad Gateway</h1>',
    )
  })
})

describe('routerPath', () => {
  it('strips a deployed root so Navigo does not add it twice', () => {
    expect(routerPath('/artzt/?search=pg', '/artzt/'), 'search').toBe(
      '/?search=pg',
    )
    expect(routerPath('/artzt/art/O1?search=pg', '/artzt/'), 'detail').toBe(
      '/art/O1?search=pg',
    )
    expect(routerPath('/artzt/', '/artzt/'), 'home').toBe('/')
  })

  it("leaves paths unchanged when the root is '/'", () => {
    expect(routerPath('/?search=pg', '/')).toBe('/?search=pg')
    expect(routerPath('/art/O1', '/')).toBe('/art/O1')
  })

  it('leaves paths outside the root unchanged', () => {
    expect(routerPath('/art/O1', '/artzt/')).toBe('/art/O1')
  })
})
