## Week 11 Assignment: Weather Search

In this assignment, you will build a small **Weather Search** app that ties together last week's
form events and this week's `fetch` material. The user types a place name, picks one of the matching
places, and sees its current weather.

The data comes from [Open-Meteo](https://open-meteo.com/), a free weather API that doesn't need an
API key. You'll use two of its endpoints:

1. **Geocoding search**: finds places by name, so `Bend` returns Bend, Oregon, Bend, Texas, and a
   few others, each with a latitude and longitude.
2. **Forecast**: returns the current temperature, wind speed, and a weather code for one latitude
   and longitude.

There are three ideas to watch for:

- **Form events**: `input` for live feedback while the user types, `submit` with `preventDefault()`
  to run the search, and `change` when the user picks different units.
- **Healthy `fetch` habits**: check `response.ok` before reading the body, and handle errors with
  `try/catch`. Remember that `fetch` doesn't throw for a 400 or 500 response.
- **Three states besides success**: loading, empty (the search worked but nothing matched), and
  error. An empty result isn't an error, and the user should be able to tell them apart.

Submit the URL of the pull request that adds your `projects/week11` project. Be sure to tag me,
**artzte**, as a reviewer on your PR.

---

### Wireframe & Target UX

```text
+-----------------------------------------------------------------------+
|  Weather Search                                                       |
|                                                                       |
|  Place name [ Bend______________ ]  [ Search ]    Units [ °F v ]      |
|                                                                       |
|  [ Bend, Oregon, United States ]   <- selected                        |
|  [ Bend, Texas, United States ]                                       |
|  [ Bend, England, United Kingdom ]                                    |
|                                                                       |
|  Bend, Oregon, United States                                          |
|  38.4 °F                                                              |
|  Overcast, wind 6.2 mph                                               |
+-----------------------------------------------------------------------+
```

While a request is running, a status line shows a message such as `Searching for "Bend"…` or
`Loading weather for Bend, Oregon, United States…`. The same line shows `No places match "zzqqxx".`
when nothing matches and an error message such as `Search failed (HTTP 500).` when a request fails.

---

### Provided Fixtures

The API URLs, a table of weather code descriptions, sample responses for your tests, and a small
`fakeResponse()` test helper are in
[`examples/week11-weather-data.js`](../../examples/week11-weather-data.js).

```javascript
// retrieve these from the file linked above

export const SEARCH_URL = 'https://geocoding-api.open-meteo.com/v1/search'
export const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

export const weatherCodes = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  // ...
}

// sample responses for your tests: bendSearchResponse, bendForecastResponse,
// bendForecastCelsiusResponse, badRequestResponse, and this one:
export const emptySearchResponse = { generationtime_ms: 0.31 } // no `results` at all!
```

Here is what the two requests look like. Try pasting each one into your browser's address bar to see
the real JSON:

```text
https://geocoding-api.open-meteo.com/v1/search?name=Bend&count=10&language=en&format=json

https://api.open-meteo.com/v1/forecast?latitude=44.05817&longitude=-121.31531&current=temperature_2m,weather_code,wind_speed_10m&temperature_unit=fahrenheit&wind_speed_unit=mph
```

---

### Requirements

1. **Building URLs**:
   - Create `buildSearchUrl(query)`, which returns the geocoding search URL for a trimmed place
     name.
   - Create `buildForecastUrl(place, units)`, which returns the forecast URL for a place's
     `latitude` and `longitude`, with `units` (`'fahrenheit'` or `'celsius'`) as the
     `temperature_unit`.
   - Build the query strings with `URLSearchParams` so names with spaces or accents, such as
     `San José`, are encoded correctly.
2. **Fetching**:
   - Create `fetchJson(url)`, which:
     - calls `fetch(url)`,
     - throws an `Error` that mentions the status (such as `HTTP 500`) when `response.ok` is
       `false`, and
     - otherwise returns the parsed JSON.
   - Create `searchPlaces(query)`, which uses `fetchJson()` and returns an array of simplified place
     objects:
     - Each place has `id`, `name`, `region` (from `admin1`), `country`, `latitude`, and
       `longitude`.
     - **Handle invalid situations**: when nothing matches, Open-Meteo leaves out the `results`
       property entirely. Return an empty array in that case.
   - Create `getCurrentWeather(place, units)`, which uses `fetchJson()` and returns an object with
     the temperature, the temperature unit (from `current_units`), the wind speed, and a description
     of the weather code from `weatherCodes`.
     - Use a fallback such as `'Unknown conditions'` for a code that isn't in the table.
3. **Rendering (`renderApp()`)**:
   - Render the page once: a heading, a form with a text field, a **Search** button, and a units
     `<select>` (°F and °C), plus empty areas for the status line, the results, and the weather.
   - **Don't rebuild the form on each event.** If you replace the text field while the user is
     typing, it loses focus after every keystroke. Update only the status, results, and weather
     areas.
   - Show each matching place as a button labeled with its name, region, and country, with
     `data-action="select-place"` and `data-index="${index}"`.
     - Some places have no `region`. Leave out the missing part rather than showing `undefined`.
   - Mark the selected place (for example, with a class, `aria-pressed="true"`, or `[disabled]`).
4. **Events**:
   - **`input`** on the text field: the **Search** button is disabled until the trimmed text is at
     least two characters long. (Open-Meteo returns nothing for a one-character name.)
   - **`submit`** on the form: call `preventDefault()`, then search. Ignore a submit with fewer than
     two characters.
   - **`click`**: one delegated listener on the results area. Use `event.target.closest('button')`,
     convert the index with `parseInt(button.dataset.index, 10)`, and dispatch with a `switch` on
     `button.dataset.action`. Selecting a place loads its current weather.
   - **`change`** on the units `<select>`: reload the selected place's weather in the new units. If
     no place is selected yet, do nothing.
5. **Loading, empty, and error states**:
   - Show a loading message while each request is running.
   - Show a "no places match" message when a search returns an empty array.
   - Show an error message (including the status from your `Error`) when a request fails. The app
     should keep working afterward: the user can search again.
   - Starting a new search clears the old results and weather.
6. **Tests**:
   - Don't let your tests call the real API. Replace `fetch` with a fake in each test using
     `vi.stubGlobal('fetch', vi.fn(...))`, and undo it with `vi.unstubAllGlobals()` in `afterEach`.
     The fake returns `fakeResponse(sampleBody, status)` from the fixtures file.
   - Unit tests:
     - `buildSearchUrl()` trims the query and `buildForecastUrl()` includes the latitude, longitude,
       and units.
     - `fetchJson()` returns parsed JSON for a 2xx response and throws for a non-2xx response.
     - `searchPlaces()` simplifies the results, and returns `[]` when `results` is missing.
     - `getCurrentWeather()` returns the temperature, unit, and weather description.
   - DOM tests:
     - The **Search** button is disabled for zero or one character and enabled for two.
     - Searching shows the matching places; selecting one shows its temperature; changing the units
       shows the temperature in the other unit.
     - An empty search shows the "no places match" message, and a failed request shows an error
       message.
   - DOM updates happen after `await`, so your test has to wait for them. Wrap the check in
     `await vi.waitFor(() => { expect(...) })`, which retries until the expectation passes.
   - Fire `input` and `change` yourself in tests. Setting `.value` doesn't fire any events, so
     follow it with `element.dispatchEvent(new Event('input', { bubbles: true }))`.

---

### Some Helpful References

| Topic                                | Documentation                                                                                               | Usefulness in this Assignment                                      |
| :----------------------------------- | :---------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| Using the Fetch API                  | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)                      | Making requests and reading the `Response`                         |
| `Response.ok`                        | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Response/ok)                                | Telling a 2xx response from an error response                      |
| `async function`                     | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) | Writing `fetchJson()`, `searchPlaces()`, and `getCurrentWeather()` |
| `URLSearchParams`                    | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)                            | Building encoded query strings                                     |
| HTTP response status codes           | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)                          | What 200, 400, 404, and 500 mean                                   |
| `input` event                        | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event)                        | Enabling **Search** as the user types                              |
| `change` event                       | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event)                   | Reloading the weather when the units change                        |
| `Event.preventDefault()`             | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)                       | Keeping the form from reloading the page                           |
| Open-Meteo Geocoding API             | [Open-Meteo Docs](https://open-meteo.com/en/docs/geocoding-api)                                             | Search parameters and response fields                              |
| Open-Meteo Forecast API              | [Open-Meteo Docs](https://open-meteo.com/en/docs)                                                           | `current` variables and units                                      |
| `vi.stubGlobal()` and `vi.waitFor()` | [Vitest Docs](https://vitest.dev/api/vi.html)                                                               | Faking `fetch` and waiting for async DOM updates in tests          |

---

### Suggested Example Tests

**NOTE: these are just starter tests from my own attempt at this project. You will likely need to
modify them to your own naming, exports, etc.**

```javascript
import { afterEach, beforeEach, describe, it, expect, vi } from 'vitest'
import { renderApp } from '../src/app.js'
import {
  buildSearchUrl,
  buildForecastUrl,
  fetchJson,
  searchPlaces,
  getCurrentWeather,
} from '../src/weather-api.js'
import {
  bendSearchResponse,
  emptySearchResponse,
  bendForecastResponse,
  bendForecastCelsiusResponse,
  badRequestResponse,
  fakeResponse,
} from '../src/weather-data.js'

const bend = {
  id: 5713587,
  name: 'Bend',
  region: 'Oregon',
  country: 'United States',
  latitude: 44.05817,
  longitude: -121.31531,
}

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('URL builders', () => {
  it('builds a search URL with the query encoded', () => {
    const url = new URL(buildSearchUrl('  San Francisco '))
    expect(url.hostname).toBe('geocoding-api.open-meteo.com')
    expect(url.searchParams.get('name'), 'query is trimmed').toBe('San Francisco')
  })

  it('builds a forecast URL for a place and units', () => {
    const url = new URL(buildForecastUrl(bend, 'celsius'))
    expect(url.searchParams.get('latitude')).toBe('44.05817')
    expect(url.searchParams.get('longitude')).toBe('-121.31531')
    expect(url.searchParams.get('temperature_unit'), 'units passed through').toBe('celsius')
  })
})

describe('fetching', () => {
  it('fetchJson() returns parsed JSON for a 2xx response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => fakeResponse({ hello: 'world' })),
    )
    expect(await fetchJson('https://example.com')).toEqual({ hello: 'world' })
  })

  it('fetchJson() throws on a non-2xx response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => fakeResponse(badRequestResponse, 400)),
    )
    await expect(fetchJson('https://example.com'), 'error mentions status').rejects.toThrow('400')
  })

  it('searchPlaces() simplifies results', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => fakeResponse(bendSearchResponse)),
    )
    const places = await searchPlaces('Bend')
    expect(places.length).toBe(3)
    expect(places[0], 'first result simplified').toEqual(bend)
  })

  it('searchPlaces() returns [] when results is missing', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => fakeResponse(emptySearchResponse)),
    )
    expect(await searchPlaces('zzqqxx'), 'no matches is an empty array').toEqual([])
  })

  it('getCurrentWeather() returns temperature, units, wind, and description', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(async () => fakeResponse(bendForecastResponse)),
    )
    const weather = await getCurrentWeather(bend, 'fahrenheit')
    expect(weather.temperature).toBe(38.4)
    expect(weather.temperatureUnit).toBe('°F')
    expect(weather.description, 'weather code 3 described').toBe('Overcast')
  })
})

describe('Weather Search DOM', () => {
  let fetchMock

  function typeQuery(text) {
    const input = document.querySelector('input[name="query"]')
    input.value = text
    input.dispatchEvent(new Event('input', { bubbles: true }))
  }

  function searchButton() {
    return document.querySelector('form button[type="submit"]')
  }

  beforeEach(() => {
    fetchMock = vi.fn(async (url) => {
      if (url.includes('geocoding-api')) {
        return fakeResponse(url.includes('name=Bend') ? bendSearchResponse : emptySearchResponse)
      }
      if (url.includes('temperature_unit=celsius')) {
        return fakeResponse(bendForecastCelsiusResponse)
      }
      return fakeResponse(bendForecastResponse)
    })
    vi.stubGlobal('fetch', fetchMock)
    renderApp()
  })

  it('enables Search only for queries of at least two characters', () => {
    expect(searchButton().disabled, 'disabled at start').toBe(true)
    typeQuery('B')
    expect(searchButton().disabled, 'one character is too short').toBe(true)
    typeQuery('Be')
    expect(searchButton().disabled, 'two characters enables search').toBe(false)
  })

  it('searches, selects a place, and changes units', async () => {
    typeQuery('Bend')
    searchButton().click()

    await vi.waitFor(() => {
      expect(document.querySelectorAll('[data-action="select-place"]').length).toBe(3)
    })
    expect(document.querySelector('#app').textContent).toContain('Bend, Oregon, United States')

    document.querySelector('[data-action="select-place"][data-index="0"]').click()
    await vi.waitFor(() => {
      expect(document.querySelector('#app').textContent, 'temperature shown').toContain('38.4 °F')
    })

    const units = document.querySelector('select[name="units"]')
    units.value = 'celsius'
    units.dispatchEvent(new Event('change', { bubbles: true }))
    await vi.waitFor(() => {
      expect(document.querySelector('#app').textContent, 'reloaded in Celsius').toContain('3.6 °C')
    })
  })

  it('shows a message when nothing matches', async () => {
    typeQuery('zzqqxx')
    searchButton().click()
    await vi.waitFor(() => {
      expect(document.querySelector('#app').textContent).toContain('No places match')
    })
  })

  it('shows an error message when the request fails', async () => {
    fetchMock.mockImplementation(async () => fakeResponse(badRequestResponse, 500))
    typeQuery('Bend')
    searchButton().click()
    await vi.waitFor(() => {
      expect(document.querySelector('#app').textContent, 'error state shown').toContain('500')
    })
  })
})
```

---

### Steps to Complete & Submit

1. **Check out your `main` branch and pull latest changes**:
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Create a `week11` branch**:
   ```bash
   git checkout -b week11
   ```
3. **Run the `mpf.sh` script to create your `week11` project**:
   ```bash
   scripts/mpf.sh week11
   ```
4. **Stage, commit, and push the generated project files**:
   ```bash
   git add projects/week11
   git commit -m "feat(week11): scaffold week11 project workspace"
   git push -u origin week11
   ```
5. **Work on the exercise**:
   - Navigate to `projects/week11` and install dependencies:
     ```bash
     cd projects/week11
     npm install
     ```
   - Copy what you need from the fixtures file into your project.
   - Implement `buildSearchUrl`, `buildForecastUrl`, `fetchJson`, `searchPlaces`,
     `getCurrentWeather`, and `renderApp`.
   - Write your unit and DOM tests.
6. **Commit updates, verify everything is working, and push fixes**:
   - Preview your application in the browser:
     ```bash
     npm start
     ```
   - Run tests and linter to verify your code:
     ```bash
     npm test
     npm run lint
     ```
   - Clean up your formatting:
     ```bash
     npm run format
     ```
   - Stage, commit, and push your changes.
7. **Open a Pull Request**: Open a pull request on GitHub comparing `week11` against `main`, and
   request **artzte** as a reviewer.
8. **Submit on Canvas**: Copy the URL of your PR, paste it into the Canvas assignment submission
   box, and submit it.
9. **Deadline**: This programming assignment is due by **Monday, December 7, 2026 at 11:59 PM** (the
   Monday following Week 11).
