## Week 7 Quiz: Closures, Least Exposure, and Event Delegation

### Instructions

Answer each of the following five questions in a short essay response. Focus on explaining the
concepts in your own words, and feel free to include examples or personal observations to illustrate
your reasoning.

---

### Question 1: The Principle of Least Exposure (POLE)

In
[Scope & Closures (2nd Edition), Chapter 6: Limiting Scope Exposure](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch6.md),
Kyle Simpson introduces the **Principle of Least Exposure (POLE)**. Explain what POLE means and
describe one of the three main problems that happen when variables are left exposed in broader
scopes than necessary.

---

### Question 2: Closure as a Live Link

Define **closure** in your own words, based on
[Scope & Closures (2nd Edition), Chapter 7: Using Closures](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md).
Be sure to include the concept of the **live link** to closure-scoped variables, as discussed in the
text.

---

### Question 3: Factory Functions and Encapsulated State

Explain how a **factory function** (like `createThemeSwitcher(themes)` from this week's assignment)
uses closure to create private state. If someone using your switcher runs
`switcher.currentIndex = 999` from outside the function, why doesn't that break
`switcher.getCurrentIndex()` or `switcher.next()`?

---

### Question 4: Closures vs. Classes

Both factory functions (using closures) and ES6 classes package state and behavior together, as
compared at the end of
[Scope & Closures (2nd Edition), Chapter 7: Using Closures](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md).
Compare the two approaches across **state privacy**, **`this` binding when passing methods as
callbacks**, and **memory usage when creating many instances**.

---

### Question 5: Event Delegation vs. Per-Button Listeners in `render()`

In Week 6's Scoreboard, we attached click listeners to every button inside a `for` loop each time
`render()` updated `app.innerHTML`. In Week 7's side lecture and Theme Switcher assignment, we
switched to **event delegation** with a single click listener on `#app` and `data-*` attributes
(`button.dataset`). Explain how event bubbling makes this work, why the `#app` listener continues to
work after `app.innerHTML` replaces all the buttons, and how `data-*` attributes replace the loop
index variable `i`.
