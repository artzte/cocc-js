# Victoria and Albert Museum Art Browser

An application for viewing works in the collection of the Victoria and Albert Museum. Users can
search for works by keyword, view the search results and thumbnails, and open a detail page with a
full-size rendition of the artwork and information about it.

The app has two pages:

- Home page - search box, search results - https://cloudfront-domain/artzt/?search=monet
- Art detail page - https://cloudfront-domain/artzt/art/:id - art image, info, link back to home

The home page and art detail pages are bookmarkable; their URLs restore the same information as when
they were bookmarked (subject to any changes in data coming from the V&A API).

> **Note:** My original plan included a random "art of the day" on the home page, with a button to
> pick another one. I decided it was feature creep and dropped it.

## Target audience

Folks interested in looking at art

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

1. Title
2. Maker ("Maker unspecified" when the record doesn't name one)
3. Full-size rendition of the artwork
4. Brief description
5. Object history
6. Back link to the home page
7. The search query param permits restoration of the search phrase upon returning to home

### Error and not-found pages

- A failed API request shows a "Whoops" page with the HTTP status and the reason from the response
  body, plus a link back to the gallery.
- An unknown URL shows a "Sorry, that page doesn't exist" page, with a link back to the gallery and
  a link to the V&A record for the _Sorry_ board game pictured on the page.

## Public API

Link: [https://developers.vam.ac.uk/](https://developers.vam.ac.uk/)

- [Objects search](https://api.vam.ac.uk/v2/objects/search?q=monet&page_size=5)
- [Object detail](https://api.vam.ac.uk/v2/museumobject/O132743)
- [Image detail](https://framemark.vam.ac.uk/collections/2015HK9614/full/843,/0/default.jpg)

## Data model and state management

### Application state

- The URL holds the state that matters: the search phrase (`?search=`) and the artwork ID
  (`/art/:id`). Navigo routes each URL to a renderer.
- Search results and detail records are cached in memory by `VamApiService`, so going back to a
  search doesn't re-fetch it.
- While a request is pending, the app gets a `loading` class and ignores new searches and resets.

### ES6 Class Design

All state is private.

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
