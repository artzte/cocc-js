import { describe, it, expect, vi, afterEach } from 'vitest'

// Routing tests for src/app.js.
//
// Navigo reads window.location, so each test sets the URL with pushState and then starts
// the app. app.js keeps a single Navigo instance and renderers bound to #app, which
// setup.js replaces before every test, so startAt() loads fresh copies of the modules.

const record = {
  title: 'Teapot',
  id: 'O1',
  imageId: '2006AA1',
  thumbnailUrl: 'https://example.com/thumb.jpg',
  maker: 'Wedgwood',
}

const detail = {
  ...record,
  imageUrl:
    'https://framemark.vam.ac.uk/collections/2006AA1/full/full/0/default.jpg',
  maker: 'Josiah Wedgwood',
  description: 'A small teapot',
  history: 'Bought in 1900',
}

// lets an un-awaited search() or render() finish
const flush = () => new Promise((resolve) => setTimeout(resolve))

let searchSpy
let detailSpy

async function startAt(url) {
  window.history.pushState({}, '', url)
  vi.resetModules()

  // stub the fresh VamApiService before app.js imports it
  const { VamApiService } = await import('../src/api')
  searchSpy = vi
    .spyOn(VamApiService.prototype, 'search')
    .mockResolvedValue([record])
  detailSpy = vi
    .spyOn(VamApiService.prototype, 'detail')
    .mockResolvedValue(detail)

  const { renderApp } = await import('../src/app')
  renderApp()
  await flush()
}

const app = () => document.querySelector('#app')

afterEach(() => {
  vi.restoreAllMocks()
})

describe('routing', () => {
  it("renders the main view with an empty search box at '/'", async () => {
    await startAt('/')

    expect(app().querySelector('#art-gallery'), 'main view').not.toBeNull()
    expect(app().querySelector('input[name="search"]').value).toBe('')
    expect(searchSpy, 'no search').not.toHaveBeenCalled()
  })

  it("restores the search term and runs the search at '/?search=<term>'", async () => {
    await startAt('/?search=blue%20vase')

    expect(app().querySelector('input[name="search"]').value).toBe('blue vase')
    expect(searchSpy).toHaveBeenCalledWith('blue vase')
    expect(
      app().querySelectorAll('.art-gallery-results-item'),
      'results shown',
    ).toHaveLength(1)
  })

  it("renders the detail view for '/art/:id'", async () => {
    await startAt('/art/O1')

    expect(detailSpy).toHaveBeenCalledWith('O1')
    expect(app().querySelector('#art-gallery-detail h2').textContent).toBe(
      'Teapot',
    )
  })

  it('carries the search term from a detail URL into its back link', async () => {
    await startAt('/art/O1?search=monet')

    expect(
      app()
        .querySelector('#art-gallery-detail .detail-header a')
        .getAttribute('href'),
    ).toBe('/?search=monet')
  })

  it('renders the not-found view for an unknown path', async () => {
    await startAt('/no/such/page')

    expect(app().querySelector('.not-found'), 'not-found view').not.toBeNull()
  })

  it('returns to the search results when the detail back link is clicked', async () => {
    await startAt('/art/O1?search=monet')

    app().querySelector('#art-gallery-detail .detail-header a').click()
    await flush()

    expect(window.location.pathname + window.location.search, 'url').toBe(
      '/?search=monet',
    )
    expect(app().querySelector('input[name="search"]').value).toBe('monet')
    expect(searchSpy).toHaveBeenCalledWith('monet')
    expect(
      app().querySelectorAll('.art-gallery-results-item'),
      'results shown',
    ).toHaveLength(1)
  })
})
