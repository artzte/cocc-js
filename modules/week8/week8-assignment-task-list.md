## Week 8 Assignment: Task List with Classes

This week you'll build a small **Task List** app with two ES6 classes:

1. **`Task`**: one to-do item. It keeps its data (`id`, `text`, `done`) in **private fields**, shows
   it through **getters**, and knows how to turn itself into JSON and back.
2. **`TaskList`**: manages a private array of `Task` instances, renders them into a container, and
   handles clicks with **one** delegated listener, just like last week's Theme Switcher.

There are two ideas to watch for this week:

- **`this`**: When the browser calls your click handler, `this` depends on _how_ the function is
  called, as discussed in
  [Get Started (2nd Edition), Chapter 3: Digging to the Roots of JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch3.md).
  Use an arrow function when you attach the listener so `this` stays pointed at your `TaskList`.
- **Privacy**: Last week we said closures give you private state and classes don't. Private fields
  (`#done`) change that. Outside code can read `task.done` through a getter, but the only way to
  change it is `task.toggle()`.

In Week 9 we'll split this app into modules and save tasks to `localStorage`. That's what `toJSON()`
and `fromJSON()` are for, so keep your code somewhere you can build on.

Submit the URL of your pull request adding this assignment to your `projects/week8` folder in your
repo. Be sure to tag me, **artzte**, as a reviewer on your PR.

---

### Wireframe

```text
+-----------------------------------------------------------+
|  Task List                                                |
|                                                           |
|  [ What needs doing?            ]  [ Add ]                |
|                                                           |
|  - Read Get Started Chapter 2        [ Done ]  [ Remove ] |
|  - ~~Watch the Week 8 lecture~~      [ Undo ]  [ Remove ] |
|  - Start the Week 8 quiz             [ Done ]  [ Remove ] |
|                                                           |
|  2 of 3 tasks left                                        |
+-----------------------------------------------------------+
```

---

### Requirements

1. **`Task` class**:
   - Private fields `#id`, `#text`, and `#done`.
   - `constructor(text, id = crypto.randomUUID(), done = false)`:
     - a new task gets a fresh unique id from
       [`crypto.randomUUID()`](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID)
     - passing an `id` and `done` lets you rebuild a saved task
   - Getters `id`, `text`, and `done`, with **no setters**. `task.done` can be read but not
     assigned.
   - `toggle()` flips `done` between `true` and `false`.
   - `toJSON()` returns a plain object: `{ id, text, done }`.
   - `static fromJSON(data)` takes that plain object and returns a new `Task`.
   - `toHTML()` returns the HTML for one `<li>`:
     - the task text
     - a toggle button with `data-action="toggle"`
     - a remove button with `data-action="remove"`
     - some reference to the taskId, to be used by event handlers to target the right task
     - completed tasks should look different from unfinished tasks
2. **`TaskList` class**:
   - Private fields for the container and the tasks array (`#tasks = []`).
   - `constructor(container)` stores the container and an optional starting list of tasks
   - `get tasks()` returns a **copy** of the array (`[...this.#tasks]`), so outside code can't add
     to or remove from the real one.
   - `get remainingCount()` returns how many tasks are not done yet.
   - `add(text)` creates a new `Task` and adds it to the list. **All methods should handle invalid
     situations**, for example:
     - `add()` ignores blank text
     - `toggle(id)` and `remove(id)` ignore ids that don't exist
   - `toggle(id)` toggles the matching task.
   - `remove(id)` removes the matching task.
   - `render()` renders the markup into the container:
     - a text input and an **Add** button (`data-action="add"`)
     - the list of tasks, built from each task's `toHTML()`
     - a count, such as `2 of 3 tasks left`
   - `attachHandlers()` sets up the event handlers
3. The `taskList.attachHandlers` will add **one delegated listener for the buttons**, and possibly a
   second one for the submit event for the task form.
   - Attach them once to the container rendered by the `TaskList`, or a higher-level wrapping
     container such as `#app`
   - In the handler, use `event.target.closest('button')`, and from that button, get the task ID by
     using eg `button.closest('[data-task-id'])`
4. **`renderApp()`**:
   - Find `#app` and create a `TaskList` for it.
   - Attach your event listeners
5. **Tests**:
   - Unit tests for `Task`: `toggle()`, unique ids, read-only getters, and a `toJSON()` /
     `fromJSON()` round trip.
   - Unit tests for `TaskList`: `add()`, `toggle(id)`, `remove(id)`, `remainingCount`, and the
     `tasks` copy, including the invalid cases.
   - DOM tests for `renderApp()` that add, toggle, and remove a task by clicking buttons.

> 💡 **Why `toJSON()`?** `JSON.stringify()` skips private fields, so `JSON.stringify(task)` would
> give you `'{}'`. But if an object has a `toJSON()` method, `JSON.stringify()` calls it
> automatically and uses whatever it returns.

> 💡 **`crypto.randomUUID()` and the browser**: Browsers only allow it on secure pages. `npm start`
> (`localhost`) works.

---

### Some Helpful References

| Topic                             | Documentation                                                                                                                   | Usefulness in this Assignment                       |
| :-------------------------------- | :------------------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------- |
| Classes                           | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)                                       | `class`, `constructor`, methods                     |
| Private properties                | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties)                    | `#id`, `#text`, `#done`, `#tasks`, `#handleClick()` |
| `get`                             | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)                                 | `task.done`, `list.tasks`, `list.remainingCount`    |
| `static`                          | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static)                                | `TaskList.isValidText(text)`, `Task.fromJSON(data)` |
| `JSON.stringify()` and `toJSON()` | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#tojson_behavior) | How `toJSON()` gets called automatically            |
| `crypto.randomUUID()`             | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/randomUUID)                                              | Generating a unique id for each new task            |
| Arrow functions & `this`          | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)                     | Keeping `this` in your delegated click listener     |
| `Array.prototype.find()`          | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)                     | Finding the task to toggle                          |
| `Array.prototype.filter()`        | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)                   | Removing a task; counting tasks that aren't done    |
| `String.prototype.trim()`         | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim)                    | Checking for blank text in `isValidText()`          |
| `HTMLInputElement.value`          | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/value)                                         | Reading the new task's text when **Add** is clicked |

---

### Suggested Example Tests

**NOTE: these are just starter tests from my own attempt at this project. You will likely need to
modify them to your own naming, exports, etc.**

```javascript
import { beforeEach, describe, it, expect } from 'vitest'
import { Task, TaskList, renderApp } from '../src/app.js'

describe('Task', () => {
  it('starts not done and toggles', () => {
    const task = new Task('Read Chapter 2')
    expect(task.done, 'new tasks start not done').toBe(false)

    task.toggle()
    expect(task.done, 'toggle marks done').toBe(true)

    task.toggle()
    expect(task.done, 'toggle again marks not done').toBe(false)
  })

  it('generates a unique id for each task', () => {
    const first = new Task('Read')
    const second = new Task('Write')
    expect(typeof first.id, 'id is a string').toBe('string')
    expect(first.id, 'ids are unique').not.toBe(second.id)
  })

  it('keeps its fields private behind getters', () => {
    const task = new Task('Read')
    expect(() => {
      task.done = true
    }, 'done has a getter but no setter').toThrow(TypeError)
    expect(task.done, 'done is unchanged').toBe(false)
  })

  it('converts to and from JSON', () => {
    const task = new Task('Read')
    task.toggle()

    const data = JSON.parse(JSON.stringify(task))
    expect(data, 'toJSON() is used by JSON.stringify').toEqual({
      id: task.id,
      text: 'Read',
      done: true,
    })

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

  it('adds tasks and ignores blank text', () => {
    list.add('Read')
    list.add('Write')
    list.add('   ')
    expect(list.tasks.length, 'blank task is ignored').toBe(2)
  })

  it('does not let outside code change the private tasks array', () => {
    list.add('Read')
    list.tasks.push(new Task('Sneaky'))
    expect(list.tasks.length, 'tasks getter returns a copy').toBe(1)
  })

  it('toggles and removes tasks by id', () => {
    const task = list.add('Read')
    list.add('Write')

    list.toggle(task.id)
    expect(list.remainingCount, 'one task done').toBe(1)

    list.remove(task.id)
    expect(list.tasks.length, 'task removed').toBe(1)

    list.remove('no-such-id')
    expect(list.tasks.length, 'unknown id is ignored').toBe(1)
  })

  it('yields expected summaryText', () => {
    const taskList = new TaskList(document.createElement('div'))

    expect(taskList.summaryText).toMatch(/No tasks as of yet/)

    const task = taskList.add('boo')
    expect(taskList.summaryText).toMatch(/1 of 1 tasks/)

    taskList.toggle(task.id)
    expect(taskList.summaryText).toMatch(/No tasks left/)
  })
})

describe('Task List DOM & Event Delegation', () => {
  let app

  function addTask(text) {
    app.querySelector('#new-task input').value = text
    // clicking a submit button fires 'submit'; form.submit() does not
    app.querySelector('#new-task button[type="submit"]').click()
  }

  function taskCount() {
    return app.querySelectorAll('[data-task-id]').length
  }

  beforeEach(() => {
    renderApp()
    app = document.querySelector('#app')
  })

  it('adds a task when the Add button is clicked', () => {
    const before = taskCount()
    addTask('Buy milk')
    expect(taskCount(), 'one task added').toBe(before + 1)
    expect(app.textContent, 'new task text is shown').toContain('Buy milk')
  })

  it('ignores a blank task', () => {
    const before = taskCount()
    addTask('   ')
    expect(taskCount(), 'blank task was not addes').toBe(before)
  })

  it('toggles and removes a task', () => {
    const before = taskCount()

    addTask('Buy milk')

    app.querySelector('button[data-action="toggle"]').click()
    expect(app.querySelector('.summary').innerText).toContain('No tasks left')

    app.querySelector('button[data-action="remove"]').click()
    expect(taskCount()).toBe(before)
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
2. **Create a `week8` branch**:
   ```bash
   git checkout -b week8
   ```
3. **Run the `mpf.sh` script to create your `week8` project**:
   ```bash
   npm run weekly:create week8
   ```
4. **Stage, commit, and push the generated project files**:
   ```bash
   git add projects/week8
   git commit -m "feat(week8): scaffold week8 project workspace"
   git push -u origin week8
   ```
5. **Work on the exercise**:
   - Navigate to `projects/week8` and install dependencies:
     ```bash
     cd projects/week8
     npm install
     ```
   - Implement `Task`, `TaskList`, and `renderApp`
   - Write your unit and DOM tests
6. **Commit updates, verify everything is working, and push fixes**:
   - Preview your application in the browser:
     ```bash
     npm start
     ```
   - Run tests and linter to verify your code:
     ```bash
     npm test
     npm run lint
     ```
   - Clean up your formatting:
     ```bash
     npm run format
     ```
   - Stage, commit, and push your changes.
7. **Open a Pull Request**: Open a pull request on GitHub comparing `week8` against `main`, and
   request **artzte** as a reviewer.
8. **Submit on Canvas**: Copy the URL of your PR, paste it into the Canvas assignment submission
   box, and submit it.
9. **Deadline**: This programming assignment is due by **Monday, November 16, 2026 at 11:59 PM**
   (the Monday following Week 8).
