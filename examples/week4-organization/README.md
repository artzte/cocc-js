# Week 4 Example: Organization in JavaScript

This project demonstrates three different architectural patterns for organizing state and behavior
in JavaScript to solve the exact same problem: **filtering course data**.

1. **ES6 Class** (`src/filter-class.js`)
2. **ES Module / File-Scoped State** (`src/filter-classic-module.js`)
3. **Functional Closure / Factory Function** (`src/filter-functional-closure.js`)

All three implementations satisfy the same contract: they take a search query string and return
matching course objects.

---

## Quick Start

```bash
# Install dependencies (from this directory)
npm install

# Start the Vite dev server
npm run dev

# Run Vitest unit tests (verifies all three variants pass identical tests)
npm test
```

---

## The Three Organization Patterns

### 1. ES6 Class (`src/filter-class.js`)

Encapsulates data on instance properties (`this.data`, `this.normalizedData`) initialized in a
constructor. Instantiated using the `new` keyword.

```javascript
import { CourseFilter } from './filter-class.js'

const filter = new CourseFilter()
const results = filter.getFilteredCourses('python')
```

- **When to use**: When you need multiple independent instances that share methods and have their
  own distinct lifecycle or configuration.

---

### 2. Module Scoping (`src/filter-classic-module.js`)

Uses the native ES module boundary to hide state. `data` and `normalizedData` are top-level module
variables—completely invisible outside the file. Only the function `getFilteredCourses` is exported.

```javascript
import { getFilteredCourses } from './filter-classic-module.js'

const results = getFilteredCourses('python')
```

- **When to use**: When an application requires a single shared state or utility service across the
  application (singleton pattern).

---

### 3. Functional Closure (`src/filter-functional-closure.js`)

Uses a factory function (`filterBuilder()`) that defines private local variables and returns a
public API object whose methods close over those variables.

```javascript
import { filterBuilder } from './filter-functional-closure.js'

const filterApi = filterBuilder()
const results = filterApi.getFilteredCourses('python')
```

- **When to use**: When you want private state without classes or `this` binding, or when generating
  customized handler/filtering functions.

---

## Swapping Variants in `src/app.js`

In `src/app.js`, notice how the consumer can switch between the three implementations by toggling
comments in the form submit handler:

```javascript
// Variant 1: ES6 Class instance
const filteredCourses = filterObject.getFilteredCourses(filterString)

// Variant 2: Module function
// const filteredCourses = moduleGetFilteredCourses(filterString)

// Variant 3: Functional closure method
// const filteredCourses = functionalGetFilteredCourses(filterString)
```

Because all three expose the exact same interface (`getFilteredCourses(filterString)`), the UI
rendering logic doesn't know or care which organization strategy is being used.

---

## Project Structure

```
week4-organization/
├── index.html                           # Host page with #app
├── package.json
├── vite.config.js
├── src/
│   ├── app.js                          # UI logic and form event handling
│   ├── data.js                         # Raw course array
│   ├── filter-class.js                 # Variant 1: ES6 Class
│   ├── filter-classic-module.js        # Variant 2: ES Module
│   ├── filter-functional-closure.js    # Variant 3: Closure Factory
│   └── common/
│       ├── main.js                     # Vite entry point
│       └── style.css                   # Minimal styles
└── test/
    ├── setup.js                        # jsdom environment setup
    ├── starter.test.js                 # App mounting tests
    └── filters.test.js                 # Vitest suite testing all 3 variants
```
