# Week 11 Lecture Guide: Async JavaScript, Promises, and `fetch`

**Reading**: MDN student-directed:
[Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises),
[async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function),
[Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), and
[HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)  
**Module Page**:
[`modules/week11/week11-lecture-async.md`](../modules/week11/week11-lecture-async.md)  
**Format**: Interactive Lecture, Chrome DevTools Snippet Walkthrough
([`examples/week11-async-fetch.js`](../examples/week11-async-fetch.js)), and Final Project
Walkthrough  
**Duration**: ~30 Minutes  
**Prereq Context**: Week 9 (modules), Week 10 (`input`, `change`, `submit`, `preventDefault()`, and
the `fetch` preview)

---

## Pacing & Timeline

| Time              | Section                                              | Focus / Snippet Function                                                             |
| :---------------- | :--------------------------------------------------- | :----------------------------------------------------------------------------------- |
| **00:00 - 03:00** | **1. The Event Loop**                                | Why the page doesn't freeze; A, B, C, D ordering (`eventLoopDemo`)                   |
| **03:00 - 07:00** | **2. Promises and `async`/`await`**                  | States, `.then/.catch/.finally`, `try/catch` (`promiseStatesDemo`, `asyncAwaitDemo`) |
| **07:00 - 12:00** | **3. `fetch` and HTTP Status Codes**                 | `Response`, status classes, network errors vs. error responses (`statusCodesDemo`)   |
| **12:00 - 15:00** | **4. Loading, Empty, and Error States**              | The four states of a data screen (`searchDemo`)                                      |
| **15:00 - 16:30** | **5. Debug Challenge**                               | A missing `await` gives `HTTP undefined` (`debugChallenge`)                          |
| **16:30 - 27:00** | **6. Walkthrough: Art Institute of Chicago Browser** | My final project as a model for the final push                                       |
| **27:00 - 30:00** | **7. The Weather Search Assignment & Wrap-Up**       | Tying events and `fetch` together; testing with a fake `fetch`; deliverables         |

---

## 1. The Event Loop (3 mins)

### Talking Points & Concept Cues

- JavaScript has one call stack and runs one thing at a time. If `fetch` stopped everything until
  the server answered, the page would freeze.
- `fetch` hands the request to the browser and returns right away. When the response arrives, a
  callback goes in a queue, and the **event loop** runs it once the stack is empty.
- Connect it to events: this is exactly how our `click` and `input` listeners run. The browser
  queues the event; the event loop calls the listener.
- Run `eventLoopDemo()`. Ask the class to predict the order first. A and B are synchronous. C (a
  Promise callback) runs before D (a 0 ms timer) because Promise callbacks have priority.
- The thing to remember isn't the queue rules. It's that **async callbacks never interrupt code
  that's already running**.

---

## 2. Promises and `async`/`await` (4 mins)

### Talking Points & Concept Cues

- A Promise stands in for a value we don't have yet: **pending**, then **fulfilled** or
  **rejected**. Once settled, it never changes.
- Run `promiseStatesDemo()`. The first log shows `Promise {<pending>}`. Expand it after a couple of
  seconds to show it's now fulfilled. `finally` runs for both outcomes.
- Run `asyncAwaitDemo()`. Same flow, top to bottom. A rejection makes `await` throw, so `try/catch`
  works like it does for synchronous code.
- Point out that `getTemperature()` returns a Promise even though it just returns `38.4`. **An
  `async` function always returns a Promise**, so callers have to `await` it.
- `await` pauses only its own function. That's the answer to "why doesn't the page freeze?"

---

## 3. `fetch` and HTTP Status Codes (5 mins)

### Talking Points & Concept Cues

- `response.status`, `response.ok`, `await response.json()`. Two `await`s: one for the response, one
  for the body.
- Status code classes: 2xx success, 3xx redirect (the browser follows these), 4xx **your request**
  is wrong, 5xx the **server** had a problem.
  - A 4xx won't fix itself: check the URL, the parameters, the API key.
  - A 5xx might work if you try again later.
- Run `statusCodesDemo()`:
  - The good search: `200`, `ok` is `true`.
  - The bad latitude: `400`, `ok` is `false`, but `fetch` **didn't throw**.
  - The bad path: another non-2xx, and still no throw.
  - The unknown host: **now** `fetch` rejects, with a `TypeError`. There's no response at all, so
    there's no status code.
- **Network error vs. error response** is the most important distinction this week, and it's on the
  quiz. That's why every `fetch` is followed by `if (!response.ok)`.
- Show `URLSearchParams`: fill in a plain object with the parameters, and its `toString()` method
  builds the query string. A template string calls `toString()` for us.
- Run `chainedDemo()` and then `awaitedDemo()`. They make the same request. Each `.then()` returns a
  new Promise, so returning `response.json()` makes the next `.then()` wait for the body. `await`
  does the same waiting, but reads top to bottom, which is why I prefer it.

---

## 4. Loading, Empty, and Error States (3 mins)

### Talking Points & Concept Cues

- Every screen that loads data has four states: loading, success, empty, and error. The user should
  always be able to tell which one they're in.
- Run `searchDemo('Bend')` and `searchDemo('zzqqxx')`:
  - `Bend`: a table of places.
  - `zzqqxx`: the request **worked**, but nothing matched. That's the empty state, not an error.
- Switch the DevTools **Network** panel's throttling to **Offline** and run `searchDemo('Bend')`
  again: `fetch` rejects and we land in `catch`. Switch back to **No throttling** afterward.
- Point out the Open-Meteo quirk: no `results` property at all when nothing matches. Turn that into
  an empty array right after the `fetch`, so the rendering code only deals with arrays.
- An error message should leave the form usable so the user can try again.
- **Ignore input while loading**: if the user submits again or clicks another place mid-request, two
  requests race and whichever finishes last wins. Keep an `isLoading` flag and return early from
  listeners while it's `true`. A `loading` class on `#app` with `pointer-events: none` shows the app
  is busy and blocks the mouse, but keep the flag, because Enter can still submit the form.

---

## 5. Debug Challenge (1.5 mins)

### Talking Points & Concept Cues

- Run `debugChallenge()`. A search for Bend fails with `HTTP undefined`.
- Ask: what does `fetch()` return before the server answers? Does a Promise have `ok` or `status`?
- `response` is a pending Promise, so `response.ok` is `undefined`, `!undefined` is `true`, and we
  throw every time.
- **The fix**: add the missing `await`:
  ```javascript
  const response = await fetch(`${SEARCH_URL}?name=Bend&count=1`)
  ```
- This is the most common `fetch` bug I see. If you get `undefined` where you expect data, look for
  a missing `await`.

---

## 6. Walkthrough: Art Institute of Chicago Browser (10.5 mins)

### Talking Points & Concept Cues

- This is my own final project, built to the same requirements as yours. It was published before
  Week 10 so you've had a chance to look through it.
- Open the repo and walk through:
  - **Module layout**: which module owns the API calls, and how the rest of the app only sees plain
    objects. Count the modules against the ≥4 requirement.
  - **The API module**: the base URL, query strings built with `URLSearchParams`, and a single
    `fetchJson()`-style helper that checks `response.ok`.
  - **Simplifying results**: the [Art Institute of Chicago API](https://api.artic.edu/docs/) returns
    a lot of fields. Show where they get trimmed down to what the UI needs, and how image URLs are
    built from `image_id`.
  - **Events**: the search form (`submit` + `preventDefault()`), any `input`/`change` controls, and
    the delegated `click` listener. Count interactions against the ≥3 requirement.
  - **The class**: point out the ES6 class and why it was a good fit.
  - **UI states**: loading, empty, and error messages.
  - **Tests**: how the tests fake `fetch` and import sample responses, so they never call the live
    API.
  - **Deployment**: the live CloudFront URL and the passing `npm run check`.
- Close with: your project doesn't need to look like mine, but it needs the same habits.

---

## 7. The Weather Search Assignment & Wrap-Up (3 mins)

### Talking Points & Concept Cues

- Show the wireframe in the assignment. It's one small app that uses everything from the last two
  weeks:
  - `input` enables **Search** once there are two characters.
  - `submit` with `preventDefault()` runs the search.
  - Each place is a link whose `href` is its forecast URL. A delegated `click` calls
    `preventDefault()`, so instead of navigating to the JSON, we fetch `link.href` and render it.
  - Forecasts are cached in a `Map` keyed by URL, so clicking the same place again doesn't fetch.
  - `change` on the units select rebuilds the links and reloads the weather in °F or °C.
  - While a request is loading, submits, clicks, and units changes are ignored.
- **Don't rebuild the form on each event.** Re-rendering the text field on every `input` event loses
  focus after each keystroke. Render the page once, keep references to the elements you need, and
  change them directly: `searchButton.disabled = true`, `resultsList.innerHTML = ...`.
- The fixtures file has the API URLs, weather code descriptions, sample responses, and a
  `fakeResponse()` helper.
- Testing: a **stub** is a stand-in that returns canned data, and a **spy** records its calls.
  `vi.fn()` is both. `vi.stubGlobal('fetch', vi.fn(...))` swaps in the stub, `vi.unstubAllGlobals()`
  in `afterEach` puts the real `fetch` back, and `await vi.waitFor(...)` waits for DOM updates that
  happen after an `await`. Mention [Sinon.js](https://sinonjs.org/), the standalone stub and spy
  library you'll see in a lot of existing projects.
- **Key Takeaways**:
  1. `await` pauses one function, not the page.
  2. `fetch` rejects only on network errors. Always check `response.ok`.
  3. 4xx means fix the request; 5xx means the server had a problem.
  4. Handle loading, empty, and error states, and don't treat empty as an error.
- **Week 11 Deliverables (Due Monday, December 7)**:
  - **Quiz 11**
  - **Week 11 Assignment: Weather Search**
  - Your **final project initial PR** is due the same day.
