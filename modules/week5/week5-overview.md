## Overview of Week 5: Lexical Scope

How JavaScript decides where a variable lives, and how it finds it again.

For four weeks we've surveyed the language: values and types (Week 2), functions and comparisons
(Week 3), and collections, iteration, and code organization (Week 4). Starting this week, we go
deeper. Kyle Simpson describes JavaScript as resting on three pillars: **scope and closure**,
**prototypes**, and **types and coercion**. The next three weeks are about the first pillar, and it
is the one that every other part of the course builds on.

This week we learn the **lexical scope** model. We'll see that JavaScript compiles a whole program
before running any of it, and that this compile step fixes every variable's scope based on where you
wrote it. We'll picture scopes as nested buckets, follow the engine as it looks variables up from
the inside out, and see what happens when a lookup fails. Then we'll apply the model to a real
problem: a page where two scripts share the global scope and quietly break each other.

> ⚠️ **Pacing note**: Weeks 5–7 are the hardest conceptual stretch of the course. Read the chapters
> slowly, run the demos, and draw the scope buckets on paper. It's normal for this to take more than
> one pass.

---

### Part 1: How the Engine Reads Your Code

- **The Bigger Picture**:
  [Get Started (2nd Edition), Chapter 4: The Bigger Picture](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch4.md)
  previews the three pillars and explains why the rest of the course is organized around them.
- **Compile First, Then Execute**: Syntax errors, early errors, and hoisting all show that the
  engine processes the whole program before running it.
- **Targets and Sources**: Every variable reference either receives a value (target) or supplies one
  (source). The difference matters when a lookup fails.

### Part 2: Nested Scope and Lookup

- **Scope Buckets**: The global scope, each function, and each block (for `let` and `const`) is its
  own bucket. Buckets nest based on where the code is written.
- **Outward-Only Lookup**: The engine checks the current scope first, then each enclosing scope,
  stopping at the first match. It never looks inward.
- **Lookup Failures**: An unknown source throws a `ReferenceError`. An unknown target in sloppy mode
  silently creates an accidental global. Strict mode, which ES modules turn on automatically, throws
  instead.

### Part 3: Scope in the Browser

- **Nested Event Handlers**: Tracing which variables a click handler can see, and why every button
  gets its own copy of some variables but shares others.
- **The Global Mess**: A two-widget page whose scripts collide on function names, share variables,
  and leak accidental globals. You'll fix it in this week's assignment.

---

### Module Objectives

By the end of this module you will be able to:

- Explain the evidence that JavaScript compiles a program before executing it, and why that matters
  for scope.
- Classify variable references in a piece of code as **targets** or **sources**.
- Identify the scopes in a program (global, module, function, block) and list the variables declared
  in each.
- Describe step by step how the engine resolves a variable name by looking outward through nested
  scopes.
- Explain how accidental globals are created in sloppy mode, and how strict mode and ES modules
  prevent them.
- Trace which variables are visible to nested event handler functions.
- Refactor code that relies on global variables into properly scoped, testable ES module functions.

---

### Week 5 Activities & Materials

1. **Reading Assignment**:
   - **Textbook**:
     [Scope & Closures (2nd Edition), Chapter 1: What's the Scope?](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch1.md)
     and
     [Scope & Closures (2nd Edition), Chapter 2: Illustrating Lexical Scope](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch2.md).
   - **Bridge reading**:
     [Get Started (2nd Edition), Chapter 4: The Bigger Picture](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch4.md).
     Read this first as an introduction to the scope unit.
   - Review the [Week 5 Reading Summary](../../weekly-readings/week-05.md).
2. **Concept Lecture**:
   - [Week 5 Lecture: Lexical Scope](week5-lecture.md)
   - [Lecture Guide: Lexical Scope](../../lectures/week5-lexical-scope.md)
3. **Hands-On Practice & Code Exploration**:
   - Run the [Week 5 Lexical Scope Snippet](../../examples/week5-lexical-scope.md)
     ([`examples/week5-lexical-scope.js`](../../examples/week5-lexical-scope.js)) in Chrome
     DevTools. Demo 5 adds buttons to the page; click them and trace which variables each handler
     can see.
   - Open [`examples/week5-global-mess/index.html`](../../examples/week5-global-mess/index.html) in
     Chrome and try both widgets.
4. **Assessment — Quiz 5**:
   - Complete [Week 5 Quiz](week5-quiz.md) on Canvas (testing the two-phase model, targets and
     sources, scope nesting, and variable lookup). Due **Monday, October 26, 2026 at 11:59 PM**.
5. **Programming Assignment — Scope Refactor**:
   - Check out your `main` branch, pull latest changes, create a `week5` branch, and scaffold your
     project with `scripts/mpf.sh week5`.
   - Complete [Week 5 Assignment: Scope Refactor](week5-assignment-scope-refactor.md), verify with
     `npm start` and `npm test`, and submit your PR on GitHub to **artzte**. Due **Monday, October
     26, 2026 at 11:59 PM**.

---

### Steps to Complete

1. Read
   [Get Started (2nd Edition), Chapter 4: The Bigger Picture](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch4.md),
   then
   [Scope & Closures (2nd Edition), Chapter 1: What's the Scope?](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch1.md)
   and
   [Scope & Closures (2nd Edition), Chapter 2: Illustrating Lexical Scope](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch2.md),
   and review the reading summary.
2. Review the lecture notes and run the Lexical Scope DevTools snippet.
3. Complete and submit **Quiz 5** by Monday, October 26.
4. Complete the **Week 5 Programming Assignment: Scope Refactor**, verify both widgets with
   `npm start` and your tests with `npm test`, write your scope report, and open your Pull Request
   by Monday, October 26.

---

### Course Outcomes Supported

This week directly supports the following course outcomes:

- **CO2**: Construct functions that effectively utilize variables, conditionals, loops, and arrays.
- **CO3**: Generate scripts that process user input and provide meaningful output.
- **CO4**: Plan and create scripts utilizing events and event handlers that respond to user inputs.
