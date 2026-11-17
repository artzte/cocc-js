// ====================================================================
// CIS 133JS — Week 11: Async JavaScript, Promises, and fetch
// The event loop, Promise states, async/await, HTTP status codes,
// network errors vs. error responses, and a debug challenge
// ====================================================================

// --------------------------------------------------------------------
// Setup for Chrome DevTools Snippets:
// 1. Open Google Chrome to a blank tab (about:blank) or your running
//    `npm start` tab at http://localhost:5173.
// 2. Open DevTools (F12 or Ctrl+Shift+I / Cmd+Option+I).
// 3. Switch to the "Sources" tab.
// 4. In the left panel, click "Snippets" (or press Ctrl+Shift+P / Cmd+Shift+P
//    and type "Create snippet").
// 5. Name the snippet "week11-async-fetch.js".
// 6. Paste this code into the editor.
// 7. Press Ctrl+S (Cmd+S) to save, and Ctrl+Enter (Cmd+Enter) to run.
//
// Running the snippet defines the demo functions. Call them one at a
// time from the Console, for example: eventLoopDemo()
// --------------------------------------------------------------------

function header(title) {
  console.log(
    `\n%c=== ${title} ===`,
    'color: #10b981; font-weight: bold; font-size: 13px;',
  )
}

const SEARCH_URL = 'https://geocoding-api.open-meteo.com/v1/search'
const FORECAST_URL = 'https://api.open-meteo.com/v1/forecast'

// Resolves with `value` after `ms` milliseconds, like a request that works
function wait(ms, value) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(value), ms)
  })
}

// Rejects with an Error after `ms` milliseconds, like a request that fails
function failAfter(ms, message) {
  return new Promise((resolve, reject) => {
    setTimeout(() => reject(new Error(message)), ms)
  })
}

// --------------------------------------------------------------------
// 1. The event loop
// Predict the order of the four log lines before you run this.
// --------------------------------------------------------------------
function eventLoopDemo() {
  header('1. The event loop')

  console.log('A: synchronous code runs first, top to bottom')

  setTimeout(() => {
    console.log('D: the timer callback waits for the call stack to empty')
  }, 0)

  Promise.resolve().then(() => {
    console.log('C: promise callbacks run as soon as the stack is empty')
  })

  console.log('B: still synchronous, so this runs before C and D')
}

// --------------------------------------------------------------------
// 2. Promise states: pending, fulfilled, rejected
// --------------------------------------------------------------------
function promiseStatesDemo() {
  header('2. Promise states')

  const fulfills = wait(1000, 'sunny')
  console.log('Right away, fulfills is:', fulfills) // Promise {<pending>}

  fulfills
    .then((value) => console.log('fulfilled with:', value))
    .finally(() => console.log('finally runs either way (fulfilled)'))

  const rejects = failAfter(1500, 'the forecast server is down')

  rejects
    .then(() => console.log('this never runs'))
    .catch((error) => console.log('rejected with:', error.message))
    .finally(() => console.log('finally runs either way (rejected)'))

  console.log('Expand the Promise above after 2 seconds to see its state.')
}

// --------------------------------------------------------------------
// 3. async/await
// The same flow as demo 2, written with await and try/catch.
// --------------------------------------------------------------------
async function asyncAwaitDemo() {
  header('3. async/await')

  try {
    const value = await wait(1000, 'sunny')
    console.log('awaited value:', value)

    // a rejected Promise makes await throw, so we land in catch
    await failAfter(500, 'the forecast server is down')
    console.log('this never runs')
  } catch (error) {
    console.log('caught:', error.message)
  } finally {
    console.log('finally: hide the loading message here')
  }

  // An async function always returns a Promise
  async function getTemperature() {
    return 38.4
  }
  console.log('getTemperature() returns:', getTemperature())
  console.log('await getTemperature() gives:', await getTemperature())
}

// --------------------------------------------------------------------
// 4. HTTP status codes and response.ok
// fetch resolves for every response the server sends, even 400 and
// 404. Only a network failure makes fetch itself reject.
// --------------------------------------------------------------------
async function statusCodesDemo() {
  header('4. HTTP status codes and response.ok')

  const requests = [
    ['a good search', `${SEARCH_URL}?name=Bend&count=1`],
    [
      'a bad latitude',
      `${FORECAST_URL}?latitude=999&longitude=0&current=temperature_2m`,
    ],
    [
      'a path that does not exist',
      'https://api.open-meteo.com/v1/no-such-endpoint',
    ],
  ]

  for (const [label, url] of requests) {
    const response = await fetch(url)
    console.log(`${label}: status ${response.status}, ok is ${response.ok}`)
  }

  try {
    await fetch('https://no-such-host.invalid/')
  } catch (error) {
    // a network failure: no response at all, so no status code
    console.log(
      `an unknown host: fetch rejected with ${error.name}: ${error.message}`,
    )
  }
}

// --------------------------------------------------------------------
// 5. The same request, chained and awaited
// Both versions do exactly the same thing. Each .then() returns a new
// Promise, so the next .then() waits for it; await does the same
// waiting, but reads top to bottom.
// --------------------------------------------------------------------
function chainedDemo() {
  header('5a. A Promise chain')
  return fetch(`${SEARCH_URL}?name=Bend&count=1`)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`)
      }
      // returning a Promise makes the next .then() wait for it
      return response.json()
    })
    .then((data) => console.log('chained:', data.results[0].name))
    .catch((error) => console.log('chained failed:', error.message))
    .finally(() => console.log('chained: done'))
}

async function awaitedDemo() {
  header('5b. The same request with await')
  try {
    const response = await fetch(`${SEARCH_URL}?name=Bend&count=1`)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    const data = await response.json()
    console.log('awaited:', data.results[0].name)
  } catch (error) {
    console.log('awaited failed:', error.message)
  } finally {
    console.log('awaited: done')
  }
}

// --------------------------------------------------------------------
// 6. The healthy pattern, with loading, empty, and error states
// Try searchDemo('Bend') and searchDemo('zzqqxx'). To see the error
// case, turn on DevTools' Network > Offline throttling and search again.
// --------------------------------------------------------------------
async function fetchJson(url) {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP ${response.status}`)
  }
  return response.json()
}

async function searchDemo(query = 'Bend') {
  header(`6. Searching for "${query}"`)
  const params = new URLSearchParams({ name: query, count: '5' })
  // In the template string below, JavaScript calls params.toString(),
  // which turns the object into a query string: name=Bend&count=5

  console.log('loading: Searching…')
  try {
    const data = await fetchJson(`${SEARCH_URL}?${params}`)
    // no matches: Open-Meteo leaves out `results` entirely
    if (!data.results) {
      console.log(`empty: No places match "${query}".`)
      return
    }
    // console.table() prints an array of objects as a table, with one
    // row per object and one column per property
    console.table(
      data.results.map((place) => ({ name: place.name, region: place.admin1 })),
    )
  } catch (error) {
    console.log(`error: Search failed (${error.message}).`)
  }
}

// --------------------------------------------------------------------
// 7. Debug Challenge
// This function always reports "HTTP undefined", even for a search
// that works. Why? Fix it.
// --------------------------------------------------------------------
async function debugChallenge() {
  header('7. Debug Challenge')
  try {
    const response = fetch(`${SEARCH_URL}?name=Bend&count=1`)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    const data = await response.json()
    console.log('Found:', data.results[0].name)
  } catch (error) {
    console.log('Search failed:', error.message)
  }
}

console.log(
  'Week 11 demos loaded. Run one at a time: eventLoopDemo(), promiseStatesDemo(),',
  "asyncAwaitDemo(), statusCodesDemo(), chainedDemo(), awaitedDemo(), searchDemo('Bend'),",
  'debugChallenge()',
)
