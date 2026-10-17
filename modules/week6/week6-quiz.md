## Week 6 Quiz: Scope Chain, Global Scope, and Variable Lifecycle

### Instructions

Answer each of the following five questions in a short essay response. Focus on explaining the
concepts in your own words, and feel free to include examples or personal observations to illustrate
your reasoning.

---

### Question 1: The Scope Chain and Shadowing

Explain what the scope chain is and how the engine uses it to resolve a variable name. Then explain
**shadowing**: what it is, and why the following code prints `0` instead of `10`.

```javascript
let total = 0

function addPoints(total, points) {
  total = total + points
}

addPoints(total, 10)
console.log(total)
```

How would you change the code so that it updates the outer `total`?

---

### Question 2: The Global Scope in the Browser

In a browser, several things end up in the global scope: top-level `var` and function declarations
from classic `<script>` files, top-level `let` and `const`, and even DOM elements that have an `id`.
Explain how `window` and `globalThis` relate to the global scope, and describe at least two reasons
why putting your own variables in the global scope is risky. How do ES modules change this?

---

### Question 3: Hoisting Rules

Function declarations, `var`, `let`, and `const` are all "hoisted," but they behave differently if
you use them before the line where they're declared. For each one, describe what happens. Then
predict the output (or error) of this code and explain why:

```javascript
console.log(describe('Ada'))
console.log(level)
var level = 'beginner'

function describe(name) {
  return `${name} is a ${level}`
}
```

---

### Question 4: The Temporal Dead Zone

What is the Temporal Dead Zone, and what error do you get when your code touches a variable inside
it?
[Scope & Closures (2nd Edition), Chapter 5: The (Not So) Secret Lifecycle of Variables](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch5.md)
says the TDZ is about **time**, not **position**. Explain what that means, using an example where a
function written _below_ a `let` declaration still triggers a TDZ error. Why is a TDZ error more
helpful than getting `undefined`?

---

### Question 5: The `var`-in-a-Loop Bug

In this week's Scoreboard assignment, you attached click handlers to buttons inside a `for` loop,
first using `var i` and then `let i`. Describe what went wrong with `var`, and explain why switching
to `let` fixes it. Your answer should explain how many `i` variables exist in each version, and what
value each click handler sees when it finally runs.
