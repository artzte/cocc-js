# Art Institute of Chicago Art Browser

An application for viewing works in the collection of the Art Institute of Chicago. Users will be
presented with a random work from the collection each time they open the page, and will also have
the ability to search for works by keyword, to view the search results and thumbnails, and to open a
full-size rendition of the artwork in the browser.

The app will have two pages:

- Home page - search box, random art preview, random refresh button, search results -
  https://cloudfront-domain/artzt?q=monet
- Art detail page - https://cloudfront-domain/artzt/:id - art image, info, link back to home

The home page and art detail pages will be bookmarkable; their URLs will restore the same
information as when they were bookmarked (subject to any changes in data coming from the AIC API)

## Target audience

Folks interested in looking at art

## Core features

[Wireframes](./notes/screens.jpg)

Users can:

1. Perform a search - search input, search button
2. Clear a search - clear button
3. Request a new random artwork - refresh button
4. Click from search results to detail page view - results link
5. Click from detail page view back to home page - home page link

### Home page (default view)

`https://root/artzt`

1. Art of the day selection, with picture and info
2. Search box
3. Search button
4. Clear search button
5. Recycle random selection

### Home page (search results view)

`https://root/artzt?search=monet`

1. Search results - thumbnail, art name, link
2. Search box
3. Search button
4. Clear search button

### Detail page

`https://root/artzt/:id?search=monet`

1. Full-size rendition of an artwork
2. Information about the piece (TBD depending on AIC API feeds)
3. Link to home page
4. The search query param permits restoration of the search phrase upon returning to home

## Public API

Link: [https://api.artic.edu/docs/](https://api.artic.edu/docs/)

- [Artworks search](https://api.artic.edu/api/v1/artworks/search?q=monet&size=5)
- [Artwork detail](https://api.artic.edu/api/v1/artworks/34298)
- [Image detail](https://www.artic.edu/iiif/2/63736cd6-e486-a50c-0e41-4184a6249318/full/843,/0/default.jpg)
- [Random image POST](https://api.artic.edu/api/v1/artworks/search)

## Data model and state management

### Application state

- searchPhrase: what the user is searching
- artId: referenced artwork ID for detail page, or for random art
- search results: null or []
- isLoading: API request is pending

### ES6 Class Design

All state will be private. Consumers will call toJSON() to get a JSON representation.

- Artwork
  - Title
  - Artist
  - ID
  - Thumbnail
  - Image ID
  - get fileUrl
  - get detailUrl
  - fromJSON()
- ArtworkList
  - Artworks[]
  - fromJSON()
- AicApi
  - getList(query)
  - getDetail(id)
  - getImage(imageId)

### Module breakdown

- src/api.js - api interfaces
- src/artwork.js - artwork model
- src/artwork-list.js - artwork list model
- src/ui.js - rendering helpers
- src/app.js - main app, event handlers
- src/router.js - router setup
