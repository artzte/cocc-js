## Overview of Week 4: Arrays, Loops, and Iteration

Collections, repetition, and structuring real-world JavaScript applications.

Now that we can express logic and make conditional decisions with functions and comparisons (Week
3), we turn to two critical capabilities that allow JavaScript programs to scale: **how we organize
state and behavior** into reusable structures (classes, closures, and modules), and **how we process
collections of data** using arrays, loops, the iterator protocol, and higher-order methods.

In this module, we examine how modern JavaScript structures collections of data, contrasts mutating
methods (`push`, `splice`) with non-mutating copy operations (`slice`, spread `...`), and unpacks
the ES6 Iterator Protocol (`[Symbol.iterator]()`, `.next()`, `{ value, done }`) that powers modern
constructs like `for...of` loops. We also explore declarative array transformations using `.map()`,
`.filter()`, and `.reduce()`, and connect these concepts directly to the browser by building a live,
filterable DOM search interface.

Finally, Week 4 (starting October 12) marks the official launch of our **Final Project** sequence.
As outlined in the course syllabus, the Final Project serves as the comprehensive final exam for
CIS-133JS. This week includes an additional deliverable: **Milestone 1 (The Project Proposal)**, due
on **Monday, October 19** (the Monday following Week 4), accompanied by a curated directory of
vetted public APIs.

---

### Module Objectives

By the end of this module you will be able to:

- Manipulate arrays using both mutating operations (`push`, `pop`, `splice`) and non-mutating
  copying techniques (`slice`, array spread `[...arr]`).
- Select and implement the appropriate looping mechanism (`for`, `while`, `for...of`, `forEach`)
  based on the problem requirements and control-flow needs (`break`/`continue`).
- Explain the ES6 Iterator Protocol (`[Symbol.iterator]()`, `.next()`, `{ value, done }`) and
  describe why it enables iteration across arrays, strings, Sets, and Maps, but not plain objects.
- Transform, filter, and summarize collections declaratively using higher-order array methods
  (`.map()`, `.filter()`, `.find()`, `.reduce()`).
- Build a responsive search interface in the browser that filters an array of data and re-renders
  the DOM in real time as the user types.
- Compare three primary design patterns for organizing JavaScript code—ES6 Classes, ES Modules, and
  Functional Closures—and explain how each handles data privacy and encapsulation.
- Formulate a comprehensive Final Project Proposal (Milestone 1) that identifies a target audience,
  defines core interactive features, and integrates a verified public API.

---

### Week 4 Activities & Materials

1. **Reading Assignment**:
   - **Textbook**: _You Don't Know JS Yet: Get Started_ (2nd Edition) — Chapter 2: _Surveying JS_
     (Sections: _How We Organize in JS_, _Arrays_) & Chapter 3: _Digging to the Roots of JS_
     (Section: _Iteration_).
   - Review the [Week 4 Reading Summary](../../weekly-readings/week-04.md).
2. **Concept Lectures**:
   - [Week 4 Lecture 1: Organization in JavaScript](week4-lecture1-organization.md)
   - [Week 4 Lecture 2: Iteration in JavaScript](week4-lecture2-iteration.md)
   - [Lecture 1 Guide: Organization in JavaScript](../../lectures/week4-lecture1-organization.md)
   - [Lecture 2 Guide: Iteration in JavaScript](../../lectures/week4-lecture2-iteration.md)
3. **Hands-On Practice & Code Exploration**:
   - Run the [Week 4 Organization Example App](../../examples/week4-organization/README.md) locally
     (`npm run dev` in `examples/week4-organization/`) to see classes, modules, and closures solve
     the same problem.
   - Run the [Week 4 Iteration Snippet](../../examples/week4-iteration.md)
     ([`examples/week4-iteration.js`](../../examples/week4-iteration.js)) inside the Chrome DevTools
     Snippets panel.
4. **Assessment — Quiz 4**:
   - Complete [Week 4 Quiz](week4-quiz.md) on Canvas, testing comprehension of array methods, loop
     constructs, the iterator protocol, higher-order functions, and code organization patterns.
5. **Programming Assignment — Filterable Item List**:
   - Create your `week4` branch and scaffold your project workspace using `scripts/mpf.sh week4`.
   - Complete [Week 4 Assignment: Filterable Item List](week4-assignment-filterable-item-list.md),
     verify your solution with `npm run dev` and `npm test`, and submit your pull request on GitHub
     to **artzte** by **Monday, October 19 at 11:59 PM**.
6. **Additional Deliverable — Final Project Milestone 1 (Proposal)**:
   - Review the [Final Project Milestone 1 Proposal Guide](week4-assignment-project-proposal.md) and
     the curated list of public APIs.
   - Draft your project proposal in `projects/final/README.md`, commit it to a feature branch, and
     submit your pull request on GitHub to **artzte** by **Monday, October 19 at 11:59 PM**.

---

### Steps to Complete

1. Read the assigned chapters in _You Don't Know JS Yet: Get Started_ (Chapters 2 and 3) and review
   the reading summary.
2. Review the concept lecture notes and run the DevTools iteration snippet and organization demo.
3. Complete and submit **Quiz 4**.
4. Complete the **Week 4 Programming Assignment: Filterable Item List**, verify everything works
   with `npm run dev` and `npm test`, and open your Pull Request.
5. Review the recommended public APIs, select your project concept, write your **Final Project
   Proposal** in `projects/final/README.md`, and submit your PR on GitHub by **Monday, October 19**.
6. Read the **Exam Writeup** to ensure you understand the milestone progression toward Finals Week.

---

### Course Outcomes Supported

This week directly supports all four course outcomes:

- **CO1**: Implement scripts that rely on knowledge of Document Object Model (DOM) architecture and
  includes methods for manipulating DOM objects.
- **CO2**: Construct functions that effectively utilize variables, conditionals, loops, and arrays.
- **CO3**: Generate scripts that process user input and provide meaningful output.
- **CO4**: Plan and create scripts utilizing events and event handlers that respond to user inputs.
