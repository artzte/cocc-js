# Week 4 Lecture 1 Guide: Organization in JavaScript (Classes, Closures, and Modules)

**Reading**: _You Don't Know JS Yet: Get Started_ (2nd Edition) — Chapter 2: _Surveying JS_ ("How We
Organize in JS")  
**Format**: Interactive Lecture & Code Walkthrough (`examples/week4-organization/`)  
**Duration**: ~15–20 Minutes  
**Prereq Context**: Weeks 1–3 (values, types, variables, functions, and objects)

---

## Pacing & Timeline

| Time              | Section                                         | Focus                                                            |
| :---------------- | :---------------------------------------------- | :--------------------------------------------------------------- |
| **00:00 - 02:30** | **1. Why Organization Matters**                 | State management, encapsulation, escaping global namespace       |
| **02:30 - 05:00** | **2. Codebase Tour: The Course Filter App**     | Architecture of `week4-organization`, shared data and UI         |
| **05:00 - 09:00** | **3. Variant 1: ES6 Classes**                   | `class`, `constructor`, `this`, instantiating with `new`         |
| **09:00 - 13:00** | **4. Variant 2: Module Scoping**                | Native ES Modules, file-level private state, singletons          |
| **13:00 - 17:00** | **5. Variant 3: Functional Closures**           | Factory functions, closed-over lexical variables, public API     |
| **17:00 - 20:00** | **6. Swapping in `app.js` & Milestone Preview** | Identical API contracts, Vitest suite, Final Project Milestone 1 |

---

## 1. Why Organization Matters (2.5 mins)

### Talking Points & Concept Cues

- **Orientation**: Up through Week 3, code lived primarily in single scripts or small functions.
- **The Problem of Scale**: As applications grow beyond 50 lines:
  - Global variable collisions occur (multiple functions inadvertently overwriting the same state).
  - Code becomes difficult to reason about when any function can mutate any piece of data.
  - Reusability drops if business logic and DOM manipulation are tightly tangled together.
- **Kyle Simpson's Core Insight (_YDKJSY Ch2_)**: JavaScript organizes code using two primary
  patterns for grouping data and behavior:
  1. **Classes**: Definition-time templates where data and behavior live together on instances
     (`this`).
  2. **Modules & Closures**: Functions and files that expose a public interface while hiding
     internal implementation details and private state in lexical scope.
- **Python Bridge (CIS 122 Prereq)**: Students already know classes and functions from Python. In
  JavaScript, classes exist, but closures and native modules provide equally powerful ways to
  package code.

---

## 2. Codebase Tour: The Course Filter App (2.5 mins)

### Talking Points & Concept Cues

- Open `examples/week4-organization/` in your editor and start Vite: `npm run dev`.
- **The Application Goal**:
  - We have a list of courses in `src/data.js` (`id`, `code`, `title`, `credits`, `department`).
  - A form in `src/app.js` accepts a search string.
  - When submitted, the application matches the query against course fields and re-renders the
    table.
- **The Pedagogical Question**: How should we package the filtering logic?
  - We implemented the exact same feature three different ways in `src/`:
    1. `filter-class.js`
    2. `filter-classic-module.js`
    3. `filter-functional-closure.js`
- Let's examine how each variant packages its state.

---

## 3. Variant 1: ES6 Classes (`src/filter-class.js`) (4 mins)

### Talking Points & Concept Cues

- **Template for Instances**: Standard object-oriented approach in JavaScript since ES6 (2015).
- **Key Mechanics**:
  - `class CourseFilter { ... }` defines the blueprint.
  - `constructor()` runs once upon instantiation via `new CourseFilter()`.
  - State is attached directly to the instance on `this` (`this.data`, `this.normalizedData`).
  - Methods like `getFilteredCourses(filterString)` live on the prototype and access instance state
    via `this`.
- **Python Comparison (CIS 122)**:
  - Python: `def __init__(self): self.data = ...`
  - JavaScript: `constructor() { this.data = ... }`
  - In Python, `self` is explicitly passed; in JS, `this` is bound when called on an instance.
- **When to Use**: When you need multiple independent instances that hold distinct state or
  configuration.

```javascript
import COURSE_DATA from './data.js'

export class CourseFilter {
  constructor() {
    this.data = JSON.parse(JSON.stringify(COURSE_DATA))
    this.normalizedData = this.data.map((course) =>
      `${course.id}|${course.code}|${course.title}|${course.credits}|${course.department}`.toLowerCase(),
    )
  }

  getFilteredCourses(filterString) {
    const lowercasedFilterString = filterString.toLowerCase().trim()
    const { data } = this

    if (!lowercasedFilterString) return data

    const filteredCourses = this.normalizedData.map((item, i) =>
      item.includes(lowercasedFilterString) ? data[i] : null,
    )

    return filteredCourses.filter((course) => course)
  }
}
```

---

## 4. Variant 2: Module Scoping (`src/filter-classic-module.js`) (4 mins)

### Talking Points & Concept Cues

- **ES Modules (ESM) as State Boundaries**:
  - In ES Modules, top-level variables (`data`, `normalizedData`) are **scoped to the file**.
  - They are not global! External files cannot access or mutate them directly.
- **The Public Interface**:
  - Only `export function getFilteredCourses(...)` is exposed to the outside world.
  - Everything else is private internal implementation detail.
- **Singleton Nature**:
  - The module executes once when loaded. All importers share the same underlying state.
- **Classic Revealing Module Connection (_YDKJSY Ch2_)**:
  - Before native ESM (pre-2015), developers used IIFEs returning an object of functions to achieve
    this exact same encapsulation. Modern ESM gives us language-level support for this pattern.
- **When to Use**: Single-instance services, utilities, or shared data caches across an application.

```javascript
import COURSE_DATA from './data.js'

// Private module state — inaccessible outside this file
const data = JSON.parse(JSON.stringify(COURSE_DATA))
const normalizedData = data.map((course) =>
  `${course.id}|${course.code}|${course.title}|${course.credits}|${course.department}`.toLowerCase(),
)

// Public API
export function getFilteredCourses(filterString) {
  const lowercasedFilterString = filterString.toLowerCase().trim()

  if (!lowercasedFilterString) return data

  const filteredCourses = normalizedData.map((item, i) =>
    item.includes(lowercasedFilterString) ? data[i] : null,
  )
  return filteredCourses.filter((course) => course)
}
```

---

## 5. Variant 3: Functional Closures (`src/filter-functional-closure.js`) (4 mins)

### Talking Points & Concept Cues

- **What Is a Closure?**
  - A function's ability to remember and continue accessing variables from its outer (lexical)
    scope, **even after that outer function has finished executing**.
- **The "Backpack" Analogy**:
  - `filterBuilder()` creates local variables `data` and `normalizedData`.
  - It returns an object containing `getFilteredCourses`.
  - Even after `filterBuilder()` finishes running, `getFilteredCourses` keeps a live link
    ("backpack") to those private variables.
- **True Encapsulation Without Classes**:
  - No `this` keyword, no prototype chain, no classes required.
  - External code cannot access `data` directly—it can only call the methods returned in the object.
- **Factory Pattern**:
  - Every time `filterBuilder()` is called, it creates a brand new, independent closure with its own
    private state.

```javascript
import COURSE_DATA from './data.js'

export function filterBuilder() {
  // Private variables trapped inside this function's scope
  const data = JSON.parse(JSON.stringify(COURSE_DATA))
  const normalizedData = data.map((course) =>
    `${course.id}|${course.code}|${course.title}|${course.credits}|${course.department}`.toLowerCase(),
  )

  // Return public API object
  return {
    getFilteredCourses: (filterString) => {
      const lowercasedFilterString = filterString.toLowerCase().trim()

      if (!lowercasedFilterString) return data

      const filteredCourses = normalizedData.map((item, i) =>
        item.includes(lowercasedFilterString) ? data[i] : null,
      )
      return filteredCourses.filter((course) => course)
    },
  }
}
```

---

## 6. Swapping in `app.js` & Final Project Preview (3 mins)

### Talking Points & Concept Cues

- **The Golden Takeaway: Interchangeable Interfaces**:
  - In `src/app.js`, look at the submit handler:
    ```javascript
    const filterString = event.target.querySelector('[name="filter"]').value

    const filteredCourses = filterObject.getFilteredCourses(filterString)
    // const filteredCourses = moduleGetFilteredCourses(filterString)
    // const filteredCourses = functionalGetFilteredCourses(filterString)

    renderCourses(div, filteredCourses)
    ```
  - Toggle the comments live in the browser. The UI works identically regardless of which variant is
    active!
  - Good software architecture means the caller (`app.js`) only depends on the **public contract**
    (`getFilteredCourses(str) => Array`), not the internal implementation details.
- **Proof in Vitest**:
  - Run `npm test` in the terminal.
  - Open `test/filters.test.js`: all three variants run against the exact same test cases
    (`examples`), and all three pass!
- **Connecting to Final Project Requirements**:
  - In Week 4, **Project Milestone 1 (Proposal)** is due!
  - Final project architectural requirements include:
    1. Vanilla JS (no frameworks).
    2. **At least 4 ES modules** with clear separation of concerns.
    3. **At least 1 ES6 class**.
    4. Unit tests in Vitest.
  - The organization patterns in this example are the direct building blocks for your project
    architecture.
- **Next Lecture Preview**: Iteration in JavaScript — Arrays, loops, the Iterator Protocol, and
  higher-order methods (`map`, `filter`, `reduce`).
