## Modules and `localStorage`

In Weeks 5–7 we saw how lexical scope and closures let us hide variables where the rest of the
program can't accidentally touch them — the **Principle of Least Exposure (POLE)**. This week's
reading,
[Scope & Closures (2nd Edition), Chapter 8: The Module Pattern](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch8.md)
(along with the "Modules" section of
[Get Started (2nd Edition), Chapter 2: Surveying JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch2.md)),
shows how JavaScript turns that idea into its main code-organization pattern: **modules**.

We'll also look at `localStorage`, the browser API you'll use in this week's assignment to save your
Week 8 Task List so tasks survive a page refresh.

---

### Key Lecture Topics

1. **What Makes Something a Module?**: Bundling state and behavior _plus_ controlling visibility
   (private implementation vs. public API). Why a stateless namespace (`Utils`) or an exposed data
   structure falls short.
2. **Classic Modules**: Singleton Immediately Invoked Function Expressions (IIFEs) and module
   factories that keep variables private in an outer function's scope and return a public API whose
   functions close over that state.
3. **CommonJS vs. ES Modules**: How Node's `module.exports` / `require(...)` compares to modern
   `export` / `import`.
4. **ES Modules (ESM) in Practice**: File-level scope (private by default, strict mode always on,
   singleton execution), named vs. default exports, and `import` variations.
5. **Decoupling Modules with Callback Functions and `localStorage`**: Using
   `taskList.registerOnChange((tasks) => storage.save(tasks))` so `TaskList` and `BrowserStorage`
   stay independent, while `app.js` wires them together.

---

### Modules at a Glance

| Concept                   | What It Means                                                                     | Example                                                      |
| :------------------------ | :-------------------------------------------------------------------------------- | :----------------------------------------------------------- |
| **Namespace**             | Stateless grouping of helper functions (no hidden state)                          | `const Utils = { isValidText(t) { ... } }`                   |
| **Data structure**        | Bundles state and methods, but the state is public                                | `const Student = { records: [...], getName(id) { ... } }`    |
| **Classic module**        | Outer function hides state in lexical scope and returns a public API with closure | `const Student = (function() { ... return { getName } })()`  |
| **CommonJS**              | Node's classic file-based module format                                           | `module.exports = ...` / `const x = require('./x.js')`       |
| **ES Module (ESM)**       | Standard file-based module; private by default, strict mode, singleton            | `export class Task` / `import { Task } from './task.js'`     |
| **Named export / import** | Exported and imported by exact identifier name (can rename with `as`)             | `export { Task }` / `import { Task } from ...`               |
| **Default export**        | One main export per file, imported without curly braces                           | `export default class TaskList` / `import TaskList from ...` |
| **`localStorage`**        | Browser key-value store for strings that survive page reloads                     | `localStorage.setItem(key, JSON.stringify(tasks))`           |

#### Classic Module vs. ES Module

In a **classic module**, an outer function creates the private scope, and the returned object is the
public API:

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

console.log(Student.getName(73)) // 'Suzy'
console.log(Student.records) // undefined — private to defineStudent()
```

In an **ES module**, the file itself is the private scope. Anything you don't `export` stays hidden
inside that file:

```javascript
// students.js
const records = [
  { id: 14, name: 'Kyle', grade: 86 },
  { id: 73, name: 'Suzy', grade: 87 },
]

export function getName(studentId) {
  const student = records.find((record) => record.id === studentId)
  return student ? student.name : null
}
```

```javascript
// app.js
import { getName } from './students.js'

console.log(getName(73)) // 'Suzy'
```

#### Named Exports vs. Default Exports

```javascript
// Named exports (my preferred style: names match on both sides)
export class Task {
  /* ... */
}
export class BrowserStorage {
  /* ... */
}

import { Task } from './task.js'
import { BrowserStorage as TaskStorage } from './browser-storage.js'
```

```javascript
// Default export (one per file; importer chooses any local name)
export default class TaskList {
  /* ... */
}

import TaskList from './task-list.js'
```

#### Decoupling `TaskList` and `BrowserStorage` with `registerOnChange`

If `TaskList` imported the storage module directly, the two modules would be tightly coupled: you
couldn't use or test `TaskList` without touching `localStorage`.

Instead, we can keep the storage module and `task-list.js` completely independent of each other:

1. `BrowserStorage` only knows how to save and load a value under one `localStorage` key. It doesn't
   know anything about tasks, so it works for any value `JSON.stringify()` can handle:

```javascript
// src/browser-storage.js
export class BrowserStorage {
  #key

  constructor(key) {
    this.#key = key
  }

  save(value) {
    localStorage.setItem(this.#key, JSON.stringify(value))
  }

  load() {
    const json = localStorage.getItem(this.#key)
    // nothing saved yet: return null, the same as localStorage does
    if (json === null) return null

    return JSON.parse(json)
  }
}
```

2. `TaskList` provides `registerOnChange(callback)` and calls that function with serialized task
   objects (`task.toJSON()`) whenever a task is added, toggled, or removed:

```javascript
// inside class TaskList (src/task-list.js)
#onChange = null

registerOnChange(callback) {
  this.#onChange = callback
}

#notifyChange() {
  this.#onChange?.(this.#tasks.map((task) => task.toJSON()))
}
```

3. `app.js` is the only file that knows about both modules, and the only file that knows the storage
   key. Because functions are first-class values in JavaScript, `app.js` can hand a function to
   `registerOnChange`:

```javascript
// src/app.js
import { TaskList } from './task-list.js'
import { BrowserStorage } from './browser-storage.js'

const STORAGE_KEY = 'cis133js.tasks'

export function renderApp() {
  const app = document.querySelector('#app')
  const storage = new BrowserStorage(STORAGE_KEY)
  // load() returns null the first time the app runs
  const taskList = new TaskList(app, storage.load() ?? [])

  taskList.registerOnChange((tasks) => storage.save(tasks))
  taskList.render()
  taskList.attachHandlers()
}
```

The arrow function matters. Passing `storage.save` by itself would detach the method from `storage`,
so `this` inside `save()` wouldn't be `storage` when `TaskList` calls it. That's the same
lost-`this` problem we saw with event handlers in Week 8.

Notice how `STORAGE_KEY` lives only in `app.js`, `browser-storage.js` doesn't import `Task`, and
`task-list.js` doesn't import `browser-storage.js`. Each module does one job behind a minimal public
API.

---

### Resources & References

- **Lecture Guide & Snippet Walkthrough**:
  - [Week 9 Lecture Guide: Modules and `localStorage`](../../lectures/week9-modules.md)
- **Textbook Readings**:
  - [Scope & Closures (2nd Edition), Chapter 8: The Module Pattern](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch8.md)
  - [Get Started (2nd Edition), Chapter 2: Surveying JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch2.md)
  - [Week 9 Reading Summary](../../weekly-readings/week-09.md)
- **Interactive Code & Demos**:
  - [Week 9 DevTools Snippet Guide](../../examples/week9-modules.md)
  - [Week 9 Source Snippet (`week9-modules.js`)](../../examples/week9-modules.js)
- **MDN References**:
  - [JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
  - [`export`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)
  - [`import`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)
  - [`Window.localStorage`](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
  - [`Storage.getItem()`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem) and
    [`Storage.setItem()`](https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem)
  - [`JSON.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)
  - [Nullish coalescing (`??`)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing)
- **Assignments**:
  - [Week 9 Assignment: Persistent Task List with Modules](week9-assignment-task-list-modules.md)
  - [Final Project: Test Deployment](week9-assignment-test-deployment.md)
