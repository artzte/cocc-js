# Week 9: Modules and `localStorage` Examples

This guide walks through an interactive browser console demo for the Week 9 lecture: **namespaces
vs. data structures**, **classic modules (singleton IIFE and module factory)**, **ES module
boundaries**, **persisting `Task` instances with `localStorage`**, and a **debug challenge**.

The full snippet is in [`week9-modules.js`](week9-modules.js).

---

## Setup for Chrome DevTools Snippets

1. Open Google Chrome to your running Vite dev server (`http://localhost:5173`) or any `http(s)` tab
   (or `about:blank`).
2. Open DevTools (`F12` or `Ctrl+Shift+I` on Windows/Linux, `Cmd+Option+I` on macOS).
3. Switch to the **Sources** tab.
4. In the left panel, click **Snippets** (or press `Ctrl+Shift+P` / `Cmd+Shift+P` and type
   `Create snippet`).
5. Name the snippet `week9-modules.js`.
6. Paste in the contents of [`week9-modules.js`](week9-modules.js), press `Ctrl+S` (`Cmd+S`) to
   save, and `Ctrl+Enter` (`Cmd+Enter`) to run.

---

## What Each Demo Shows

| Demo                            | Function                        | Watch for                                                                                                     |
| :------------------------------ | :------------------------------ | :------------------------------------------------------------------------------------------------------------ |
| 1. Namespace vs. data structure | `namespaceAndDataStructureDemo` | `TextUtils` has functions but no state; `StudentDataStructure` has state, but outside code can wipe `records` |
| 2. Classic modules              | `classicModuleDemo()`           | `Student.records` is `undefined` outside the IIFE; `createSelectionStore()` makes separate closures           |
| 3. ES module boundaries         | `esModuleBoundariesDemo()`      | How splitting `app.js` into `task.js`, `storage.js`, `task-list.js`, and `app.js` hides internal details      |
| 4. `localStorage` round trip    | `localStorageDemo()`            | `save()` calls `JSON.stringify(tasks)` (`toJSON()`); `load()` rebuilds `Task` instances with `Task.fromJSON`  |
| 5. Debug challenge              | `debugChallenge()`              | `loaded[0].toggle()` throws `TypeError: loaded[0].toggle is not a function`. Explain it, fix `brokenLoad()`   |

---

## References in _You Don't Know JS Yet_

- [Scope & Closures (2nd Edition), Chapter 8: The Module Pattern](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch8.md)
- [Get Started (2nd Edition), Chapter 2: Surveying JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch2.md)

---

## Debug Challenge

`debugChallenge()` saves a `Task` to storage, loads it back with `brokenLoad()`, and calls
`loaded[0].toggle()`. Instead of flipping `done` to `true`, it logs:

```text
TypeError - loaded[0].toggle is not a function
```

Before you change anything, answer these questions:

1. What does `JSON.parse(raw)` return inside `brokenLoad()`?
2. Why is `loaded[0] instanceof Task` equal to `false`?
3. Which static method on `Task` turns a plain `{ id, text, done }` object back into a real `Task`
   instance?
4. How can you update `brokenLoad()` (using `.map(...)`) so every item in the returned array is a
   `Task` instance?
