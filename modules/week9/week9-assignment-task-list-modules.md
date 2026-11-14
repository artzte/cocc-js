## Week 9 Assignment: Persistent Task List with Modules

Because you are also setting up and verifying your **Final Project Test Deployment** this week, this
week's programming assignment is intentionally small — hopefully just a 1-hour update to your Week 8
**Task List** app:

1. **Split `src/app.js` into separate ES modules** so `Task`, `TaskList`, and a new `BrowserStorage`
   class each live in their own module. `renderApp()` stays in `src/app.js`.
2. **Update `TaskList`** so it can start from a list of saved tasks, and add
   `registerOnChange(callback)` so it can notify outside code whenever tasks change, without knowing
   anything about `localStorage`.
3. **Persist tasks in `localStorage`** by creating a `BrowserStorage` with your storage key, passing
   `storage.load()` into `new TaskList(app, storage.load())`, and registering a callback that calls
   `storage.save(tasks)`.

There are two ideas to watch for as you refactor:

- **Clean module boundaries**: As discussed in
  [Scope & Closures (2nd Edition), Chapter 8: The Module Pattern](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch8.md),
  each module should have a single responsibility and minimal knowledge of the rest of the program.
  `TaskList` doesn't need to import your storage module, and your storage module doesn't need to
  import `Task` or `TaskList`. Only `app.js` connects them, and only `app.js` knows which
  `localStorage` key the app uses.
- **Functions as passable values**: Because functions in JavaScript are first-class values, `app.js`
  can hand a function to `taskList.registerOnChange(...)`. Whenever a task is added, toggled, or
  removed, `TaskList` calls that function with the array of serialized task objects
  (`task.toJSON()`). Remember the lost-`this` problem from Week 8: passing `storage.save` by itself
  detaches it from `storage`, so wrap it in an arrow function instead.

Submit the URL of the pull request that adds your `projects/week9` project. Be sure to tag me,
**artzte**, as a reviewer on your PR.

---

### Requirements

1. **Module organization**:
   - Start from your Week 8 Task List code in `projects/week9`.
   - Move `Task`, `TaskList`, and `BrowserStorage` into their own module files under `src/`. You
     choose the file names.
   - Keep `renderApp()` in `src/app.js`. The page's `src/common/main.js` and the tests both import
     it from there.
   - Keep internal details (such as markup helpers) unexported in the module that uses them.
   - Define your `localStorage` key string in `app.js` and pass it to the `BrowserStorage`
     constructor. The storage module shouldn't contain a hard-coded key.
2. **`TaskList` changes**:
   - Let the constructor take an optional second argument: an array of saved `{ id, text, done }`
     objects, defaulting to `[]`.
     - Rebuild each saved object into a `Task` that keeps its saved `id` and `done` state.
       `Task.fromJSON()` is the simplest way to do this.
     - If you use `add()` instead, pass it the saved `id` and `done` values along with the text.
       Your `add()` has to accept all three, because an `add(text)` that only takes the text creates
       a new task with a new `id` that isn't done.
   - Add a `registerOnChange(callback)` method that stores the callback function in a private field.
   - Whenever `add()`, `toggle(id)`, or `remove(id)` changes the task list, call the registered
     callback (if one has been registered) with an array of plain serialized task objects:
     `this.#tasks.map((task) => task.toJSON())`.
   - **Handle invalid situations**:
     - Ignored actions (such as calling `add('   ')` with blank text, or `toggle(id)` / `remove(id)`
       with an unknown `id`) should not call the callback.
3. **`BrowserStorage` class**:
   - Create a `BrowserStorage` class whose constructor takes the storage key and keeps it in a
     private field.
   - Add a `save(tasks)` method:
     - Converts the `tasks` array to a JSON string with `JSON.stringify(tasks)` and saves it with
       `localStorage.setItem()` under the key.
   - Add a `load()` method:
     - Reads the saved JSON string with `localStorage.getItem()` using the key.
     - If nothing is stored yet (`getItem()` returns `null`), return an empty array `[]`.
     - Otherwise, parse the JSON string with `JSON.parse()` and return the array of saved task
       objects.
4. **Wiring modules together in `renderApp()`**:
   - Create a `BrowserStorage` with the key defined in `app.js`.
   - Pass `storage.load()` as the initial tasks argument to `new TaskList(app, storage.load())`.
   - Register a callback that saves the tasks:
     `taskList.registerOnChange((tasks) => storage.save(tasks))`.
5. **Tests**:
   - Update the imports in your Week 8 tests so they import from your new modules.
   - Add a unit test verifying that a `TaskList` created with saved task objects rebuilds them as
     `Task` instances with the same `id` and `done` state.
   - Clear `localStorage` (`localStorage.clear()`) in `beforeEach` for tests that use storage or
     `renderApp()`.
   - Add a unit test for `taskList.registerOnChange(callback)` verifying that `add()`, `toggle()`,
     and `remove()` pass the serialized `{ id, text, done }` objects to the callback.
   - Add unit tests for `BrowserStorage`:
     - `load()` returns `[]` when nothing has been saved.
     - `save(tasks)` followed by `load()` round-trips the serialized task objects.
     - Two `BrowserStorage` objects with different keys don't see each other's tasks.
   - Add a DOM test verifying that tasks added and toggled in one `renderApp()` call are still shown
     when `renderApp()` is called again (simulating a page reload).

> 💡 **Why register the callback _after_ `new TaskList(app, storage.load())`?** Loading the saved
> tasks isn't a change the user made, so there's nothing new to save. Registering the callback on
> the next line means only real changes (add, toggle, remove) write to `localStorage`.

> 💡 **Why wrap `storage.save` in an arrow function?** If you pass `storage.save` by itself,
> `TaskList` later calls it as a plain function, so `this` is `undefined` inside `save()`. This is
> the same lost-`this` problem as passing `this.handleClick` to `addEventListener` in Week 8. You
> won't see it when the page loads. The first time you add a task, you'll get
> `TypeError: Cannot read properties of undefined (reading '#key')`, with your own private field
> name in place of `#key`. The arrow function `(tasks) => storage.save(tasks)` calls `save()` on
> `storage`, so `this` is set correctly.

---

### Some Helpful References

| Topic                    | Documentation                                                                                                                   | Usefulness in this Assignment                                    |
| :----------------------- | :------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------- |
| JavaScript modules       | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)                                           | Splitting a single-file app into ES modules                      |
| `export`                 | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)                             | Exposing `Task`, `TaskList`, `BrowserStorage`, and `renderApp`   |
| `import`                 | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)                             | Importing classes and helpers across files in `src/` and `test/` |
| First-class functions    | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Glossary/First-class_Function)                                          | Passing a callback to `taskList.registerOnChange`                |
| Optional chaining (`?.`) | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining)                   | Calling `this.#onChange?.(...)` only when a callback is set      |
| `Window.localStorage`    | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)                                            | Browser storage that persists across page reloads                |
| `Storage.setItem()`      | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem)                                                | Storing the JSON string in `storage.save(tasks)`                 |
| `Storage.getItem()`      | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem)                                                | Reading the saved JSON string (or `null`) in `storage.load()`    |
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
import { BrowserStorage } from '../src/browser-storage.js'
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

  it('rebuilds saved task objects passed to the constructor', () => {
    const saved = [
      { id: '1', text: 'Read Chapter 8', done: true },
      { id: '2', text: 'Add storage module', done: false },
    ]
    const restored = new TaskList(document.createElement('div'), saved)

    expect(restored.tasks[0], 'saved objects become Tasks').toBeInstanceOf(Task)
    expect(restored.tasks[0].id, 'saved id is kept').toBe('1')
    expect(restored.remainingCount, 'saved done state is kept').toBe(1)
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

describe('BrowserStorage', () => {
  let storage

  beforeEach(() => {
    localStorage.clear()
    storage = new BrowserStorage('test.tasks')
  })

  it('returns an empty array when nothing has been saved', () => {
    expect(storage.load(), 'empty localStorage returns []').toEqual([])
  })

  it('saves and loads serialized task objects', () => {
    const items = [
      { id: '1', text: 'Read Chapter 8', done: true },
      { id: '2', text: 'Add storage module', done: false },
    ]

    storage.save(items)
    expect(storage.load(), 'load() returns saved task objects').toEqual(items)
  })

  it('keeps tasks saved under different keys separate', () => {
    const otherStorage = new BrowserStorage('test.other-tasks')

    storage.save([{ id: '1', text: 'Read Chapter 8', done: false }])
    expect(otherStorage.load(), 'a different key has nothing saved').toEqual([])
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

    // Swap in an empty copy of #app, as if the page were refreshed. cloneNode()
    // doesn't copy event listeners, so the old ones don't stay attached.
    app.replaceWith(app.cloneNode(false))
    renderApp()
    app = document.querySelector('#app')

    expect(taskCount(), 'task restored from localStorage').toBe(1)
    expect(app.textContent, 'restored task text is shown').toContain('Buy milk')
    expect(
      app.querySelector('.summary').textContent,
      'restored task kept its done state',
    ).toContain('No tasks left')
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
3. **Copy your Week 8 project to create your `week9` project**. This week builds on your Week 8
   code, so copy that project instead of running the `mpf.sh` script.
   ```bash
   cp -R projects/week8 projects/week9
   ```
   If your Week 8 PR hasn't been merged yet, `projects/week8` won't be on `main`. In that case,
   create your `week9` branch from your `week8` branch instead (`git checkout week8`, then
   `git checkout -b week9`) and then run the `cp` command above. Your Week 9 PR will also show your
   Week 8 changes until Week 8 is merged.
4. **Stage, commit, and push the copied project files**:
   ```bash
   git add projects/week9
   git commit -m "feat(week9): copy week8 project as week9 starting point"
   git push -u origin week9
   ```
5. **Work on the exercise**:
   - Install dependencies:
     ```bash
     cd projects/week9
     npm install
     ```
   - Split `src/app.js` into separate ES modules, add `registerOnChange(callback)` to `TaskList`,
     and create the `BrowserStorage` class using `localStorage`.
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
   - If the format check fails, run `npm run format` to fix the formatting, then run `npm run check`
     again.
   - Stage, commit, and push your changes.
7. **Open a Pull Request**: Open a pull request on GitHub comparing `week9` against `main`, and
   request **artzte** as a reviewer.
8. **Submit on Canvas**: Copy the URL of your PR, paste it into the Canvas assignment submission
   box, and submit it.
9. **Deadline**: This programming assignment is due by **Monday, November 23, 2026 at 11:59 PM**
   (the Monday following Week 9).
