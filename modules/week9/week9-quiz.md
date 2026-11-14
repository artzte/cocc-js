## Week 9 Quiz: Modules and `localStorage`

### Instructions

Answer each of the following five questions in a short essay response. Focus on explaining the
concepts in your own words, and feel free to include examples or personal observations to illustrate
your reasoning.

---

### Question 1: Data Structures vs. Modules

In
[Scope & Closures (2nd Edition), Chapter 8: The Module Pattern](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch8.md),
Kyle Simpson contrasts an ordinary data structure (an object with public properties and methods)
with a true module. What additional requirement turns a stateful grouping of data and functions into
a module?

---

### Question 2: Closure in Classic Modules

Explain how a function on a classic module's public API continues to read and update the module's
private variables even after the outer module function has finished running, as discussed in
[Scope & Closures (2nd Edition), Chapter 8: The Module Pattern](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch8.md).

---

### Question 3: Module Scope vs. Global Scope

As discussed in
[Scope & Closures (2nd Edition), Chapter 8: The Module Pattern](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch8.md),
top-level variables in an ES module file are not global. What scope do they belong to instead?

---

### Question 4: Named Exports vs. Default Exports

As discussed in
[Scope & Closures (2nd Edition), Chapter 8: The Module Pattern](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch8.md),
what does a **default export** give the code that imports it, compared with a **named export**?

---

### Question 5: Decoupling Modules with `registerOnChange`

In this week's Task List assignment, tasks are saved to `localStorage` every time they change, but
`TaskList` doesn't import anything from your storage module. Explain how
`registerOnChange(callback)` makes that possible.
