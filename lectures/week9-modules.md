# Week 9 Lecture Guide: Modules and `localStorage`

**Reading**:
[Scope & Closures (2nd Edition), Chapter 8: The Module Pattern](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch8.md)
and
[Get Started (2nd Edition), Chapter 2: Surveying JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch2.md)
("Modules" under "How We Organize in JS")  
**Format**: Interactive Lecture & Chrome DevTools Snippet Walkthrough
([`examples/week9-modules.js`](../examples/week9-modules.js))  
**Duration**: ~20 Minutes  
**Prereq Context**: Weeks 5–7 (lexical scope, POLE, closures) and Week 8 (classes, `toJSON()`,
`static fromJSON()`)

---

## Pacing & Timeline

| Time              | Section                                        | Focus / Snippet Function                                                                    |
| :---------------- | :--------------------------------------------- | :------------------------------------------------------------------------------------------ |
| **00:00 - 04:00** | **1. What Makes Something a Module?**          | POLE, namespaces vs. data structures vs. modules (`namespaceAndDataStructureDemo`)          |
| **04:00 - 08:00** | **2. Classic Modules (IIFE & Module Factory)** | Closure-backed private state and `publicAPI` (`classicModuleDemo`)                          |
| **08:00 - 13:00** | **3. File-Based Modules: CommonJS & ESM**      | `export` / `import` variations, module scope, Vite dev vs. build (`esModuleBoundariesDemo`) |
| **13:00 - 16:30** | **4. Persisting State with `localStorage`**    | `setItem`, `getItem`, `JSON.stringify` + `toJSON()`, `Task.fromJSON()` (`localStorageDemo`) |
| **16:30 - 18:30** | **5. Debug Challenge**                         | Plain objects from `JSON.parse()` vs. `Task` instances (`debugChallenge`)                   |
| **18:30 - 20:00** | **6. Wrap-Up & Week 9 Deliverables**           | Splitting Week 8 Task List into modules + Final Project test deployment                     |

---

## 1. What Makes Something a Module? (4 mins)

### Talking Points & Concept Cues

- [Scope & Closures (2nd Edition), Chapter 8: The Module Pattern](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch8.md)
  is the payoff of the entire _Scope & Closures_ book. Everything we learned about lexical scope,
  the Principle of Least Exposure (POLE), and closures comes together in modules.
- **Encapsulation** has two parts:
  1. Bundling related data and functions that serve a common purpose.
  2. Controlling visibility: keeping internal details **private** and exposing only a minimal
     **public API**.
- Kyle Simpson contrasts modules with two patterns that stop short of full encapsulation:
  - **Namespace (stateless grouping)**: An object of helper functions with no state (`TextUtils`).
    Good organization, not a module.
  - **Data structure (stateful grouping)**: An object with data and methods
    (`StudentDataStructure`), where the data (`records`) is public. Any caller can mutate `records`
    directly.
  - **Module (stateful access control)**: Has state, has functions that operate on that state, and
    hides the state behind a public API.

---

## 2. Classic Modules — Singleton IIFE and Module Factory (4 mins)

### Talking Points & Concept Cues

- Before ES6 added file-based modules to the language, JavaScript developers built modules using
  functions and closures — what the book calls **classic modules** (or the **revealing module**
  pattern).
- Three requirements for a classic module:
  1. An outer function that runs at least once to create an inner lexical scope.
  2. At least one piece of hidden state inside that scope.
  3. At least one returned function on the public API that closes over that hidden state.
- **Singleton (IIFE)** vs. **Module Factory**:
  - Wrap the function in an IIFE `const Student = (function defineStudent() { ... })()` when the
    program only needs one shared instance.
  - Leave it as a normal function `function createSelectionStore(items) { ... }` when you want a
    fresh instance each time you call it (just like Week 7's `createThemeSwitcher()`).

### Code Demo: `classicModuleDemo()`

```javascript
const Student = (function defineStudent() {
  const records = [
    { id: 14, name: 'Kyle', grade: 86 },
    { id: 73, name: 'Suzy', grade: 87 },
  ]

  function getName(studentId) {
    const student = records.find((record) => record.id === studentId)
    return student ? student.name : null
  }

  return { getName }
})()

Student.getName(73) // 'Suzy'
Student.records // undefined
```

---

## 3. File-Based Modules: CommonJS and ES Modules (5 mins)

### Talking Points & Concept Cues

- **CommonJS (Node's classic format)**:
  - One file = one module. Top-level variables are private to the file.
  - Exports properties on `module.exports` (or `Object.assign(module.exports, { ... })`) and loads
    other modules with `const { getName } = require('./student.js')`.
  - Worth recognizing when you read Node scripts or config files; in our browser projects we write
    **ES Modules (ESM)**.
- **Modern ES Modules (ESM)**:
  - Also file-based (`one file = one module`), private by default, and **always in strict mode**.
  - Every ES module is a **singleton**: no matter how many files `import` it, it runs once and
    shares the same module scope. When you need multiple instances of something, export a `class`
    (like `Task` or `TaskList`) or a factory function from the module.
- **Named exports vs. default exports**:
  - **Named export**: `export class Task { ... }` or `export function save(tasks) { ... }`. Imported
    by matching name inside braces: `import { Task } from './task.js'` (or renamed with `as`:
    `import { save as saveTasks } from './storage.js'`).
  - **Default export**: `export default class TaskList { ... }`. At most one per file; imported
    without braces: `import TaskList from './task-list.js'`.
  - **Namespace import**: `import * as storage from './storage.js'` groups every export from that
    file under `storage.save(...)`, `storage.load()`.
  - My preference in this course is **named exports**: the import site and the definition use the
    exact same name, which makes searching and refactoring much easier.
- **How Vite handles ESM**:
  - During `npm start` (dev), Vite serves native `<script type="module">` files directly to the
    browser.
  - During `npm run build`, Vite bundles your module graph into optimized static assets under
    `dist/assets/`.

---

## 4. Persisting State with `localStorage` (3.5 mins)

### Talking Points & Concept Cues

- Right now, refreshing the page wipes out your Week 8 Task List because `#tasks` only lives in
  memory.
- **`localStorage`** gives your page a small, persistent key-value store in the browser that
  survives page reloads.
- Keys and values in `localStorage` are always **strings**:
  - `localStorage.setItem(key, JSON.stringify(tasks))`
  - `localStorage.getItem(key)` returns the saved JSON string, or `null` if nothing is stored yet.
- Why Week 8's `toJSON()` and `Task.fromJSON()` pay off here:
  - When `save(tasks)` calls `JSON.stringify(tasks)`, JavaScript automatically calls each task's
    `toJSON()` method, producing `[{"id":"...","text":"Read","done":false}]`.
  - When `load()` calls `JSON.parse(raw)`, it gets back plain objects — **not** `Task` instances.
    Mapping them through `Task.fromJSON(item)` rebuilds real `Task` instances with their private
    fields and `toggle()` / `toHTML()` methods restored.
- **Why put `save` and `load` in their own `storage.js` module?**
  - `STORAGE_KEY` stays private inside `storage.js`.
  - `TaskList` (or `app.js`) doesn't need to know the key name or how `localStorage` formats strings
    — it just calls `save(tasks)` and `load()`.

---

## 5. Debug Challenge (2 mins)

### Talking Points & Concept Cues

- Run `debugChallenge()` in DevTools: `TypeError: loaded[0].toggle is not a function`.
- Look at `brokenLoad()`: it returns `JSON.parse(raw)` directly.
- `JSON.parse()` only knows how to build plain objects, arrays, strings, numbers, and booleans. It
  has no idea those objects used to be `Task` instances.
- **The fix**:
  ```javascript
  return JSON.parse(raw).map((taskJson) => Task.fromJSON(taskJson))
  ```
- That one line is the heart of `load()` in this week's assignment.

---

## 6. Wrap-Up & Week 9 Deliverables (1.5 mins)

### Talking Points & Concept Cues

- **Key Takeaways**:
  1. A module bundles state and behavior while keeping internal details private behind a public API.
  2. In ES Modules, each file is its own private scope (`export` exposes; `import` consumes).
  3. `localStorage` stores strings: pair `JSON.stringify()` (`toJSON()`) with `JSON.parse()` +
     `Task.fromJSON()` to persist and restore class instances.
- **Week 9 Deliverables (Due Monday, November 23)**:
  - **Quiz 9**
  - **Week 9 Assignment: Persistent Task List with Modules** (a quick ~1-hour update of your Week 8
    Task List: split `src/app.js` into modules and add `localStorage` persistence).
  - **Final Project: Test Deployment** (scaffold `projects/final`, change the site `<title>` to your
    app name, make a visual change from the default `"Hello, JavaScript!"` rendering, pass all four
    build checks via `npm run check`, and submit your live CloudFront URL).
