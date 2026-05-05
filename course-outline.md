# CIS 133JS — Introduction to JavaScript
## 12-Week Course Outline

---

## Course Overview

This course teaches JavaScript fundamentals using *You Don't Know JS Yet* (YDKJSY) as the primary text, with all exercises and projects grounded in browser programming and DOM manipulation. Students learn the language deeply — scope, closures, types, modules, async — and apply that knowledge directly to interactive web development. HTML5 APIs and DOM methods are explored by students via MDN; lectures focus on the JS language itself.

**Prerequisites**: CIS 122 (intro programming, Python)
**Assumed background**: basic program logic (variables, conditionals, loops, functions); little or no prior JavaScript

---

## Tools and Environment

| Tool | Purpose |
|---|---|
| **Vite** | Dev server and build pipeline (native ESM, zero config) |
| **Vitest** | Unit testing (Jest-compatible API, runs in the same Vite pipeline) |
| **jsdom** | Lets Vitest test DOM-touching code |
| **Node.js / npm** | Package management and running scripts |
| **Browser DevTools** | Primary debugging environment |
| **MDN Web Docs** | Reference for all DOM/HTML5 APIs |

### Starter Kit

Scaffolded on day one. Students clone a course-provided repo and run `npm install`.

**`package.json` scripts**:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

**`vite.config.js`**:
```js
import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    environment: 'jsdom'
  }
})
```

**Project layout**:
```
starter-kit/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   └── main.js
└── test/
    └── main.test.js
```

**Install**:
```
npm install --save-dev vite vitest @vitest/ui jsdom
```

---

## Primary Texts

- *You Don't Know JS Yet: Get Started*, 2nd ed. — Kyle Simpson (chapters 1–3; ch4 as bridge reading)
- *You Don't Know JS Yet: Scope & Closures*, 2nd ed. — Kyle Simpson (chapters 1–3, 5–8; appendices optional)

Both books are available free online and are included in the course repo under `book/`.

---

## Assessment

| Component | Weight |
|---|---|
| Weekly Quizzes (11 × ~10 questions) | 20% |
| Weekly Programming Challenges (10) | 30% |
| Final Project (4 milestones) | 40% |
| Participation / Discussion | 10% |

---

## Final Project

Students build a complete, deployable browser application using vanilla JS, ES modules, and the course starter kit. No UI frameworks (React, Vue, etc.).

### Milestones

| # | Week Due | Deliverable |
|---|---|---|
| 1 | Week 4 | **Proposal** — 1-page description: app idea, target user, 3–5 core features, chosen public API |
| 2 | Week 7 | **Design Document** — wireframes or sketches, data model, planned module structure, API endpoints |
| 3 | Week 9 | **Initial Structure** — repo with all modules stubbed, placeholder implementations, at least one passing Vitest test per module |
| 4 | Week 12 | **Final Submission** — complete, working, deployed application |

### Requirements (Final Submission)

- Vanilla JS — no UI frameworks
- ES Modules — at minimum 4 modules with clear separation of concerns
- At least one `fetch` call to a real public API
- Event-driven UI with at least 3 distinct user interactions
- At least one ES6 class
- Vitest unit tests covering all non-DOM logic
- Runs via `npm run dev`, `npm run build`, `npm run test`
- Deployed to GitHub Pages or Netlify (Vite's `npm run build` output drops directly into either)

---

## Week-by-Week Outline

---

### Week 1 — What Is JavaScript?

**Reading**: *Get Started* Ch1

**Topics**:
- The ECMAScript specification, JS engines, and runtime environments
- Browser vs. Node.js — same language, different host environments
- Strict mode: what it is, why to always use it
- The JS development environment: DevTools console, Sources panel, debugger

**Lab (setup focus — no challenge this week)**:
- Clone and run the course starter kit: `npm install`, `npm run dev`, `npm run test`
- Explore the browser console: `console.log`, `document`, basic DOM inspection
- Write and run the first Vitest test

**Quiz 1**: What is an engine vs. a runtime? What does strict mode change? What is the ECMAScript spec and who writes it?

---

### Week 2 — Values, Types, and Variables

**Reading**: *Get Started* Ch2 — Values through Declaring and Using Variables

**Topics**:
- Primitive types: `string`, `number`, `boolean`, `null`, `undefined`, `bigint`, `symbol`
- Objects and arrays as containers (introduction)
- `let`, `const`, `var` — behavioral differences, when to use each
- `typeof` operator; type coercion basics

**Browser Exercise**: Use `document.querySelector` to select DOM elements; update `textContent`, `innerHTML`, and attributes using variables of different types.

**Challenge**: Given a JS data object (name, score, status), write a script that reads the object and renders its contents into a pre-built HTML template — no hardcoded strings in the HTML.

**Quiz 2**: Primitives vs. objects, `typeof` behavior, `let` vs. `const` vs. `var`

---

### Week 3 — Functions and Comparisons

**Reading**: *Get Started* Ch2 — Functions, Comparisons

**Topics**:
- Function declarations, function expressions, and arrow functions — syntax and behavioral differences
- Parameters, return values, default parameter values
- Strict equality (`===`) vs. loose equality (`==`) and when each fires
- Truthy/falsy values; conditional logic: `if`/`else`, ternary operator

**Browser Exercise**: Functions that read a form field's value and update a DOM element conditionally based on the input.

**Challenge**: A username validator — a function that checks whether a username meets a set of rules (minimum length, no spaces, starts with a letter, etc.) and displays pass/fail feedback for each rule in the DOM.

**Quiz 3**: Function syntax forms and their differences, strict vs. loose equality, truthy/falsy

---

### Week 4 — Arrays, Loops, and Iteration

**Reading**: *Get Started* Ch2 — How We Organize in JS (arrays/iteration portion); Ch3 — Iteration

**Topics**:
- Arrays: creation, indexing, common mutation methods (`push`, `pop`, `splice`, `slice`)
- `for`, `while`, `for...of` loops
- The iterator protocol — what it is, why `for...of` works on arrays (and strings, Maps, etc.)
- Higher-order array methods: `forEach`, `map`, `filter`, `find`, `reduce` (intro)

**Browser Exercise**: Render an array of objects as an HTML list using `map` to build HTML strings, inserted with `innerHTML` or constructed with `createElement`.

**Challenge**: A filterable item list — render an array of items to the DOM, add a live search input, and filter the displayed items in real time as the user types.

**Quiz 4**: Array methods, `for...of` vs. `for`, iterator protocol basics

**Project Milestone 1 — Proposal due**: 1-page description of your final project idea, target users, core features, and the public API you plan to use.

---

### Week 5 — Lexical Scope

**Reading**: *Scope & Closures* Ch1 + Ch2

*Bridge reading*: *Get Started* Ch4 — The Bigger Picture (a short orienting chapter that previews the three JS pillars: scope/closures, prototypes, and types. Read it as an introduction to the scope unit.)

**Topics**:
- How JS compiles code before executing it — why this matters for scope
- Lexical scope: the scope model JS uses
- Scope "bubbles": how nested functions create nested scopes
- Variable lookup: how the engine walks the scope chain to resolve a name

**Browser Exercise**: Write nested event handler functions at different levels; trace which variables each one can access and why.

**Challenge**: Refactor a broken script full of global variables and unexpected naming collisions into properly scoped functions — same behavior, no leaking globals.

**Quiz 5**: Lexical scope model, scope nesting, how variable lookup works

---

### Week 6 — Scope Chain, Global Scope, and Variable Lifecycle

**Reading**: *Scope & Closures* Ch3, Ch4, Ch5

**Topics**:
- The scope chain: how nested scopes link outward
- Variable shadowing — when and why it bites you
- The global scope in browsers: `window`, `globalThis`, why global pollution is dangerous
- Hoisting: function declarations hoist fully; `var` hoists as `undefined`; `let`/`const` do not hoist usably (Temporal Dead Zone)
- Practical TDZ: what error it throws, how to avoid it

**Browser Exercise**: Debug a script where hoisting and shadowing produce unexpected behavior; fix it without changing the observable output.

**Challenge**: A scoreboard app — multiple functions share access to a scores array through the scope chain. Demonstrate (and fix) the classic `var`-in-a-loop bug using `let`.

**Quiz 6**: Scope chain traversal, hoisting rules for `var`/`let`/`const`/functions, TDZ, global scope in the browser

---

### Week 7 — Closures

**Reading**: *Scope & Closures* Ch6 + Ch7

**Topics**:
- Limiting scope exposure — the Principle of Least Exposure (POLE)
- What a closure is: a function that retains access to the variables of its enclosing scope even after that scope has returned
- Factory functions: using closure to create stateful, encapsulated objects
- Closure lifecycle and memory: when closures keep variables alive, and when they don't
- Practical patterns: callbacks with enclosed state, module-like encapsulation

**Browser Exercise**: A counter widget — encapsulate the count variable with closure, expose only `increment`, `decrement`, and `reset` through returned functions, wire each to a DOM button.

**Challenge**: A color theme switcher — use closure to hold current theme state; clicking through buttons cycles themes and updates CSS custom properties on `document.documentElement`. The state and the transition logic should be fully hidden inside the closure.

**Quiz 7**: Closure definition, POLE principle, factory function pattern, closure vs. class (tradeoffs)

**Project Milestone 2 — Design Document due**: Wireframes or sketches of your UI, data model, planned module breakdown, and the specific API endpoint(s) you will use.

---

### Week 8 — Classes and Object-Oriented Programming

**Reading**: *Get Started* Ch2 — How We Organize in JS (classes); Ch3 — `this` Keyword, Prototypes (conceptual read)

**Topics**:
- ES6 `class` syntax: `constructor`, instance methods, instance properties
- `this` inside class methods — how it's bound and how to lose it (and fix it)
- Inheritance: `extends`, `super()`, overriding methods
- `static` methods and properties
- When to use classes vs. plain objects vs. closures
- Prototypes: classes compile down to prototype chains — awareness is enough; we won't go deep

**Browser Exercise**: A `Component` base class with a `render(container)` method; subclass it into `Card` and `List` components that each render themselves into a specified DOM container.

**Challenge**: A task list app using a `Task` class (id, text, done, `toggle()`, `toHTML()`) and a `TaskList` class (manages an array of `Task` instances, renders to DOM, handles add/remove). No global variables.

**Quiz 8**: `class` syntax, `this` binding in methods, `extends`/`super`, static members

---

### Week 9 — Modules

**Reading**: *Scope & Closures* Ch8

**Topics**:
- Why modules: encapsulation, avoiding globals, explicit dependencies
- ES Modules (ESM): `export` (named and default), `import`, re-exports
- Module scope — each module is its own scope; nothing leaks to global
- How Vite handles ESM in dev (native browser ESM) vs. build (bundled)
- CommonJS (`require`/`module.exports`): know it exists for reading Node code; write ESM

**Browser Exercise**: Refactor the Week 8 task list app into at least three modules: `task.js`, `taskList.js`, `main.js`.

**Challenge**: Add a `storage.js` module that persists tasks to `localStorage`. Export `save(tasks)` and `load()` functions; import and use them from `taskList.js`. Write Vitest tests for both functions.

**Quiz 9**: Named vs. default exports, `import` syntax variations, module scope vs. global scope, ESM vs. CommonJS

**Project Milestone 3 — Initial Structure due**: GitHub repo with all planned module files created, core functions stubbed with correct signatures, and at least one passing Vitest test per module.

---

### Week 10 — Events and the DOM

**Reading**: MDN student-directed:
- [Introduction to events](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events)
- [Event reference](https://developer.mozilla.org/en-US/docs/Web/Events)
- [HTMLElement: input event](https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event)

**Topics**:
- The event model: bubbling and capturing — what they are, which fires first
- `addEventListener` / `removeEventListener`; the options object (`once`, `capture`, `passive`)
- The `Event` object: `target`, `currentTarget`, `preventDefault`, `stopPropagation`
- Event delegation — attaching one listener to a parent to handle events on dynamic children; closures make delegation handlers clean
- Forms: `submit`, `input`, `change` events; reading, validating, and resetting form data

**Browser Exercise**: Implement a dynamic comment list using event delegation — one listener on the `<ul>` handles delete buttons on items that didn't exist when the page loaded.

**Challenge**: A multi-step form wizard — three steps revealed sequentially by events, input validated before advancing, a summary rendered at the end. Modularize into at least `wizard.js` and `validation.js`.

**Quiz 10**: Bubbling vs. capturing, event delegation, `target` vs. `currentTarget`, `preventDefault`, form events

---

### Week 11 — Async JavaScript: Promises, Fetch, and Async/Await

**Reading**: MDN student-directed:
- [Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)

**Topics**:
- The event loop: why JS is single-threaded but non-blocking (conceptual model; enough to reason about async, not a deep dive)
- Callbacks and their problems (callback hell — brief historical context)
- Promises: pending / fulfilled / rejected states; `.then()`, `.catch()`, `.finally()`
- `async`/`await` as syntactic sugar over Promises — the preferred pattern
- `fetch`: making GET requests, reading the `Response` object, parsing JSON
- Error handling: network errors vs. non-2xx responses; `try/catch` with `await`
- Loading and error states in the DOM — always handle both

**Healthy patterns emphasized**:
```js
// Always await inside try/catch
async function loadData(url) {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    return await res.json()
  } catch (err) {
    console.error('fetch failed:', err)
    throw err  // re-throw so callers can handle it too
  }
}
```

**Browser Exercise**: Fetch posts from `https://jsonplaceholder.typicode.com/posts` and render them as cards; show a loading indicator while fetching, show an error message if the fetch fails.

**Challenge**: A search interface — user types a query, the app fetches results from a chosen public API (Open Library, PokeAPI, GitHub repos, etc.), renders results, handles empty results, and handles fetch errors — all with appropriate DOM feedback at each state.

**Quiz 11**: Promise states, `async`/`await` syntax, `fetch` + `.ok` check, `try/catch` with async, event loop basics

---

### Week 12 — Final Project

**No new reading.**

**Focus**: Complete, test, and deploy the final project.

**Synchronous session** (if applicable): Live demo and code review. Each student demos their app and walks through one interesting technical decision they made. Brief peer feedback.

**Project Milestone 4 — Final Submission due**: Complete working application meeting all requirements listed above, deployed and accessible via public URL.

*No quiz this week.*

---

## Topic Coverage Map

| COCC Course Outcome | Weeks |
|---|---|
| Build functions with variables, conditionals, loops, arrays | 2, 3, 4 |
| Implement DOM-based scripts with object manipulation | 2, 4, 8, 9, 10 |
| Create scripts that process user input | 3, 10, 11 |
| Develop event-driven scripts | 10, throughout |
| OOP with class-based JavaScript | 8 |
| Scope and closures | 5, 6, 7 |
| Modules and code organization | 9 |
| Async, fetch, Promises | 11 |

## YDKJSY Chapter Coverage

| Chapter | Week |
|---|---|
| *Get Started* Ch1 — What Is JavaScript? | 1 |
| *Get Started* Ch2 — Surveying JS | 2, 3, 4, 8 |
| *Get Started* Ch3 — Roots of JS (Iteration, `this`, Prototypes) | 4 (Iteration), 8 (`this`/Prototypes) |
| *Get Started* Ch4 — The Bigger Picture | 5 (bridge reading) |
| *Scope & Closures* Ch1–2 — Lexical Scope | 5 |
| *Scope & Closures* Ch3–5 — Scope Chain, Global, Lifecycle | 6 |
| *Scope & Closures* Ch6–7 — Limiting Scope, Closures | 7 |
| *Scope & Closures* Ch8 — Module Pattern | 9 |
| *S&C* Appendices (implied scopes, named functions, TDZ details) | Optional / self-study |
