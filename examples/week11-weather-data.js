// ====================================================================
// CIS 133JS — Week 11: Weather Search fixtures
// Sample Open-Meteo responses and weather code descriptions for the
// Week 11 assignment. Copy what you need into your project.
// ====================================================================

// --------------------------------------------------------------------
// API endpoints (no API key needed)
//
// Geocoding search, which finds places by name:
//   https://geocoding-api.open-meteo.com/v1/search?name=Bend&count=10&language=en&format=json
//
// Current weather for one place:
//   https://api.open-meteo.com/v1/forecast?latitude=44.05817&longitude=-121.31531
//     &current=temperature_2m,weather_code,wind_speed_10m
//     &temperature_unit=fahrenheit&wind_speed_unit=mph
//
// Docs: https://open-meteo.com/en/docs/geocoding-api and https://open-meteo.com/en/docs
// --------------------------------------------------------------------

export const SEARCH_URL = 'https://geocoding-api.open-meteo.com/v1/search'
export const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

// --------------------------------------------------------------------
// WMO weather codes, as listed in the Open-Meteo docs. The forecast
// response gives you `current.weather_code`; look up its description here.
// --------------------------------------------------------------------
export const weatherCodes = {
  0: 'Clear sky',
  1: 'Mainly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Depositing rime fog',
  51: 'Light drizzle',
  53: 'Moderate drizzle',
  55: 'Dense drizzle',
  56: 'Light freezing drizzle',
  57: 'Dense freezing drizzle',
  61: 'Slight rain',
  63: 'Moderate rain',
  65: 'Heavy rain',
  66: 'Light freezing rain',
  67: 'Heavy freezing rain',
  71: 'Slight snow fall',
  73: 'Moderate snow fall',
  75: 'Heavy snow fall',
  77: 'Snow grains',
  80: 'Slight rain showers',
  81: 'Moderate rain showers',
  82: 'Violent rain showers',
  85: 'Slight snow showers',
  86: 'Heavy snow showers',
  95: 'Thunderstorm',
  96: 'Thunderstorm with slight hail',
  99: 'Thunderstorm with heavy hail',
}

// --------------------------------------------------------------------
// Sample geocoding response for ?name=Bend (trimmed to three results).
// Each result has more fields than shown here (elevation, timezone,
// population, and so on). These are the ones the assignment uses.
// --------------------------------------------------------------------
export const bendSearchResponse = {
  results: [
    {
      id: 5713587,
      name: 'Bend',
      latitude: 44.05817,
      longitude: -121.31531,
      country_code: 'US',
      country: 'United States',
      admin1: 'Oregon',
      admin2: 'Deschutes',
    },
    {
      id: 4676206,
      name: 'Bend',
      latitude: 31.10518,
      longitude: -98.51031,
      country_code: 'US',
      country: 'United States',
      admin1: 'Texas',
      admin2: 'San Saba',
    },
    {
      id: 2656100,
      name: 'Bend',
      latitude: 55.06667,
      longitude: -1.6,
      country_code: 'GB',
      country: 'United Kingdom',
      admin1: 'England',
    },
  ],
  generationtime_ms: 0.84,
}

// --------------------------------------------------------------------
// Sample geocoding response when nothing matches. Watch out: there is
// no `results` property at all, not even an empty array.
// --------------------------------------------------------------------
export const emptySearchResponse = {
  generationtime_ms: 0.31,
}

// --------------------------------------------------------------------
// Sample forecast response for Bend, Oregon in Fahrenheit and mph.
// --------------------------------------------------------------------
export const bendForecastResponse = {
  latitude: 44.05817,
  longitude: -121.31531,
  generationtime_ms: 0.05,
  utc_offset_seconds: 0,
  timezone: 'GMT',
  timezone_abbreviation: 'GMT',
  elevation: 1105,
  current_units: {
    time: 'iso8601',
    interval: 'seconds',
    temperature_2m: '°F',
    weather_code: 'wmo code',
    wind_speed_10m: 'mp/h',
  },
  current: {
    time: '2026-11-30T18:00',
    interval: 900,
    temperature_2m: 38.4,
    weather_code: 3,
    wind_speed_10m: 6.2,
  },
}

// --------------------------------------------------------------------
// The same forecast in Celsius (temperature_unit=celsius).
// --------------------------------------------------------------------
export const bendForecastCelsiusResponse = {
  ...bendForecastResponse,
  current_units: {
    ...bendForecastResponse.current_units,
    temperature_2m: '°C',
  },
  current: { ...bendForecastResponse.current, temperature_2m: 3.6 },
}

// --------------------------------------------------------------------
// Sample error body. Open-Meteo answers a bad request (such as a
// latitude of 999) with HTTP status 400 and a JSON body like this one.
// --------------------------------------------------------------------
export const badRequestResponse = {
  error: true,
  reason: 'Latitude must be in range of -90 to 90°. Given: 999.0.',
}

// --------------------------------------------------------------------
// Test helper: builds a fake Response-like object for a stubbed fetch().
// Your code only uses `ok`, `status`, and `json()`, so that's all it has.
// --------------------------------------------------------------------
export function fakeResponse(body, status = 200) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  }
}
