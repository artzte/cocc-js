# CIS 133JS — Introduction to JavaScript

### Course Description

Learn programming fundamentals and object-oriented concepts using vanilla JavaScript syntax. Add
interactivity and custom behaviors to web applications by employing front-end JavaScript techniques
combined with HTML and CSS.

**Prerequisites**: CIS 122 (intro programming, Python) **Assumed background**: basic program logic
(variables, conditionals, loops, functions); little or no prior JavaScript

### Outcomes

1. Implement scripts that rely on knowledge of Document Object Model (DOM) architecture and includes
   methods for manipulating DOM objects.
2. Construct functions that effectively utilize variables, conditionals, loops, and arrays.
3. Generate scripts that process user input and provide meaningful output.
4. Plan and create scripts utilizing events and event handlers that respond to user inputs.

### Materials and Requirements

The textbook is
[You Don't Know JS Yet (book series) - 2nd Edition)](https://github.com/getify/you-dont-know-js).
You can read it online, or order a bound copy from the provided links on the book website.

- [_You Don't Know JS Yet: Get Started_, 2nd ed.](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/get-started)
  — Kyle Simpson (chapters 1–3; chapter 4 as bridge reading)
- [_You Don't Know JS Yet: Scope & Closures_, 2nd ed.](https://github.com/getify/You-Dont-Know-JS/tree/2nd-ed/scope-closures)
  — Kyle Simpson (chapters 1–3, 5–8; appendices optional)

You will also need a computer for building software. Class lectures and demonstrations will be
conducted on an Ubuntu laptop, using the Z shell (Zsh), Visual Studio Code, Gitkraken, and Chrome.
If you are developing on a Windows laptop, I recommend that you install the Windows Subsystem for
Linux (WSL).

Within these environments, we will use the following technologies to build software:

| Tool                 | Purpose                                                                         |
| -------------------- | ------------------------------------------------------------------------------- |
| **Vite**             | Dev server and build pipeline (native ESM, zero config)                         |
| **Vitest**           | Unit testing (Jest-compatible API, runs in the same Vite pipeline)              |
| **jsdom**            | Lets Vitest test DOM-touching code                                              |
| **Node.js / npm**    | Package management and running scripts                                          |
| **Git + GitHub**     | Version control and project submission; all work submitted as GitHub repo links |
| **GitHub Pages**     | Free static hosting for deployed projects (built-in Vite support)               |
| **Browser DevTools** | Primary debugging environment                                                   |
| **MDN Web Docs**     | Reference for all DOM/HTML5 APIs                                                |

Students who don't already have a GitHub account should sign up at [github.com](https://github.com)
and claim the [GitHub Student Developer Pack](https://education.github.com/pack) for free access to
additional tools.

## 12-Week Course Outline

This course teaches JavaScript fundamentals using _You Don't Know JS Yet_ (YDKJSY) as the primary
text, with all exercises and projects grounded in browser programming and DOM manipulation. Students
learn the language deeply — scope, closures, types, modules, async — and apply that knowledge
directly to interactive web development. HTML5 APIs and DOM methods are explored by students via
MDN; lectures focus on the JS language itself.

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
    environment: 'jsdom',
  },
})
```

**Project layout**:

```
starter/
├── index.html
├── package.json
├── vite.config.js
├── src/
│   ├── app.js
│   └── common/
│       └── main.js
└── test/
    ├── setup.js
    └── starter.test.js
```

**Install**:

```
npm install --save-dev vite vitest @vitest/ui jsdom
```

---

## Assessment

| Component                         | Weight |
| --------------------------------- | ------ |
| Weekly Quizzes (11 × 5 questions) | 20%    |
| Weekly Programming Challenges (9) | 30%    |
| Final Project (4 milestones)      | 40%    |
| Participation / Discussion        | 10%    |

---

## Final Project

Students build a complete, deployable browser application using vanilla JS, ES modules, and the
course starter kit. No UI frameworks (React, Vue, etc.).

### Submission

All project work is submitted via GitHub. Each milestone is submitted by opening a Pull Request and
posting your GitHub PR link (and a live preview deployment URL where applicable) to Canvas. Each
deliverable is due on the Monday following the delivery week, except for the final deliverable,
which follows a structured review and approval workflow during Finals Week.

### Milestones

| #   | Delivery Week          | Due Date                                                                 | Deliverable                                                                                                                                                             | Submit                                                                                                                                                |
| --- | ---------------------- | ------------------------------------------------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | Week 4 (starts Oct 12) | **Mon, Oct 19**                                                          | **Proposal** — app idea, target user, 3–5 core features, chosen public API                                                                                              | Pull Request with `projects/final/README.md`                                                                                                          |
| 2   | Week 7 (starts Nov 2)  | **Mon, Nov 9**                                                           | **Design Document** — wireframes/sketches, data model, module plan, API endpoints                                                                                       | Pull Request updating `projects/final/README.md`                                                                                                      |
| 3   | Week 9 (starts Nov 16) | **Mon, Nov 23**                                                          | **Initial Structure (Test Deployment)** — `projects/final` scaffolded, page title changed, initial rendering visibly different from the starter, deployed to CloudFront | Live CloudFront URL on Canvas                                                                                                                         |
| 4   | Week 12 (starts Dec 7) | **Mon, Dec 7 (PR)**<br>**Wed, Dec 9 (Review)**<br>**Fri, Dec 11 (Appr)** | **Final Submission** — complete, working, tested, and deployed application                                                                                              | Initial PR by Dec 7 with reviewer tagged and preview app running in deployment environment; comments returned by Dec 9; PR approval by Friday, Dec 11 |

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

**Reading**:
[Get Started (2nd Edition), Chapter 1: What Is JavaScript?](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch1.md)

**Topics**:

- The ECMAScript specification, JS engines, and runtime environments
- Browser vs. Node.js — same language, different host environments
- Strict mode: what it is, why to always use it
- The JS development environment: DevTools console, Sources panel, debugger

**Lab (setup focus — no challenge this week)**:

- Create a GitHub account if you don't have one; claim the GitHub Student Developer Pack
- Fork the course starter kit repo to your own GitHub account; clone it locally
- Run `npm install`, `npm run dev`, `npm run test` — verify all three work
- Explore the browser console: `console.log`, `document`, basic DOM inspection
- Write and run the first Vitest test
- Create your **assignments repo** (fork of starter kit) and your **project repo** (fork of starter
  kit) on GitHub — both will be used throughout the course

**Quiz 1**: What is an engine vs. a runtime? What does strict mode change? What is the ECMAScript
spec and who writes it?

---

### Week 2 — Values, Types, and Variables

**Reading**:
[Get Started (2nd Edition), Chapter 2: Surveying JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch2.md),
from "Values" through "Declaring and Using Variables"

**Topics**:

- Primitive types: `string`, `number`, `boolean`, `null`, `undefined`, `bigint`, `symbol`
- Strings in depth: template literals, common methods (`slice`, `includes`, `split`, `trim`)
- Numbers in depth: `parseInt`, `parseFloat`, `Number`, `Math` object, `NaN` and `isNaN`
- Objects and arrays as containers (introduction)
- `let`, `const`, `var` — behavioral differences, when to use each
- `typeof` operator; type coercion basics

**Browser Exercise**: Use `document.querySelector` to select DOM elements; update `textContent`,
`innerHTML`, and attributes using variables of different types.

**Challenge**: Given a JS data object describing some real-world entity, like an animal, or a place,
or a person, write a script that reads the object and renders its contents into a pre-built HTML
template — no hardcoded strings in the HTML. Include the type of each attribute as reported by the
`typeof` operator.

**Quiz 2**: Primitives vs. objects, `typeof` behavior, `let` vs. `const` vs. `var`

---

### Week 3 — Functions and Comparisons

**Reading**:
[Get Started (2nd Edition), Chapter 2: Surveying JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch2.md),
the "Functions" and "Comparisons" sections

**Topics**:

- Function declarations, function expressions, and arrow functions — syntax and behavioral
  differences
- Parameters, return values, default parameter values
- Strict equality (`===`) vs. loose equality (`==`) and when each fires
- Truthy/falsy values; conditional logic: `if`/`else`, ternary operator

**Browser Exercise**: Functions that read a form field's value and update a DOM element
conditionally based on the input.

**Challenge**: A username validator — a function that checks whether a username meets a set of rules
(minimum length, no spaces, starts with a letter, etc.) and displays pass/fail feedback for each
rule in the DOM.

**Quiz 3**: Function syntax forms and their differences, strict vs. loose equality, truthy/falsy

---

### Week 4 — Arrays, Loops, and Iteration

**Reading**:
[Get Started (2nd Edition), Chapter 2: Surveying JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch2.md),
"How We Organize in JS" (arrays/iteration portion);
[Get Started (2nd Edition), Chapter 3: Digging to the Roots of JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch3.md),
the "Iteration" section

**Topics**:

- Arrays: creation, indexing, common mutation methods (`push`, `pop`, `splice`, `slice`)
- `for`, `while`, `for...of` loops
- The iterator protocol — what it is, why `for...of` works on arrays (and strings, Maps, etc.)
- Higher-order array methods: `forEach`, `map`, `filter`, `find`, `reduce` (intro)

**Browser Exercise**: Render an array of objects as an HTML list using `map` to build HTML strings,
inserted with `innerHTML` or constructed with `createElement`.

**Challenge**: A filterable item list — render an array of items to the DOM, add a live search
input, and filter the displayed items in real time as the user types.

**Quiz 4**: Array methods, `for...of` vs. `for`, iterator protocol basics

**Project Milestone 1 — Proposal due (Monday, Oct 19)**: 1-page description of your final project
idea, target users, core features, and the public API you plan to use.

---

### Week 5 — Lexical Scope

**Reading**:
[Scope & Closures (2nd Edition), Chapter 1: What's the Scope?](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch1.md)
and
[Scope & Closures (2nd Edition), Chapter 2: Illustrating Lexical Scope](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch2.md)

_Bridge reading_:
[Get Started (2nd Edition), Chapter 4: The Bigger Picture](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch4.md)
(a short orienting chapter that previews the three JS pillars: scope/closures, prototypes, and
types. Read it as an introduction to the scope unit.)

**Topics**:

- How JS compiles code before executing it — why this matters for scope
- Lexical scope: the scope model JS uses
- Scope "bubbles": how nested functions create nested scopes
- Variable lookup: how the engine walks the scope chain to resolve a name

**Browser Exercise**: Write nested event handler functions at different levels; trace which
variables each one can access and why.

**Challenge**: Refactor a broken script full of global variables and unexpected naming collisions
into properly scoped functions — same behavior, no leaking globals.

**Quiz 5**: Lexical scope model, scope nesting, how variable lookup works

---

### Week 6 — Scope Chain, Global Scope, and Variable Lifecycle

**Reading**:
[Scope & Closures (2nd Edition), Chapter 3: The Scope Chain](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch3.md),
[Scope & Closures (2nd Edition), Chapter 4: Around the Global Scope](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch4.md),
and
[Scope & Closures (2nd Edition), Chapter 5: The (Not So) Secret Lifecycle of Variables](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch5.md)

**Topics**:

- The scope chain: how nested scopes link outward
- Variable shadowing — when and why it bites you
- The global scope in browsers: `window`, `globalThis`, why global pollution is dangerous
- Hoisting: function declarations hoist fully; `var` hoists as `undefined`; `let`/`const` do not
  hoist usably (Temporal Dead Zone)
- Practical TDZ: what error it throws, how to avoid it

**Browser Exercise**: Debug a script where hoisting and shadowing produce unexpected behavior; fix
it without changing the observable output.

**Challenge**: A scoreboard app — multiple functions share access to a scores array through the
scope chain. Demonstrate (and fix) the classic `var`-in-a-loop bug using `let`.

**Quiz 6**: Scope chain traversal, hoisting rules for `var`/`let`/`const`/functions, TDZ, global
scope in the browser

---

### Week 7 — Closures

**Reading**:
[Scope & Closures (2nd Edition), Chapter 6: Limiting Scope Exposure](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch6.md)
and
[Scope & Closures (2nd Edition), Chapter 7: Using Closures](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md)

**Topics**:

- Limiting scope exposure — the Principle of Least Exposure (POLE)
- What a closure is: a function that retains access to the variables of its enclosing scope even
  after that scope has returned
- Factory functions: using closure to create stateful, encapsulated objects
- Closure lifecycle and memory: when closures keep variables alive, and when they don't
- Practical patterns: callbacks with enclosed state, module-like encapsulation

**Browser Exercise**: A counter widget — encapsulate the count variable with closure, expose only
`increment`, `decrement`, and `reset` through returned functions, wire each to a DOM button.

**Challenge**: A color theme switcher — use closure to hold current theme state; clicking through
buttons cycles themes and updates CSS custom properties on `document.documentElement`. The state and
the transition logic should be fully hidden inside the closure.

**Quiz 7**: Closure definition, POLE principle, factory function pattern, closure vs. class
(tradeoffs)

**Project Milestone 2 — Design Document due (Monday, Nov 9)**: Wireframes or sketches of your UI,
data model, planned module breakdown, and the specific API endpoint(s) you will use.

---

### Week 8 — Classes and Object-Oriented Programming

**Reading**:
[Get Started (2nd Edition), Chapter 2: Surveying JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch2.md),
"How We Organize in JS" (classes);
[Get Started (2nd Edition), Chapter 3: Digging to the Roots of JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch3.md),
the "`this` Keyword" and "Prototypes" sections (conceptual read)

**Topics**:

- ES6 `class` syntax: `constructor`, instance methods, instance properties
- `this` inside class methods — how it's bound and how to lose it (and fix it)
- Inheritance: `extends`, `super()`, overriding methods
- `static` methods and properties
- When to use classes vs. plain objects vs. closures
- Prototypes: classes compile down to prototype chains — awareness is enough; we won't go deep

**Browser Exercise**: A `Component` base class with a `render(container)` method; subclass it into
`Card` and `List` components that each render themselves into a specified DOM container.

**Challenge**: A task list app using a `Task` class (id, text, done, `toggle()`, `toHTML()`) and a
`TaskList` class (manages an array of `Task` instances, renders to DOM, handles add/remove). No
global variables.

**Quiz 8**: `class` syntax, `this` binding in methods, `extends`/`super`, static members

---

### Week 9 — Modules

**Reading**:
[Scope & Closures (2nd Edition), Chapter 8: The Module Pattern](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch8.md)

**Topics**:

- Why modules: encapsulation, avoiding globals, explicit dependencies
- ES Modules (ESM): `export` (named and default), `import`, re-exports
- Module scope — each module is its own scope; nothing leaks to global
- How Vite handles ESM in dev (native browser ESM) vs. build (bundled)
- CommonJS (`require`/`module.exports`): know it exists for reading Node code; write ESM

**Browser Exercise**: Refactor the Week 8 task list app into ES modules: `Task`, `TaskList`, and a
`BrowserStorage` class each get their own module, with `renderApp()` staying in `app.js`.

**Persistence**: `BrowserStorage` saves any JSON-serializable value under one `localStorage` key,
and `load()` returns `null` when nothing is saved. `TaskList` gets a `registerOnChange(callback)`
method so it never imports the storage module; `app.js` connects them with
`taskList.registerOnChange((tasks) => storage.save(tasks))`. Write Vitest tests for both classes.

**Quiz 9**: Named vs. default exports, `import` syntax variations, module scope vs. global scope,
ESM vs. CommonJS

**Project Milestone 3 — Initial Structure (Test Deployment) due (Monday, Nov 23)**: Scaffold
`projects/final`, change the `<title>` in `index.html` to the app's name, change the initial
rendering so the page looks different from the starter project, and confirm the app deploys to
CloudFront. Submit the live CloudFront URL on Canvas.

---

### Week 10 — Form Events and a First Look at `fetch` (Thanksgiving catch-up week)

This is a catch-up week. There is **no programming assignment**, so students can use the time to
finish any missing weekly projects. The lecture and reading are short, and Quiz 10 covers event
handling only.

**Reading**: MDN student-directed:

- [Introduction to events](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events)
- [HTMLElement: input event](https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event)
- [HTMLElement: change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event)
- [Event: preventDefault() method](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
- [Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
  (first sections only, as a preview)

**Topics**:

- `input` vs. `change`: when each one fires, and which to use for live feedback vs. a committed
  choice
- Reading form controls: `input.value`, `checkbox.checked`, `select.value`
- The `submit` event, and why we listen on the `<form>` rather than the button's `click`
- `preventDefault()` in more depth: default actions (form submission, link navigation, checkbox
  toggling) and how it differs from `stopPropagation()`
- Review from Week 7: bubbling, delegation, `target` vs. `currentTarget`
- **Preview**: one `async`/`await` `fetch` call with the standard `try/catch` + `res.ok` pattern,
  enough to start the async part of the final project. Promise states and the event loop wait for
  Week 11.

**Instructor example**: The full Art Institute of Chicago browser final project is published before
Week 10 starts, so students have a complete example to study during the catch-up week.

**Quiz 10**: `input` vs. `change`, `submit` and `preventDefault()`, `preventDefault()` vs.
`stopPropagation()`, `target` vs. `currentTarget`

---

### Week 11 — Async JavaScript: Promises, Fetch, and Async/Await

**Reading**: MDN student-directed:

- [Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)
- [async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function)
- [Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
- [HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)

**Topics**:

- The event loop: why JS is single-threaded but non-blocking (conceptual model; enough to reason
  about async, not a deep dive)
- Promises: pending / fulfilled / rejected states; `.then()`, `.catch()`, `.finally()`
- `async`/`await` as syntactic sugar over Promises — the preferred pattern
- `fetch` and the `Response` object: `ok`, `status`, `json()`; building query strings with
  `URLSearchParams`
- HTTP status code classes (2xx, 3xx, 4xx, 5xx) and what each tells you
- Error handling: network errors (`fetch` rejects) vs. error responses (`fetch` resolves with
  `ok === false`); `try/catch` with `await`
- Loading, empty, and error states in the DOM — always handle all three
- Testing fetch code with a stubbed `fetch` in Vitest
- **Instructor walkthrough**: the Art Institute of Chicago browser final project, as a model for the
  final push

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
    throw err // re-throw so callers can handle it too
  }
}
```

**Challenge**: A weather search using the [Open-Meteo](https://open-meteo.com/) API (no key needed).
The user types a place name (`input` event enables the Search button), submits the form
(`preventDefault()`), picks one of the matching places, and sees its current weather. A units
`<select>` (`change` event) reloads the weather in °F or °C. The app shows loading, empty, and error
states, and Vitest tests cover the fetch logic with a stubbed `fetch`.

**Quiz 11**: Promise states, why `fetch` doesn't reject on a 404, 4xx vs. 5xx status codes, what
`await` does while it waits, and empty results vs. errors

---

### Week 12 — Final Project

**No new reading.**

**Focus**: Complete, test, and deploy the final project.

**Synchronous session** (if applicable): Live demo and code review. Each student demos their app and
walks through one interesting technical decision they made. Brief peer feedback.

**Project Milestone 4 — Final Submission due**: Complete working application meeting all
requirements listed above, deployed and accessible via public URL. Initial pull request due
**Monday, 12/7**, with instructor tagged as reviewer and preview app running in the designated
deployment environment. Initial comments returned by **Wednesday, 12/9**. PR approval from
instructor required by **Friday, 12/11**.

_No quiz this week._

---

## Topic Coverage Map

### COCC Course Outcomes

| Outcome (exact catalog language)                                                                               | Weeks                 |
| -------------------------------------------------------------------------------------------------------------- | --------------------- |
| Implement scripts that rely on knowledge of DOM architecture and includes methods for manipulating DOM objects | 2, 4, 8, 9, 10        |
| Construct functions that effectively utilize variables, conditionals, loops, and arrays                        | 2, 3, 4               |
| Generate scripts that process user input and provide meaningful output                                         | 3, 10, 11             |
| Plan and create scripts utilizing events and event handlers that respond to user inputs                        | 7, 10, 11, throughout |

### COCC Content Outline Topics

| Topic                           | Weeks                            |
| ------------------------------- | -------------------------------- |
| The Document Object Model (DOM) | 2, 4, 8, 9, 10                   |
| Events and event handling       | 7, 10, 11, throughout            |
| Variables and scope             | 2, 5, 6, 7                       |
| Conditionals                    | 3                                |
| Functions                       | 3                                |
| Strings and numbers             | 2                                |
| Arrays                          | 4                                |
| Loops                           | 4                                |
| Objects                         | 2 (object literals), 8 (classes) |

## YDKJSY Chapter Coverage

| Chapter                                                                                                                                                                                      | Week                                 |
| -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------ |
| [Get Started (2nd Edition), Chapter 1: What Is JavaScript?](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch1.md)                                                       | 1                                    |
| [Get Started (2nd Edition), Chapter 2: Surveying JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch2.md)                                                              | 2, 3, 4, 8                           |
| [Get Started (2nd Edition), Chapter 3: Digging to the Roots of JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch3.md)                                                | 4 (Iteration), 8 (`this`/Prototypes) |
| [Get Started (2nd Edition), Chapter 4: The Bigger Picture](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch4.md)                                                        | 5 (bridge reading)                   |
| [Scope & Closures (2nd Edition), Chapter 1: What's the Scope?](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch1.md)                                                 | 5                                    |
| [Scope & Closures (2nd Edition), Chapter 2: Illustrating Lexical Scope](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch2.md)                                        | 5                                    |
| [Scope & Closures (2nd Edition), Chapter 3: The Scope Chain](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch3.md)                                                   | 6                                    |
| [Scope & Closures (2nd Edition), Chapter 4: Around the Global Scope](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch4.md)                                           | 6                                    |
| [Scope & Closures (2nd Edition), Chapter 5: The (Not So) Secret Lifecycle of Variables](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch5.md)                        | 6                                    |
| [Scope & Closures (2nd Edition), Chapter 6: Limiting Scope Exposure](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch6.md)                                           | 7                                    |
| [Scope & Closures (2nd Edition), Chapter 7: Using Closures](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md)                                                    | 7                                    |
| [Scope & Closures (2nd Edition), Chapter 8: The Module Pattern](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch8.md)                                                | 9                                    |
| [Scope & Closures (2nd Edition), Appendix A: Exploring Further](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/apA.md) (implied scopes, named functions, TDZ details) | Optional / self-study                |
| [Scope & Closures (2nd Edition), Appendix B: Practice](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/apB.md)                                                         | Optional / self-study                |
