# Week 9: Modules and `localStorage` Examples

This guide walks through an interactive browser console demo for the Week 9 lecture: **namespaces
vs. data structures**, **classic modules (singleton Immediately Invoked Function Expression (IIFE)
and module factory)**, **ES module boundaries**, **decoupling `TaskList` and `localStorage` with
`registerOnChange` and a `BrowserStorage` class**, and a **debug challenge**.

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

| Demo                            | Function                        | Watch for                                                                                                                         |
| :------------------------------ | :------------------------------ | :-------------------------------------------------------------------------------------------------------------------------------- |
| 1. Namespace vs. data structure | `namespaceAndDataStructureDemo` | `TextUtils` has functions but no state; `StudentDataStructure` has state, but outside code can wipe `records`                     |
| 2. Classic modules              | `classicModuleDemo()`           | `Student.records` is `undefined` outside the IIFE; `createSelectionStore()` makes separate closures                               |
| 3. ES module boundaries         | `esModuleBoundariesDemo()`      | How `task-list.js` and `browser-storage.js` stay independent while `app.js` wires them together                                   |
| 4. `registerOnChange`           | `localStorageDemo()`            | `storage.load()` returns `null` until something is saved; `registerOnChange((tasks) => storage.save(tasks))` saves on each change |
| 5. Debug challenge              | `debugChallenge()`              | `taskList.registerOnChange(storage.save)` registers fine, but `add()` throws a `TypeError`. Fix it                                |

---

## References in _You Don't Know JS Yet_

- [Scope & Closures (2nd Edition), Chapter 8: The Module Pattern](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch8.md)
- [Get Started (2nd Edition), Chapter 2: Surveying JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch2.md)

---

## Debug Challenge

`debugChallenge()` creates a `TaskList` and a `BrowserStorage` (both from the shared section at the
top of the snippet), registers `storage.save` as the list's change callback, and calls
`taskList.add('Fix registerOnChange')`. Instead of saving the new task, it logs:

```text
Error from taskList.add(): Cannot read private member #key from an object whose class did not declare it
storage.load() after adding a task: null
```

Before you change anything, answer these questions:

1. `taskList.registerOnChange(storage.save)` hands `TaskList` the `save` function. What does it no
   longer have a connection to?
2. When `TaskList` calls the callback as `this.#onChange?.(...)`, what is `this` inside `save()`?
3. How can you write the callback so that `save()` is called on `storage`?
