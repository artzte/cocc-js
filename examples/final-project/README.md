# Victoria and Albert Museum Art Browser

An application for viewing works in the collection of the Victoria and Albert Museum. Users can
search for works by keyword, view the search results and thumbnails, and open a detail page with a
full-size rendition of the artwork and information about it.

The app has two pages:

- Home page - search box, search results - https://cloudfront-domain/artzt/?search=monet
- Art detail page - https://cloudfront-domain/artzt/art/:id - art image, info, link back to home

> **Note:** My original plan included a random "art of the day" on the home page, with a button to
> pick another one. I decided it was feature creep and dropped it.

## Target audience

Folks interested in looking at art. The user's goal is simply to have a relaxing time browsing
artwork, courtesy of the V&A.

## Behavior highlights

1. **Every page is bookmarkable.** The URL holds everything needed to rebuild a page: the search
   phrase (`?search=monet`) on the home page, and the artwork ID (`/art/:id`) on the detail page.
   Opening a bookmark restores the same view (subject to any changes in the V&A's data).
2. **API requests are cached.** A given search or detail record is fetched only once per session.
   Going back to a search you've already run, or reopening a work you've already looked at, comes
   from memory instead of the network.
3. **Routing is done with [Navigo](https://github.com/krasimir/navigo).** I'm using Navigo so the
   app can have a bookmarkable, two-page structure while staying a single-page app. Moving between
   the home and detail pages never reloads the page, so the cache isn't flushed when you navigate
   from one page to the other. Rendering and event handling are my own vanilla JS; Navigo only maps
   URLs to my renderers.

## Core features

[Wireframes](./notes/screens.jpg)

Users can:

1. Perform a search - search input, Find button (or Enter)
2. Clear a search - Reset button
3. Click from search results to detail page view - results link
4. Click from detail page view back to home page - back link

### Home page (default view)

`https://root/artzt/`

1. Search box
2. Find button
3. Reset button

### Home page (search results view)

`https://root/artzt/?search=monet`

1. Search results - title, maker, thumbnail, linked to the detail page
2. "Nothing found by that name" when the search has no results
3. Search box, filled in with the search phrase
4. Find button
5. Reset button

Results without a title, maker, or image are left out, since there is nothing to show for them.

### Detail page

`https://root/artzt/art/:id?search=monet`

1. Title ("Untitled" when the record doesn't have one)
2. Maker ("Maker unspecified" when the record doesn't name one)
3. Full-size rendition of the artwork, left out when the record has no image
4. Brief description
5. Object history
6. Back link to the home page
7. The search query param permits restoration of the search phrase upon returning to home

### Loading, empty, and error states

- **Loading:** while a request is pending, the app gets a `loading` class that dims the page and
  blocks clicks. The search form ignores new searches and resets until the request finishes, so the
  user can't pile up overlapping requests. If the browser's back or forward button starts a new
  search while one is loading, the newest search wins and the older response is thrown away.
- **Empty:** a search with no results shows "Nothing found by that name".
- **Error:** a failed API request shows a "Whoops" page with the HTTP status and the reason from the
  response body, plus a link back to the gallery.
- **Not found:** an unknown URL shows a "Sorry, that page doesn't exist" page, with a link back to
  the gallery and a link to the V&A record for the _Sorry_ board game pictured on the page.

## Public API

Link: [https://developers.vam.ac.uk/](https://developers.vam.ac.uk/)

The V&A Collections API needs no API key or account, and it allows cross-origin requests, so the
browser can call it directly.

- [Objects search](https://api.vam.ac.uk/v2/objects/search?q=monet&page_size=5) -
  `GET https://api.vam.ac.uk/v2/objects/search?q={search}&page_size=50`
- [Object detail](https://api.vam.ac.uk/v2/museumobject/O132743) -
  `GET https://api.vam.ac.uk/v2/museumobject/{id}`
- [Image](https://framemark.vam.ac.uk/collections/2015HK9614/full/843,/0/default.jpg) -
  `https://framemark.vam.ac.uk/collections/{imageId}/full/full/0/default.jpg`

The fields I use from one search record:

```json
{
  "systemNumber": "O132743",
  "_primaryTitle": "Claude Monet, Maisons et Jadins de Giverny",
  "_primaryMaker": { "name": "L'Instant Durable", "association": "publisher" },
  "_primaryImageId": "2015HK9614",
  "_images": {
    "_primary_thumbnail": "https://framemark.vam.ac.uk/collections/2015HK9614/full/!100,100/0/default.jpg"
  }
}
```

And from the detail response:

```json
{
  "record": {
    "systemNumber": "O132743",
    "titles": [{ "title": "Claude Monet, Maisons et Jadins de Giverny" }],
    "artistMakerPerson": [],
    "briefDescription": "Paper model showing Claude Monet, Maisons et Jadins de Giverny, made in France by L'Instant Durable in 1989",
    "objectHistory": "Historical significance: Part of the Robert Freidus Architectural Paper Model Collection..."
  },
  "meta": { "images": { "_images_meta": [{ "assetRef": "2015HK9614" }] } }
}
```

## Visual design

The page uses the starter kit's palettes: Rosé Pine Dawn in light mode and Nord in dark mode,
following the system setting. The error and not-found pages borrow the V&A's mint-green button color
(`#50e3c2`).

## Data model and state management

### Application state

- The URL holds the state that matters: the search phrase (`?search=`) and the artwork ID
  (`/art/:id`). Navigo routes each URL to a renderer.
- Search results and detail records are cached in memory by `VamApiService` (see
  [Behavior highlights](#behavior-highlights)).
- `MainRenderer` tracks whether a search is loading, and which search is the latest.

### State privacy

All state is kept in private class fields (`#searchCache`, `#detailCache`, `#loading`,
`#currentSearch`, and so on), so nothing outside a class can change it. Renderers don't share state
with each other; they get what they need from the URL and pass plain data objects into the HTML
templates.

### ES6 Class Design

- VamApiService - fetches and maps V&A data
  - search(query) - returns a list of `{ title, id, imageId, thumbnailUrl, maker }`
  - detail(id) - returns `{ title, id, imageId, imageUrl, maker, history, description }`
  - static buildSearchResult(), buildSearchResults(), buildDetailResult() - map raw API records
- Renderer - base class; renders an HTML template into the app element
  - MainRenderer - home page, search form, and search results
  - DetailRenderer - detail page
  - NotFoundRenderer - unknown routes

### Module breakdown

- src/common/main.js - entry point; calls `renderApp()`
- src/app.js - main app, routes, and the delegated click handler
- src/renderer.js - renderer classes, URL building, and the error view
- src/api.js - V&A API service
- src/wrapped-fetch.js - `fetchJson()`, which builds the query string and throws an error carrying
  the status and response body when the response isn't ok
- src/render-utils.js - `{{tag}}` template rendering with HTML escaping
- src/markup/\*.html - HTML templates for each view

## Event handling

Two listeners on the `#app` element handle every interaction, so they keep working when a render
replaces the page's content:

- **click** (in `app.js`) - finds the clicked `button` or `a` with `closest()` and switches on its
  `data-action`:
  - `data-action="reset"` - the Reset button clears the search
  - `data-action="route"` - result links, the back link, and the not-found links navigate through
    Navigo instead of reloading the page
  - anything else (such as the link to the V&A site) is left to the browser
- **submit** (in `MainRenderer`) - the search form navigates to `?search=<phrase>`, which runs the
  search through the router
