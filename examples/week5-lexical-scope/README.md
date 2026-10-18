# Week 5: Lexical Scope Examples

This guide walks through an interactive browser console demo for the Week 5 lecture: **two-phase
processing**, **targets vs. sources**, **nested scopes**, **lookup failures**, and **nested event
handlers**.

The full snippet is in [`week5-lexical-scope.js`](week5-lexical-scope.js).

---

## Setup

1. Open `index.html` in this folder, in your browser.
2. Open DevTools (`F12` or `Ctrl+Shift+I` on Windows/Linux, `Cmd+Option+I` on macOS).
3. Switch to the **Sources** tab, and find the source files here.

---

## What Each Demo Shows

| Demo                     | Function                  | Watch for                                                                                    |
| :----------------------- | :------------------------ | :------------------------------------------------------------------------------------------- |
| 1. Compile, then execute | `twoPhasesDemo()`         | A `ReferenceError` _before_ the `let` line runs: the engine already knew about `greeting`    |
| 2. Targets and sources   | `targetsAndSourcesDemo()` | Comments label every variable reference as a target (receives) or source (supplies)          |
| 3. Nested scopes         | `scopeBucketsDemo()`      | `teach()` finds `course` one bucket out; the outer function can't see `week`                 |
| 4. Lookup failures       | `lookupFailuresDemo()`    | Sloppy mode creates an accidental global; strict mode throws a `ReferenceError` instead      |
| 5. Nested event handlers | `nestedHandlersDemo()`    | Click the Red/Blue/Green buttons. Each handler has its own `label`, but they share one count |

---

## Bonus: A Syntax Error Stops Everything

Create a **second**, separate snippet and run it:

```javascript
console.log('Does this line run?')
const broken = .5x
```

Nothing is logged. If JavaScript ran one line at a time, the first line would print before the
engine reached the bad one. Because the engine parses the whole program first, the syntax error is
found before anything executes. This is _Scope & Closures_ Chapter 1's first piece of evidence that
JS is compiled.

---

## Try It Yourself

After running Demo 5, answer these in your own words (good Quiz 5 practice):

1. Draw the three scope "buckets" in `nestedHandlersDemo()`. Which variables go in each?
2. How many copies of scope B exist after the demo runs? How many copies of scope A?
3. What would change if `clickCount` were declared inside `addButton()` instead?
4. Add `'use strict'` as the first line of `lookupFailuresDemo()` and run it again. What changes in
   part B, and why?
