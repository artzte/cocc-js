## Free APIs that might be good for your project

These all (afaik) have **permissive CORS policies**, require **no authentication (or just a simple
query-param API key)**, and return clean JSON that pairs well with DOM manipulation, charts, or
maps.

### Space & Science

- **NASA Open APIs (APOD & Mars Rover):** Provides daily astronomy images with explanations, Mars
  weather, and rover photos. Perfect for building dynamic image galleries or space date-pickers.
  _(Auth: Free demo key)_
- **USGS Earthquake Hazards Feed:** Real-time global seismic data updated every 5 minutes. Returns
  GeoJSON, making it the gold standard for teaching Leaflet.js or Mapbox mapping. _(Auth: None)_
- **Open-Meteo:** Accurate hourly/daily weather forecasts, marine data, and air quality without the
  complex rate limits of OpenWeather. Great for learning chart libraries like Chart.js. _(Auth:
  None)_

### Gaming & Pop Culture

- **PokéAPI:** Highly detailed stats, sprites, move sets, and evolution chains for every Pokémon.
  Ideal for teaching pagination, search filtering, and modal popups. _(Auth: None)_
- **Jikan (Unofficial MyAnimeList API):** Anime and manga schedules, top rankings, character
  databases, and streaming links. Great for building card-grid discovery apps. _(Auth: None)_
- **Open Trivia Database:** Generates configurable quiz questions across categories and difficulty
  levels. Excellent for teaching state machines, timers, and scoring logic. _(Auth: None)_

### Art & Culture

- **The Metropolitan Museum of Art API:** Access to over 470,000 public-domain artworks with
  high-resolution imagery and rich metadata. Ideal for building curated virtual gallery apps.
  _(Auth: None)_
- **Art Institute of Chicago API:** Fast, modern JSON-LD search API with lightweight thumbnails,
  color palettes, and full exhibition histories. _(Auth: None)_

### Live Transit & Civic Data

- **General Bikeshare Feed Specification (GBFS):** Live bike and dock availability feeds published
  by major city bike-shares (Citi Bike NYC, Capital Bikeshare, Santander Cycles). Returns structured
  JSON ideal for real-time dashboards. _(Auth: None)_
- **REST Countries:** Detailed country data including currencies, bordering countries, languages,
  and flag SVGs. Perfect for chained `fetch()` calls (e.g., clicking a border country fetches that
  country's details). _(Auth: None)_

### Interactive Utilities & Game Mechanics

- **Deck of Cards API:** Handles shuffling, dealing hands, and managing remaining cards on the
  server side. Great for teaching async state without building a custom card engine (e.g.,
  Blackjack, Poker). _(Auth: None)_
- **Board Game Atlas / Board Game Geek XML/JSON Wrappers:** Community-ranked board games with rule
  links and play times. Great for catalog filtering exercises. _(Auth: None)_

---
