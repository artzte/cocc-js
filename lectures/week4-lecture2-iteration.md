# Week 4 Lecture 2 Guide: Iteration in JavaScript (Arrays, Loops, and Iterators)

**Reading**: _You Don't Know JS Yet: Get Started_ (2nd Edition) — Chapter 2: _Surveying JS_ (Arrays
portion) & Chapter 3: _Digging to the Roots of JS_ (Iteration)  
**Format**: Interactive Lecture & Chrome DevTools Snippet Walkthrough
([`examples/week4-iteration.js`](file:///home/eric/src/cocc-js/course/examples/week4-iteration.js))  
**Duration**:
~20 Minutes  
**Prereq Context**: Week 4 Lecture 1 (organization, functions, classes, closures)

---

## Pacing & Timeline

| Time              | Section                                          | Focus / Snippet Function                                                          |
| :---------------- | :----------------------------------------------- | :-------------------------------------------------------------------------------- |
| **00:00 - 03:00** | **1. Array Mutation vs. Non-Mutation (Copying)** | `push`/`pop`/`splice` vs. `slice`/spread (`arrayMutationDemo`)                    |
| **03:00 - 06:30** | **2. Looping: Counting vs. Consuming**           | `while`, classic `for`, modern `for...of` (`loopFormsDemo`)                       |
| **06:30 - 11:00** | **3. The Iterator Protocol Under the Hood**      | `[Symbol.iterator]()`, `.next()`, `{value, done}` (`iteratorProtocolDemo`)        |
| **11:00 - 15:00** | **4. Consuming Iterables Across JavaScript**     | Strings, Sets, spread `...`, and `.entries()` (`consumingIterablesDemo`)          |
| **15:00 - 19:00** | **5. Higher-Order Array Methods**                | `forEach`, `filter`, `map`, chaining, `find`, `reduce` (`higherOrderMethodsDemo`) |
| **19:00 - 20:00** | **6. Wrap-Up & Deliverables**                    | Milestone 1 Proposal reminder, Challenge preview, Quiz 4                          |

---

## Setup: Running the Demos in Chrome DevTools

1. Open Chrome DevTools (`F12` or `Ctrl+Shift+I` / `Cmd+Option+I`).
2. Press `Ctrl+Shift+P` (`Cmd+Shift+P`) and select **Create snippet**.
3. Name it `week4-iteration.js`.
4. Paste the contents of
   [`examples/week4-iteration.js`](file:///home/eric/src/cocc-js/course/examples/week4-iteration.js).
5. Run the snippet (`Ctrl+Enter` / `Cmd+Enter`). Each section below corresponds directly to one of
   the demo functions.

---

## 1. Array Mutation vs. Non-Mutation (Copying) (3 mins)

### Talking Points & Concept Cues

- **Arrays as Ordered Collections**: Numerically indexed (0-based) objects with an automatic
  `.length` property.
- **Mutating Methods (Change in Place)**:
  - `push(item)`: Appends to end.
  - `pop()`: Removes and returns last item.
  - `splice(start, count, ...items)`: Deletes, replaces, or inserts items in place.
- **Non-Mutating Methods (Return New Array)**:
  - `slice(start, end)`: Returns a shallow slice without touching the original.
  - Array Spread `[...original, newItem]`: Creates a shallow copy, leaving the original intact.
- **Kyle Simpson's Architectural Note**: Favoring non-mutating operations prevents unintended
  side-effects across components sharing state.

### Code Demo: `arrayMutationDemo()`

```javascript
function arrayMutationDemo() {
  header('1. Array Mutation vs. Copying')

  const original = ['Python', 'JavaScript', 'Rust']

  // MUTATING: Changes the array in place
  original.push('Go')
  console.log('After push():', original)

  const popped = original.pop()
  console.log('Popped item:', popped)
  console.log('After pop():', original)

  // Splice (mutating): Remove 1 element at index 0 and insert 'TypeScript'
  original.splice(0, 1, 'TypeScript')
  console.log('After splice():', original) // ["TypeScript", "JavaScript", "Rust"]

  // NON-MUTATING: Returns a brand new array, original is untouched
  const subSection = original.slice(1, 3)
  console.log('slice(1, 3):', subSection) // ["JavaScript", "Rust"]
  console.log('Original remains untouched:', original)

  // Shallow copy using spread operator:
  const copy = [...original, 'Kotlin']
  console.log('Spread copy with addition:', copy)
  console.log('Original remains untouched:', original)
}
```

---

## 2. Looping: Counting vs. Consuming (3.5 mins)

### Talking Points & Concept Cues

- **`while`**: Used when iteration count is uncertain or driven by dynamic conditions.
- **Classic `for (let i = 0; i < arr.length; i++)`**:
  - The counting loop.
  - Requires maintaining an index variable `i`.
  - Prone to off-by-one errors (`<` vs. `<=`).
  - Access requires manual indexing (`fruits[i]`).
- **Modern `for...of`**:
  - Direct value access without index arithmetic.
  - Works on **any iterable** (arrays, strings, Sets, Maps, NodeLists).
  - Clean, declarative, and less error-prone.
- **Why Does `for...of` Work?**: It does not rely on numerical indices. It relies on the **Iterator
  Protocol**.

### Code Demo: `loopFormsDemo()`

```javascript
function loopFormsDemo() {
  header('2. Looping: while, for, and for...of')

  const fruits = ['Apple', 'Banana', 'Cherry']

  // 1. While loop
  console.log('-- While Loop --')
  let index = 0
  while (index < fruits.length) {
    console.log(`while [${index}]:`, fruits[index])
    index += 1
  }

  // 2. Classic counting for loop
  console.log('-- Classic for Loop --')
  for (let i = 0; i < fruits.length; i++) {
    console.log(`classic [${i}]:`, fruits[i])
  }

  // 3. Modern for...of loop
  console.log('-- Modern for...of Loop --')
  for (const fruit of fruits) {
    console.log('for...of:', fruit)
  }
}
```

---

## 3. The Iterator Protocol Under the Hood (4.5 mins)

### Talking Points & Concept Cues

- **The Big Question (_YDKJSY Ch3_)**: How does JS iterate collections that have no numeric indices
  (like a Set or Map)?
- **The Protocol Standard**:
  1. **Iterable**: An object that implements `[Symbol.iterator]()`. Calling it returns an
     **Iterator**.
  2. **Iterator**: An object with a `.next()` method.
  3. **Iterator Result**: Each `.next()` call returns:
     ```javascript
     { value: currentItem, done: false }
     ```
     When exhausted, it returns:
     ```javascript
     { value: undefined, done: true }
     ```
- **What `for...of` Does Behind the Scenes**:
  1. Calls `data[Symbol.iterator]()` to obtain the iterator.
  2. Repeatedly calls `.next()`.
  3. Runs loop body while `done === false`.
  4. Automatically terminates when `done === true`.
- **Custom Iterables**: Any plain object can participate in JavaScript iteration simply by defining
  a `[Symbol.iterator]()` generator/method!

### Code Demo: `iteratorProtocolDemo()`

```javascript
function iteratorProtocolDemo() {
  header('3. The Iterator Protocol Under the Hood')

  const colors = ['red', 'green', 'blue']

  // An Iterable is any object with a [Symbol.iterator]() method:
  console.log('Does array have Symbol.iterator?', typeof colors[Symbol.iterator] === 'function')

  // Calling Symbol.iterator produces an Iterator instance:
  const iterator = colors[Symbol.iterator]()
  console.log('Iterator object:', iterator)

  // An Iterator is an object with a .next() method:
  // Each call returns { value: ..., done: ... }
  console.log('Step 1:', iterator.next()) // { value: "red", done: false }
  console.log('Step 2:', iterator.next()) // { value: "green", done: false }
  console.log('Step 3:', iterator.next()) // { value: "blue", done: false }
  console.log('Step 4:', iterator.next()) // { value: undefined, done: true }

  // Custom Iterable: Any object can implement [Symbol.iterator]()!
  const countdown = {
    start: 3,
    [Symbol.iterator]() {
      let current = this.start
      return {
        next() {
          if (current > 0) {
            const val = current
            current -= 1
            return { value: val, done: false }
          }
          return { value: undefined, done: true }
        },
      }
    },
  }

  console.log('-- Consuming Custom Iterable with for...of --')
  for (const count of countdown) {
    console.log('Countdown:', count)
  }
}
```

---

## 4. Consuming Iterables Across JavaScript (4 mins)

### Talking Points & Concept Cues

- **Iterables Are Everywhere**:
  - Strings iterate character by character.
  - Sets contain unique values and iterate insertion order.
  - Maps iterate `[key, value]` entries.
- **Consuming Patterns**:
  - **Spread Operator (`...`)**: Expands any iterable into an array (`[...'COCC']` $\rightarrow$
    `['C','O','C','C']`).
  - Sets + Spread is the standard idiom to deduplicate arrays: `[...new Set(duplicates)]`.
- **Array Iterator Helpers**:
  - `arr.keys()`, `arr.values()`, `arr.entries()`.
  - `arr.entries()` paired with destructuring gives you both index and value cleanly:
    ```javascript
    for (const [idx, day] of days.entries()) { ... }
    ```

### Code Demo: `consumingIterablesDemo()`

```javascript
function consumingIterablesDemo() {
  header('4. Consuming Iterables: Strings, Sets, Maps, and entries()')

  // 1. Strings are iterables:
  const characters = [...'COCC']
  console.log('Spread string into array:', characters) // ["C", "O", "C", "C"]

  // 2. Sets and Maps are iterables:
  const uniqueNumbers = new Set([10, 20, 20, 30, 10])
  console.log('Spread Set:', [...uniqueNumbers]) // [10, 20, 30]

  // 3. Array Iterator Helpers: keys(), values(), entries()
  const days = ['Mon', 'Tue', 'Wed']

  console.log('-- arr.entries() with Destructuring --')
  for (const [idx, day] of days.entries()) {
    console.log(`Day #${idx + 1}: ${day}`)
  }
}
```

---

## 5. Higher-Order Array Methods (4 mins)

### Talking Points & Concept Cues

- **Imperative vs. Declarative**:
  - Imperative loops specify _how_ to step through elements and manipulate variables.
  - Higher-Order Methods accept callback functions and describe _what_ transformation to perform.
- **The Core Methods**:
  1. **`forEach(cb)`**: Side-effects only (always returns `undefined`). Never use it to build new
     arrays.
  2. **`filter(cb)`**: Selects elements matching a boolean predicate into a new array.
  3. **`map(cb)`**: Transforms elements 1-to-1 into a new array of the exact same length.
  4. **Method Chaining**: Combine `.filter()` and `.map()` to filter and format data in a single
     readable pipeline.
  5. **`find(cb)`**: Returns the _first_ matching item (or `undefined`).
  6. **`reduce(cb, initialValue)`**: Aggregates elements into a single value (sum, tally object,
     etc.).
     - `callback(accumulator, item) => newAccumulator`

### Code Demo: `higherOrderMethodsDemo()`

```javascript
function higherOrderMethodsDemo() {
  header('5. Higher-Order Methods: map, filter, find, reduce')

  const products = [
    { id: 1, name: 'Notebook', price: 4.5, category: 'Supplies', inStock: true },
    { id: 2, name: 'Backpack', price: 45.0, category: 'Gear', inStock: false },
    { id: 3, name: 'Pen 4-Pack', price: 3.25, category: 'Supplies', inStock: true },
    { id: 4, name: 'USB Flash Drive', price: 14.99, category: 'Tech', inStock: true },
    { id: 5, name: 'Water Bottle', price: 18.0, category: 'Gear', inStock: true },
  ]

  // A. forEach — Side-effects only (always returns undefined)
  console.log('-- forEach: Print names --')
  products.forEach((p) => console.log(`Item: ${p.name}`))

  // B. filter — Select subset based on boolean condition
  const availableItems = products.filter((p) => p.inStock)
  console.log('Available items count:', availableItems.length) // 4

  // C. map — Transform each element (1-to-1)
  const priceTags = products.map((p) => `${p.name}: $${p.price.toFixed(2)}`)
  console.log('Price tags:', priceTags)

  // D. Chaining: Filter available supplies and map to names
  const availableSupplies = products
    .filter((p) => p.inStock && p.category === 'Supplies')
    .map((p) => p.name)
  console.log('Available supplies:', availableSupplies) // ["Notebook", "Pen 4-Pack"]

  // E. find — Find first item matching condition (or undefined)
  const expensiveGear = products.find((p) => p.price > 40)
  console.log('First expensive gear:', expensiveGear ? expensiveGear.name : 'None')

  // F. reduce — Accumulate array into a single summary value
  // Example 1: Sum the total price of all available items
  const inventoryValue = availableItems.reduce((accumulator, item) => {
    return accumulator + item.price
  }, 0)
  console.log(`Total available inventory: $${inventoryValue.toFixed(2)}`)

  // Example 2: Group counts by category
  const countsByCategory = products.reduce((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + 1
    return acc
  }, {})
  console.log('Counts by category:', countsByCategory)
}
```

---

## 6. Wrap-Up & Deliverables (1 min)

### Talking Points & Concept Cues

- **Key Takeaways**:
  1. Prefer non-mutating array operations (`slice`, spread `[...]`) over in-place mutation.
  2. `for...of` loops over values of any iterable via the Iterator Protocol (`Symbol.iterator`
     $\rightarrow$ `.next()` $\rightarrow$ `{ value, done }`).
  3. Strings, Sets, Maps, and NodeLists are all native iterables.
  4. Use `filter()` to narrow, `map()` to transform, and chain them for clean data pipelines.
  5. Use `reduce()` when you need to condense a list into a summary number or lookup object.
- **Week 4 Deliverables**:
  - **Challenge: Filterable Item List**: Render items, filter live as user types, display matches.
  - **Project Milestone 1: Proposal**: Submit your 1-page `PROPOSAL.md` in your project repository
    describing your final project idea, users, 3–5 features, and chosen public API!
  - **Quiz 4**: Arrays, loops, and iterators.
