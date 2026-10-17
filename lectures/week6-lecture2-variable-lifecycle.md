# Week 6 Lecture 2 Guide: The Lifecycle of Variables (Hoisting, TDZ, and Loops)

**Reading**: _You Don't Know JS Yet: Scope & Closures_ (2nd Edition) — Chapter 5: _The (Not So)
Secret Lifecycle of Variables_  
**Format**: Interactive Lecture & Chrome DevTools Snippet Walkthrough
([`examples/week6-scope-chain-lifecycle.js`](../examples/week6-scope-chain-lifecycle.js), demos
4–8)  
**Duration**: ~20 Minutes  
**Prereq Context**: Week 6 Lecture 1 (scope chain, shadowing, global scope)

---

## Pacing & Timeline

| Time              | Section                              | Focus / Snippet Function                                             |
| :---------------- | :----------------------------------- | :------------------------------------------------------------------- |
| **00:00 - 01:30** | **1. When Can I Use a Variable?**    | Hoisting as a compile-time metaphor                                  |
| **01:30 - 06:00** | **2. Hoisting: Functions and `var`** | Declarations vs. expressions (`hoistingDemo`)                        |
| **06:00 - 10:00** | **3. The Temporal Dead Zone**        | `let`/`const`, time not position (`tdzDemo`)                         |
| **10:00 - 12:00** | **4. Re-declaration and `const`**    | `var` no-ops, `let` errors, const vs. mutation (`redeclarationDemo`) |
| **12:00 - 15:30** | **5. Loops: One Variable or Many?**  | The `var`-in-a-loop bug (`loopsDemo`)                                |
| **15:30 - 18:30** | **6. Debug Challenge**               | Hoisting + shadowing together (`debugChallenge`)                     |
| **18:30 - 20:00** | **7. Wrap-Up & Deliverables**        | Quiz 6, Scoreboard challenge, Milestone 2 preview                    |

---

## 1. When Can I Use a Variable? (1.5 mins)

### Talking Points & Concept Cues

- Week 5: a variable's _scope_ is decided at compile time. This lecture: _when_, during execution,
  can you actually use it?
- **Hoisting** is the name for the fact that every declaration is registered at the start of its
  scope, before any code in that scope runs. Nothing physically moves. It's a metaphor for what the
  compiler does.
- The three kinds of declarations differ in what they're **initialized to** when the scope starts.
  That's the whole lecture in one sentence.

| Declaration              | Registered at scope start? | Initial value at scope start | Use before the line runs |
| :----------------------- | :------------------------- | :--------------------------- | :----------------------- |
| `function f() {}`        | Yes                        | The function itself          | Works                    |
| `var x`                  | Yes (function scope)       | `undefined`                  | Gives `undefined`        |
| `let x` / `const x`      | Yes (block scope)          | Nothing: uninitialized (TDZ) | `ReferenceError`         |
| `var f = function () {}` | Yes, as a `var`            | `undefined`                  | `TypeError` if called    |

---

## 2. Hoisting: Functions and `var` (4.5 mins)

### Talking Points & Concept Cues

- **Function declarations** are hoisted _and_ initialized, so you can call them above where they're
  written. This is handy: put the main logic at the top of a file and helpers below.
- **`var`** is hoisted to the top of the enclosing _function_ (not block!) and set to `undefined`.
  Reading it early doesn't crash, which sounds friendly but hides bugs.
- **Function expressions** follow the rules of the variable they're assigned to. With `var`, calling
  early gives `TypeError: farewell is not a function`, because `farewell` is `undefined`.
- **Python bridge (CIS 122)**: Python has nothing like this. Calling a function above its `def`
  raises `NameError`.

### Code Demo: `hoistingDemo()`

```javascript
console.log(greet('Ada')) // "Hello, Ada": declaration is hoisted and ready

console.log(teacher) // undefined: var hoisted, not yet assigned
var teacher = 'Kyle'

farewell('Ada') // TypeError: farewell is not a function
var farewell = function (name) {
  return `Goodbye, ${name}`
}

function greet(name) {
  return `Hello, ${name}`
}
```

---

## 3. The Temporal Dead Zone (4 mins)

### Talking Points & Concept Cues

- **`let` and `const` are hoisted too** (remember the Week 5 evidence: the error proves the engine
  knew about the variable). But they're **not initialized** until their declaration line runs.
- The span between entering the scope and running the declaration is the **Temporal Dead Zone**.
  Touching the variable in that window throws
  `ReferenceError: Cannot access 'x' before initialization`.
- **Temporal, not spatial**: a function written _below_ a `let` can still hit the TDZ if it's
  _called_ before the `let` line runs. What matters is time, not position on the page.
- **Why this is good**: `undefined` from an early `var` lets a bug travel far before anyone notices.
  A TDZ error stops at the exact line.
- **Practical rule** (Simpson's advice too): declare `let`/`const` at the top of their scope, and
  the TDZ never bites.

### Code Demo: `tdzDemo()`

```javascript
function readBonus() {
  return bonus
}

readBonus() // ReferenceError: Cannot access 'bonus' before initialization
const bonus = 5
readBonus() // 5
```

---

## 4. Re-declaration and `const` (2 mins)

### Talking Points & Concept Cues

- Declaring the same `var` twice in a scope is a harmless no-op. The second `var` does nothing.
- Declaring the same name twice with `let` or `const` (or mixing with `var`) is a `SyntaxError`.
  (Bonus snippet in the `.md`.)
- **`const` means "can't re-assign," not "can't change."** `roster.push('Alan')` works on a `const`
  array; `roster = []` throws `TypeError`.
- **Course rule**: `const` by default, `let` when the value must be re-assigned, never `var`.

---

## 5. Loops: One Variable or Many? (3.5 mins)

### Talking Points & Concept Cues

- **`for (var i = 0; ...)`**: there is **one** `i`, belonging to the whole enclosing function. Every
  pass through the loop updates the same variable, and it's still there (equal to `3`) after the
  loop.
- **`for (let j = 0; ...)`**: JS creates a **new `j` for every iteration**, initialized from the
  previous one. Each pass has its own.
- This only matters when something _remembers_ the variable for later: a function pushed into an
  array, a `setTimeout`, or **an event handler attached inside the loop**.
- **The classic browser bug**: create a button for each player in a `var` loop, and every button's
  click handler reads the same `i`, which is now `players.length`. Every click updates a player who
  doesn't exist. That's exactly what you'll demonstrate and fix in the Scoreboard challenge.
- **`const` in loops**: `for (const i = 0; i < 3; i++)` fails because `i++` re-assigns.
  `for (const player of players)` is fine: each iteration gets a new `player`.
- **Preview**: _why_ the handler remembers its variable at all is closure, week 7.

### Code Demo: `loopsDemo()`

```javascript
const varFns = []
for (var i = 0; i < 3; i++) {
  varFns.push(() => i)
}
console.log(varFns.map((fn) => fn())) // [3, 3, 3]

const letFns = []
for (let j = 0; j < 3; j++) {
  letFns.push(() => j)
}
console.log(letFns.map((fn) => fn())) // [0, 1, 2]
```

---

## 6. Debug Challenge (3 mins)

### Talking Points & Concept Cues

- Run `debugChallenge()`. It prints `Welcome back, undefined! You have undefined new messages.`
- Ask students to diagnose before showing the fix (questions are in
  `examples/week6-scope-chain-lifecycle.md`).
- **Bug 1 (hoisting)**: `showWelcome()` is a hoisted declaration, so calling it early works. But the
  outer `var userName` and `var messageCount` haven't been assigned yet, so they're `undefined`.
- **Bug 2 (shadowing)**: the `var messageCount` inside the `if` block belongs to all of
  `showWelcome()` (var ignores blocks). It shadows the outer `messageCount` for the entire function,
  and it's `undefined` unless the `if` runs.
- **One possible fix**:

```javascript
function debugChallenge() {
  const userName = 'Ada'
  const messageCount = 3

  function showWelcome() {
    const shownCount = messageCount === 0 ? 'no' : messageCount
    console.log(`Welcome back, ${userName}! You have ${shownCount} new messages.`)
  }

  showWelcome()
}
```

- Point out: with `const`, calling `showWelcome()` too early would have thrown a TDZ error right
  away, instead of quietly printing `undefined`.

---

## 7. Wrap-Up & Deliverables (1.5 mins)

### Talking Points & Concept Cues

- **Key Takeaways**:
  1. Every declaration is registered at the start of its scope (hoisting). What differs is the
     initial value: the function, `undefined`, or uninitialized (TDZ).
  2. The TDZ is about time, not position, and it turns silent `undefined` bugs into loud errors.
  3. `var` ignores blocks and gives a loop one shared variable. `let` gives each iteration its own.
  4. `const` by default, `let` when needed, never `var`. Declare at the top of the scope.
- **Week 6 Deliverables**:
  - **Quiz 6**: scope chain, hoisting rules, TDZ, global scope in the browser.
  - **Challenge: Scoreboard**: shared state through the scope chain, plus the `var`-in-a-loop bug
    demonstrated and fixed.
- **Coming up**: Final Project **Milestone 2 (Design Document)** is assigned in Week 7 and due
  **Monday, November 9**. Start sketching your UI and module plan now.
