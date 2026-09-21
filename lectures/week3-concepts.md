# Week 3 Lecture Guide: Functions and Comparisons

**Reading**: _You Don't Know JS Yet: Get Started_ (2nd Edition) — Chapter 2: _Surveying JS_
(Functions, Comparisons)  
**Format**: Interactive Lecture & DevTools Console Demos  
**Duration**: ~20–25 Minutes  
**Prereq Context**: Week 2 (values, types, variables)

---

## Pacing & Timeline

| Time              | Section                             | Focus                                                |
| :---------------- | :---------------------------------- | :--------------------------------------------------- |
| **00:00 - 02:00** | **1. Why Functions**                | Functions as reusable, callable behavior             |
| **02:00 - 08:00** | **2. Function Forms**               | Declarations, expressions, and arrow functions       |
| **08:00 - 11:30** | **3. Parameters & Return Values**   | Defaults, arguments, bundling multiple return values |
| **11:30 - 16:30** | **4. Comparisons**                  | `===` vs. `==`, coercion, relational operators       |
| **16:30 - 19:30** | **5. Truthy, Falsy, and Branching** | Falsy values, `if`/`else`, the ternary operator      |
| **19:30 - 23:00** | **6. Bridge to the Browser**        | Reading form input, conditional DOM updates          |
| **23:00 - 24:00** | **7. Wrap-Up & Challenge**          | Summary, assignment preview, and Q&A                 |

---

## 1. Why Functions (2 mins)

### Talking Points & Concept Cues

- **Orientation**: Week 2 gave us values, types, and variables — the nouns of JavaScript. Functions
  are the verbs: reusable blocks of behavior we can invoke repeatedly with different inputs.
- **Functions Are Values Too**: In JS, functions are a specialized subtype of object. They can be
  assigned to variables, passed as arguments, and returned from other functions ("first-class
  functions").
- **Why It Matters**: Without functions, every script would be a flat, repetitive sequence of
  statements. Functions let us name a piece of behavior once and reuse it.

---

## 2. Function Forms (6 mins)

### Talking Points & Concept Cues

- **Function Declaration**:
  ```js
  function greet(name) {
    return `Hello, ${name}!`
  }
  ```
  - Hoisted fully — the identifier _and_ the function body are available anywhere in the enclosing
    scope, even before the line where it's written.
- **Function Expression**:
  ```js
  const greet = function (name) {
    return `Hello, ${name}!`
  }
  ```
  - The variable follows normal `let`/`const`/`var` hoisting rules — the function isn't callable
    until the assignment line actually runs.
- **Arrow Function**:
  ```js
  const greet = (name) => `Hello, ${name}!`
  ```
  - Terser syntax; implicit `return` when the body is a single expression (no `{}` or `return`
    keyword needed).
  - Does **not** have its own `this` — it inherits `this` from the surrounding (lexical) scope. This
    matters a lot once we get to classes and event handlers later in the course.
- **When to use which**: Arrow functions are great for short callbacks; named function declarations
  are great for top-level, reusable logic (and read nicely in stack traces).

### Console Demo: Three Ways to Write the Same Function

```js
function greetDeclaration(name) {
  return `Hello, ${name}!`
}

const greetExpression = function (name) {
  return `Hello, ${name}!`
}

const greetArrow = (name) => `Hello, ${name}!`

console.log(greetDeclaration('Ada'))
console.log(greetExpression('Ada'))
console.log(greetArrow('Ada'))

// Hoisting difference:
console.log(hoisted('Grace')) // Works! Function declarations hoist fully.
function hoisted(name) {
  return `Hi, ${name}`
}

// console.log(notHoisted('Grace')); // ReferenceError / TypeError — not defined yet
const notHoisted = (name) => `Hi, ${name}`
```

---

## 3. Parameters & Return Values (3.5 mins)

### Talking Points & Concept Cues

- **Parameters vs. Arguments**: Parameters are the named placeholders in the function signature;
  arguments are the actual values passed in at call time.
- **Default Parameter Values**: `function greet(name = 'friend') {}` — used when the argument is
  `undefined` or omitted entirely.
- **Return Values**: A function returns exactly one value via `return`. To "return multiple values,"
  bundle them into an object or array.

### Console Demo: Defaults and Bundled Returns

```js
function makeGreeting(name = 'friend', punctuation = '!') {
  return `Hello, ${name}${punctuation}`
}

console.log(makeGreeting()) // "Hello, friend!"
console.log(makeGreeting('Sam')) // "Hello, Sam!"
console.log(makeGreeting('Sam', '?')) // "Hello, Sam?"

function minMax(numbers) {
  return { min: Math.min(...numbers), max: Math.max(...numbers) }
}

const { min, max } = minMax([4, 9, 1, 7])
console.log(min, max) // 1 9
```

---

## 4. Comparisons: `===` vs. `==` (5 mins)

### Talking Points & Concept Cues

- **Strict Equality (`===`)**: Compares value _and_ type; no coercion. This is the default you
  should reach for.
- **Coercive Equality (`==`)**: If the types differ, JS converts one or both values (usually toward
  numbers) before comparing. This is a frequent source of bugs and surprises.
- **Reference Equality for Objects**: Objects and arrays are compared by _identity_, not contents —
  `[1,2,3] === [1,2,3]` is `false` because they're two different arrays in memory.
- **Relational Operators (`<`, `>`, `<=`, `>=`)**: Always allow coercion — no "strict" version
  exists. String vs. string comparisons are lexicographic; anything else coerces to numbers.

### Console Demo: Strict vs. Loose

```js
console.log(1 === 1) // true
console.log(1 === '1') // false — different types
console.log(1 == '1') // true  — coerced to numbers first

console.log(null == undefined) // true  — special-cased
console.log(null === undefined) // false — different types

console.log([1, 2, 3] === [1, 2, 3]) // false — different array references
const a = [1, 2, 3]
const b = a
console.log(a === b) // true — same reference

console.log(NaN === NaN) // false — NaN never equals itself
console.log(Number.isNaN(NaN)) // true — the correct way to check
```

---

## 5. Truthy, Falsy, and Branching (3 mins)

### Talking Points & Concept Cues

- **Every value is truthy or falsy** when used where a boolean is expected (`if (value)`,
  `while (value)`, `value ? a : b`).
- **The 8 falsy values**: `false`, `0` (and `-0`), `0n`, `""`, `null`, `undefined`, `NaN`, and the
  rare browser-only `document.all`.
- **Everything else is truthy** — including `"0"`, `"false"` (strings!), empty arrays `[]`, and
  empty objects `{}`.
- **`if`/`else`** for multi-branch, multi-statement logic. **Ternary (`cond ? a : b`)** for a
  compact single-expression choice — great for inline rendering, harder to read when nested.

### Console Demo: Falsy Surprises

```js
if ('') console.log('truthy')
else console.log('falsy') // "" is falsy

if ('0')
  console.log('truthy') // "0" (a string) is truthy!
else console.log('falsy')

if ([])
  console.log('truthy') // empty array is truthy!
else console.log('falsy')

const age = 20
const status = age >= 18 ? 'adult' : 'minor'
console.log(status) // "adult"
```

---

## 6. Bridge to the Browser: Conditional DOM Updates (3.5 mins)

### Talking Points & Concept Cues

- **Connecting to Course Outcomes 2 & 3**: Functions that use conditionals to process user input and
  produce meaningful output.
- **Reading Form Input**: `document.querySelector('#username').value` gives you the current string
  in a text field.
- **Conditional Rendering**: Use `if`/`else` or a ternary to decide what to show, then write the
  result to the DOM with `.textContent`.
- **Weekly Challenge Tie-In ("Username Validator")**: Read a username from an input, run it through
  several rule-checking functions, and render pass/fail feedback for each rule.

### Live Demo: Validating a Form Field

```html
<input id="username" type="text" placeholder="Choose a username" />
<p id="feedback"></p>
```

```js
function startsWithLetter(username) {
  return /^[a-zA-Z]/.test(username)
}

const input = document.querySelector('#username')
const feedback = document.querySelector('#feedback')

input.addEventListener('input', () => {
  const value = input.value
  feedback.textContent = startsWithLetter(value)
    ? 'Looks good so far!'
    : 'Username must start with a letter.'
})
```

---

## 7. Wrap-Up & Challenge Preview (1 min)

### Talking Points & Concept Cues

- **Key Takeaway Checklist**:
  1. Three function forms — declarations, expressions, arrows — differ in hoisting and `this`.
  2. Default parameters and bundled return values (objects/arrays) cover most real-world needs.
  3. Prefer `===` over `==`; know the 8 falsy values.
  4. `if`/`else` for multi-branch logic; ternary for compact single-expression choices.
  5. Read form input with `.value`; render conditional feedback with `.textContent`.
- **This Week's Assignment: Username Validator**:
  - Workflow: Run `scripts/mpf.sh week3` $\rightarrow$ create branch `week3`.
  - Write small rule-checking functions and render pass/fail feedback in the DOM.
  - Test locally with `npm run test` and `npm run dev`.
  - Submit GitHub Pull Request URL.
- **Next Week Preview**: Arrays, loops, and iteration.
- **Open Q&A**.
