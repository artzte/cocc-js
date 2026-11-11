// ====================================================================
// CIS 133JS — Week 9: Modules and localStorage
// Namespaces vs. data structures vs. modules, classic modules
// (Immediately Invoked Function Expression (IIFE) singleton and module
// factory), ES module boundaries, and decoupling TaskList from
// localStorage with registerOnChange(save)
// ====================================================================

// --------------------------------------------------------------------
// Setup for Chrome DevTools Snippets:
// 1. Open Google Chrome to a blank tab (about:blank) or any http(s) page.
//    (Note: localStorage requires an http/https origin such as your
//    running `npm start` tab at http://localhost:5173; on about:blank,
//    the snippet automatically falls back to an in-memory storage shim
//    if the browser blocks localStorage.)
// 2. Open DevTools (F12 or Ctrl+Shift+I / Cmd+Option+I).
// 3. Switch to the "Sources" tab.
// 4. In the left panel, click "Snippets" (or press Ctrl+Shift+P / Cmd+Shift+P
//    and type "Create snippet").
// 5. Name the snippet "week9-modules.js".
// 6. Paste this code into the editor.
// 7. Press Ctrl+S (Cmd+S) to save, and Ctrl+Enter (Cmd+Enter) to run.
// --------------------------------------------------------------------

function header(title) {
  console.log(
    `\n%c=== ${title} ===`,
    'color: #10b981; font-weight: bold; font-size: 13px;',
  )
}

function getStorage() {
  try {
    const testKey = '__cis133js_test__'
    window.localStorage.setItem(testKey, '1')
    window.localStorage.removeItem(testKey)
    return window.localStorage
  } catch {
    // Fallback when run on about:blank where localStorage may be disabled
    const memory = new Map()
    return {
      getItem: (key) => (memory.has(key) ? memory.get(key) : null),
      setItem: (key, value) => memory.set(key, String(value)),
      removeItem: (key) => memory.delete(key),
    }
  }
}

// --------------------------------------------------------------------
// Shared Task and TaskList classes
// --------------------------------------------------------------------
// These match the Week 9 assignment's src/task.js and src/task-list.js.
// They are defined once here because the last two demos (4 and 5) both
// use them.
class Task {
  #id = null
  #text = null
  #done = false

  constructor(text, done = false, id = null) {
    this.#text = text
    this.#done = done
    this.#id = id || crypto.randomUUID()
  }

  get id() {
    return this.#id
  }

  get text() {
    return this.#text
  }

  get done() {
    return this.#done
  }

  toggle() {
    this.#done = !this.#done
  }

  toJSON() {
    const { id, text, done } = this
    return { id, text, done }
  }
}

class TaskList {
  #tasks = []
  #onChange = null

  constructor(tasksInit = []) {
    tasksInit.forEach((task) => this.add(task.text, task.done, task.id))
  }

  get tasks() {
    return [...this.#tasks]
  }

  registerOnChange(callback) {
    this.#onChange = callback
  }

  #notifyChange() {
    this.#onChange?.(this.#tasks.map((task) => task.toJSON()))
  }

  add(taskText, done = false, id = null) {
    const text = taskText.trim()
    if (!text) return

    const task = new Task(text, done, id)
    this.#tasks.push(task)
    this.#notifyChange()
    return task
  }
}

// --------------------------------------------------------------------
// DEMO 1: Namespace vs. Data Structure (Not Quite Modules)
// --------------------------------------------------------------------
function namespaceAndDataStructureDemo() {
  header('1. Namespace vs. Data Structure')

  // 1a. Namespace: stateless grouping of helper functions.
  // Useful for organization, but there is no state to protect.
  const TextUtils = {
    isValidText(text) {
      return typeof text === 'string' && text.trim().length > 0
    },
    formatCount(remaining, total) {
      if (total === 0) return 'No tasks as of yet'
      if (remaining === 0) return 'No tasks left to do'
      return `${remaining} of ${total} tasks left to do`
    },
  }

  console.log('TextUtils.isValidText("  "):', TextUtils.isValidText('  '))
  console.log('TextUtils.formatCount(1, 3):', TextUtils.formatCount(1, 3))

  // 1b. Data Structure: bundles state and methods together, but everything
  // is public. Any caller can reach in and corrupt `records`.
  //
  // This looks a lot like a class definition, but without an easy way to
  // make new instances. To get a second one with its own records, you
  // would have to copy it by hand and override `records`:
  //   const sds = { ...StudentDataStructure, records: [...] }
  const StudentDataStructure = {
    records: [
      { id: 14, name: 'Kyle', grade: 86 },
      { id: 73, name: 'Suzy', grade: 87 },
    ],
    getName(studentId) {
      const student = this.records.find((record) => record.id === studentId)
      return student ? student.name : null
    },
  }

  console.log(
    'StudentDataStructure.getName(73):',
    StudentDataStructure.getName(73),
  )

  // Nothing stops outside code from wiping out the array directly:
  StudentDataStructure.records.length = 0
  console.log(
    'After StudentDataStructure.records.length = 0:',
    StudentDataStructure.getName(73),
  )
}

// --------------------------------------------------------------------
// DEMO 2: Classic Modules — Singleton Immediately Invoked Function
// Expression (IIFE) and Module Factory
// --------------------------------------------------------------------
function classicModuleDemo() {
  header('2. Classic Modules (Singleton IIFE & Module Factory)')

  // 2a. Singleton Immediately Invoked Function Expression (IIFE): the
  // function is called right where it is defined, so it runs once, keeps `records` private in lexical scope,
  // and returns a public API whose functions close over `records`.
  const Student = (function defineStudent() {
    const records = [
      { id: 14, name: 'Kyle', grade: 86 },
      { id: 73, name: 'Suzy', grade: 87 },
      { id: 112, name: 'Frank', grade: 75 },
    ]

    function getName(studentId) {
      const student = records.find((record) => record.id === studentId)
      return student ? student.name : null
    }

    return { getName }
  })()

  console.log('Student.getName(73):', Student.getName(73)) // Suzy
  console.log('Student.records:', Student.records) // undefined (private!)

  // 2b. Module Factory: a normal function that produces a new module
  // instance each time it is called.
  function createSelectionStore(items) {
    let selectedIndex = 0

    function current() {
      return items[selectedIndex]
    }

    function select(index) {
      if (index < 0 || index >= items.length) return
      selectedIndex = index
    }

    return { current, select }
  }

  const tabs = createSelectionStore(['Home', 'Tasks', 'Done'])
  const filters = createSelectionStore(['All', 'Active', 'Done'])

  tabs.select(1)
  console.log('tabs.current():', tabs.current()) // Tasks
  console.log('filters.current():', filters.current()) // All (separate closure)
}

// --------------------------------------------------------------------
// DEMO 3: From One File to ES Modules (Responsibility Boundaries)
// --------------------------------------------------------------------
function esModuleBoundariesDemo() {
  header('3. ES Module Boundaries & Public APIs')

  // In a Vite project, each file is its own ES module:
  //
  //   src/task.js      -> exports `class Task`
  //   src/task-list.js -> imports `Task`; exports `class TaskList`
  //   src/storage.js   -> keeps `STORAGE_KEY` private; exports `save`, `load`
  //   src/app.js       -> imports `TaskList`, `load`, `save`; wires them together
  //
  // Notice that `task-list.js` does not import `storage.js`, and `storage.js`
  // does not import `Task` or `TaskList`. Only `app.js` connects them via
  // `taskList.registerOnChange(save)`.

  console.log(
    'Each ES module file is its own scope: top-level variables stay private unless exported.',
  )
}

// --------------------------------------------------------------------
// DEMO 4: Decoupling TaskList and localStorage with registerOnChange
// --------------------------------------------------------------------
function localStorageDemo() {
  header('4. Decoupling TaskList and localStorage with registerOnChange')

  // Use the browser's real localStorage when it is available, or the
  // in-memory shim from getStorage() (top of this file) when it isn't
  const storage = getStorage()
  const STORAGE_KEY = 'cis133js.week9.demo.tasks'

  // Task and TaskList come from the shared section at the top of this file

  // Matches `save` and `load` in src/storage.js (no dependency on Task!)
  function save(tasks) {
    storage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }

  function load() {
    const raw = storage.getItem(STORAGE_KEY)
    if (!raw) return []

    return JSON.parse(raw)
  }

  storage.removeItem(STORAGE_KEY)
  console.log('load() when storage is empty:', load()) // []

  // Wire TaskList to storage by passing `save` as a first-class function
  const list = new TaskList(load())
  list.registerOnChange(save)

  list.add('Read Chapter 8')
  list.add('Split app.js into modules')
  console.log('Raw JSON in storage:', storage.getItem(STORAGE_KEY))

  // Simulate a page reload by passing load() into a brand-new TaskList
  const reloadedList = new TaskList(load())
  console.log('reloadedList.tasks.length:', reloadedList.tasks.length) // 2
  console.log('reloadedList.tasks[0].text:', reloadedList.tasks[0].text)
}

// --------------------------------------------------------------------
// DEMO 5: Debug Challenge — Passing a Function vs. Calling It
// --------------------------------------------------------------------
// `debugChallenge()` tries to wire `save` to `taskList.registerOnChange`,
// then adds a task. Instead of saving the new task, storage holds
// `"undefined"` and `load()` fails! Find the bug on the
// `registerOnChange` line and fix it.
function debugChallenge() {
  header('5. Debug Challenge')

  // Real localStorage, or the in-memory shim from getStorage()
  const storage = getStorage()
  const CHALLENGE_KEY = 'cis133js.week9.challenge.tasks'

  function save(tasks) {
    storage.setItem(CHALLENGE_KEY, JSON.stringify(tasks))
  }

  storage.removeItem(CHALLENGE_KEY)

  const taskList = new TaskList()

  // Buggy: why does this write "undefined" to storage right now and
  // never save when taskList.add() runs?
  taskList.registerOnChange(save())

  taskList.add('Fix registerOnChange')
  console.log('Stored value in CHALLENGE_KEY:', storage.getItem(CHALLENGE_KEY))
}

// --------------------------------------------------------------------
// Run all demos
// --------------------------------------------------------------------
namespaceAndDataStructureDemo()
classicModuleDemo()
esModuleBoundariesDemo()
localStorageDemo()
debugChallenge()
