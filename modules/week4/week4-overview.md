## Overview of Week 4: Arrays, Loops, Iteration & Code Organization

Structuring scalable JavaScript applications with classes, modules, and closures—and mastering
collection processing.

Now that we can express logic and make conditional decisions with functions and comparisons (Week
3), we turn to two critical capabilities that allow JavaScript applications to scale beyond small,
monolithic scripts:

1. **How We Organize State & Behavior**: Packaging data and functionality into reusable,
   encapsulated structures using **ES6 Classes**, native **ES Modules**, and **Functional
   Closures**.
2. **How We Process Collections of Data**: Manipulating datasets using arrays, looping constructs,
   the **ES6 Iterator Protocol**, and declarative higher-order methods (`.map()`, `.filter()`,
   `.reduce()`).

Finally, Week 4 marks the official kickoff of our **Final Project** capstone sequence with
**Milestone 1: Project Proposal & API Selection**, due on **Monday, October 19, 2026**.

---

### Part 1: Code Organization in Modern JavaScript

As applications grow, keeping all code in a single global script leads to naming collisions, tight
coupling, and difficult debugging. Modern JavaScript provides three distinct architectural paradigms
for organizing state and behavior:

| Pattern                     | How State is Held                | Data Encapsulation / Privacy                           | Instantiation                        | Best Used For                                          |
| :-------------------------- | :------------------------------- | :----------------------------------------------------- | :----------------------------------- | :----------------------------------------------------- |
| **ES6 Classes**             | Instance properties on `this`    | Public by default; `#field` for private state          | `new ClassName()`                    | Multiple stateful instances modeling domain entities   |
| **Native ES Modules (ESM)** | File-scoped top-level variables  | Module-scoped; only `export`ed members are public      | Loaded via `import` (singletons)     | Structuring application layers, API clients, utilities |
| **Functional Closures**     | Variables in outer lexical scope | True privacy via lexical closure (unreachable outside) | Factory functions (`createFilter()`) | Encapsulating private state without classes or `this`  |

> 💡 **Architectural Parity in Practice**: Run our
> [Week 4 Organization Example App](../../examples/week4-organization/README.md) to inspect three
> complete implementations (`filter-class.js`, `filter-classic-module.js`, and
> `filter-functional-closure.js`) that solve the exact same course-filtering problem using these
> three distinct patterns!

---

### Part 2: Collections, Looping, and the Iterator Protocol

Data-driven web applications constantly transform and filter datasets received from user inputs and
APIs. This week, we examine how JavaScript manages collections under the hood:

- **Array Mutation vs. Copying**: Contrasting in-place mutating operations (`push`, `pop`, `splice`)
  with non-mutating copy operations (`slice`, array spread `[...arr]`). Modern front-end development
  favors non-mutating transformations to keep application state predictable.
- **Looping Mechanisms**: Comparing counting `for` loops, condition-driven `while` loops, and
  iterable-driven `for...of` loops, including how control-flow keywords (`break`, `continue`)
  behave.
- **The ES6 Iterator Protocol**: Exploring how iterables implement `[Symbol.iterator]()` to produce
  an iterator whose `.next()` method returns `{ value, done }`. Understanding why arrays, strings,
  Sets, and Maps are iterable, but plain objects require `Object.keys()` or `Object.entries()`.
- **Higher-Order Array Methods**: Writing clean, declarative data pipelines using `.forEach()`,
  `.filter()`, `.map()`, `.find()`, and `.reduce()`.
- **Live DOM Search**: Connecting array filtering to browser `input` events to re-render DOM views
  dynamically as the user types (the core pattern for this week's programming assignment).

---

### Part 3: Final Project Milestone Schedule & Due Dates

The Final Project capstone accounts for **40% of your total course grade** and fulfills the role of
our final exam. Each deliverable is due on the Monday following its delivery week, with the
exception of the final deliverable during Finals Week:

| Milestone       | Delivery Week               | Due Date                       | Deliverable & Review Schedule                                                                                                                                                                                                                                        |
| :-------------- | :-------------------------- | :----------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Milestone 1** | **Week 4** (starts Oct. 12) | **Monday, Oct. 19** (11:59 PM) | **Project Proposal & API Selection** (`projects/final/README.md`)                                                                                                                                                                                                    |
| **Milestone 2** | **Week 7** (starts Nov. 2)  | **Monday, Nov. 9** (11:59 PM)  | **Design Document & Architecture Plan** (updates to `projects/final/README.md`)                                                                                                                                                                                      |
| **Milestone 3** | **Week 9** (starts Nov. 16) | **Monday, Nov. 23** (11:59 PM) | **Initial Structure & Test Scaffold** (PR with stubbed ES modules & passing tests)                                                                                                                                                                                   |
| **Milestone 4** | **Week 12** (starts Dec. 7) | **Mon 12/7 – Fri 12/11**       | **Final Application Delivery & Walkthrough**:<br>• **Monday, Dec. 7 (11:59 PM)**: Initial PR submitted (live preview running, reviewer tagged)<br>• **Wednesday, Dec. 9**: Instructor initial feedback returned<br>• **Friday, Dec. 11**: Final PR approval required |

---

### Module Objectives

By the end of this module you will be able to:

- Compare three primary design patterns for organizing JavaScript code—**ES6 Classes**, **ES
  Modules**, and **Functional Closures**—and explain how each handles state, instantiation, and data
  privacy.
- Structure JavaScript programs into modular files using native ES module `import` and `export`
  syntax.
- Encapsulate private state using functional closures and factory functions.
- Manipulate arrays using both mutating operations (`push`, `pop`, `splice`) and non-mutating
  copying techniques (`slice`, array spread `[...arr]`).
- Select and implement the appropriate looping mechanism (`for`, `while`, `for...of`, `forEach`)
  based on problem requirements and control-flow needs.
- Explain the ES6 Iterator Protocol (`[Symbol.iterator]()`, `.next()`, `{ value, done }`) and
  describe why it powers `for...of` loops and spread syntax across iterables.
- Transform, filter, and summarize collections declaratively using higher-order array methods
  (`.map()`, `.filter()`, `.find()`, `.reduce()`).
- Build an interactive browser application that filters an array of data and re-renders the DOM in
  real time as the user types.
- Formulate a comprehensive Final Project Proposal (Milestone 1) that defines target audience,
  interactive features, chosen public API, and architectural module plan.

---

### Week 4 Activities & Materials

1. **Reading Assignment**:
   - **Textbook**: _You Don't Know JS Yet: Get Started_ (2nd Edition) — Chapter 2: _Surveying JS_
     (Sections: _How We Organize in JS_, _Arrays_) & Chapter 3: _Digging to the Roots of JS_
     (Section: _Iteration_).
   - Review the [Week 4 Reading Summary](../../weekly-readings/week-04.md).
2. **Concept Lectures**:
   - [Week 4 Lecture 1: Organization in JavaScript](week4-lecture1-organization.md) (Classes,
     Closures, Modules)
   - [Week 4 Lecture 2: Iteration in JavaScript](week4-lecture2-iteration.md) (Arrays, Loops,
     Iterators)
   - [Lecture 1 Guide: Organization in JavaScript](../../lectures/week4-lecture1-organization.md)
   - [Lecture 2 Guide: Iteration in JavaScript](../../lectures/week4-lecture2-iteration.md)
3. **Hands-On Practice & Code Exploration**:
   - Run the [Week 4 Organization Example App](../../examples/week4-organization/README.md) locally
     (`npm run dev` in `examples/week4-organization/`) to compare classes, modules, and closures in
     action.
   - Run the [Week 4 Iteration Snippet](../../examples/week4-iteration.md)
     ([`examples/week4-iteration.js`](../../examples/week4-iteration.js)) in Chrome DevTools to
     trace loops and the iterator protocol.
4. **Assessment — Quiz 4**:
   - Complete [Week 4 Quiz](week4-quiz.md) on Canvas (testing arrays, loops, the iterator protocol,
     higher-order methods, classes, closures, and modules). Due **Monday, October 19, 2026 at 11:59
     PM**.
5. **Programming Assignment — Filterable Item List**:
   - Check out your `main` branch, pull latest changes, create a `week4` branch, and scaffold your
     project with `scripts/mpf.sh week4`.
   - Complete [Week 4 Assignment: Filterable Item List](week4-assignment-filterable-item-list.md),
     verify with `npm run dev` and `npm test`, and submit your PR on GitHub to **artzte**. Due
     **Monday, October 19, 2026 at 11:59 PM**.
6. **Additional Deliverable — Final Project Milestone 1 (Proposal)**:
   - Review the [Final Project Milestone 1 Proposal Guide](week4-assignment-project-proposal.md) and
     the [Free Public APIs Directory](week4-free-apis-for-project.md).
   - Draft your proposal in `projects/final/README.md`, open a PR, and tag **artzte** as a reviewer.
     Due **Monday, October 19, 2026 at 11:59 PM**.
7. **Exam Information & Capstone Overview**:
   - Review the [Week 4 Exam Writeup](week4-exam-writeup.md) to understand how the four staged
     milestones fulfill our final exam requirements, including the Finals Week review and approval
     workflow.

---

### Steps to Complete

1. Read the assigned chapters in _You Don't Know JS Yet: Get Started_ (Chapters 2 and 3) and review
   the reading summary.
2. Review the concept lecture notes and run both the Organization example app and the Iteration
   DevTools snippet.
3. Complete and submit **Quiz 4** by Monday, October 19.
4. Complete the **Week 4 Programming Assignment: Filterable Item List**, verify all features work
   with `npm run dev` and `npm test`, and open your Pull Request by Monday, October 19.
5. Review the curated public APIs directory, select your project concept, write your **Final Project
   Proposal** in `projects/final/README.md`, and submit your PR by Monday, October 19.
6. Read the **Week 4 Exam Writeup** to understand the milestone timeline and Finals Week review
   expectations.

---

### Course Outcomes Supported

This week directly supports all four course outcomes:

- **CO1**: Implement scripts that rely on knowledge of Document Object Model (DOM) architecture and
  includes methods for manipulating DOM objects.
- **CO2**: Construct functions that effectively utilize variables, conditionals, loops, and arrays.
- **CO3**: Generate scripts that process user input and provide meaningful output.
- **CO4**: Plan and create scripts utilizing events and event handlers that respond to user inputs.
