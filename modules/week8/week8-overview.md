## Overview of Week 8: Classes and Object-Oriented Programming

How to bundle data and behavior together with ES6 `class`, how `this` is decided each time a
function is called, and how one class can build on another with `extends` and `super`.

Last week we used closures and factory functions to keep state private behind a set of methods. At
the end of the Week 7 lecture we compared that approach with classes. This week we study classes
directly:

- **Classes** describe a kind of object: the data each instance holds and the methods that work on
  that data. `new` creates an instance.
- **`this`** isn't fixed when a function is written. It's decided by _how_ the function is called,
  and that's what makes one shared method work for every instance.
- **Inheritance** lets a child class (`Card`) reuse and override behavior from a parent class
  (`Component`).

Underneath, classes are built on JavaScript's **prototype** system. We'll look at that just enough
to recognize it; we won't go deep.

---

### Part 1: Class Syntax

- **`constructor`, instance properties, and methods**: What goes on `this`, and what goes in the
  class body.
- **`static` members**: Methods and properties that belong to the class itself, such as
  `TaskList.isValidText(text)`.

### Part 2: `this`

- **`this` depends on the call**: Method call (`obj.method()`), plain call (`fn()`), and explicit
  call (`fn.call(obj)`).
- **Losing `this` in a callback**: Why `addEventListener('click', this.handleClick)` breaks, and how
  an arrow function fixes it.

### Part 3: Inheritance, Privacy, and Prototypes

- **`extends`, `super()`, and overriding**: Building `Card` and `List` components on a shared
  `Component` base class.
- **Classes vs. closures vs. plain objects**: Choosing the right tool.
- **Private fields and getters**: `#done` can't be touched from outside the class; `get done()` lets
  outside code read it. `toJSON()` and `static fromJSON()` turn an instance into plain data and
  back.
- **Prototypes (awareness only)**: Methods live once on the class's prototype and are shared by
  every instance.

---

### Module Objectives

By the end of this module you will be able to:

- Define a class with a `constructor`, instance properties, instance methods, and `static` members.
- Create instances with `new` and explain how each instance holds its own data.
- Explain how the way a function is called determines `this`, and fix a lost `this` in an event
  listener.
- Use `extends` and `super` to create a child class that overrides a parent method.
- Keep instance data private with `#` fields, expose it with getters, and convert an instance to and
  from JSON with `toJSON()` and `static fromJSON()`.
- Describe, at a high level, how classes share methods through the prototype chain.
- Build a small DOM app from two cooperating classes with one delegated click listener.

---

### Week 8 Activities & Materials

1. **Reading Assignment**:
   - **Textbook**:
     - [Get Started (2nd Edition), Chapter 2: Surveying JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch2.md):
       the "Classes" and "Class Inheritance" sections under "How We Organize in JS".
     - [Get Started (2nd Edition), Chapter 3: Digging to the Roots of JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch3.md):
       the "`this` Keyword" and "Prototypes" sections.
     - Optional:
       [Get Started (2nd Edition), Chapter 4: The Bigger Picture](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch4.md),
       "Pillar 2: Prototypes".
   - Review the [Week 8 Reading Summary](../../weekly-readings/week-08.md).
2. **Lecture**:
   - [Week 8 Lecture: Classes and Object-Oriented Programming](week8-lecture-classes.md)
   - [Lecture Guide: Classes and Object-Oriented Programming](../../lectures/week8-classes.md)
3. **Hands-On Practice & Code Exploration**:
   - Run the [Week 8 Classes DevTools Snippet](../../examples/week8-classes.md)
     ([`examples/week8-classes.js`](../../examples/week8-classes.js)) in Chrome DevTools and solve
     the Debug Challenge.
4. **Assessment — Quiz 8**:
   - Complete [Week 8 Quiz](week8-quiz.md) on Canvas (covering classes and instances, `this`,
     `extends`/`super`, and static members). Due **Monday, November 16, 2026 at 11:59 PM**.
5. **Programming Assignment — Task List with Classes**:
   - Check out your `main` branch, pull latest changes, create a `week8` branch, and scaffold your
     project with `scripts/mpf.sh week8`.
   - Complete [Week 8 Assignment: Task List with Classes](week8-assignment-task-list.md), verify
     with `npm start` and `npm test`, and submit your PR on GitHub to **artzte**. Due **Monday,
     November 16, 2026 at 11:59 PM**.

---

### Steps to Complete

1. Read the assigned sections of
   [Get Started (2nd Edition), Chapter 2: Surveying JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch2.md)
   and
   [Get Started (2nd Edition), Chapter 3: Digging to the Roots of JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch3.md),
   and review the reading summary.
2. Review the **Classes** lecture and run the Week 8 DevTools snippet.
3. Complete and submit **Quiz 8** by Monday, November 16.
4. Complete the **Week 8 Programming Assignment: Task List with Classes**, verify with `npm start`,
   `npm test`, and `npm run lint`, and open your Pull Request by Monday, November 16.

**Looking ahead**: Final Project Milestone 3 (Initial Structure) comes in Week 9. If you got
feedback on your Milestone 2 design document, now is a good time to update your planned class.

---

### Course Outcomes Supported

This week directly supports the following course outcomes:

- **CO1**: Implement scripts that rely on knowledge of Document Object Model (DOM) architecture and
  includes methods for manipulating DOM objects.
- **CO2**: Construct functions that effectively utilize variables, conditionals, loops, and arrays.
- **CO3**: Generate scripts that process user input and provide meaningful output.
- **CO4**: Plan and create scripts utilizing events and event handlers that respond to user inputs.
