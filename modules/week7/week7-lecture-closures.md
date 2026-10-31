## Limiting Scope Exposure and Closures

This lecture finishes our three-week unit on the first pillar of JavaScript: **scope and closure**.
Our reading,
[Scope & Closures (2nd Edition), Chapter 6: Limiting Scope Exposure](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch6.md)
and
[Scope & Closures (2nd Edition), Chapter 7: Using Closures](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md),
answers two questions: _why_ should we hide variables in nested scopes, and _how_ can a function
keep using those hidden variables even after the outer scope has finished running? This lecture
connects those ideas to factory functions, memory lifecycle, and stateful browser widgets.

---

### Key Lecture Topics

1. **The Principle of Least Exposure (POLE)**: Why exposing too many variables causes naming
   collisions, unexpected mutations, and tight coupling, and how function and `{ }` block scopes
   hide private details.
2. **What a Closure Is**: A function that remembers and accesses variables from its enclosing
   lexical scope even when invoked outside that scope.
3. **Live Link, Not a Snapshot**: Closure holds a live reference to the variable itself, not a
   frozen copy of its value when the function was created.
4. **Factory Functions**: Calling an outer function to manufacture an object of methods that share
   private state through closure.
5. **Closure Lifecycle and Memory**: How closures keep variables alive against garbage collection,
   and why event delegation pairs naturally with closure.
6. **Closure vs. Class Tradeoffs**: Privacy (`let` in scope vs. public `this.prop`), callback safety
   (lexical lookup vs. losing `this`), and memory per instance.

---

### Closure at a Glance

| Concept                   | What It Means                                                                         | Example                                                       |
| :------------------------ | :------------------------------------------------------------------------------------ | :------------------------------------------------------------ |
| **POLE**                  | Expose the bare minimum; keep helper state private in the smallest scope possible     | Hide `cache` or `currentIndex` inside a function              |
| **Block scoping (`{ }`)** | Use `let`/`const` inside a block so temporary variables disappear when the block ends | `{ const temp = ... }`                                        |
| **Closure**               | A function retains live access to outer variables after the outer function returns    | `step()` still reads and updates `count` inside `makeCounter` |
| **Factory function**      | A function that returns an object of methods sharing private lexical state            | `createThemeSwitcher(themes)`                                 |
| **Closure vs. Class**     | Closures give true privacy and no `this` bugs; classes share methods on a prototype   | `switcher.next` works even when passed directly as a callback |

#### Factory Function Example

```javascript
function createCounter(initialValue = 0) {
  // `count` is private to this call of `createCounter` (POLE)
  let count = initialValue

  return {
    increment() {
      count += 1
      return count
    },
    decrement() {
      count -= 1
      return count
    },
    reset() {
      count = initialValue
      return count
    },
    getCount() {
      return count
    },
  }
}

const counter = createCounter(10)
console.log(counter.increment()) // 11
console.log(counter.count) // undefined: `count` is not a property on the object
```

---

### Resources & References

- **Lecture Guide & Snippet Walkthrough**:
  - [Week 7 Lecture Guide: Limiting Scope Exposure and Closures](../../lectures/week7-closures.md)
- **Side Lecture**:
  - [Week 7 Side Lecture: Efficient Event Handling with Event Delegation](week7-event-delegation.md)
- **Textbook Readings**:
  - [Scope & Closures (2nd Edition), Chapter 6: Limiting Scope Exposure](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch6.md)
  - [Scope & Closures (2nd Edition), Chapter 7: Using Closures](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md)
  - [Week 7 Reading Summary](../../weekly-readings/week-07.md)
- **Interactive Code & Demos**:
  - [Week 7 DevTools Snippet Guide](../../examples/week7-closures.md)
  - [Week 7 Source Snippet (`week7-closures.js`)](../../examples/week7-closures.js)
- **MDN References**:
  - [Closures](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures)
- **Assignments**:
  - [Week 7 Assignment: Color Theme Switcher](week7-assignment-theme-switcher.md)
  - [Final Project Milestone 2: Design Document](week7-assignment-design-document.md)
