import {
  MainRenderer,
  DetailRenderer,
  NotFoundRenderer,
  nav,
  routerPath,
} from './renderer'

let mainRenderer

function bindClickHandlers(element) {
  element.addEventListener('click', (event) => {
    const target = event.target.closest('button') || event.target.closest('a')

    switch (target?.dataset.action) {
      case 'reset':
        mainRenderer.clear()
        break

      case 'route': {
        const url = new URL(target.href)
        const routerUrl = url.pathname + url.search

        nav.navigate(routerPath(routerUrl))
        break
      }

      default:
        return
    }
    event.preventDefault()
  })
}

export function renderApp() {
  const app = document.querySelector('#app')

  mainRenderer = new MainRenderer(app)

  const detailRenderer = new DetailRenderer(app)
  const notFoundRenderer = new NotFoundRenderer(app)

  nav
    .on('/', ({ params }) => {
      mainRenderer.render({ searchText: params?.search || '' })
      mainRenderer.bind()
    })
    .on('/art/:id', ({ data, params }) => {
      detailRenderer.render({
        ...data,
        search: params?.search || '',
      })
    })
    .notFound(() => notFoundRenderer.render())

  bindClickHandlers(app)

  nav.resolve()
}
