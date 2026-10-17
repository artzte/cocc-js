## Lexical Scope

This lecture starts our deep dive into the first pillar of JavaScript: **scope**. Our reading,
[Scope & Closures (2nd Edition), Chapter 1: What's the Scope?](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch1.md)
and
[Scope & Closures (2nd Edition), Chapter 2: Illustrating Lexical Scope](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch2.md),
explains how the JavaScript engine compiles a program before running it, and how that compile step
fixes every variable's scope based on where you wrote it. This lecture connects that model to live
console demos and to a real-world mess of a script that you'll clean up for this week's assignment.

---

### Key Lecture Topics

1. **The Bigger Picture**: The three pillars of JS (scope and closure, prototypes, types and
   coercion), and why we study scope first.
2. **Compile First, Then Execute**: The evidence that JS processes a whole program before running
   any of it: syntax errors, early errors, and hoisting.
3. **Targets and Sources**: Every variable reference either receives a value (target) or supplies
   one (source).
4. **Nested Scope**: Functions and blocks create scope "buckets" that nest inside each other. Lookup
   goes outward only, one level at a time, stopping at the first match.
5. **Lookup Failures**: `ReferenceError` for unknown sources; accidental globals for unknown targets
   in sloppy mode; why strict mode (and ES modules) prevent them.
6. **Scope in the Browser**: Tracing which variables nested event handlers can see, and touring a
   script where global variables collide.

---

### Scope at a Glance

| Idea                  | What it means                                                             | Example                                               |
| :-------------------- | :------------------------------------------------------------------------ | :---------------------------------------------------- |
| **Lexical scope**     | A variable's scope is set by where it's declared in the source code       | A function written inside another can see its vars    |
| **Scope bucket**      | The global scope, each function, and each `{ }` block (for `let`/`const`) | `function f() { let x }`: `x` lives in `f`'s bucket   |
| **Outward lookup**    | Check the current scope, then each enclosing scope, up to global          | Inner function reads `course` from its outer function |
| **Target**            | A reference that receives a value                                         | `total = 5`, a parameter, a `for...of` variable       |
| **Source**            | A reference that supplies a value                                         | `console.log(total)`, `return total`, `calc()`        |
| **Accidental global** | Assigning to an undeclared variable in sloppy mode creates a global       | `count = 0` with no `let`/`const`/`var`               |

#### Nested Scopes Example

```javascript
// RED (global): `scopeBucketsDemo`
function scopeBucketsDemo() {
  // BLUE: `course`, `teach`
  const course = 'CIS 133JS'

  function teach(topic) {
    // GREEN: `topic`, `week`
    const week = 5
    console.log(`${course}, week ${week}: ${topic}`) // `course` is found one level out
  }

  teach('lexical scope')
  console.log(typeof week) // "undefined": lookups never go inward
}
```

#### Lookup Failure Example

```javascript
function sloppyAssign() {
  accidentalGlobal = 'oops' // sloppy mode: silently creates window.accidentalGlobal
}

function strictAssign() {
  'use strict'
  anotherAccidentalGlobal = 'oops' // strict mode: ReferenceError
}
```

Our Vite projects load code with `<script type="module">`, and ES modules always run in strict mode,
so you get the safer behavior automatically.

---

### Resources & References

- **Lecture Guide & Snippet Walkthrough**:
  - [Week 5 Lecture Guide: Lexical Scope](../../lectures/week5-lexical-scope.md)
- **Textbook Readings**:
  - [Scope & Closures (2nd Edition), Chapter 1: What's the Scope?](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch1.md)
  - [Scope & Closures (2nd Edition), Chapter 2: Illustrating Lexical Scope](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch2.md)
  - [Get Started (2nd Edition), Chapter 4: The Bigger Picture](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch4.md)
    (bridge reading)
  - [Week 5 Reading Summary](../../weekly-readings/week-05.md)
- **Interactive Code & Demos**:
  - [Week 5 Lexical Scope DevTools Snippet Guide](../../examples/week5-lexical-scope.md)
  - [Week 5 Lexical Scope Source Snippet (`week5-lexical-scope.js`)](../../examples/week5-lexical-scope.js)
  - [The Global Mess (`examples/week5-global-mess/`)](../../examples/week5-global-mess/global-mess.js)
- **Programming Assignment**:
  - [Week 5 Assignment: Scope Refactor](week5-assignment-scope-refactor.md)
