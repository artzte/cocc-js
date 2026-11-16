# Week 11: Async JavaScript, Promises, and `fetch` Examples

This guide walks through an interactive DevTools demo for the Week 11 lecture: **the event loop**,
**Promise states**, **`async`/`await`**, **HTTP status codes and `response.ok`**, **loading, empty,
and error states**, and a **debug challenge**.

The full snippet is in [`week11-async-fetch.js`](week11-async-fetch.js). The `fetch` demos call the
[Open-Meteo](https://open-meteo.com/) API, which doesn't need an API key.

---

## Setup for Chrome DevTools Snippets

1. Open Google Chrome to a blank tab (`about:blank`) or your running Vite dev server
   (`http://localhost:5173`).
2. Open DevTools (`F12` or `Ctrl+Shift+I` on Windows/Linux, `Cmd+Option+I` on macOS).
3. Switch to the **Sources** tab.
4. In the left panel, click **Snippets** (or press `Ctrl+Shift+P` / `Cmd+Shift+P` and type
   `Create snippet`).
5. Name the snippet `week11-async-fetch.js`.
6. Paste in the contents of [`week11-async-fetch.js`](week11-async-fetch.js), press `Ctrl+S`
   (`Cmd+S`) to save, and `Ctrl+Enter` (`Cmd+Enter`) to run.
7. Running the snippet only defines the demos. Switch to the **Console** and call them one at a
   time, for example `eventLoopDemo()`.

---

## What Each Demo Shows

| Demo                         | Function              | Watch for                                                                                                                                                             |
| :--------------------------- | :-------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1. The event loop            | `eventLoopDemo()`     | The lines print A, B, C, D: synchronous code first, then the promise callback, then the timer, even with a 0 ms delay                                                 |
| 2. Promise states            | `promiseStatesDemo()` | The first Promise logs as `<pending>`; one fulfills and one rejects, and `finally` runs for both                                                                      |
| 3. `async`/`await`           | `asyncAwaitDemo()`    | The same flow as demo 2 with `try/catch/finally`; `getTemperature()` returns a Promise, and `await` unwraps it                                                        |
| 4. Status codes              | `statusCodesDemo()`   | The good search is `200` and `ok`; the bad latitude is `400` and the bad path is another non-2xx status, but `fetch` resolves for both; only the unknown host rejects |
| 5. Loading, empty, and error | `searchDemo(query)`   | `searchDemo('Bend')` logs a table and `searchDemo('zzqqxx')` hits the empty case. Set **Network** throttling to **Offline** and search again to see the error case    |
| 6. Debug challenge           | `debugChallenge()`    | Every search fails with `HTTP undefined`, even one that should work. Fix it                                                                                           |

---

## Debug Challenge

`debugChallenge()` searches for Bend, which should find Bend, Oregon. Instead, it logs:

```text
Search failed: HTTP undefined
```

Before you change anything, answer these questions:

1. What does `fetch()` return right away, before the server answers?
2. Does that kind of object have an `ok` or a `status` property?
3. What does `!undefined` evaluate to?

<details>
<summary>Solution</summary>

The code is missing `await` before `fetch()`. Without it, `response` is a pending Promise, not a
`Response`. A Promise has no `ok` or `status` property, so `response.ok` is `undefined`,
`!undefined` is `true`, and the code throws `HTTP undefined` every time:

```js
const response = await fetch(`${SEARCH_URL}?name=Bend&count=1`)
```

</details>
