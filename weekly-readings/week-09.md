# Week 9 Reading Summary: Modules

**Sources**:

- [Scope & Closures (2nd Edition), Chapter 8: The Module Pattern](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch8.md)
- [Get Started (2nd Edition), Chapter 2: Surveying JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch2.md)
  ("Modules" under "How We Organize in JS")
- MDN: [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
  and [`Window.localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

---

### 1. Modularity and Encapsulation

- **Encapsulation**: Bundling related data (state) and behavior (functions) serving a common
  purpose, along with controlling which details are visible to the rest of the program (POLE — the
  Principle of Least Exposure from
  [Scope & Closures (2nd Edition), Chapter 6: Limiting Scope Exposure](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch6.md)).
- **Namespace (Stateless Grouping)**: Grouping functions under a single namespace object (e.g.
  `var Utils = { ... }`) without state. Useful organization, but not a module.
- **Data Structure (Stateful Grouping)**: Bundling state and functions together publicly (e.g.
  `var Student = { records: [...], getName() {...} }`), without restricting access to `records`. An
  instance of a data structure, not a module.
- **Module (Stateful Access Control)**: Encapsulating state and functions with a clear boundary
  between **private** (hidden implementation details) and **public** (exposed API).

---

### 2. Classic / Revealing Modules

- **Structure**: Created using an outer function — an IIFE when only a single instance
  (**singleton**) is needed, or a standalone **module factory** function when multiple instances are
  needed.
- **Privacy**: Uses lexical scope so variables and helper functions inside the outer function are
  private by default.
- **API Exposure**: Returns a public API object holding references to the inner functions meant for
  outside use.
- **State Maintenance**: Those returned functions keep access to the hidden state variables via
  **closure** across the lifetime of the program.

---

### 3. Node CommonJS Modules

- **File-Based**: CommonJS is file-based (one module per file).
- **Private by Default**: Top-level variables and functions in a CommonJS file live in that module's
  scope, not the global scope.
- **Exporting**: Exposes API members by attaching properties to `module.exports` (or copying several
  properties onto it with `Object.assign(module.exports, { ... })`).
- **Importing**: Loaded with `require("...")`. CommonJS modules are singletons: calling `require()`
  multiple times returns references to the same cached module instance.

---

### 4. Modern ES Modules (ESM)

- **Native Standard**: Introduced in ES6. ESMs are file-based, singletons, private by default, and
  always run in **strict mode**.
- **Exports** (`export` must appear at the top level of the file):
  - **Named Exports**: `export { getName }`, `export function getName() {}`, or
    `export class Task {}`.
  - **Default Export**: `export default function getName() {}` (one default export per module;
    imported without curly braces).
- **Imports** (`import` must appear at the top level of the file):
  - **Named Import**: `import { getName } from './students.js'` (can be renamed with `as`:
    `import { getName as getStudentName } from './students.js'`).
  - **Default Import**: `import getName from './students.js'`.
  - **Namespace Import**: `import * as Student from './students.js'` (collects all exports on a
    single object).
- **Multiple Instances**: Because an ES module file is a singleton, creating multiple instances
  means exporting a factory function or an ES6 `class` from the module.

---

### 5. Persisting State with `localStorage` and Callbacks (from MDN)

- **String Key/Value Storage**: `localStorage.setItem(key, value)` and `localStorage.getItem(key)`
  store and retrieve strings that survive page reloads for the current origin.
- **Saving Objects**: Pass your array of serialized task objects through `JSON.stringify(tasks)`
  before calling `localStorage.setItem(key, json)`.
- **Loading Objects**: `localStorage.getItem(key)` returns `null` when nothing has been stored under
  `key` yet; otherwise `JSON.parse(raw)` returns the saved array of `{ id, text, done }` objects.
- **Decoupling Modules with Callback Functions**: Rather than having `TaskList` import `save`
  directly from `storage.js`, `TaskList` can expose `registerOnChange(callback)` and pass serialized
  task objects (`task.toJSON()`) to that callback whenever the list changes. `app.js` then connects
  the two modules with `taskList.registerOnChange(save)`.
