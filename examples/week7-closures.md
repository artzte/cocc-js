# Week 7: Closures and Limiting Scope Exposure Examples

This guide walks through an interactive browser console demo for the Week 7 lecture: **the Principle
of Least Exposure (POLE)**, **block scoping**, **closure as a live link**, **factory functions**,
**closure vs. class tradeoffs**, a **browser counter widget**, and a **debug challenge**.

The full snippet is in [`week7-closures.js`](week7-closures.js).

---

## Setup for Chrome DevTools Snippets

1. Open Google Chrome to a blank tab (`about:blank`).
2. Open DevTools (`F12` or `Ctrl+Shift+I` on Windows/Linux, `Cmd+Option+I` on macOS).
3. Switch to the **Sources** tab.
4. In the left panel, click **Snippets** (or press `Ctrl+Shift+P` / `Cmd+Shift+P` and type
   `Create snippet`).
5. Name the snippet `week7-closures.js`.
6. Paste in the contents of [`week7-closures.js`](week7-closures.js), press `Ctrl+S` (`Cmd+S`) to
   save, and `Ctrl+Enter` (`Cmd+Enter`) to run.

---

## What Each Demo Shows

| Demo                      | Function                | Watch for                                                                                     |
| :------------------------ | :---------------------- | :-------------------------------------------------------------------------------------------- |
| 1. Least exposure (POLE)  | `poleDemo()`            | `cache` is hidden inside `buildFactorial()`; block-scoped `tempJoined` disappears after `{ }` |
| 2. Closure is a live link | `liveLinkDemo()`        | Each `makeCounter()` call creates an independent `count` that updates in place across calls   |
| 3. Factory functions      | `factoryFunctionDemo()` | Returned methods read/write private `count`; setting `counter.count = 999` cannot corrupt it  |
| 4. Closure vs. class      | `closureVsClassDemo()`  | Detaching a class method loses `this`; detaching a closure method still works                 |
| 5. Browser counter widget | `browserCounterDemo()`  | Renders a live counter on `about:blank` with private state and one delegated click listener   |
| 6. Debug challenge        | `debugChallenge()`      | Prints `0 items: (empty)` after adding two items. Your job: explain why and fix it            |

---

## References in _You Don't Know JS Yet_

- [Scope & Closures (2nd Edition), Chapter 6: Limiting Scope Exposure](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch6.md)
- [Scope & Closures (2nd Edition), Chapter 7: Using Closures](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md)

---

## Debug Challenge

`debugChallenge()` creates a cart, adds `'Keyboard'` and `'Monitor'`, and then calls
`cart.getSummary()`. It is supposed to print:

```
Cart summary: 2 items: Keyboard, Monitor
```

Instead, it prints:

```
Cart summary: 0 items: (empty)
```

Before you change anything, answer these questions:

1. Which variable(s) from `createCart()` does `getSummary()` close over?
2. When is the template literal `${items.length} items: ...` evaluated—when `createCart()` runs, or
   when `getSummary()` runs?
3. Does closure automatically re-run string expressions when `items` changes, or does `summary` just
   hold the string value computed on line 1?
4. How can you fix `createCart()` so `getSummary()` always computes its string from the live `items`
   array?
