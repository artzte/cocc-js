## Overview of Week 7: Closures

How functions remember their birth scope, how to keep application state truly private, and how to
handle DOM events cleanly with event delegation.

Over the past two weeks, we built our mental model of lexical scope:

- **Week 5**: Scopes are nested buckets fixed at compile time by where code is written, and variable
  lookup walks outward to the first match.
- **Week 6**: The scope chain links nested scopes outward to the global scope, variables can shadow
  outer names, and `let` in a loop creates a fresh binding on each iteration.

This week we reach the culmination of the scope unit: **closure**. Closure is one of the most
important ideas in JavaScript. Every stateful callback, event handler, factory function, and module
pattern relies on it. Alongside our textbook reading on limiting scope exposure and closures, we
also add a practical side lecture on **event delegation**—showing how to replace the per-button
`for` loop from Week 6's `render()` function with a single container-level event listener and
`data-*` attributes.

---

### Part 1: Limiting Scope Exposure (POLE)

- **The Principle of Least Exposure**: Why exposing variables in outer scopes leads to naming
  collisions, accidental mutation, and tight coupling.
- **Hiding State in Functions and Blocks**: Using function scopes and `{ }` blocks with `let` and
  `const` to keep helper variables private.

### Part 2: Closures and Factory Functions

- **What a Closure Is**: A function that retains live access to variables from its enclosing lexical
  scope even after that outer scope has returned.
- **Factory Functions**: Returning an object of methods (`next`, `prev`, `select`, `reset`) that all
  share private state inside a closure.
- **Closure Lifecycle & Closure vs. Class**: How closures interact with garbage collection, and how
  closure-based encapsulation compares with `class` instances.

### Part 3: Side Lecture — Efficient Event Handling with Event Delegation

- **Why Re-Wiring Listeners in `render()` Hurts Simplicity**: Every `app.innerHTML = ...` call
  destroys the old DOM buttons and forces per-button listeners to be recreated.
- **Event Bubbling + `data-*` Attributes**: Attaching **one** click listener to the persistent
  `#app` container and using `button.dataset` (`data-action`, `data-index`) to index into state.

---

### Module Objectives

By the end of this module you will be able to:

- Explain the Principle of Least Exposure (POLE) and hide variables inside function and block
  scopes.
- Define closure, identify closures in code, and trace how multiple calls to an outer function
  create independent closed-over state.
- Build a factory function that encapsulates private state and exposes a clean public API of
  methods.
- Compare closures and classes across state privacy, `this` binding safety, and memory lifecycle.
- Refactor per-button event listeners inside `render()` into a single delegated listener on a
  container element using `data-*` attributes (`dataset`).
- Dynamically update CSS custom properties (`--color-*`) on `document.documentElement` to switch
  application color themes.

---

### Week 7 Activities & Materials

1. **Reading Assignment**:
   - **Textbook**:
     [Scope & Closures (2nd Edition), Chapter 6: Limiting Scope Exposure](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch6.md)
     and
     [Scope & Closures (2nd Edition), Chapter 7: Using Closures](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md).
   - Review the [Week 7 Reading Summary](../../weekly-readings/week-07.md).
2. **Concept Lecture & Side Lecture**:
   - [Week 7 Lecture: Limiting Scope Exposure and Closures](week7-lecture-closures.md)
   - [Week 7 Side Lecture: Efficient Event Handling with Event Delegation](week7-event-delegation.md)
   - [Lecture Guide: Limiting Scope Exposure and Closures](../../lectures/week7-closures.md)
   - [Side Lecture Guide: Event Delegation](../../lectures/week7-event-delegation.md)
3. **Hands-On Practice & Code Exploration**:
   - Run the [Week 7 Closures DevTools Snippet](../../examples/week7-closures.md)
     ([`examples/week7-closures.js`](../../examples/week7-closures.js)) in Chrome DevTools and solve
     the Debug Challenge.
   - Inspect the refactored Week 6 Scoreboard using event delegation in
     [`examples/week7-event-delegation-scoreboard.js`](../../examples/week7-event-delegation-scoreboard.js)
     and the community color themes dataset in
     [`examples/week7-themes.js`](../../examples/week7-themes.js).
4. **Assessment — Quiz 7**:
   - Complete [Week 7 Quiz](week7-quiz.md) on Canvas (covering POLE, closure behavior, factory
     functions, closure vs. class tradeoffs, and event delegation). Due **Monday, November 9, 2026
     at 11:59 PM**.
5. **Programming Assignment — Color Theme Switcher**:
   - Check out your `main` branch, pull latest changes, create a `week7` branch, and scaffold your
     project with `scripts/mpf.sh week7`.
   - Complete [Week 7 Assignment: Color Theme Switcher](week7-assignment-theme-switcher.md), verify
     with `npm start` and `npm test`, and submit your PR on GitHub to **artzte**. Due **Monday,
     November 9, 2026 at 11:59 PM**.
6. **Final Project Milestone 2 — Design Document**:
   - Complete [Final Project Milestone 2: Design Document](week7-assignment-design-document.md) by
     updating `projects/final/README.md` on a `final-project-design` branch and submitting your PR
     link on Canvas. Due **Monday, November 9, 2026 at 11:59 PM**.

---

### Steps to Complete

1. Read
   [Scope & Closures (2nd Edition), Chapter 6: Limiting Scope Exposure](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch6.md)
   and
   [Scope & Closures (2nd Edition), Chapter 7: Using Closures](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md),
   and review the reading summary.
2. Review the **Closures** lecture and the **Event Delegation** side lecture, and run the Week 7
   DevTools snippet.
3. Complete and submit **Quiz 7** by Monday, November 9.
4. Complete the **Week 7 Programming Assignment: Color Theme Switcher**, verify with `npm start`,
   `npm test`, and `npm run lint`, and open your Pull Request by Monday, November 9.
5. Complete **Final Project Milestone 2: Design Document** (`projects/final/README.md`) and submit
   your Pull Request by Monday, November 9.

---

### Course Outcomes Supported

This week directly supports the following course outcomes:

- **CO1**: Implement scripts that rely on knowledge of Document Object Model (DOM) architecture and
  includes methods for manipulating DOM objects.
- **CO2**: Construct functions that effectively utilize variables, conditionals, loops, and arrays.
- **CO3**: Generate scripts that process user input and provide meaningful output.
- **CO4**: Plan and create scripts utilizing events and event handlers that respond to user inputs.
