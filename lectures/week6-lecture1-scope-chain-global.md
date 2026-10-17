# Week 6 Lecture 1 Guide: The Scope Chain and the Global Scope

**Reading**: _You Don't Know JS Yet: Scope & Closures_ (2nd Edition) — Chapter 3: _The Scope Chain_
& Chapter 4: _Around the Global Scope_  
**Format**: Interactive Lecture & Chrome DevTools Snippet Walkthrough
([`examples/week6-scope-chain-lifecycle.js`](../examples/week6-scope-chain-lifecycle.js), demos
1–3)  
**Duration**: ~18 Minutes  
**Prereq Context**: Week 5 (lexical scope, nested scope buckets, outward lookup, accidental globals)

---

## Pacing & Timeline

| Time              | Section                               | Focus / Snippet Function                                                |
| :---------------- | :------------------------------------ | :---------------------------------------------------------------------- |
| **00:00 - 02:00** | **1. Recap: Buckets and Lookup**      | Week 5 model; Global Mess refactor debrief                              |
| **02:00 - 06:30** | **2. The Scope Chain and Shadowing**  | First match wins; copying vs. accessing (`shadowingDemo`)               |
| **06:30 - 08:30** | **3. Illegal Shadowing**              | `let` can shadow `var`, not the reverse (bonus snippet in `.md`)        |
| **08:30 - 11:00** | **4. Function Name Scope and Arrows** | Named function expressions (`functionNameScopeDemo`)                    |
| **11:00 - 16:30** | **5. Where Is the Global Scope?**     | `window`, DOM globals, modules, Node, `globalThis` (`globalObjectDemo`) |
| **16:30 - 18:00** | **6. Wrap-Up**                        | Why global pollution is dangerous; bridge to Lecture 2                  |

---

## 1. Recap: Buckets and Lookup (2 mins)

### Talking Points & Concept Cues

- Week 5's model: scopes are buckets, fixed at compile time by where code is written. Lookup goes
  outward until the first match.
- **Global Mess debrief**: the three kinds of bugs (duplicate function names, shared variables,
  accidental globals) were all caused by too much code living in one scope: the global one.
- Today: what exactly is the chain of scopes, what happens when two scopes use the same name, and
  what is "the global scope" in a browser?

---

## 2. The Scope Chain and Shadowing (4.5 mins)

### Talking Points & Concept Cues

- **Scope chain**: the links from the current scope out through each enclosing scope to global. It's
  one-directional, outward only.
- **"Lookup" is (mostly) conceptual**: since scope is lexical, the engine usually already knows
  which scope each reference belongs to by the time the code runs. The chain is our mental model.
- **Shadowing**: when an inner scope declares a name that also exists in an outer scope, the inner
  one wins for all code inside it. The outer variable is still there; it's just unreachable by that
  name from in here.
- **Shadowing bites**: it's easy to _think_ you're updating an outer variable while you're actually
  updating a local copy. Watch for it with parameters that reuse an outer name.
- **Copying is not accessing**: `const copied = window.studentName` copies the _value_. Changing
  `copied` later doesn't touch the global.

### Code Demo: `shadowingDemo()`

```javascript
var studentName = 'Suzy'

function printStudent(studentName) {
  studentName = studentName.toUpperCase() // updates the PARAMETER, not the global
  console.log('inside printStudent:', studentName) // FRANK
}

printStudent('Frank')
console.log('global studentName is untouched:', studentName) // Suzy
```

---

## 3. Illegal Shadowing (2 mins)

### Talking Points & Concept Cues

- Most shadowing is allowed. One combination isn't: a `var` declared inside a block can't shadow a
  `let` of the same name from an enclosing block in the same function.
- Why: `var` belongs to the whole function scope, so it would have to "hop over" the `let`'s block.
  The engine refuses with a `SyntaxError`.
- A function boundary fixes it, because the inner `var` then belongs to the inner function.
- Show the bonus snippet in `examples/week6-scope-chain-lifecycle.md`. Practical takeaway: if you
  use `let` and `const` everywhere (our course rule), you'll never hit this.

---

## 4. Function Name Scope and Arrow Functions (2.5 mins)

### Talking Points & Concept Cues

- **Function declaration** (`function greet() {}`): the name goes in the _enclosing_ scope.
- **Named function expression** (`const ask = function ofTheTeacher() {}`): `ask` is in the
  enclosing scope; `ofTheTeacher` exists **only inside the function**, and is read-only.
- **Why name an expression?** Stack traces show the name, and the function can refer to itself
  (recursion, removing its own event listener).
- **Arrow functions** are always anonymous expressions, but follow the same scope rules as any other
  function: each call gets its own scope.

### Code Demo: `functionNameScopeDemo()`

```javascript
const ask = function ofTheTeacher() {
  'use strict'
  console.log(typeof ofTheTeacher) // function
  ofTheTeacher = 42 // TypeError: read-only
}

ask()
console.log(typeof ofTheTeacher) // undefined: never existed out here
```

---

## 5. Where Is the Global Scope? (5.5 mins)

### Talking Points & Concept Cues

- **Why have a global scope at all?** Before modules, separate `<script>` files could only share
  code through it. Every classic script on a page shares one global scope.
- **Browser classic scripts**: top-level `var` and function declarations become properties of
  `window`. Top-level `let`, `const`, and `class` are global variables too, but do **not** appear on
  `window`.
- **Global unshadowing trick**: a shadowed `var` global can still be reached as
  `window.studentName`. Mention it, then say: if you need this, rename something.
- **DOM globals**: every element with an `id` becomes a global variable pointing at that element.
  Demo with `window.scoreboardBox`. That's why `id`-named variables seem to "just work," and why you
  shouldn't rely on them. Use `document.querySelector`.
- **`window.name`**: some global names are already taken by the browser, like `name` and `status`. A
  global `var name = 42` turns into the string `"42"`. Another reason not to put your variables in
  the global scope.
- **Other environments**:
  - **ES modules**: top-level declarations are **module-scoped**, not global. This is what our Vite
    projects use. Loaded as a module, the Global Mess wouldn't run silently wrong: the duplicate
    `calculate` declarations become a `SyntaxError`, and the undeclared `words` throws a
    `ReferenceError`. Loud errors are much easier to fix than quiet ones.
  - **Node**: each file is wrapped in a function, so the top level is never the global scope; the
    global object is `global`.
  - **Web Workers**: no DOM; the global object is `self`.
  - **DevTools console**: an approximation of the global scope with some quirks (it lets you
    re-declare `let`, for example). Don't treat it as proof of how a real script behaves.
- **`globalThis`**: the ES2020 standard name for the global object in every environment.

### Code Demo: `globalObjectDemo()`

```javascript
console.log(window.studentName) // Suzy (a global var)
console.log(globalThis === window) // true

const box = document.createElement('div')
box.id = 'scoreboardBox'
document.body.append(box)
console.log(window.scoreboardBox === box) // true: DOM elements with ids are globals
```

---

## 6. Wrap-Up (1.5 mins)

### Talking Points & Concept Cues

- **Key Takeaways**:
  1. The scope chain is the path from the current scope outward. The first match wins.
  2. Shadowing hides an outer variable by reusing its name. It's legal, but a common source of bugs.
  3. In a browser, the global scope is shared by every classic script, and is already crowded with
     browser-defined names and DOM `id`s.
  4. ES modules give each file its own scope. Use them, and use `globalThis` if you truly need the
     global object.
- **Next**: when exactly does a variable become usable? Hoisting, the TDZ, and loops.
