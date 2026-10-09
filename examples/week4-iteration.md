# Week 4: Iteration Examples (Arrays, Loops, and the Iterator Protocol)

This guide provides an interactive browser console demo covering the iteration topics from Lecture
2: **Array Mutation vs. Copying**, **Looping Mechanics**, **The Iterator Protocol Under the Hood**,
**Consuming Iterables**, and **Higher-Order Array Methods** (`forEach`, `map`, `filter`, `find`,
`reduce`).

A standalone copy is also available at
[`week4-iteration.js`](file:///home/eric/src/cocc-js/course/examples/week4-iteration.js).

---

## Setup for Chrome DevTools Snippets

1. Open Google Chrome.
2. Open DevTools (`F12` or `Ctrl+Shift+I` on Windows/Linux, `Cmd+Option+I` on macOS).
3. Switch to the **Sources** tab.
4. In the left panel, click **Snippets** (or press `Ctrl+Shift+P` / `Cmd+Shift+P` and type
   `Create snippet`).
5. Name the snippet `week4-iteration.js`.
6. Paste the code below, press `Ctrl+S` (`Cmd+S`) to save, and `Ctrl+Enter` (`Cmd+Enter`) to run.

---

```javascript
// ====================================================================
// CIS 133JS — Week 4: Iteration Demos
// Arrays, Loops, Iterator Protocol, and Higher-Order Methods
// ====================================================================

function header(title) {
  console.log(`\n%c=== ${title} ===`, 'color: #10b981; font-weight: bold; font-size: 13px;')
}

// --------------------------------------------------------------------
// DEMO 1: Array Mutation vs. Non-Mutation (Copying)
// --------------------------------------------------------------------
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

// --------------------------------------------------------------------
// DEMO 2: Looping Forms: while, classic for, and modern for...of
// --------------------------------------------------------------------
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

// --------------------------------------------------------------------
// DEMO 3: The Iterator Protocol Under the Hood
// --------------------------------------------------------------------
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

// --------------------------------------------------------------------
// DEMO 4: Consuming Iterables Across JavaScript
// --------------------------------------------------------------------
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

// --------------------------------------------------------------------
// DEMO 5: Higher-Order Array Methods
// --------------------------------------------------------------------
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

// --------------------------------------------------------------------
// RUN ALL DEMOS
// --------------------------------------------------------------------
arrayMutationDemo()
loopFormsDemo()
iteratorProtocolDemo()
consumingIterablesDemo()
higherOrderMethodsDemo()
```

---

## Quick Reference: Higher-Order Array Methods

| Method            | Returns                 | Purpose                                       | Callback Signature             | Modifies Original? |
| :---------------- | :---------------------- | :-------------------------------------------- | :----------------------------- | :----------------- |
| **`forEach()`**   | `undefined`             | Perform side effects for each element         | `(item, index) => void`        | No                 |
| **`map()`**       | New Array               | Transform each element into a new value       | `(item, index) => newItem`     | No                 |
| **`filter()`**    | New Array               | Select elements that pass a test              | `(item, index) => boolean`     | No                 |
| **`find()`**      | Item or `undefined`     | Get first element matching condition          | `(item, index) => boolean`     | No                 |
| **`findIndex()`** | Index (`-1` if missing) | Get index of first element matching condition | `(item, index) => boolean`     | No                 |
| **`reduce()`**    | Accumulated Value       | Compress array into single result             | `(acc, item, index) => newAcc` | No                 |
