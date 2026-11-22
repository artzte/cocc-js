## Overview of Week 11: Async JavaScript, Promises, and `fetch`

How JavaScript waits for slow operations such as network requests without freezing the page, how to
use `fetch` to get data from a real API, and how to handle everything that can go wrong along the
way.

Last week we looked at form events (`input`, `change`, and `submit` with `preventDefault()`) and
previewed a single `fetch` call. This week we go underneath that call:

- **The event loop and Promises** explain how a single-threaded language can wait for a server while
  the page keeps responding to clicks and typing.
- **`async`/`await`** lets us write that waiting code so it reads top to bottom, with `try/catch`
  for errors.
- **HTTP status codes** tell us whether a request worked, and `response.ok` is how our code checks.
  A 404 or a 500 doesn't make `fetch` throw.

The assignment, a **Weather Search**, combines last week's events with this week's `fetch`. I'll
also walk through my own final project, a
[Victoria and Albert Museum Art Browser](../../examples/final-project/README.md), as a model for
your final push. Your final project needs at least one `fetch` call to a real public API, so
everything this week goes straight into it.

---

### Part 1: The Event Loop and Promises

- **The event loop**: why async callbacks never interrupt code that's already running.
- **Promise states**: pending, fulfilled, and rejected; `.then()`, `.catch()`, and `.finally()`.

### Part 2: `async`/`await` and `fetch`

- **`async`/`await`**: `async` functions always return a Promise; `await` pauses only its own
  function.
- **The `Response` object**: `ok`, `status`, and `json()`.
- **Query strings**: building URLs with `URLSearchParams`.

### Part 3: HTTP, Errors, and UI States

- **Status code classes**: 2xx, 3xx, 4xx, and 5xx, and what each one tells you.
- **Network errors vs. error responses**: when `fetch` rejects and when it fulfills with
  `ok === false`.
- **Loading, empty, and error states**: what the user sees in each case, and ignoring input while a
  request is running.
- **Testing**: stubs and spies, replacing `fetch` with a stub in Vitest with `vi.stubGlobal()`, and
  waiting for async DOM updates with `vi.waitFor()`.

---

### Module Objectives

By the end of this module you will be able to:

- Explain how the event loop lets JavaScript wait for a network request without freezing the page.
- Describe the three Promise states and consume a Promise with `async`/`await` and `try/catch`.
- Use `fetch` to request JSON from a public API, checking `response.ok` before reading the body.
- Interpret HTTP status code classes and tell a network error from an error response.
- Show loading, empty, and error states in the DOM.
- Test `fetch`-based code with a stubbed `fetch`.

---

### Week 11 Activities & Materials

1. **Reading Assignment** (MDN):
   - [Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
   - [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
   - [Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
   - [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)
   - Review the [Week 11 Reading Summary](../../weekly-readings/week-11.md).
2. **Lecture**:
   - [Week 11 Lecture: Async JavaScript, Promises, and `fetch`](week11-lecture-async.md)
   - [Lecture Guide: Async JavaScript, Promises, and `fetch`](../../lectures/week11-async-fetch.md)
3. **Hands-On Practice & Code Exploration**:
   - Run the [Week 11 Async DevTools Snippet](../../examples/week11-async-fetch.md)
     ([`examples/week11-async-fetch.js`](../../examples/week11-async-fetch.js)) in Chrome DevTools
     and solve the Debug Challenge.
4. **Final Project Example**:
   - Follow along with my walkthrough of the
     [V&A Art Browser](../../examples/final-project/README.md), and compare how it handles `fetch`
     with your own plan. The lecture lists the files to look at.
5. **Assessment — Quiz 11**:
   - Complete [Week 11 Quiz](week11-quiz.md) on Canvas (covering Promise states, `fetch` and
     `response.ok`, 4xx vs. 5xx status codes, the event loop, and empty results vs. errors). Due
     **Monday, December 7, 2026 at 11:59 PM**.
6. **Programming Assignment — Weather Search**:
   - Create a `week11` branch, scaffold `projects/week11` with `scripts/mpf.sh week11`, and build
     the app using the Open-Meteo API.
   - Complete [Week 11 Assignment: Weather Search](week11-assignment-weather-search.md), verify with
     `npm start` and `npm run check`, and submit your PR on GitHub to **artzte**. Due **Monday,
     December 7, 2026 at 11:59 PM**.

---

### Steps to Complete

1. Read the MDN pages and review the reading summary.
2. Review the **Async JavaScript** lecture and run the Week 11 DevTools snippet.
3. Complete and submit **Quiz 11** by Monday, December 7.
4. Complete the **Week 11 Programming Assignment: Weather Search** and open your Pull Request by
   Monday, December 7.
5. Keep going on your final project. Its initial pull request is also due Monday, December 7.

---

### Course Outcomes Supported

This week directly supports the following course outcomes:

- **CO1**: Implement scripts that rely on knowledge of Document Object Model (DOM) architecture and
  includes methods for manipulating DOM objects.
- **CO2**: Construct functions that effectively utilize variables, conditionals, loops, and arrays.
- **CO3**: Generate scripts that process user input and provide meaningful output.
- **CO4**: Plan and create scripts utilizing events and event handlers that respond to user inputs.
