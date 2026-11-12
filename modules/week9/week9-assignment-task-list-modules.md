## Week 9 Assignment: Persistent Task List with Modules

Because you are also setting up and verifying your **Final Project Test Deployment** this week, this
week's programming assignment is intentionally small — hopefully just a 1-hour update to your Week 8
**Task List** app:

1. **Split `src/app.js` into separate ES modules** so `Task`, `TaskList`, your `localStorage`
   helpers, and `renderApp()` each live in their own module.
2. **Add `registerOnChange(callback)` to `TaskList`** so `TaskList` can notify outside code whenever
   tasks change, without knowing anything about `localStorage`.
3. **Persist tasks in `localStorage`** by passing `save` to `taskList.registerOnChange(save)` and
   passing `load()` into `new TaskList(app, load())`.

There are two ideas to watch for as you refactor:

- **Clean module boundaries**: As discussed in
  [Scope & Closures (2nd Edition), Chapter 8: The Module Pattern](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch8.md),
  each module should have a single responsibility and minimal knowledge of the rest of the program.
  `TaskList` doesn't need to import `storage.js`, and `storage.js` doesn't need to import `Task` or
  `TaskList`. Only `app.js` connects them.
- **Functions as passable values**: Because functions in JavaScript are first-class values, `app.js`
  can hand the `save` function directly to `taskList.registerOnChange(save)`. Whenever a task is
  added, toggled, or removed, `TaskList` calls that function with the array of serialized task
  objects (`task.toJSON()`).

Submit the URL of your pull request adding this assignment to your `projects/week9` folder in your
repo. Be sure to tag me, **artzte**, as a reviewer on your PR.

---

### Requirements

1. **Module organization**:
   - Start from your Week 8 Task List code in `projects/week9`.
   - Split your code across **at least three (3) ES module files** under `src/` (for example,
     putting `Task`, `TaskList`, your storage functions, and `renderApp()` in separate modules
     instead of keeping everything in `src/app.js`).
   - Keep internal details (such as your `localStorage` key string or markup helpers) unexported in
     the module that uses them.
2. **`TaskList.registerOnChange(callback)`**:
   - Add a `registerOnChange(callback)` method to `TaskList` that stores the callback function in a
     private field.
   - Whenever `add()`, `toggle(id)`, or `remove(id)` changes the task list, call the registered
     callback (if one has been registered) with an array of plain serialized task objects:
     `this.#tasks.map((task) => task.toJSON())`.
   - **Handle invalid situations**:
     - Ignored actions (such as calling `add('   ')` with blank text, or `toggle(id)` / `remove(id)`
       with an unknown `id`) should not call the callback.
3. **Storage functions (`save` and `load`)**:
   - Create `save(tasks)`:
     - Converts the `tasks` array to a JSON string with `JSON.stringify(tasks)` and saves it with
       `localStorage.setItem(key, json)`.
   - Create `load()`:
     - Reads the saved JSON string with `localStorage.getItem(key)`.
     - If nothing is stored yet (`getItem()` returns `null`), return an empty array `[]`.
     - Otherwise, parse the JSON string with `JSON.parse()` and return the array of saved task
       objects.
4. **Wiring modules together in `renderApp()`**:
   - When `renderApp()` starts, pass `load()` as the initial tasks argument to
     `new TaskList(app, load())`.
   - Register your storage function with `taskList.registerOnChange(save)`.
5. **Tests**:
   - Update the imports in your Week 8 tests so they import from your new modules.
   - Clear `localStorage` (`localStorage.clear()`) in `beforeEach` for tests that use storage or
     `renderApp()`.
   - Add a unit test for `taskList.registerOnChange(callback)` verifying that `add()`, `toggle()`,
     and `remove()` pass the serialized `{ id, text, done }` objects to the callback.
   - Add unit tests for `save()` and `load()`:
     - `load()` returns `[]` when nothing has been saved.
     - `save(tasks)` followed by `load()` round-trips the serialized task objects.
   - Add a DOM test verifying that tasks added and toggled in one `renderApp()` call are still shown
     when `renderApp()` is called again (simulating a page reload).

> 💡 **Why register `save` _after_ `new TaskList(app, load())`?** Your `TaskList` constructor loops
> over the initial tasks and calls `this.add(...)` for each one. Calling
> `taskList.registerOnChange(save)` on the next line means loading existing tasks at startup won't
> trigger unnecessary writes to `localStorage`.

---

### Some Helpful References

| Topic                    | Documentation                                                                                                                   | Usefulness in this Assignment                                    |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------- |
| JavaScript modules       | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)                                           | Splitting a single-file app into ES modules                      |
| `export`                 | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)                             | Exposing `Task`, `TaskList`, `save`, `load`, and `renderApp`     |
| `import`                 | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)                             | Importing classes and helpers across files in `src/` and `test/` |
| First-class functions    | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function)                                          | Passing `save` as a callback to `taskList.registerOnChange`      |
| Optional chaining (`?.`) | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)                   | Calling `this.#onChange?.(...)` only when a callback is set      |
| `Window.localStorage`    | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)                                            | Browser storage that persists across page reloads                |
| `Storage.setItem()`      | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem)                                                | Storing the JSON string in `save(tasks)`                         |
| `Storage.getItem()`      | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem)                                                | Reading the saved JSON string (or `null`) in `load()`            |
| `Storage.clear()`        | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Storage/clear)                                                  | Resetting `localStorage` between tests in `beforeEach`           |
| `JSON.stringify()`       | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#tojson_behavior) | Serializing task objects to a JSON string                        |
| `JSON.parse()`           | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)                     | Parsing the stored JSON string back into an array                |

---

### Suggested Example Tests

**NOTE: these are just starter tests from my own attempt at this project. You will likely need to
modify them to your own naming, exports, etc.**

```javascript
import { beforeEach, describe, it, expect } from 'vitest'
import { Task } from '../src/task.js'
import { TaskList } from '../src/task-list.js'
import { save, load } from '../src/storage.js'
import { renderApp } from '../src/app.js'

describe('Task', () => {
  it('starts not done and toggles', () => {
    const task = new Task('Read Chapter 8')
    expect(task.done, 'new tasks start not done').toBe(false)

    task.toggle()
    expect(task.done, 'toggle marks done').toBe(true)
  })

  it('converts to and from JSON', () => {
    const task = new Task('Read')
    task.toggle()

    const data = JSON.parse(JSON.stringify(task))
    const copy = Task.fromJSON(data)
    expect(copy, 'fromJSON() builds a Task').toBeInstanceOf(Task)
    expect(copy.id, 'fromJSON() keeps the id').toBe(task.id)
    expect(copy.done, 'fromJSON() keeps done').toBe(true)
  })
})

describe('TaskList', () => {
  let list

  beforeEach(() => {
    list = new TaskList(document.createElement('div'))
  })

  it('adds, toggles, and removes tasks', () => {
    const task = list.add('Read')
    list.add('Write')
    list.add('   ')
    expect(list.tasks.length, 'blank task is ignored').toBe(2)

    list.toggle(task.id)
    expect(list.remainingCount, 'one task done').toBe(1)

    list.remove(task.id)
    expect(list.tasks.length, 'task removed').toBe(1)
  })

  it('passes serialized task objects to registerOnChange callback', () => {
    let latest = null
    let callCount = 0

    list.registerOnChange((tasks) => {
      latest = tasks
      callCount += 1
    })

    const task = list.add('Read Chapter 8')
    expect(callCount, 'called on add').toBe(1)
    expect(latest, 'serialized task passed on add').toEqual([
      { id: task.id, text: 'Read Chapter 8', done: false },
    ])

    list.add('   ')
    expect(callCount, 'blank add does not trigger callback').toBe(1)

    list.toggle(task.id)
    expect(callCount, 'called on toggle').toBe(2)
    expect(latest[0].done, 'updated done state passed').toBe(true)

    list.remove('no-such-id')
    expect(callCount, 'unknown id does not trigger callback').toBe(2)

    list.remove(task.id)
    expect(callCount, 'called on remove').toBe(3)
    expect(latest, 'empty array passed after removing last task').toEqual([])
  })
})

describe('storage (save and load)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns an empty array when nothing has been saved', () => {
    expect(load(), 'empty localStorage returns []').toEqual([])
  })

  it('saves and loads serialized task objects', () => {
    const items = [
      { id: '1', text: 'Read Chapter 8', done: true },
      { id: '2', text: 'Add storage module', done: false },
    ]

    save(items)
    expect(load(), 'load() returns saved task objects').toEqual(items)
  })
})

describe('Task List DOM & localStorage Persistence', () => {
  let app

  function addTask(text) {
    app.querySelector('#new-task input').value = text
    app.querySelector('#new-task button[type="submit"]').click()
  }

  function taskCount() {
    return app.querySelectorAll('[data-task-id]').length
  }

  beforeEach(() => {
    localStorage.clear()
    renderApp()
    app = document.querySelector('#app')
  })

  it('persists added and toggled tasks across renderApp() reloads', () => {
    addTask('Buy milk')
    app.querySelector('button[data-action="toggle"]').click()
    expect(taskCount(), 'one task on page').toBe(1)

    // Re-render into #app as if the page were refreshed
    app.innerHTML = ''
    renderApp()

    expect(taskCount(), 'task restored from localStorage').toBe(1)
    expect(app.textContent, 'restored task text is shown').toContain('Buy milk')
    expect(app.querySelector('.summary').innerText, 'restored task kept its done state').toContain(
      'No tasks left',
    )
  })
})
```

---

### Steps to Complete & Submit

1. **Check out your `main` branch and pull latest changes**:
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Create a `week9` branch**:
   ```bash
   git checkout -b week9
   ```
3. **Run the `mpf.sh` script to create your `week9` project**:
   ```bash
   npm run weekly:create week9
   ```
4. **Stage, commit, and push the generated project files**:
   ```bash
   git add projects/week9
   git commit -m "feat(week9): scaffold week9 project workspace"
   git push -u origin week9
   ```
5. **Work on the exercise**:
   - Copy your Week 8 source and test files into `projects/week9`, then install dependencies:
     ```bash
     cp -r projects/week8/src/* projects/week9/src/
     cp projects/week8/test/task.test.js projects/week9/test/
     cd projects/week9
     npm install
     ```
   - Split `src/app.js` into separate ES modules, add `registerOnChange(callback)` to `TaskList`,
     and implement `save(tasks)` and `load()` using `localStorage`.
   - Update your unit and DOM tests.
6. **Commit updates, verify everything is working, and push fixes**:
   - Preview your application in the browser (add a task, refresh the page, and confirm it stays):
     ```bash
     npm start
     ```
   - Run all checks (lint, format check, unit tests, and production build):
     ```bash
     npm run check
     ```
   - Stage, commit, and push your changes.
7. **Open a Pull Request**: Open a pull request on GitHub comparing `week9` against `main`, and
   request **artzte** as a reviewer.
8. **Submit on Canvas**: Copy the URL of your PR, paste it into the Canvas assignment submission
   box, and submit it.
9. **Deadline**: This programming assignment is due by **Monday, November 23, 2026 at 11:59 PM**
   (the Monday following Week 9).
