## Week 9 Assignment: Persistent Task List with Modules

Because you are also setting up and verifying your **Final Project Test Deployment** this week, this
week's programming assignment is intentionally small — about a 1-hour update to your Week 8 **Task
List** app:

1. **Split `src/app.js` into separate ES modules** so `Task`, `TaskList`, your `localStorage`
   helpers, and `renderApp()` aren't all crowded into one file.
2. **Persist tasks in `localStorage`** using the `toJSON()` and `Task.fromJSON()` methods you
   already wrote in Week 8, so tasks stay on the page when you refresh the browser.

There are two ideas from
[Scope & Closures (2nd Edition), Chapter 8: The Module Pattern](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch8.md)
to watch for as you refactor:

- **Module scope is private by default**: Any constant or helper function you keep at the top level
  of your storage module (such as your `localStorage` key name) stays hidden inside that file unless
  you `export` it.
- **Explicit dependencies**: Each file states at the top what it needs from other modules with
  `import`, and states what it shares with `export`.

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
2. **Storage functions (`save` and `load`)**:
   - Create `save(tasks)`:
     - Converts the `tasks` array to a JSON string with `JSON.stringify(tasks)` and saves it with
       `localStorage.setItem(key, json)`.
   - Create `load()`:
     - Reads the saved JSON string with `localStorage.getItem(key)`.
     - **Handle invalid or empty situations**:
       - If nothing is stored yet (`getItem()` returns `null`), return an empty array `[]`.
     - Parses the JSON string and rebuilds each item with `Task.fromJSON(...)` so `load()` returns
       an array of `Task` instances.
3. **Persisting and restoring tasks in the app**:
   - When `renderApp()` starts, initialize your `TaskList` with the tasks returned by `load()`.
   - Whenever a task is added, toggled, or removed, save the current tasks to `localStorage` with
     `save(...)`.
4. **Tests**:
   - Update the imports in your Week 8 tests so they import from your new modules.
   - Clear `localStorage` (`localStorage.clear()`) in `beforeEach` so stored tasks from one test
     don't leak into the next.
   - Add unit tests for `save()` and `load()`:
     - `load()` returns `[]` when nothing has been saved.
     - `save(tasks)` followed by `load()` returns `Task` instances with the same `id`, `text`, and
       `done` values.
   - Add a DOM test verifying that tasks added in one `renderApp()` call are still shown if
     `renderApp()` is called again (simulating a page reload).

> 💡 **Why `Task.fromJSON()` matters in `load()`**: `JSON.parse()` returns plain
> `{ id, text, done }` objects, not `Task` instances. Passing each plain object through
> `Task.fromJSON(item)` restores its `#id`, `#text`, `#done` private fields and its `toggle()` and
> `toHTML()` methods.

---

### Some Helpful References

| Topic                   | Documentation                                                                                                                   | Usefulness in this Assignment                                    |
| :---------------------- | :------------------------------------------------------------------------------------------------------------------------------ | :--------------------------------------------------------------- |
| JavaScript modules      | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)                                           | Splitting a single-file app into ES modules                      |
| `export`                | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export)                             | Exposing `Task`, `TaskList`, `save`, `load`, and `renderApp`     |
| `import`                | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import)                             | Importing classes and helpers across files in `src/` and `test/` |
| `Window.localStorage`   | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)                                            | Browser storage that persists across page reloads                |
| `Storage.setItem()`     | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem)                                                | Storing the JSON string in `save(tasks)`                         |
| `Storage.getItem()`     | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem)                                                | Reading the saved JSON string (or `null`) in `load()`            |
| `Storage.clear()`       | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Storage/clear)                                                  | Resetting `localStorage` between tests in `beforeEach`           |
| `JSON.stringify()`      | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#tojson_behavior) | Serializing `Task` instances via their `toJSON()` method         |
| `JSON.parse()`          | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)                     | Parsing the stored JSON string back into an array                |
| `Array.prototype.map()` | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)                      | Turning parsed objects back into `Task` instances in `load()`    |

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

describe('storage (save and load)', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('returns an empty array when nothing has been saved', () => {
    expect(load(), 'empty localStorage returns []').toEqual([])
  })

  it('saves tasks and loads them back as Task instances', () => {
    const first = new Task('Read Chapter 8')
    const second = new Task('Add storage module')
    first.toggle()

    save([first, second])

    const loaded = load()
    expect(loaded.length, 'two tasks loaded').toBe(2)
    expect(loaded[0], 'loaded item is a Task instance').toBeInstanceOf(Task)
    expect(loaded[0].id, 'id is preserved').toBe(first.id)
    expect(loaded[0].done, 'done state is preserved').toBe(true)
    expect(loaded[1].text, 'second task text is preserved').toBe('Add storage module')
  })
})

describe('TaskList', () => {
  let list

  beforeEach(() => {
    localStorage.clear()
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
   - Split `src/app.js` into separate ES modules and implement `save(tasks)` and `load()` using
     `localStorage`.
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
