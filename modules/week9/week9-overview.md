## Overview of Week 9: Modules and `localStorage`

How to organize a program into self-contained modules with clear public APIs, how ES Modules
(`export` and `import`) work in the browser and Vite, and how to persist application state across
page reloads with `localStorage`.

In Weeks 5–7 we studied lexical scope, the Principle of Least Exposure (POLE), and closures. In Week
8 we built a Task List with `Task` and `TaskList` classes inside a single `src/app.js` file. This
week we bring those ideas together:

- **The Module Pattern** uses scope and closure to hide private state and helper functions while
  exposing only a deliberate public API.
- **ES Modules (ESM)** make every `.js` file its own private module scope. Nothing leaks to the
  global scope, and files share code explicitly with `export` and `import`.
- **`localStorage`** lets a storage module save tasks as JSON and rebuild `Task` instances when the
  page loads again.

Because you are also setting up your **Final Project Test Deployment** this week, the weekly
programming assignment is intentionally lightweight (about a 1-hour exercise): splitting your Week 8
Task List into separate modules and adding `localStorage` persistence.

---

### Part 1: Encapsulation and Classic Modules

- **Namespaces vs. data structures vs. modules**: Why grouping functions (`Utils`) or grouping
  public data and methods falls short of a true module.
- **Classic modules**: Singleton IIFEs and module factories that keep state private in lexical scope
  and expose functions that close over it.

### Part 2: File-Based Modules (CommonJS & ES Modules)

- **CommonJS (`module.exports` / `require`)**: Recognizing Node's file-based module syntax.
- **ES Modules (`export` / `import`)**: Named vs. default exports, `import` variations, strict mode
  by default, and why an ES module is a singleton.
- **Vite dev vs. build**: How Vite serves native ESM during `npm start` and bundles modules during
  `npm run build`.

### Part 3: Persisting State with `localStorage`

- **`localStorage.setItem()` and `localStorage.getItem()`**: Storing and reading JSON strings by
  key.
- **Round-tripping class instances**: Using `JSON.stringify(tasks)` (which calls `task.toJSON()`) to
  save, and `JSON.parse(raw).map((item) => Task.fromJSON(item))` to restore `Task` instances.

---

### Module Objectives

By the end of this module you will be able to:

- Distinguish a module (stateful access control) from a stateless namespace or an exposed data
  structure.
- Explain how classic modules use lexical scope and closure to keep state private behind a public
  API.
- Use ES Module `export` and `import` statements (named, default, and namespace imports) to split a
  single-file application into focused modules.
- Explain how module scope differs from global scope and why ES modules act as singletons.
- Persist and rehydrate an array of class instances in the browser using `localStorage`,
  `JSON.stringify()`, `JSON.parse()`, `toJSON()`, and `static fromJSON()`.

---

### Week 9 Activities & Materials

1. **Reading Assignment**:
   - **Textbook**:
     - [Scope & Closures (2nd Edition), Chapter 8: The Module Pattern](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch8.md)
     - [Get Started (2nd Edition), Chapter 2: Surveying JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch2.md):
       the "Modules" section under "How We Organize in JS".
   - **MDN**:
     - [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
     - [`Window.localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
   - Review the [Week 9 Reading Summary](../../weekly-readings/week-09.md).
2. **Lecture**:
   - [Week 9 Lecture: Modules and `localStorage`](week9-lecture-modules.md)
   - [Lecture Guide: Modules and `localStorage`](../../lectures/week9-modules.md)
3. **Hands-On Practice & Code Exploration**:
   - Run the [Week 9 Modules DevTools Snippet](../../examples/week9-modules.md)
     ([`examples/week9-modules.js`](../../examples/week9-modules.js)) in Chrome DevTools and solve
     the Debug Challenge.
4. **Assessment — Quiz 9**:
   - Complete [Week 9 Quiz](week9-quiz.md) on Canvas (covering namespaces vs. modules, classic
     modules, named vs. default exports, module scope, and `localStorage` rehydration). Due
     **Monday, November 23, 2026 at 11:59 PM**.
5. **Programming Assignment — Persistent Task List with Modules**:
   - Create a `week9` branch, scaffold `projects/week9`, bring over your Week 8 Task List code,
     split it into separate ES modules, and add `localStorage` persistence.
   - Complete
     [Week 9 Assignment: Persistent Task List with Modules](week9-assignment-task-list-modules.md),
     verify with `npm start` and `npm test`, and submit your PR on GitHub to **artzte**. Due
     **Monday, November 23, 2026 at 11:59 PM**.
6. **Final Project — Test Deployment**:
   - Pull the latest course template updates, scaffold `projects/final`, update the `<title>` to
     your app's name, make a visual change to the initial rendering so it differs from the
     `"Hello, JavaScript!"` default, pass all four build checks (`lint`, `format:check`, `test`, and
     `build`), and verify your live deployment using
     [Final Project: Test Deployment](week9-assignment-test-deployment.md) and
     [`infra/README.md`](../../infra/README.md). Submit your live CloudFront URL on Canvas by
     **Monday, November 23, 2026 at 11:59 PM**.

---

### Steps to Complete

1. Read
   [Scope & Closures (2nd Edition), Chapter 8: The Module Pattern](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch8.md)
   and the "Modules" section of
   [Get Started (2nd Edition), Chapter 2: Surveying JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch2.md),
   and review the reading summary.
2. Review the **Modules and `localStorage`** lecture and run the Week 9 DevTools snippet.
3. Complete and submit **Quiz 9** by Monday, November 23.
4. Complete the lightweight **Week 9 Programming Assignment: Persistent Task List with Modules** and
   open your Pull Request by Monday, November 23.
5. Complete **Final Project: Test Deployment** and submit your live CloudFront preview URL on Canvas
   by Monday, November 23.

---

### Course Outcomes Supported

This week directly supports the following course outcomes:

- **CO1**: Implement scripts that rely on knowledge of Document Object Model (DOM) architecture and
  includes methods for manipulating DOM objects.
- **CO2**: Construct functions that effectively utilize variables, conditionals, loops, and arrays.
- **CO3**: Generate scripts that process user input and provide meaningful output.
- **CO4**: Plan and create scripts utilizing events and event handlers that respond to user inputs.
