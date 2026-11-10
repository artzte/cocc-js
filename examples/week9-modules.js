// ====================================================================
// CIS 133JS — Week 9: Modules and localStorage
// Namespaces vs. data structures vs. modules, classic modules (IIFE
// singleton and module factory), ES module boundaries, and persisting
// Task instances with localStorage
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
// DEMO 2: Classic Modules — Singleton IIFE and Module Factory
// --------------------------------------------------------------------
function classicModuleDemo() {
  header('2. Classic Modules (Singleton IIFE & Module Factory)')

  // 2a. Singleton IIFE: runs once, keeps `records` private in lexical scope,
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

  const tabs = createSelectionStore(['Home', 'Tasks', 'About'])
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
  //   src/storage.js   -> keeps `STORAGE_KEY` private; exports `save`, `load`
  //   src/task-list.js -> imports `Task`; exports `class TaskList`
  //   src/app.js       -> imports `TaskList`, `load`, `save`; exports `renderApp`
  //
  // Notice how `STORAGE_KEY` in `src/storage.js` is not exported. No other
  // file can accidentally misspell the key or read raw JSON behind `storage.js`'s
  // back — that is POLE applied at the file level.

  console.log(
    'Each ES module file is its own scope: top-level variables stay private unless exported.',
  )
}

// --------------------------------------------------------------------
// DEMO 4: Persisting Task Instances with localStorage
// --------------------------------------------------------------------
function localStorageDemo() {
  header('4. Persisting Task Instances with localStorage')

  const storage = getStorage()
  const STORAGE_KEY = 'cis133js.week9.demo.tasks'

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

    static fromJSON(taskJson) {
      return new Task(taskJson.text, taskJson.done, taskJson.id)
    }
  }

  // Matches the `save` and `load` functions in src/storage.js
  function save(tasks) {
    storage.setItem(STORAGE_KEY, JSON.stringify(tasks))
  }

  function load() {
    const raw = storage.getItem(STORAGE_KEY)
    if (!raw) return []

    return JSON.parse(raw).map((taskJson) => Task.fromJSON(taskJson))
  }

  // Start clean, save two tasks, then load them back as real Task instances
  storage.removeItem(STORAGE_KEY)
  console.log('load() when storage is empty:', load()) // []

  const first = new Task('Read Chapter 8')
  const second = new Task('Split app.js into modules')
  first.toggle()

  save([first, second])
  console.log('Raw JSON in storage:', storage.getItem(STORAGE_KEY))

  const restored = load()
  console.log('restored[0] instanceof Task:', restored[0] instanceof Task) // true
  console.log(
    'restored[0].text, restored[0].done:',
    restored[0].text,
    restored[0].done,
  )

  // Because load() rebuilt each item with Task.fromJSON(), methods work:
  restored[1].toggle()
  console.log('After restored[1].toggle():', restored[1].done) // true
}

// --------------------------------------------------------------------
// DEMO 5: Debug Challenge — Why Doesn't task.toggle() Work After Load?
// --------------------------------------------------------------------
// `debugChallenge()` saves a task and loads it back, then tries to call
// `loaded[0].toggle()`. Watch the TypeError in the console, inspect what
// `brokenLoad()` returned, and fix `brokenLoad()` so it returns `Task`
// instances instead of plain objects.
function debugChallenge() {
  header('5. Debug Challenge')

  const storage = getStorage()
  const CHALLENGE_KEY = 'cis133js.week9.challenge.tasks'

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

    static fromJSON(taskJson) {
      return new Task(taskJson.text, taskJson.done, taskJson.id)
    }
  }

  function save(tasks) {
    storage.setItem(CHALLENGE_KEY, JSON.stringify(tasks))
  }

  // Buggy: JSON.parse() returns plain `{ id, text, done }` objects, not Task instances!
  function brokenLoad() {
    const raw = storage.getItem(CHALLENGE_KEY)
    if (!raw) return []

    return JSON.parse(raw)
  }

  save([new Task('Fix brokenLoad()')])

  const loaded = brokenLoad()
  console.log('loaded[0]:', loaded[0])
  console.log('loaded[0] instanceof Task:', loaded[0] instanceof Task)

  try {
    loaded[0].toggle()
    console.log('Success! loaded[0].done is now:', loaded[0].done)
  } catch (err) {
    console.log('loaded[0].toggle() failed:', err.name, '-', err.message)
  }
}

// --------------------------------------------------------------------
// Run all demos
// --------------------------------------------------------------------
namespaceAndDataStructureDemo()
classicModuleDemo()
esModuleBoundariesDemo()
localStorageDemo()
debugChallenge()
