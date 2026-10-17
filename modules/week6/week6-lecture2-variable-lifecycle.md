## The Lifecycle of Variables: Hoisting, the TDZ, and Loops

This lecture answers a question that sounds simple: _when_ can you use a variable? Our reading,
[Scope & Closures (2nd Edition), Chapter 5: The (Not So) Secret Lifecycle of Variables](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch5.md),
explains hoisting, re-declaration, the Temporal Dead Zone, and how loops create variables. This
lecture walks through each with console demos, works a debug challenge where hoisting and shadowing
combine, and sets up the classic `var`-in-a-loop bug you'll fix in this week's assignment.

---

### Key Lecture Topics

1. **Hoisting**: Every declaration is registered at the start of its scope before any code runs.
   Nothing moves; "hoisting" is a metaphor for that compile-time step.
2. **Functions vs. `var`**: Function declarations start out ready to call. `var` starts out as
   `undefined`. Function expressions follow the rules of their variable.
3. **The Temporal Dead Zone (TDZ)**: `let` and `const` start out uninitialized, and touching them
   before their declaration runs throws a `ReferenceError`. The TDZ is about _time_, not position.
4. **Re-declaration and `const`**: Repeating a `var` is a no-op; repeating a `let` or `const` is a
   `SyntaxError`. `const` prevents re-assignment, not mutation.
5. **Loops**: `var` gives a loop one shared variable; `let` gives each iteration its own. Why that
   matters for event handlers created inside loops.
6. **Debug Challenge**: Untangling a function where hoisting and shadowing combine to print
   `undefined`.

---

### Hoisting at a Glance

| Declaration              | Scope    | Value when the scope starts | Using it before its line runs            |
| :----------------------- | :------- | :-------------------------- | :--------------------------------------- |
| `function f() {}`        | Function | The function itself         | Works                                    |
| `var x = 1`              | Function | `undefined`                 | Gives `undefined` (silent bug)           |
| `let x = 1`              | Block    | Uninitialized (TDZ)         | `ReferenceError` (loud, at the bad line) |
| `const x = 1`            | Block    | Uninitialized (TDZ)         | `ReferenceError`                         |
| `var f = function () {}` | Function | `undefined`                 | `TypeError: f is not a function`         |

#### The TDZ Is Temporal

```javascript
function readBonus() {
  return bonus // written below... but what matters is WHEN it runs
}

readBonus() // ReferenceError: Cannot access 'bonus' before initialization
const bonus = 5
readBonus() // 5
```

#### One Variable, or One Per Iteration?

```javascript
const varFns = []
for (var i = 0; i < 3; i++) {
  varFns.push(() => i)
}
console.log(varFns.map((fn) => fn())) // [3, 3, 3]: one shared `i`

const letFns = []
for (let j = 0; j < 3; j++) {
  letFns.push(() => j)
}
console.log(letFns.map((fn) => fn())) // [0, 1, 2]: a new `j` each time
```

> **Course rule**: use `const` by default, `let` when a value must be re-assigned, and never `var`.
> Declare variables at the top of the scope that uses them.

---

### Resources & References

- **Lecture Guide & Snippet Walkthrough**:
  - [Week 6 Lecture 2 Guide: The Lifecycle of Variables](../../lectures/week6-lecture2-variable-lifecycle.md)
- **Textbook Readings**:
  - [Scope & Closures (2nd Edition), Chapter 5: The (Not So) Secret Lifecycle of Variables](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch5.md)
  - [Week 6 Reading Summary](../../weekly-readings/week-06.md)
- **Interactive Code & Demos**:
  - [Week 6 DevTools Snippet Guide](../../examples/week6-scope-chain-lifecycle.md) (demos 4–8 and
    the debug challenge)
  - [Week 6 Source Snippet (`week6-scope-chain-lifecycle.js`)](../../examples/week6-scope-chain-lifecycle.js)
- **MDN References**:
  - [Hoisting (Glossary)](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)
  - [`let`: Temporal dead zone](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let#temporal_dead_zone_tdz)
- **Programming Assignment**:
  - [Week 6 Assignment: Scoreboard](week6-assignment-scoreboard.md)
