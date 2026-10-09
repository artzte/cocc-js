# Week 4 Reading Summary: Organization and Iteration

**Sources**:

- _You Don't Know JS Yet: Get Started_ — Chapter 2: Surveying JS (_How We Organize in JS_ &
  _Arrays_)
- _You Don't Know JS Yet: Get Started_ — Chapter 3: Digging to the Roots of JS (_Iteration_)

---

### 1. How We Organize in JavaScript (Classes, Closures, and Modules)

JavaScript provides distinct patterns for organizing state and behavior into reusable structures:

#### A. Classes

- **ES6 Class Syntax**: Standard template mechanism for object-oriented programming in JavaScript.
- **`constructor`**: Method invoked on instantiation (`new ClassName(...)`).
- **Methods & Inheritance**: Instance methods live on the shared prototype; child classes inherit
  behavior via `class Child extends Parent` and call `super(...)`.

#### B. Functional Closures

- **Definition**: A function's ability to remember and continue accessing variables from its outer
  (lexical) scope even after the outer scope has finished executing.
- **Data Privacy**: Local variables in the outer function remain inaccessible to the outside world,
  providing true encapsulation without class fields.

#### C. Modules

- **Classic (Revealing) Modules**: Factory functions or IIFEs returning an object with methods that
  close over private variables.
- **ES Modules (ESM)**: Modern, native, file-based standard (`import` / `export`).
  - Automatically enabled with strict mode (`"use strict"`).
  - File-scoped (top-level variables do not pollute the global scope).
  - Native browser support via `<script type="module" src="...">`.

---

### 2. Arrays and Common Methods

Arrays are ordered, numerically indexed (0-based) collections of values. Common array methods
include:

- **`push(val)` / `pop()`**: Add a value to the end, or remove the last value
- **`unshift(val)` / `shift()`**: Add a value to the front, or remove the first value
- **`slice(start, end)`**: Returns a shallow copy of a portion of an array into a new array object.
- **`splice(start, deleteCount, ...items)`**: Modifies the array in place by adding, removing, or
  replacing elements at a specified index.

---

### 3. Looping Mechanisms

JavaScript offers several loop structures to repeat operations:

- **`while (condition) { ... }`**: Runs a block of code as long as the condition evaluates to true.
- **`for (initialization; condition; update) { ... }`**: The classic counting loop, typically used
  with a counter variable.
- **`for (let item of iterable) { ... }`**: Loops over values produced by an **iterable** (arrays,
  strings, Maps, etc.), hiding manual iteration details. =
  **`iterable.forEach((value, index, iterable) => {})`**: Iteration method supplying value,
  index/key, and the source iterable as arguments to the callback function

---

### 4. The Iterator Protocol

ES6 standardized a protocol for consuming data source chunks iteratively.

#### A. Iterators and Iterables

- **Iterator**: An object with a `next()` method. Calling `next()` returns an _iterator result_
  object:
  ```js
  { value: "some value", done: false } // done is true when finished
  ```
- **Iterable**: A value/structure (such as a string, array, Map, or Set) that can produce an
  iterator. Calling its `[Symbol.iterator]()` method creates a new iterator instance.

#### B. Consuming Iterators

- **`for...of` Loop**: Automatically requests an iterator from the iterable and consumes it until
  `done: true`.
- **Spread Operator (`...`)**: Symmetrical to "rest/gather", this consumes an iterator to spread its
  values into:
  - **An array**: `var arrCopy = [ ...originalArr ]` (useful for shallow copying).
  - **Function arguments**: `doSomething( ...args )`
- **Custom Iterators**: Built-in collections provide three methods to customize iteration:
  - `keys()`: Iterates over the keys or indices.
  - `values()`: Iterates over the values.
  - `entries()`: Iterates over key/value pairs as tuples (e.g., `[idx, val]`), which can be broken
    down using array destructuring: `for (let [idx, val] of arr.entries())`.

---

### 5. Higher-Order Array Methods

These are methods that accept callback functions to iterate over and manipulate array data cleanly:

- **`forEach(callback)`**: Executes a callback for every element in the array. Used for
  side-effects.
- **`map(callback)`**: Transforms each element, returning a new array of the same length containing
  the returned values.
- **`filter(callback)`**: Evaluates each element against a test; returns a new array with elements
  that returned a truthy value.
- **`find(callback)`**: Returns the first element in the array that satisfies the test callback, or
  `undefined` if none match.
- **`reduce(callback, initialValue)`**: Aggregates the array into a single accumulator value (like a
  sum or merged object) by running a reducer callback across all elements.
