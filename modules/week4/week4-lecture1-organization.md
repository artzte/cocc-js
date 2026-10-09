## Organization in JavaScript: Classes, Closures, and Modules

This lecture explores how we organize JavaScript programs into modular, reusable, and maintainable
structures: **ES6 classes**, **functional closures**, and native **ES modules**. While our reading
from _You Don't Know JS Yet: Get Started_ (Chapter 2: _How We Organize in JS_) provides deep
architectural background on how the JavaScript engine treats objects and lexical scopes, this
lecture connects those patterns directly to browser architecture, practical component design, and
our upcoming Final Project.

---

### Key Lecture Topics

1. **The Challenge of Code Organization**: Why simple monolithic scripts break down as programs grow
   beyond 50 lines (variable collisions, global namespace pollution, lack of encapsulation, tight
   coupling).
2. **ES6 Classes**: Definition templates using `class`, `constructor`, `this`, and instantiating
   instances with `new`. Understanding shared prototype methods and inheritance (`extends`,
   `super`).
3. **Module Scoping (ES Modules)**: Native file-scoped privacy with `import` and `export`—how ESM
   prevents variables from polluting the global scope without extra boilerplate or wrappers.
4. **Functional Closures**: Factory functions returning public API objects that close over private
   variables in outer lexical scope, providing true data privacy.
5. **Architectural Parity**: How classes, modules, and closures can fulfill identical interface
   contracts (demonstrated in `examples/week4-organization/`).
6. **Application to the Final Project**: Meeting the course architectural requirements (at least 4
   ES modules and 1 ES6 class) introduced in Milestone 1 this week.

---

### Code Organization Patterns Overview

JavaScript provides three primary mechanisms for packaging data and behavior together:

| Pattern                 | How State is Held                                    | Data Encapsulation / Privacy                               | Instantiation                                  | Best Used For                                         |
| :---------------------- | :--------------------------------------------------- | :--------------------------------------------------------- | :--------------------------------------------- | :---------------------------------------------------- |
| **ES6 Classes**         | Instance properties on `this` (or `#private` fields) | Public by default; `#field` for private state              | Instantiated with `new ClassName()`            | Multiple stateful instances modeling domain entities  |
| **ES Modules (ESM)**    | File-scoped top-level variables                      | Module-scoped by default; only `export`ed items are public | Loaded via `import` statements (singletons)    | Organizing application layers, utilities, API clients |
| **Functional Closures** | Variables in outer function's lexical scope          | True privacy via lexical scope (unreachable outside)       | Invoking a factory function (`createFilter()`) | Encapsulating private state without classes or `this` |

#### 1. ES6 Classes

Classes provide an object-oriented template for grouping state and methods:

```javascript
class CourseFilter {
  constructor(courses) {
    this.courses = courses
  }

  filter(query) {
    const q = query.toLowerCase()
    return this.courses.filter(
      (c) => c.title.toLowerCase().includes(q) || c.department.toLowerCase().includes(q),
    )
  }
}

const filterInstance = new CourseFilter(coursesData)
```

#### 2. Native ES Modules

ES Modules make each file an isolated scope. Any variable not exported is completely private to that
file:

```javascript
// filter-module.js
let allCourses = []

export function init(courses) {
  allCourses = courses
}

export function filter(query) {
  const q = query.toLowerCase()
  return allCourses.filter(
    (c) => c.title.toLowerCase().includes(q) || c.department.toLowerCase().includes(q),
  )
}
```

#### 3. Functional Closures

A factory function returns an object whose methods retain access to variables in the outer function
scope:

```javascript
function createCourseFilter(courses) {
  // `courses` is trapped in the lexical closure — private to the outside world
  return {
    filter(query) {
      const q = query.toLowerCase()
      return courses.filter(
        (c) => c.title.toLowerCase().includes(q) || c.department.toLowerCase().includes(q),
      )
    },
  }
}

const myFilter = createCourseFilter(coursesData)
```

---

### Resources & References

- **Lecture Guide & Walkthrough**:
  - [Week 4 Lecture 1 Guide: Organization (Classes, Closures, Modules)](../../lectures/week4-lecture1-organization.md)
- **Textbook Readings**:
  - _You Don't Know JS Yet: Get Started_, Chapter 2 (_Surveying JS_ — How We Organize in JS)
  - [Week 4 Reading Summary](../../weekly-readings/week-04.md)
- **Interactive Code & Demos**:
  - [Week 4 Organization Example Repository & Tour](../../examples/week4-organization/README.md)
  - Code variants: `filter-class.js`, `filter-classic-module.js`, and `filter-functional-closure.js`
    in `examples/week4-organization/src/`
- **Related Course Milestones**:
  - [Final Project Milestone 1: Project Proposal](week4-assignment-project-proposal.md)
