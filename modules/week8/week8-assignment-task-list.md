## Week 8 Assignment: Task List with Classes

This week you'll build a small **Task List** app with two ES6 classes:

1. **`Task`**: one to-do item. It holds its own data (`id`, `text`, `done`) and behavior
   (`toggle()`, `toHTML()`).
2. **`TaskList`**: manages an array of `Task` instances, renders them into a container, and handles
   clicks with **one** delegated listener, just like last week's Theme Switcher.

The tricky part this week is `this`. When the browser calls your click handler, `this` depends on
_how_ the function is called, as discussed in
[Get Started (2nd Edition), Chapter 3: Digging to the Roots of JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch3.md).
Use an arrow function when you attach the listener so `this` stays pointed at your `TaskList`.

We'll split this app into modules and save tasks to `localStorage` in Week 9, so keep your code
somewhere you can build on.

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
   - `constructor(id, text)` sets `this.id`, `this.text`, and `this.done = false`.
   - `toggle()` flips `done` between `true` and `false`.
   - `toHTML()` returns the HTML for one `<li>`:
     - the task text
     - a toggle button with `data-action="toggle"` and `data-id="${this.id}"`
     - a remove button with `data-action="remove"` and `data-id="${this.id}"`
     - done tasks should look different, for example with a `done` class and a line through the
       text, or a different button label
2. **`TaskList` class**:
   - `static isValidText(text)` returns `true` only when `text` has something other than spaces in
     it.
   - `constructor(container)` stores the container, starts with an empty `tasks` array, keeps a
     counter for the next task id, calls `render()`, and attaches **one** `click` listener to the
     container.
   - `add(text)` creates a new `Task` with the next id and adds it to `tasks`. **All methods should
     handle invalid situations**, for example:
     - `add()` ignores blank text
     - `toggle(id)` and `remove(id)` ignore ids that don't exist
   - `toggle(id)` toggles the matching task.
   - `remove(id)` removes the matching task.
   - `getRemainingCount()` returns how many tasks are not done yet.
   - `render()` writes to the container:
     - a text input and an **Add** button (`data-action="add"`)
     - the list of tasks, built from each task's `toHTML()`
     - a count, such as `2 of 3 tasks left`
3. **One delegated listener**:
   - Attach it once, in the constructor, using an arrow function:
     `(event) => this.handleClick(event)`.
   - In `handleClick(event)`, use `event.target.closest('button')`, convert the id with
     `parseInt(button.dataset.id, 10)`, and `switch` on `button.dataset.action`.
4. **`renderApp()`**:
   - Find `#app` and create a `TaskList` for it.
   - No global variables. Every piece of state lives on a `Task` or `TaskList` instance.
5. **Tests**:
   - Unit tests for `Task` and `TaskList` (`toggle()`, `isValidText()`, `add()`, `toggle(id)`,
     `remove(id)`, `getRemainingCount()`, including the invalid cases).
   - DOM tests for `renderApp()` that add, toggle, and remove a task by clicking buttons.

> 💡 **Testing `TaskList` without the page**: The constructor needs a container, but it doesn't have
> to be `#app`. In a unit test, `new TaskList(document.createElement('div'))` gives you a fresh,
> empty container each time.

---

### Some Helpful References

| Topic                    | Documentation                                                                                                 | Usefulness in this Assignment                       |
| :----------------------- | :------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------- |
| Classes                  | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)                     | `class`, `constructor`, methods                     |
| `static`                 | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static)              | `TaskList.isValidText(text)`                        |
| Arrow functions & `this` | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions)   | Keeping `this` in your delegated click listener     |
| `Array.prototype.find()` | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)   | Finding the task to toggle                          |
| `Array.prototype.filter` | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) | Removing a task; counting tasks that aren't done    |
| `String.prototype.trim`  | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim)  | Checking for blank text in `isValidText()`          |
| `HTMLInputElement.value` | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/value)                       | Reading the new task's text when **Add** is clicked |

---

### Suggested Example Tests

**NOTE: these are just starter tests from my own attempt at this project. You will likely need to
modify them to your own naming, exports, etc.**

```javascript
import { beforeEach, describe, it, expect } from 'vitest'
import { renderApp } from '../src/app.js'
import { Task } from '../src/task.js'
import { TaskList } from '../src/task-list.js'

describe('Task', () => {
  it('starts not done and toggles', () => {
    const task = new Task(1, 'Read Chapter 2')
    expect(task.done, 'new tasks start not done').toBe(false)

    task.toggle()
    expect(task.done, 'toggle marks done').toBe(true)

    task.toggle()
    expect(task.done, 'toggle again marks not done').toBe(false)
  })
})

describe('TaskList', () => {
  let list

  beforeEach(() => {
    list = new TaskList(document.createElement('div'))
  })

  it('validates text with a static method', () => {
    expect(TaskList.isValidText('Study'), 'normal text is valid').toBe(true)
    expect(TaskList.isValidText('   '), 'blank text is invalid').toBe(false)
  })

  it('adds tasks with unique ids and ignores blank text', () => {
    const first = list.add('Read')
    const second = list.add('Write')
    list.add('   ')

    expect(list.tasks.length, 'blank task is ignored').toBe(2)
    expect(first.id, 'ids are unique').not.toBe(second.id)
  })

  it('toggles and removes tasks by id', () => {
    const task = list.add('Read')
    list.add('Write')

    list.toggle(task.id)
    expect(list.getRemainingCount(), 'one task done').toBe(1)

    list.remove(task.id)
    expect(list.tasks.length, 'task removed').toBe(1)

    list.remove(999)
    expect(list.tasks.length, 'unknown id is ignored').toBe(1)
  })
})

describe('Task List DOM & Event Delegation', () => {
  let app

  function addTask(text) {
    app.querySelector('#new-task').value = text
    app.querySelector('button[data-action="add"]').click()
  }

  beforeEach(() => {
    renderApp()
    app = document.querySelector('#app')
  })

  it('adds a task when the Add button is clicked', () => {
    addTask('Buy milk')
    expect(app.querySelectorAll('[data-test-task]').length).toBe(1)
    expect(app.textContent).toContain('Buy milk')
  })

  it('toggles and removes a task', () => {
    addTask('Buy milk')

    app.querySelector('button[data-action="toggle"]').click()
    expect(app.querySelector('[data-test-remaining]').textContent).toContain('0 of 1')

    app.querySelector('button[data-action="remove"]').click()
    expect(app.querySelectorAll('[data-test-task]').length).toBe(0)
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
   scripts/mpf.sh week8
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
