import NaviGo from 'navigo'
import { VamApiService } from './api.js'
import { render } from './render-utils.js'

import detailHtml from './markup/detail.html?raw'
import errorHtml from './markup/error.html?raw'
import mainHtml from './markup/main.html?raw'
import notFoundHtml from './markup/not-found.html?raw'
import resultHtml from './markup/result.html?raw'

import './app.css'

const hostName = window.location.host
const rootPath = /local/.test(hostName) ? '/' : '/artzt/'

export const nav = new NaviGo(rootPath)

// Navigo prepends its root to every path it navigates to, so a full path such as
// '/artzt/?search=pg' (what buildUrl makes for hrefs) needs the root removed first
export function routerPath(url, root = rootPath) {
  return url.startsWith(root) ? `/${url.slice(root.length)}` : url
}

class Renderer {
  #el = null
  #html = null
  #didBind = false

  constructor(element, html) {
    this.#el = element
    this.#html = html
  }

  get el() {
    return this.#el
  }

  render(args = {}) {
    this.#el.innerHTML = render(this.#html, args)
  }

  bind() {
    if (this.#didBind) return false

    this.#didBind = true

    return true
  }
}

export class MainRenderer extends Renderer {
  #api = new VamApiService()

  #loading = false

  static buildUrl(search = '') {
    return search
      ? `${rootPath}?search=${encodeURIComponent(search)}`
      : rootPath
  }

  static buildArtUrl(id, search) {
    return `${rootPath}art/${id}?search=${encodeURIComponent(search)}`
  }

  static buildSearchResults(records, searchText) {
    if (records.length === 0) {
      return 'Nothing found by that name'
    }

    return records
      .map((record) => {
        const model = {
          ...record,
          detailUrl: this.buildArtUrl(record.id, searchText),
        }
        return render(resultHtml, model)
      })
      .join('')
  }

  constructor(element) {
    super(element, mainHtml)
  }

  render({ searchText }) {
    // we shall see if we are just re-rendering
    const resultsContainer = this.el.querySelector('.art-gallery-results')

    // if results, just set input field from url
    if (resultsContainer) {
      this.el.querySelector('input[name="search"]').value = searchText
    } else {
      super.render({ searchText })
    }

    // no search (reset, or back to '/'): an empty page, not the last results
    if (!searchText) {
      this.#clearPage()
      return
    }

    this.search(searchText)
  }

  bind() {
    if (!super.bind()) return

    this.el.addEventListener('submit', (event) => {
      event.preventDefault()

      // CSS blocks the mouse while loading, but Enter in the input still submits
      if (this.#loading) return

      const form = event.target.closest('form')
      const params = new FormData(form)
      const url = MainRenderer.buildUrl(params.get('search').trim())

      nav.navigate(routerPath(url))
    })
  }

  async search(searchText) {
    if (this.#loading) return

    const resultsContainer = this.el.querySelector('.art-gallery-results')

    this.el.classList.add('loading')
    this.#loading = true

    try {
      const results = await this.#api.search(searchText)

      resultsContainer.innerHTML = MainRenderer.buildSearchResults(
        results,
        searchText,
      )
    } catch (error) {
      resultsContainer.innerHTML = buildErrorHtml(error, rootPath)
    } finally {
      this.el.classList.remove('loading')
      this.#loading = false
    }
  }

  // Navigo skips the '/' handler when the URL is already '/', so clear the page here too
  clear() {
    if (this.#loading) return

    this.#clearPage()
    nav.navigate('/')
  }

  #clearPage() {
    this.el.querySelector('input[name="search"]').value = ''
    this.el.querySelector('.art-gallery-results').innerHTML = ''
  }
}

export class DetailRenderer extends Renderer {
  #api = new VamApiService()

  constructor(element) {
    super(element, detailHtml)
  }

  async render({ id, search }) {
    const homeUrl = MainRenderer.buildUrl(search)

    this.el.classList.add('loading')

    try {
      const result = await this.#api.detail(id)

      this.el.innerHTML = render(detailHtml, {
        ...result,
        maker: result.maker || 'Maker unspecified',
        homeUrl,
      })
    } catch (error) {
      this.el.innerHTML = buildErrorHtml(error, homeUrl)
    } finally {
      this.el.classList.remove('loading')
    }
  }
}

export class NotFoundRenderer extends Renderer {
  // the V&A record for the "Sorry" board game pictured on the page
  static sorryObjectId = 'O26384'

  constructor(element) {
    super(element, notFoundHtml)
  }

  // full paths including the root, so the links also work in a new tab
  render() {
    super.render({
      homeUrl: rootPath,
      objectUrl: `${rootPath}art/${NotFoundRenderer.sorryObjectId}`,
    })
  }
}

// Builds the whoops view from an error thrown by fetchJson (see buildError in api.js).
// HTTP failures carry status, message (statusText) and body (parsed JSON or raw text).
// Network failures from fetch itself are a plain TypeError with only a message.
export function buildErrorHtml(error, homeUrl) {
  const status = error.status
    ? `${error.status} ${error.message}`.trim()
    : `Request failed: ${error.message || 'unknown error'}`

  return render(errorHtml, {
    status,
    detail: describeErrorBody(error.body),
    homeUrl,
  })
}

function describeErrorBody(body) {
  if (!body) return ''

  // a JSON error body; FastAPI-style services like the V&A's put the reason in `detail`
  if (typeof body === 'object') {
    const detail = body.detail ?? body.message ?? body
    return typeof detail === 'string' ? detail : JSON.stringify(detail)
  }

  return body
}
