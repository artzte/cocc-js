# Week 7 Lecture Guide: Limiting Scope Exposure and Closures

**Reading**:
[Scope & Closures (2nd Edition), Chapter 6: Limiting Scope Exposure](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch6.md)
and
[Scope & Closures (2nd Edition), Chapter 7: Using Closures](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md)  
**Format**:
Interactive Lecture & Chrome DevTools Snippet Walkthrough
([`examples/week7-closures.js`](../examples/week7-closures.js))  
**Duration**: ~20 Minutes  
**Prereq Context**: Weeks 5–6 (lexical scope, outward lookup, scope chain, hoisting, `var` vs. `let`
in loops)

---

## Pacing & Timeline

| Time              | Section                                       | Focus / Snippet Function                                                       |
| :---------------- | :-------------------------------------------- | :----------------------------------------------------------------------------- |
| **00:00 - 03:30** | **1. The Principle of Least Exposure (POLE)** | Why hide variables? Function & block scoping (`poleDemo`)                      |
| **03:30 - 07:30** | **2. What Is a Closure?**                     | Live link, not a snapshot; independent instances (`liveLinkDemo`)              |
| **07:30 - 11:30** | **3. Factory Functions & Encapsulation**      | Private state + public API object (`factoryFunctionDemo`)                      |
| **11:30 - 15:00** | **4. Closure vs. Class & Memory Lifecycle**   | Privacy, `this` binding safety, GC (`closureVsClassDemo`)                      |
| **15:00 - 18:00** | **5. Browser Counter & Debug Challenge**      | Live DOM counter (`browserCounterDemo`) + stale string trap (`debugChallenge`) |
| **18:00 - 20:00** | **6. Wrap-Up & Week 7 Deliverables**          | Side lecture bridge, Theme Switcher challenge, Milestone 2                     |

---

## 1. The Principle of Least Exposure (POLE) (3.5 mins)

### Talking Points & Concept Cues

- **Connecting Weeks 5–6**: We know _how_ scopes nest and _when_ variables initialize.
  [Scope & Closures (2nd Edition), Chapter 6: Limiting Scope Exposure](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch6.md)
  asks the design question: **where should we put our variables?**
- **POLE (Principle of Least Exposure)**: Default to exposing the bare minimum necessary, keeping
  everything else in the smallest, innermost scope possible.
- **Three hazards of over-exposure**:
  1. **Naming collisions**: Two parts of a program pick the same name (like `count` or `cache`) and
     step on each other.
  2. **Unexpected behavior**: Other code mutates an array or counter that was meant to be internal
     bookkeeping.
  3. **Unintended dependency**: If an internal variable is exposed, other code will eventually rely
     on it, locking you out of refactoring later.
- **Tools for hiding variables**:
  - **Functions**: Wrapping state (like `cache` in `poleDemo`) inside a function hides it from the
    outside world.
  - **IIFEs** (`(function() { ... })()`): Historically used to create a throwaway function scope,
    though they change the meaning of `return`, `this`, `break`, and `continue`.
  - **Explicit `{ }` blocks with `let`/`const`**: When you just need a temporary variable for a few
    lines, a plain `{ ... }` block is cleaner than an IIFE.

### Code Demo: `poleDemo()`

```javascript
function buildFactorial() {
  const cache = {} // hidden from the outside world!

  return function factorial(n) {
    if (n < 2) return 1
    if (!(n in cache)) {
      cache[n] = n * factorial(n - 1)
    }
    return cache[n]
  }
}
```

---

## 2. What Is a Closure? (4 mins)

### Talking Points & Concept Cues

- In `buildFactorial()`, notice something remarkable: `buildFactorial()` **finished running and
  returned**, yet `factorial(5)` is still reading and updating `cache`. That is **closure**.
- **Definition**
  ([Scope & Closures (2nd Edition), Chapter 7: Using Closures](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md)):
  Closure is observed when a function accesses variables from its outer lexical scope(s) even when
  it is executed in a scope where those variables wouldn't normally be visible.
- **Three criteria to spot a closure**:
  1. Must involve a **function**.
  2. Must reference at least one variable from an **outer scope**.
  3. Must be invoked in a **different branch of the scope chain** (or after the outer scope has
     returned).
- **Live link, not a snapshot**: Closure does not freeze the value of `count` at the moment the
  inner function was created. It keeps a live link to the `count` variable itself so reads and
  updates persist across calls.
- **Every call creates a new scope bubble**: Calling `makeCounter(0)` and `makeCounter(10)` creates
  two separate scope bubbles, each with its own `count`.

### Code Demo: `liveLinkDemo()`

```javascript
function makeCounter(start = 0) {
  let count = start
  return function step() {
    count += 1
    return count
  }
}

const hitsA = makeCounter(0)
const hitsB = makeCounter(10)
console.log(hitsA()) // 1
console.log(hitsA()) // 2
console.log(hitsB()) // 11
```

---

## 3. Factory Functions & Encapsulation (4 mins)

### Talking Points & Concept Cues

- Returning a single function is great, but what if we want several operations (`increment`,
  `decrement`, `reset`, `getCount`) that all share the same private state?
- **Factory function pattern**: A function that returns an **object of methods**. Every method on
  that returned object closes over the same lexical scope bubble.
- **True privacy**: Try running `counter.count = 999`. That creates a harmless property on the
  returned object, but the methods inside `createCounter` don't read `this.count`—they read the
  lexical variable `count`! There is **no way** for outside code to corrupt `count` except through
  the methods you chose to return.
- This is the exact pattern you will use in the Week 7 assignment (`createThemeSwitcher(themes)`).

---

## 4. Closure vs. Class & Memory Lifecycle (3.5 mins)

### Talking Points & Concept Cues

- Next week (Week 8) we'll study ES6 `class`. Both factory functions (closures) and classes bundle
  data and behavior together, so when should you use which?
  - **Privacy**: Closure variables (`let count`) are private by default. Standard class properties
    (`this.count`) are public on the instance.
  - **`this` safety**: Class methods rely on `this`, which depends on _how_ the function is called.
    If you pass `btn.addEventListener('click', instance.increment)`, `this` is lost! Closure methods
    use lexical scope—they never use `this`, so you can pass them anywhere safely.
  - **Memory**: Classes share one set of methods on a prototype; factory functions create fresh
    method closures per instance. For a UI widget or state manager (1–10 instances), closure
    overhead is negligible and privacy + `this`-safety win. For 10,000 game particles, use a
    `class`.
- **Garbage Collection (GC)**: Normally, when a function finishes, its local variables are garbage
  collected. A closure keeps its referenced outer variables alive for as long as the inner function
  itself stays alive (for example, while attached as an event listener).

---

## 5. Browser Counter & Debug Challenge (3 mins)

### Talking Points & Concept Cues

- Run `browserCounterDemo()`: inspect the counter rendered onto the `about:blank` page and click
  `-1`, `Reset`, and `+1`.
- Point out how `host.addEventListener('click', ...)` is attached **once** outside `render()` and
  uses `event.target.dataset.action`—previewing our Week 7 Side Lecture on Event Delegation.
- Run `debugChallenge()`:
  - Why does `cart.getSummary()` print `0 items: (empty)`?
  - Because `const summary = ...` ran **once** when `createCart()` was called (when `items` was
    empty). `getSummary()` closed over the string `summary`, not a live calculation!
  - **The fix**: Compute the template literal inside `getSummary()` so it reads `items` each time
    `getSummary()` is called:
    ```javascript
    getSummary() {
      return `${items.length} items: ${items.join(', ') || '(empty)'}`
    }
    ```

---

## 6. Wrap-Up & Week 7 Deliverables (2 mins)

### Talking Points & Concept Cues

- **Key Takeaways**:
  1. **POLE**: Hide variables in the smallest scope possible so outside code can't collide with or
     corrupt them.
  2. **Closure** is a live link from a function to its outer lexical variables, surviving even after
     the outer function returns.
  3. **Factory functions** return an object of methods sharing private lexical state.
- **Next Up — Side Lecture**: Before starting the Week 7 assignment, watch/read the side lecture on
  **Efficient Event Handling with Event Delegation**, where we refactor the Week 6 Scoreboard to
  replace its per-button `for` loop with a single container click handler.
- **Week 7 Deliverables (Due Monday, November 9)**:
  - **Quiz 7**
  - **Week 7 Challenge: Color Theme Switcher**
  - **Final Project Milestone 2: Design Document**
