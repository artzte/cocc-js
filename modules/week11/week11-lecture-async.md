## Async JavaScript: Promises, `fetch`, and `async`/`await`

Every app we've built so far has had all of its data on hand: a themes array, a task list in
`localStorage`. Real apps usually get their data from a server, and that takes time. This week is
about writing code that **waits** without freezing the page: Promises, `async`/`await`, and `fetch`.

Last week's preview showed one `fetch` call. This week we look at what's going on underneath it, at
the HTTP status codes a server can send back, and at the states every data-loading screen has to
handle. I'll also walk through my own final project, an Art Institute of Chicago browser, as an
example of how a complete app organizes its `fetch` code.

The assignment, a Weather Search, puts last week's `input`, `change`, and `submit` events together
with `fetch`.

---

### Key Lecture Topics

1. **The event loop**: How single-threaded JavaScript waits for a network request without freezing
   the page.
2. **Promises**: Pending, fulfilled, and rejected; `.then()`, `.catch()`, and `.finally()`.
3. **`async`/`await`**: The same Promises, written so they read top to bottom.
4. **`fetch` and HTTP**: The `Response` object, status codes, and why a 404 doesn't throw.
5. **Loading, empty, and error states**: What the user sees while waiting and when things go wrong.
6. **Testing `fetch` code**: Replacing `fetch` with a fake in Vitest.
7. **Walkthrough**: My Art Institute of Chicago browser.

---

### The Event Loop

JavaScript runs one piece of code at a time on a single **call stack**. If `fetch` made JavaScript
stop and wait for the server, the whole page would freeze: no clicks, no typing, no scrolling.

Instead, `fetch` hands the request to the browser and returns right away. When the response arrives,
the browser puts a callback in a queue. The **event loop** runs queued callbacks one at a time,
whenever the call stack is empty. It's the same mechanism that runs your `click` listeners: the
browser queues the event, and the event loop runs your listener when nothing else is running.

```javascript
console.log('A')
setTimeout(() => console.log('D'), 0)
Promise.resolve().then(() => console.log('C'))
console.log('B')
// A, B, C, D
```

`A` and `B` are synchronous, so they run first. `C` and `D` both wait for the stack to empty, and
Promise callbacks get priority over timers, so `C` comes before `D`. You don't need to memorize the
queue rules. The thing to remember is that **async callbacks never interrupt code that's already
running**.

---

### Promises

A **Promise** is an object that stands in for a value you don't have yet. It's always in one of
three states:

| State         | Meaning                                    | What runs   |
| :------------ | :----------------------------------------- | :---------- |
| **Pending**   | Still waiting                              | Nothing yet |
| **Fulfilled** | Finished successfully, with a value        | `.then()`   |
| **Rejected**  | Failed, with a reason (usually an `Error`) | `.catch()`  |

Fulfilled and rejected are both **settled**, and a settled Promise never changes again. `.finally()`
runs once the Promise settles, either way.

```javascript
fetch(url)
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((error) => console.error(error))
  .finally(() => hideLoadingMessage())
```

---

### `async`/`await`

`async`/`await` does the same thing as a `.then()` chain, but reads from top to bottom. My preferred
method is `async`/`await` with `try/catch`, and that's what I'll use in examples from here on:

```javascript
async function loadData(url) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('fetch failed:', error)
    throw error // re-throw so callers can handle it too
  }
}
```

- An `async` function **always returns a Promise**, even when it returns a plain value. Code that
  calls `loadData()` has to `await` it, too.
- `await` pauses only **this function**. The event loop keeps running everything else, so the page
  stays responsive.
- A rejected Promise makes `await` **throw**, so `try/catch` works the same way it does for
  synchronous errors.

---

### `fetch` and HTTP Status Codes

When `fetch` fulfills, you get a `Response` object. The three properties we use most:

- `response.status`: the HTTP status code, such as `200` or `404`.
- `response.ok`: `true` when the status is 200–299.
- `response.json()`: reads and parses the body. It returns a Promise, so `await` it.

The first digit of a status code tells you what kind of answer it is:

| Class   | Meaning                       | Examples                                                    | Retry?              |
| :------ | :---------------------------- | :---------------------------------------------------------- | :------------------ |
| **2xx** | Success                       | `200 OK`                                                    | —                   |
| **3xx** | Redirect                      | `301`, `304` (the browser follows these)                    | —                   |
| **4xx** | Problem with **your request** | `400 Bad Request`, `404 Not Found`, `429 Too Many Requests` | No, fix the request |
| **5xx** | Problem on the **server**     | `500 Internal Server Error`, `503 Service Unavailable`      | Maybe later         |

#### Network errors vs. error responses

This is the part that trips people up:

- **Network error**: no response at all (no connection, unknown host, request blocked by the
  browser). `fetch` **rejects**, and `await fetch(...)` throws.
- **Error response**: the server answered, but with a 4xx or 5xx. `fetch` **fulfills** with a
  `Response` whose `ok` is `false`. Nothing throws unless you throw.

That's why every `fetch` call is followed by an `if (!response.ok)` check. Without it, your code
tries to use an error message as if it were data.

#### Query strings

APIs take their options in the URL's query string. Build it with `URLSearchParams` instead of gluing
strings together, so spaces and accented characters are encoded for you:

```javascript
const params = new URLSearchParams({ name: 'San José', count: '10' })
const url = `https://geocoding-api.open-meteo.com/v1/search?${params}`
// ...search?name=San+Jos%C3%A9&count=10
```

---

### Loading, Empty, and Error States

Every screen that loads data has four states, and the user should always know which one they're in:

1. **Loading**: "Searching for Bend…". Show it before the `await`.
2. **Success**: show the data.
3. **Empty**: the request worked, but nothing matched. "No places match `zzqqxx`." This is a normal
   answer, not a failure.
4. **Error**: the request failed. Say so, and leave the form usable so the user can try again.

```javascript
async function runSearch(query) {
  showStatus(`Searching for "${query}"…`)
  try {
    places = await searchPlaces(query)
  } catch (error) {
    showStatus(`Search failed (${error.message}). Please try again.`)
    return
  }
  renderPlaces()
  // an empty result is not an error
  showStatus(places.length === 0 ? `No places match "${query}".` : '')
}
```

APIs don't always say "nothing found" the way you'd expect. Open-Meteo's geocoding search leaves out
the `results` property entirely when nothing matches. Turn that into an empty array in one place,
right after the `fetch`, so the rest of your code only has to deal with arrays.

---

### Testing `fetch` Code

Tests shouldn't call the real API. It's slow, it can be down, and its data changes. Instead, replace
`fetch` with a fake that returns sample data:

```javascript
import { afterEach, it, expect, vi } from 'vitest'

function fakeResponse(body, status = 200) {
  return { ok: status >= 200 && status < 300, status, json: async () => body }
}

afterEach(() => {
  vi.unstubAllGlobals()
})

it('throws on a non-2xx response', async () => {
  vi.stubGlobal(
    'fetch',
    vi.fn(async () => fakeResponse({}, 500)),
  )
  await expect(fetchJson('https://example.com')).rejects.toThrow('500')
})
```

When a click or submit starts a `fetch`, the DOM updates after an `await`, so a test has to wait for
it. `vi.waitFor()` retries a check until it passes:

```javascript
document.querySelector('form button[type="submit"]').click()
await vi.waitFor(() => {
  expect(document.querySelector('#app').textContent).toContain('Bend, Oregon')
})
```

---

### Walkthrough: My Art Institute of Chicago Browser

In the lecture video I walk through my own final project, a browser for the
[Art Institute of Chicago API](https://api.artic.edu/docs/). Things to look for as you read through
its code:

- How the modules are split up, and which one is the only module that calls `fetch`.
- How search results are turned into simpler objects right after they arrive, before any rendering
  code sees them.
- Where the loading, empty, and error states are handled.
- How the tests fake `fetch` so they don't depend on the live API.

Use it as a model for your own final push. Your project doesn't need to look like mine, but it does
need the same healthy habits.

---

### Resources & References

| Topic                      | Documentation                                                                                               | Usefulness this week                             |
| :------------------------- | :---------------------------------------------------------------------------------------------------------- | :----------------------------------------------- |
| Using Promises             | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)                | Promise states and chaining                      |
| `async function`           | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function) | `async`/`await` syntax and behavior              |
| Using the Fetch API        | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)                      | Requests, responses, and error handling          |
| `Response`                 | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Response)                                   | `ok`, `status`, and `json()`                     |
| HTTP response status codes | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)                          | What each status code means                      |
| `URLSearchParams`          | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)                            | Building query strings                           |
| The event loop             | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model)           | How queued callbacks run (optional, deeper dive) |
| `vi` utilities             | [Vitest Docs](https://vitest.dev/api/vi.html)                                                               | `vi.stubGlobal()`, `vi.fn()`, and `vi.waitFor()` |
