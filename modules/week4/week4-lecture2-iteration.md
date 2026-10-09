## Iteration in JavaScript: Arrays, Loops, and Iterators

This lecture explores how modern JavaScript processes and transforms collections of data: **array
mutation vs. non-mutating copying**, core **looping constructs** (`for`, `while`, `for...of`), the
underlying **ES6 Iterator Protocol**, and declarative pipelines using **higher-order array methods**
(`forEach`, `filter`, `map`, `reduce`). While our readings from _You Don't Know JS Yet: Get Started_
(Chapter 2: _Arrays_ and Chapter 3: _Iteration_) provide deep conceptual background, this lecture
connects those fundamentals directly to live DOM filtering and responsive search UI.

---

### Key Lecture Topics

1. **Array Mutation vs. Non-Mutating Copying**: Mutating in place (`push`, `pop`, `splice`) vs.
   returning new arrays or shallow copies (`slice`, array spread `[...arr]`). Why modern JavaScript
   favors non-mutating operations for reliable state management.
2. **Looping Constructs**: Counting with traditional `for`, condition-based execution with `while`,
   and consuming iterables cleanly with modern `for...of`.
3. **The Iterator Protocol Under the Hood**: How `[Symbol.iterator]()` produces an iterator object
   with a `.next()` method returning `{ value, done }`. How this protocol powers `for...of`, array
   destructuring, and spread syntax.
4. **Iterables vs. Plain Objects**: Why arrays, strings, Sets, and Maps are iterable, but plain
   objects (`{}`) are not (and how `Object.keys()`, `Object.values()`, and `Object.entries()` bridge
   that gap).
5. **Higher-Order Array Methods**: Declarative transformations using `.forEach()`, `.filter()`,
   `.map()`, `.find()`, and `.reduce()`. Chaining methods into clean data processing pipelines.
6. **Live DOM Filtering**: Reading user search inputs and dynamically re-rendering filtered arrays
   into the Document Object Model (the core pattern for the Week 4 Programming Assignment).

---

### Quick Comparison: Looping and Iteration

| Mechanism                    | Mutates Original?              | Can `break`/`continue`?    | Works On                                   | Primary Use Case                                    |
| :--------------------------- | :----------------------------- | :------------------------- | :----------------------------------------- | :-------------------------------------------------- |
| `for (let i = 0; ...)`       | No                             | Yes                        | Arrays, strings, indexed objects           | Counting loops, step increments, index access       |
| `while (condition)`          | No                             | Yes                        | Any truthy condition                       | Repeating until an external condition changes       |
| `for (let item of iterable)` | No                             | Yes                        | Arrays, strings, Sets, Maps (any iterable) | Clean, readable consumption of iterable values      |
| `arr.forEach(callback)`      | No                             | No (runs callback for all) | Arrays                                     | Running side-effects for each item                  |
| `arr.filter(predicate)`      | No (returns new array)         | No                         | Arrays                                     | Filtering elements based on a test                  |
| `arr.map(transform)`         | No (returns new array)         | No                         | Arrays                                     | Transforming each element into a new representation |
| `arr.reduce(reducer, init)`  | No (returns accumulated value) | No                         | Arrays                                     | Aggregating an array into a single value or object  |

---

### The Iterator Protocol in Action

Under the hood, any JavaScript construct that consumes an iterable (such as `for...of` or
`[...arr]`) calls the iterable's `[Symbol.iterator]()` method to retrieve an iterator, then
repeatedly invokes `.next()` until `done: true`:

```javascript
const numbers = [10, 20, 30]
const iterator = numbers[Symbol.iterator]()

console.log(iterator.next()) // { value: 10, done: false }
console.log(iterator.next()) // { value: 20, done: false }
console.log(iterator.next()) // { value: 30, done: false }
console.log(iterator.next()) // { value: undefined, done: true }
```

Because plain objects (`{}`) do not define a `[Symbol.iterator]` method, attempting to loop over
them with `for...of` throws a `TypeError`. To iterate object entries, convert them first:

```javascript
const course = { code: 'CIS 133JS', credits: 4 }

for (const [key, val] of Object.entries(course)) {
  console.log(`${key}: ${val}`)
}
```

---

### Resources & References

- **Lecture Guide & Snippet Walkthrough**:
  - [Week 4 Lecture 2 Guide: Iteration (Arrays, Loops, Iterators)](../../lectures/week4-lecture2-iteration.md)
- **Textbook Readings**:
  - _You Don't Know JS Yet: Get Started_, Chapter 2 (_Surveying JS_ — Arrays)
  - _You Don't Know JS Yet: Get Started_, Chapter 3 (_Digging to the Roots of JS_ — Iteration)
  - [Week 4 Reading Summary](../../weekly-readings/week-04.md)
- **Interactive Code & Demos**:
  - [Week 4 Iteration DevTools Snippet Guide](../../examples/week4-iteration.md)
  - [Week 4 Iteration Source Snippet (`week4-iteration.js`)](../../examples/week4-iteration.js)
- **Programming Assignment**:
  - [Week 4 Assignment: Filterable Item List](week4-assignment-filterable-item-list.md)
