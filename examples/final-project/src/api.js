import { fetchJson } from './wrapped-fetch'

export class VamApiService {
  static vamSearchUrl = 'https://api.vam.ac.uk/v2/objects/search'
  static vamDetailUrl = 'https://api.vam.ac.uk/v2/museumobject/{{id}}'
  static searchPageSize = 50

  #searchCache = new Map()
  #detailCache = new Map()

  static buildSearchResult(record) {
    return {
      title: record._primaryTitle,
      id: record.systemNumber,
      imageId: record._primaryImageId,
      thumbnailUrl: record._images?._primary_thumbnail,
      maker: record._primaryMaker?.name,
    }
  }

  // maps the raw search response and drops records the gallery can't display
  static buildSearchResults(result) {
    return result.records
      .map(VamApiService.buildSearchResult)
      .filter(
        (record) =>
          record.title && record.imageId && record.thumbnailUrl && record.maker,
      )
  }

  static buildDetailResult(result) {
    const { record, meta } = result

    const maker =
      record.artistMakerPerson?.[0] ||
      record.artistMakerPeople?.[0] ||
      record.artistMakerOrganisations?.[0] ||
      {}

    const imageId = meta.images?._images_meta?.[0]?.assetRef

    return {
      title: record.titles?.[0]?.title,
      id: record.systemNumber,
      imageId,
      imageUrl: `https://framemark.vam.ac.uk/collections/${imageId}/full/full/0/default.jpg`,
      maker: maker.name?.text,
      history: record.objectHistory,
      description: record.briefDescription,
    }
  }

  async search(query) {
    const cacheKey = query.toLowerCase()
    const cached = this.#searchCache.get(cacheKey)
    if (cached) return cached

    const result = await fetchJson(VamApiService.vamSearchUrl, {
      query: { q: query, page_size: VamApiService.searchPageSize },
    })

    const records = VamApiService.buildSearchResults(result)

    this.#searchCache.set(cacheKey, records)
    return records
  }

  async detail(id) {
    const encodedId = encodeURIComponent(id)
    const cached = this.#detailCache.get(encodedId)
    if (cached) return cached

    const result = await fetchJson(
      VamApiService.vamDetailUrl.replace(/{{id}}/, encodedId),
    )

    const record = VamApiService.buildDetailResult(result)

    this.#detailCache.set(encodedId, record)

    return record
  }
}
