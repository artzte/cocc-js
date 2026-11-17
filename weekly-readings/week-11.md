# Week 11 Reading Summary: Async JavaScript: Promises, Fetch, and Async/Await

**Sources** (MDN, student-directed):

- [Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)

---

### 1. Asynchronous JavaScript and the Event Loop

- **Single-threaded engine**: JavaScript has one call stack and runs one piece of code at a time.
- **Non-blocking**: slow operations such as timers and network requests are handed off to the host
  environment (the browser's Web APIs). Your code keeps running, and the page stays responsive,
  while the browser waits.
- **The event loop**: when the call stack is empty, the event loop takes the next waiting callback
  and runs it. Promise callbacks (`.then()`, and the code after an `await`) go in a higher-priority
  queue than timer and event callbacks, so they run first.
- **Callback hell**: before Promises, each step that depended on the previous one was nested inside
  its callback, producing deeply indented, hard-to-read code (the "pyramid of doom").

---

### 2. Promises

A `Promise` is an object standing in for a value that isn't available yet.

- **Three states**:
  1. **Pending**: the operation is still running.
  2. **Fulfilled**: it finished successfully, with a value.
  3. **Rejected**: it failed, with a reason (usually an `Error`).
- A Promise that is fulfilled or rejected is **settled**. A settled Promise never changes state
  again.
- **Consuming a Promise**:
  - `.then(onFulfilled)` runs when the Promise fulfills, and returns a new Promise, so calls can be
    chained.
  - `.catch(onRejected)` runs if the Promise, or anything earlier in the chain, rejects.
  - `.finally(onSettled)` runs either way. It's a good place to hide a loading message.

---

### 3. `async` / `await`

- **Syntactic sugar**: `async`/`await` is built on Promises and lets asynchronous code read from top
  to bottom like synchronous code.
- **`async` functions** always return a Promise. A plain `return 38.4` becomes a Promise that
  fulfills with `38.4`.
- **`await`** can only be used inside an `async` function (or at the top level of a module). It
  pauses **that function** until the Promise settles, then gives you the fulfilled value or throws
  the rejection reason. The rest of the page keeps running while the function waits.
- Use **`try/catch`** around `await` to handle rejections, just like synchronous errors.

---

### 4. The Fetch API

- **`fetch(url)`** returns a Promise that fulfills with a **`Response`** object once the server's
  response headers arrive.
- **Reading the body**: `response.json()` reads the rest of the body and parses it as JSON. It also
  returns a Promise, so it needs its own `await`.
- **`fetch` only rejects on network failures**, such as no connection, an unknown host name, or a
  request the browser blocks (for example, by CORS). In those cases there's no response at all.
- **`fetch` does not reject on HTTP error status codes.** A 404 or 500 is still a response, so the
  Promise fulfills with a `Response` whose `ok` is `false` and whose `status` holds the code.
- **Query strings**: fill in a plain object with the parameters and pass it to `URLSearchParams`.
  Its `toString()` method builds the query string part of the URL (and encodes characters such as
  spaces): `new URLSearchParams({ name: 'Bend', count: '10' }).toString()` gives
  `name=Bend&count=10`. A template string such as `` `${SEARCH_URL}?${params}` `` calls `toString()`
  for you.

---

### 5. HTTP Response Status Codes

Every HTTP response has a three-digit status code. The first digit tells you the class:

| Class | Meaning                                                       | Examples                                                                                                                      |
| :---- | :------------------------------------------------------------ | :---------------------------------------------------------------------------------------------------------------------------- |
| 2xx   | **Success**: the request worked                               | `200 OK`, `201 Created`, `204 No Content`                                                                                     |
| 3xx   | **Redirection**: the resource is somewhere else               | `301 Moved Permanently`, `304 Not Modified` (the browser handles these for you)                                               |
| 4xx   | **Client error**: something is wrong with the request         | `400 Bad Request`, `401 Unauthorized`, `403 Forbidden`, `404 Not Found`, `422 Unprocessable Content`, `429 Too Many Requests` |
| 5xx   | **Server error**: the server failed to handle a valid request | `500 Internal Server Error`, `502 Bad Gateway`, `503 Service Unavailable`                                                     |

- `response.ok` is `true` exactly when the status is in the 200–299 range.
- `422 Unprocessable Content` means the server understood the request, but the data you sent doesn't
  make sense (for example, an end date before the start date).
- A 4xx usually means **your** request needs fixing (a typo in the URL, a bad parameter, a missing
  API key). Retrying the same request won't help.
- A 5xx means the **server** had a problem. The same request might work if you try again later.
- Many APIs send a JSON body with error details even on a 4xx response. Open-Meteo, for example,
  answers a bad latitude with `400` and `{ "error": true, "reason": "..." }`.

---

### 6. Asynchronous Best Practices

- **Always check `response.ok`** before parsing the body.
- **Use `try/catch` with `await`** to handle network errors and your own `throw` for a bad status.
- **Re-throw in helpers**: a helper that logs an error should `throw` it again, so the calling UI
  code can show an error message.
- **Handle every state in the DOM**:
  1. **Loading**: show a message or spinner while the request is pending.
  2. **Empty**: the request worked but returned nothing. Tell the user, but don't call it an error.
  3. **Error**: the request failed. Show a message, and let the user try again.
- **Ignore input while loading**: while a request is running, ignore new submits and clicks (an
  `isLoading` flag checked at the top of each listener is enough), so two requests don't race each
  other.

#### Healthy async pattern

```js
async function loadData(url) {
  try {
    const res = await fetch(url)
    // 1. Check for HTTP errors (e.g., 404, 500)
    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`)
    }
    // 2. Parse and return JSON
    return await res.json()
  } catch (err) {
    // 3. Log and re-throw for the UI handler to catch
    console.error('fetch failed:', err)
    throw err
  }
}
```
