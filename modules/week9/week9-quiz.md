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

Explain how an exported function on a classic module's public API continues to read and update the
module's private variables even after the outer module function has finished running, as discussed
in
[Scope & Closures (2nd Edition), Chapter 8: The Module Pattern](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch8.md).

---

### Question 3: Module Scope vs. Global Scope

In an ES module file, what happens to top-level variables and helper functions that are not marked
with `export`, and how does that differ from declaring top-level variables in a classic non-module
script?

---

### Question 4: Named Exports vs. Default Exports

Compare a **named export** (`export function save() {}`) with a **default export**
(`export default function save() {}`) in ES modules, as discussed in
[Scope & Closures (2nd Edition), Chapter 8: The Module Pattern](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch8.md),
and show how the `import` statement differs for each.

---

### Question 5: Decoupling Modules with `registerOnChange`

In this week's Task List assignment, `TaskList` has a `registerOnChange(callback)` method instead of
importing `save()` directly from the storage module. How does passing `save` as a callback function
keep your modules decoupled?
