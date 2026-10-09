# Free Public APIs for Your Final Project

This directory contains vetted, reliable, student-friendly public APIs for your CIS-133JS Final
Project.

All APIs listed below:

- Have **permissive CORS policies** (`Access-Control-Allow-Origin: *`), meaning you can call them
  directly from browser JavaScript using `fetch()` without server-side proxies or CORS errors.
- Require **no credit cards or paid accounts**.
- Require **no authentication** or only a **free, instant API key** passed via query parameter or
  header.
- Return clean **JSON** responses that work seamlessly with DOM manipulation, filtering, and Vitest.

> **Copying Sample Endpoints**: The sample endpoint URLs below are presented in code blocks rather
> than hyperlinks so you can easily copy them (or use GitHub's one-click copy button) and paste them
> directly into your browser address bar, DevTools Console, or application code.

---

## 1. Space, Weather & Earth Science

### Open-Meteo Weather API

- **Official Documentation**:
  [Open-Meteo API Documentation Guide](https://open-meteo.com/en/docs 'Visit the official Open-Meteo API documentation')
- **Project Homepage**:
  [Open-Meteo Website](https://open-meteo.com/ 'Visit the Open-Meteo project homepage')
- **Authentication**: None required | **CORS**: Enabled
- **Sample Endpoint URL** _(Pre-set to Bend, OR)_:
  ```
  https://api.open-meteo.com/v1/forecast?latitude=44.0582&longitude=-121.3153&current_weather=true
  ```
- **Data Provided**: Current weather conditions, 7-day hourly temperatures, precipitation, wind
  speed, weather codes, and integrated geocoding search for city names.
- **Project Ideas**: Weather forecast dashboard, outdoor activity recommendation app, historical
  temperature trend viewer.

### NASA Open APIs (APOD & Mars Rover)

- **Official Documentation**:
  [NASA Open Data Portal](https://api.nasa.gov/ 'Visit the NASA Open APIs portal and documentation')
- **Authentication**: Free API key (or instant `DEMO_KEY`) | **CORS**: Enabled
- **Sample Endpoint URL**:
  ```
  https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY
  ```
- **Data Provided**: Astronomy Picture of the Day (APOD) with scientific commentary, Mars Rover
  photos filtered by sol and camera, asteroid near-Earth encounters.
- **Project Ideas**: Daily space photo explorer, Mars rover gallery with camera filter dropdowns,
  space calendar with interactive modals.

### USGS Earthquake Hazards Feed

- **Official Documentation**:
  [USGS Earthquake API Documentation](https://earthquake.usgs.gov/fdsnws/event/1/ 'Visit the USGS Earthquake Hazards Program API documentation')
- **Authentication**: None required | **CORS**: Enabled
- **Sample Endpoint URL**:
  ```
  https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&minmagnitude=4.5&limit=20
  ```
- **Data Provided**: Global seismic activity updated every 5 minutes in standard GeoJSON format,
  including magnitudes, depth, timestamps, and locations.
- **Project Ideas**: Live global earthquake tracker, magnitude filtering table, recent tremors feed
  sorted by severity.

### iNaturalist Biodiversity API

- **Official Documentation**:
  [iNaturalist REST API v1 Documentation](https://api.inaturalist.org/v1/docs/ 'Visit the iNaturalist REST API documentation')
- **Project Homepage**:
  [iNaturalist Wildlife Community Homepage](https://www.inaturalist.org/ 'Visit the iNaturalist citizen science platform')
- **Authentication**: None required | **CORS**: Enabled
- **Sample Endpoint URL**:
  ```
  https://api.inaturalist.org/v1/observations?per_page=15
  ```
- **Data Provided**: Over 100 million crowdsourced plant, wildlife, insect, and fungi observations
  worldwide with verified photos, species names, and observation dates.
- **Project Ideas**: Wildlife spotter guide, flora & fauna explorer by region, nature photo cards
  with taxonomy details.

### US National Weather Service (NWS) API

- **Official Documentation**:
  [National Weather Service Web API Documentation](https://www.weather.gov/documentation/services-web-api 'Visit the National Weather Service Web API documentation')
- **Authentication**: None required (requires a custom `User-Agent` header) | **CORS**: Enabled
- **Sample Endpoint URL** _(Oregon active alerts)_:
  ```
  https://api.weather.gov/alerts/active?area=OR
  ```
- **Data Provided**: Real-time US weather alerts, gridpoint hourly forecasts, station observations.
- **Project Ideas**: Severe weather alert feed for the Pacific Northwest, emergency advisory
  tracker.

---

## 2. Gaming, Anime & Pop Culture

### PokéAPI

- **Official Documentation**:
  [PokéAPI v2 Documentation Guide](https://pokeapi.co/docs/v2 'Visit the PokéAPI v2 documentation')
- **Project Homepage**:
  [PokéAPI Project Homepage](https://pokeapi.co/ 'Visit the PokéAPI project homepage')
- **Authentication**: None required | **CORS**: Enabled
- **Sample Endpoint URL**:
  ```
  https://api.pokeapi.co/api/v2/pokemon/pikachu
  ```
- **Data Provided**: Complete Pokémon roster, base stats (HP, attack, defense), elemental types,
  abilities, evolutionary chains, and high-resolution sprite artwork.
- **Project Ideas**: Pokédex card browser, Pokémon team builder, stats comparison tool, elemental
  type filter.

### Open Trivia Database (OpenTDB)

- **Official Documentation**:
  [Open Trivia Database API Query Configurator](https://opentdb.com/api_config.php 'Visit the Open Trivia Database API query generator')
- **Project Homepage**:
  [Open Trivia Database Homepage](https://opentdb.com/ 'Visit the Open Trivia Database homepage')
- **Authentication**: None required | **CORS**: Enabled
- **Sample Endpoint URL**:
  ```
  https://opentdb.com/api.php?amount=10&type=multiple
  ```
- **Data Provided**: Thousands of verified trivia questions categorized across 24 topics (Science,
  History, Film, Music, Sports, Video Games) with difficulty tiers (easy, medium, hard).
- **Project Ideas**: Interactive trivia quiz game with score tracking, category picker, timer
  countdown, and question review screen.

### TVMaze API

- **Official Documentation**:
  [TVMaze Web API Documentation](https://www.tvmaze.com/api 'Visit the TVMaze API documentation')
- **Authentication**: None required | **CORS**: Enabled
- **Sample Endpoint URL**:
  ```
  https://api.tvmaze.com/search/shows?q=star%20trek
  ```
- **Data Provided**: Television show database: titles, genres, ratings, premiered dates, show
  summaries, high-res poster images, full episode schedules, and cast lists.
- **Project Ideas**: TV show search and discovery engine, watchlist builder persisted to
  `localStorage`, episode guide modal viewer.

### Deck of Cards API

- **Official Documentation**:
  [Deck of Cards API Documentation](https://deckofcardsapi.com/ 'Visit the Deck of Cards API documentation')
- **Authentication**: None required | **CORS**: Enabled
- **Sample Endpoint URL**:
  ```
  https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1
  ```
- **Data Provided**: Simulates a physical deck of 52 cards over HTTP. Handles shuffling, drawing
  cards, managing card piles, and tracking remaining cards.
- **Project Ideas**: Blackjack game, Solitaire or Higher-or-Lower card game, virtual dealer utility.

### Jikan (Unofficial MyAnimeList API)

- **Official Documentation**:
  [Jikan REST API Documentation](https://jikan.moe/ 'Visit the official Jikan API documentation')
- **Authentication**: None required | **CORS**: Enabled
- **Sample Endpoint URL**:
  ```
  https://api.jikan.moe/v4/top/anime
  ```
- **Data Provided**: Top-ranked anime, season schedules, manga information, character details,
  trailer URLs, and genre classifications.
- **Project Ideas**: Anime recommendation app, seasonal watchlist manager, character gallery with
  genre filter chips.

### The Rick and Morty API

- **Official Documentation**:
  [Rick and Morty API Documentation Guide](https://rickandmortyapi.com/documentation 'Visit the Rick and Morty API documentation guide')
- **Project Homepage**:
  [Rick and Morty API Homepage](https://rickandmortyapi.com/ 'Visit the Rick and Morty API project homepage')
- **Authentication**: None required | **CORS**: Enabled
- **Sample Endpoint URL**:
  ```
  https://rickandmortyapi.com/api/character
  ```
- **Data Provided**: Over 800 characters, locations, and episode listings with status (Alive, Dead,
  Unknown), species, avatar images, and origin worlds.
- **Project Ideas**: Character directory with live status filters, dimension travel explorer.

---

## 3. Art, Culture, Books & Museums

### Art Institute of Chicago API

- **Official Documentation**:
  [Art Institute of Chicago Public API Guide](https://api.artic.edu/docs/ 'Visit the Art Institute of Chicago API documentation')
- **Authentication**: None required | **CORS**: Enabled
- **Sample Endpoint URL**:
  ```
  https://api.artic.edu/api/v1/artworks?limit=12
  ```
- **Data Provided**: Tens of thousands of public-domain artworks with title, artist details, medium,
  date, exhibition history, and high-resolution image identifiers.
- **Project Ideas**: Virtual art gallery, searchable museum collection, artwork-of-the-day display
  with artist bios.

### The Metropolitan Museum of Art Collection API

- **Official Documentation**:
  [The Met Open Access API Documentation](https://metmuseum.github.io/ 'Visit The Metropolitan Museum of Art Open Access API documentation')
- **Authentication**: None required | **CORS**: Enabled
- **Sample Endpoint URL** _(Van Gogh's Wheat Field with Cypresses)_:
  ```
  https://collectionapi.metmuseum.org/public/collection/v1/objects/436535
  ```
- **Data Provided**: 470,000+ works of art spanning 5,000 years of culture. Search by department,
  artist, culture, or historical epoch.
- **Project Ideas**: Historical artifact timeline, museum collection search with image modal
  previews.

### Open Library Books API

- **Official Documentation**:
  [Open Library Developer API Portal](https://openlibrary.org/developers/api 'Visit the Open Library API portal')
- **Authentication**: None required | **CORS**: Enabled
- **Sample Endpoint URL**:
  ```
  https://openlibrary.org/search.json?q=javascript&limit=10
  ```
- **Data Provided**: Search millions of books by title, author, subject, or ISBN. Retrieve cover
  image URLs, publication years, publishers, and author biographies.
- **Project Ideas**: Personal reading list manager, book search engine with cover grid and subject
  filtering.

### PoetryDB

- **Official Documentation**:
  [PoetryDB API Guide](https://poetrydb.org/ 'Visit the PoetryDB documentation')
- **Authentication**: None required | **CORS**: Enabled
- **Sample Endpoint URL**:
  ```
  https://poetrydb.org/author/Emily%20Dickinson
  ```
- **Data Provided**: Thousands of public domain classic poems. Search by author, title, line count,
  or specific text phrases; returns full stanzas.
- **Project Ideas**: Daily poetry reader, poem randomizer by line count, search-by-theme verse
  browser.

---

## 4. Food, Cooking & Beverages

### TheMealDB

- **Official Documentation**:
  [TheMealDB Recipe API Guide](https://www.themealdb.com/api.php 'Visit TheMealDB API documentation')
- **Authentication**: Free tier / demo key `1` | **CORS**: Enabled
- **Sample Endpoint URL**:
  ```
  https://www.themealdb.com/api/json/v1/1/search.php?s=pasta
  ```
- **Data Provided**: Recipe directory searchable by meal name, category (Seafood, Vegetarian,
  Dessert), or main ingredient. Includes ingredient lists with measurements, instructions,
  thumbnails, and YouTube video links.
- **Project Ideas**: Recipe finder and ingredient checklist, "What can I cook tonight?" ingredient
  selector, meal planner.

### TheCocktailDB

- **Official Documentation**:
  [TheCocktailDB Beverage API Guide](https://www.thecocktaildb.com/api.php 'Visit TheCocktailDB API documentation')
- **Authentication**: Free tier / demo key `1` | **CORS**: Enabled
- **Sample Endpoint URL**:
  ```
  https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail
  ```
- **Data Provided**: Drink and mocktail recipes with alcoholic / non-alcoholic filters, recommended
  glassware, ingredient measurements, and garnish instructions.
- **Project Ideas**: Mocktail and cocktail menu builder, ingredient-based drink search, recipe card
  viewer.

---

## 5. Geography, Places & Civic Data

### REST Countries

- **Official Documentation**:
  [REST Countries Project Guide](https://restcountries.com/ 'Visit the REST Countries project homepage and guide')
- **Authentication**: None required | **CORS**: Enabled
- **Sample Endpoint URL**:
  ```
  https://restcountries.com/v3.1/name/peru
  ```
- **Data Provided**: Detailed data for 250 countries: official names, capital cities, populations,
  currencies, regional borders, time zones, languages, and SVG flag graphics.
- **Project Ideas**: World atlas explorer, country comparison tool, capital guessing game, region
  filter (e.g., Europe, Americas, Asia).

### Open Brewery DB

- **Official Documentation**:
  [Open Brewery DB API Documentation](https://www.openbrewerydb.org/documentation 'Visit the Open Brewery DB documentation')
- **Project Homepage**:
  [Open Brewery DB Project Homepage](https://www.openbrewerydb.org/ 'Visit the Open Brewery DB homepage')
- **Authentication**: None required | **CORS**: Enabled
- **Sample Endpoint URL** _(Breweries in Bend, OR)_:
  ```
  https://api.openbrewerydb.org/v1/breweries?by_city=Bend&per_page=10
  ```
- **Data Provided**: Directory of craft breweries, cideries, taprooms, and brewpubs worldwide.
  Search by city, state, postal code, or brewery type.
- **Project Ideas**: Central Oregon brewery finder, brewery directory with city/state search and map
  links.

### Zippopotam.us

- **Official Documentation**:
  [Zippopotam.us Postal Code API Guide](https://api.zippopotam.us/ 'Visit the Zippopotam.us documentation')
- **Authentication**: None required | **CORS**: Enabled
- **Sample Endpoint URL** _(COCC Bend zip code 97701)_:
  ```
  https://api.zippopotam.us/us/97701
  ```
- **Data Provided**: Fast postal code lookup returning city, state, state abbreviation, latitude,
  and longitude across 60+ countries.
- **Project Ideas**: Postal code lookup widget, location autofill utility for forms.

### General Bikeshare Feed Specification (GBFS)

- **Official Documentation**:
  [GBFS Specification on GitHub](https://github.com/NABSA/gbfs 'Visit the General Bikeshare Feed Specification repository on GitHub')
- **Authentication**: None required | **CORS**: Enabled
- **Sample Endpoint URL** _(Citi Bike NYC)_:
  ```
  https://gbfs.citibikenyc.com/gbfs/en/station_information.json
  ```
- **Data Provided**: Real-time open data feeds published by municipal bike-share networks worldwide,
  containing station names, capacities, coordinates, and real-time bike availability.
- **Project Ideas**: Live city bike station availability board, dock capacity filter.

---

## 6. Animals & Pets

### The Dog API & The Cat API

- **Official Documentation**:
  [The Dog API Documentation Portal](https://thedogapi.com/ 'Visit The Dog API documentation and free key registration')
  &
  [The Cat API Documentation Portal](https://thecatapi.com/ 'Visit The Cat API documentation and free key registration')
- **Authentication**: Free API key with instant email signup | **CORS**: Enabled
- **Sample Endpoints**:
  - Dogs:
    ```
    https://api.thedogapi.com/v1/breeds?limit=15
    ```
  - Cats:
    ```
    https://api.thecatapi.com/v1/breeds?limit=15
    ```
- **Data Provided**: Hundreds of breeds with temperaments, life span, average weight/height, origin,
  and high-quality photography.
- **Project Ideas**: Breed characteristic comparison card deck, pet finder quiz ("Find the right
  breed for your lifestyle").

---

## Testing an API in DevTools

Before committing to an API in your proposal, run a quick test from your browser console:

```js
// Paste this in DevTools Console to test any API endpoint:
fetch('https://api.openbrewerydb.org/v1/breweries?by_city=Bend')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response.json()
  })
  .then((data) => {
    console.log('Success! Received data:', data)
  })
  .catch((error) => {
    console.error('Fetch failed (check CORS or URL):', error)
  })
```

If the console outputs the data object, you are cleared to proceed with that API for your project!
