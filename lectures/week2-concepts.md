# Week 2 Lecture Guide: Values, Types, and Variables

**Reading**: _You Don't Know JS Yet: Get Started_ (2nd Edition) — Chapter 2: _Surveying JS_ (Values
through Declaring and Using Variables)  
**Format**: Interactive Lecture & DevTools Console Demos  
**Duration**: ~20–25 Minutes  
**Prereq Context**: Assumes basic programming logic (variables, loops, conditions)

---

## Pacing & Timeline

| Time              | Section                      | Focus                                                   |
| :---------------- | :--------------------------- | :------------------------------------------------------ |
| **00:00 - 02:30** | **1. The Big Picture**       | Programs, files, and state as values                    |
| **02:30 - 07:30** | **2. Primitives in Depth**   | Strings, template literals, numbers, and `NaN`          |
| **07:30 - 11:30** | **3. Containers & `typeof`** | Objects, arrays, and language quirks (`typeof null`)    |
| **11:30 - 16:00** | **4. Variables & Scoping**   | `let` vs. `const` vs. `var`; re-assignment vs. mutation |
| **16:00 - 21:00** | **5. Bridge to the Browser** | DOM selection (`querySelector`) and template rendering  |
| **21:00 - 23:00** | **6. Wrap-Up & Challenge**   | Summary, assignment preview, and Q&A                    |

---

## 1. The Big Picture: Programs, Files, and Values (2.5 mins)

### Talking Points & Concept Cues

- **Orientation**: Transitioning from Week 1 (tools, engine vs. runtime, Git) to the language
  itself.
- **Each File is a Program** (_YDKJSY Ch2_):
  - In JS, each `.js` file is treated as its own independent program.
  - Files collaborate at runtime via the shared global scope or ES module `import`/`export`.
- **Values = State**:
  - The fundamental unit of information is a **value**. Values represent data and maintain state.
- **The Two Value Worlds in JavaScript**:
  - **Primitives**: 7 built-in types; immutable; passed by value.
  - **Objects**: Keyed collections; mutable; passed by reference.
- **Data Organization**: Rather than a flat list of types, JavaScript organizes everything into
  these two primary categories: primitives and objects.

### Screen Share Focus

- Quick diagram / slide or scratchpad showing the two families:
  - _Primitives_: `string`, `number`, `boolean`, `null`, `undefined`, `bigint`, `symbol`
  - _Objects_: `Object` (`{}`), `Array` (`[]`), `Function`, `Date`, etc.

---

## 2. Primitives in Depth: Strings & Numbers (5 mins)

### Talking Points & Concept Cues

- **Strings**:
  - Single quotes (`'...'`) vs. double quotes (`"..."`): Stylistic only. Pick one and stay
    consistent.
  - Backticks (`` `...` ``) = **Template Literals**:
    - Multiline strings without escape characters (`\n`).
    - Interpolation via `${expression}`: Evaluates variables or JS expressions directly inline.
    - _Kyle Simpson's rule_: Use quotes for simple string literals; save backticks for actual
      interpolation.
  - Key methods: `.slice(start, end)`, `.includes("text")`, `.trim()`, `.split(" ")`.
  - _Key takeaway_: Primitives are immutable—string methods return _new_ strings, never modifying
    in-place.
- **Numbers**:
  - No separate integer vs. float types: All numbers in JS are 64-bit double-precision
    floating-point (IEEE 754).
  - Note: `bigint` exists for integers beyond $2^{53} - 1$ (written with `n` suffix, like `42n`).
  - Parsing from user/form input:
    - `parseInt(str, 10)` — _always include radix 10_.
    - `parseFloat(str)` — for decimals.
    - `Number(str)` — strict conversion.
  - `Math` object: `Math.round()`, `Math.floor()`, `Math.ceil()`, `Math.random()`.
- **The `NaN` ("Not a Number") Quirk**:
  - Result of invalid math operations (e.g., `Number("hello")` or `0 / 0`).
  - _Punchline 1_: `typeof NaN === "number"` (it is an invalid number token).
  - _Punchline 2_: `NaN === NaN` is `false`! (Never equals anything, including itself).
  - _How to test_: Always use `Number.isNaN(value)`.

### Console Demo: Strings, Numbers, and NaN

```js
// 1. Strings: trim, slice, template literals
const rawInput = '   $49.99 sale price   '
const clean = rawInput.trim()
const price = parseFloat(clean.slice(1))
console.log(`Item price: $${price.toFixed(2)} (with tax: $${(price * 1.1).toFixed(2)})`)

// 2. NaN quirks
const bad = Number('oops')
console.log(bad) // NaN
console.log(typeof bad) // "number"
console.log(bad === NaN) // false
console.log(Number.isNaN(bad)) // true
```

---

## 3. Containers & The Quirks of `typeof` (4 mins)

### Talking Points & Concept Cues

- **Containers**:
  - **Objects (`{}`)**: Unordered, named key-value pairs. Access with dot notation (`user.name`) or
    bracket notation (`user["name"]`). Used as primary structured data containers.
  - **Arrays (`[]`)**: Ordered, numerically indexed (0-based) lists that track size via `.length`.
    Can hold mixed types (primitives, objects, or nested arrays).
  - **Functions**: Also first-class objects (callable objects).
- **The `typeof` Operator**:
  - Returns type as a string: `"string"`, `"number"`, `"boolean"`, `"undefined"`, `"function"`.
- **The Two Major Traps**:
  1. `typeof [1, 2, 3]` returns `"object"`, NOT `"array"`.
     - _Check arrays with_: `Array.isArray(myArray)`.
  2. `typeof null` returns `"object"`!
     - _Why?_ 1995 implementation artifact (3-bit type tags; object was `000`, null pointer was
       `0x00`).
     - _Why not fixed?_ TC39 golden rule: "Don't break the web." Millions of legacy sites depend on
       it.
- **`null` vs. `undefined`**:
  - JavaScript uniquely distinguishes between two "empty" values:
    - `undefined`: Declared but unassigned, or missing property.
    - `null`: Explicit, intentional absence of an object value.
  - _Style Tip_: Kyle Simpson recommends using `undefined` as your default empty value.

### Console Demo: Type Inspection

```js
console.log(typeof 'hello') // "string"
console.log(typeof 42) // "number"
console.log(typeof true) // "boolean"
console.log(typeof undefined) // "undefined"
console.log(typeof { a: 1 }) // "object"
console.log(typeof [1, 2, 3]) // "object"  -> Gotcha!
console.log(Array.isArray([1, 2, 3])) // true       -> Proper check!
console.log(typeof null) // "object"  -> 30-year-old bug!
```

---

## 4. Declaring Variables: `let`, `const`, and `var` (4.5 mins)

### Talking Points & Concept Cues

- **Variables as Containers**: Naming and managing state.
- **The 3 Declaration Forms**:
  - `var` (1995 legacy): **Function-scoped** (or global). Completely ignores `{ ... }` blocks (e.g.
    `if`, `for`). Easily leaks variables.
  - `let` (ES6 modern): **Block-scoped** to the nearest `{ ... }`. Variable is trapped inside its
    block. Re-assignable.
  - `const` (ES6 modern): **Block-scoped**; must be initialized; _cannot be re-assigned_.
- **Crucial Distinction: Re-assignment vs. Mutation**:
  - `const` prevents re-assigning the variable identifier.
  - **Primitives in `const`**: Truly constant (`const MAX = 100; MAX = 101` throws `TypeError`).
  - **Objects/Arrays in `const`**: The reference is locked, but **contents CAN mutate**
    (`const arr = []; arr.push(1)` is valid!).
  - _Kyle Simpson's Advice_: Use `const` primarily for primitive values where you want a clear
    immutable constant. Use `let` for objects/arrays that you plan to mutate to make intent obvious.

### Console Demo: Scope & Const Mutability

```js
// 1. Block scoping: var leaks, let does not
if (true) {
  var leakedVar = 'I escaped!'
  let trappedLet = 'I am contained!'
}
console.log(leakedVar) // "I escaped!"
// console.log(trappedLet); // ReferenceError!

// 2. const: re-assignment vs mutation
const roster = ['Alice', 'Bob']
roster.push('Charlie') // OK: Mutating contents
console.log(roster) // ["Alice", "Bob", "Charlie"]

try {
  roster = ['Dave'] // ERROR: Re-assignment not allowed!
} catch (e) {
  console.error(e.message) // "Assignment to constant variable"
}
```

---

## 5. Bridge to the Browser: DOM Selection & Rendering (5 mins)

### Talking Points & Concept Cues

- **Connecting to Course Outcome 1**: DOM architecture and manipulation.
- **Terminal vs. Browser Output**:
  - Command-line scripts print text lines to a terminal console.
  - In client-side web development, output is manipulating the live Document Object Model (HTML
    tree).
- **The Two-Step DOM Pattern**:
  1. **Select**: `document.querySelector(selector)` using standard CSS selectors (`#id`, `.class`,
     element).
  2. **Update**: Modify properties on the returned DOM element.
- **Updating Element Content**:
  - `.textContent`: Inserts safe plain text (fast, protects against XSS).
  - `.innerHTML`: Parses HTML tags (useful for templates).
  - Attributes/Classes: `.classList.add("active")`, `.setAttribute()`.
- **Weekly Challenge Tie-In ("Print Out Object Properties")**:
  - Take a structured JavaScript data object (`name`, `score`, `status`).
  - Select pre-built HTML template elements.
  - Populate them dynamically without hardcoding any values into the HTML.

### Live Demo: Populating an HTML Template

```html
<!-- HTML Template -->
<div id="player-card">
  <h2 class="player-name"></h2>
  <p class="player-score"></p>
  <span class="player-status"></span>
</div>
```

```js
// JavaScript Logic
const player = {
  name: 'Riley Vance',
  score: 1250,
  status: 'Active Contender',
  isChampion: true,
}

// 1. Select elements
const nameEl = document.querySelector('#player-card .player-name')
const scoreEl = document.querySelector('#player-card .player-score')
const statusEl = document.querySelector('#player-card .player-status')

// 2. Render properties
nameEl.textContent = player.name
scoreEl.textContent = `Score: ${player.score.toLocaleString()} pts`
statusEl.textContent = player.status

// 3. Dynamic styling
statusEl.classList.add('badge')
if (player.isChampion) {
  statusEl.classList.add('badge-gold')
}
```

---

## 6. Wrap-Up & Challenge Preview (2 mins)

### Talking Points & Concept Cues

- **Key Takeaway Checklist**:
  1. Primitives (7 types, immutable) vs. Objects (mutable collections).
  2. Template literals (backticks) for `${...}` interpolation; watch out for `NaN`.
  3. `typeof` quirks: `null` and arrays return `"object"` (use `Array.isArray()`).
  4. Scope: Prefer `let` and `const`. Remember `const` allows object mutation, not re-assignment.
  5. DOM: `document.querySelector` + `.textContent` transforms data objects into UI.
- **This Week's Assignment: Print Out Object Properties**:
  - Workflow: Run `scripts/mpf.sh week2` $\rightarrow$ create branch `week2`.
  - Read the data object and render into the provided HTML template.
  - Test locally with `npm test` and `npm start`.
  - Submit GitHub Pull Request URL.
- **Next Week Preview**: Functions, comparisons (`===` vs. `==`), and conditionals.
- **Open Q&A**.
