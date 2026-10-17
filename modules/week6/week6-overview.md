## Overview of Week 6: Scope Chain, Global Scope, and Variable Lifecycle

Where scopes connect, what "global" really means, and when a variable becomes usable.

Last week (Week 5) we learned the lexical scope model: scopes are nested buckets, fixed at compile
time by where you write your code, and the engine looks variables up from the inside out. This week
we finish the scope model by answering three follow-up questions:

1. **What happens when scopes use the same name?** The **scope chain** links nested scopes together,
   and an inner variable can **shadow** an outer one.
2. **What is the global scope, really?** In the browser it's tied to `window`, shared by every
   classic script, and crowded with browser-defined names and DOM `id`s. ES modules, Node, and Web
   Workers each handle it differently, and `globalThis` works everywhere.
3. **When can I use a variable?** **Hoisting** registers every declaration at the start of its
   scope, but functions, `var`, and `let`/`const` start out with very different values. The
   **Temporal Dead Zone** protects `let` and `const`, and loops create a new `let` variable on every
   iteration.

Next week (Week 7) builds directly on all of this when we study closures.

---

### Part 1: The Scope Chain and Shadowing

- **The Scope Chain**: The one-way path from the current scope outward to the global scope. Lookup
  stops at the first match.
- **Shadowing**: An inner declaration that reuses an outer name hides the outer variable for all
  code inside it. It's legal, and it's a common source of "I changed it but nothing happened" bugs.
- **Illegal Shadowing and Function Name Scope**: The one combination the compiler rejects, and where
  the names of named function expressions live.

### Part 2: The Global Scope

- **Browser Globals**: Top-level `var` and function declarations in classic scripts become
  properties of `window`; `let` and `const` globals don't. Elements with an `id` show up as globals
  too.
- **Global Pollution**: Why sharing one global scope across scripts leads to collisions (you saw
  this firsthand in the Week 5 Global Mess).
- **Other Environments**: ES modules, Node, Web Workers, and `globalThis`.

### Part 3: The Lifecycle of Variables

- **Hoisting**: Function declarations are ready immediately; `var` starts as `undefined`; `let` and
  `const` start uninitialized.
- **The Temporal Dead Zone**: Reading a `let` or `const` before its declaration runs throws a
  `ReferenceError`. The TDZ is about time, not position.
- **Re-declaration, `const`, and Loops**: Why `var` gives a loop one shared variable, why `let`
  gives each iteration its own, and why that matters for event handlers created in a loop.

---

### Module Objectives

By the end of this module you will be able to:

- Trace the scope chain from any point in a program outward to the global scope, and predict which
  declaration a name resolves to.
- Recognize variable shadowing, explain its effects, and avoid shadowing bugs.
- Describe what the global scope is in a browser, how `window` and `globalThis` relate to it, and
  why global variables are risky.
- Explain how ES modules, Node, and Web Workers change the meaning of "top-level" code.
- State the hoisting behavior of function declarations, `var`, `let`, and `const`, and predict the
  result of using each before its declaration.
- Explain the Temporal Dead Zone, identify the error it produces, and write code that avoids it.
- Demonstrate and fix the `var`-in-a-loop bug in event handler code using `let`.
- Build a browser application in which multiple functions share state through the scope chain.

---

### Week 6 Activities & Materials

1. **Reading Assignment**:
   - **Textbook**:
     [Scope & Closures (2nd Edition), Chapter 3: The Scope Chain](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch3.md),
     [Scope & Closures (2nd Edition), Chapter 4: Around the Global Scope](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch4.md),
     and
     [Scope & Closures (2nd Edition), Chapter 5: The (Not So) Secret Lifecycle of Variables](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch5.md).
   - Review the [Week 6 Reading Summary](../../weekly-readings/week-06.md).
2. **Concept Lectures**:
   - [Week 6 Lecture 1: The Scope Chain and the Global Scope](week6-lecture1-scope-chain-global.md)
   - [Week 6 Lecture 2: The Lifecycle of Variables](week6-lecture2-variable-lifecycle.md)
   - [Lecture 1 Guide: The Scope Chain and the Global Scope](../../lectures/week6-lecture1-scope-chain-global.md)
   - [Lecture 2 Guide: The Lifecycle of Variables](../../lectures/week6-lecture2-variable-lifecycle.md)
3. **Hands-On Practice & Code Exploration**:
   - Run the [Week 6 DevTools Snippet](../../examples/week6-scope-chain-lifecycle.md)
     ([`examples/week6-scope-chain-lifecycle.js`](../../examples/week6-scope-chain-lifecycle.js)) in
     Chrome DevTools.
   - Solve the **Debug Challenge** at the end of the snippet: fix a function where hoisting and
     shadowing combine to print `undefined`, without changing its intended output.
4. **Assessment — Quiz 6**:
   - Complete [Week 6 Quiz](week6-quiz.md) on Canvas (testing the scope chain, shadowing, hoisting
     rules, the TDZ, and the global scope in the browser). Due **Monday, November 2, 2026 at 11:59
     PM**.
5. **Programming Assignment — Scoreboard**:
   - Check out your `main` branch, pull latest changes, create a `week6` branch, and scaffold your
     project with `scripts/mpf.sh week6`.
   - Complete [Week 6 Assignment: Scoreboard](week6-assignment-scoreboard.md), verify with
     `npm start` and `npm test`, and submit your PR on GitHub to **artzte**. Due **Monday, November
     2, 2026 at 11:59 PM**.
6. **Looking Ahead — Final Project Milestone 2 (Design Document)**:
   - Milestone 2 is assigned in Week 7 and due **Monday, November 9, 2026**. It asks for UI
     wireframes, a data model, a module plan, and your API endpoints. Start sketching now.

---

### Steps to Complete

1. Read
   [Scope & Closures (2nd Edition), Chapter 3: The Scope Chain](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch3.md),
   [Scope & Closures (2nd Edition), Chapter 4: Around the Global Scope](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch4.md),
   and
   [Scope & Closures (2nd Edition), Chapter 5: The (Not So) Secret Lifecycle of Variables](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch5.md),
   and review the reading summary.
2. Review both lectures' notes, run the Week 6 DevTools snippet, and solve the Debug Challenge.
3. Complete and submit **Quiz 6** by Monday, November 2.
4. Complete the **Week 6 Programming Assignment: Scoreboard**, including the `var` bug commit and
   the `let` fix commit, verify with `npm start` and `npm test`, and open your Pull Request by
   Monday, November 2.

---

### Course Outcomes Supported

This week directly supports the following course outcomes:

- **CO1**: Implement scripts that rely on knowledge of Document Object Model (DOM) architecture and
  includes methods for manipulating DOM objects.
- **CO2**: Construct functions that effectively utilize variables, conditionals, loops, and arrays.
- **CO4**: Plan and create scripts utilizing events and event handlers that respond to user inputs.
