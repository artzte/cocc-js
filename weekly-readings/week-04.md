# Week 4 Reading Summary: Arrays, Loops, and Iteration

**Sources**:
* *You Don't Know JS Yet: Get Started* — Chapter 2: Surveying JS (Arrays/Iteration portion)
* *You Don't Know JS Yet: Get Started* — Chapter 3: Digging to the Roots of JS (Iteration)

---

### 1. Arrays and Common Methods
Arrays are ordered, numerically indexed (0-based) collections of values. Common array methods include:
* **`push(val)` / `pop()`**: Add a value to the end, or remove the last value from the end of the array.
* **`slice(start, end)`**: Returns a shallow copy of a portion of an array into a new array object.
* **`splice(start, deleteCount, ...items)`**: Modifies the array in place by adding, removing, or replacing elements at a specified index.

---

### 2. Looping Mechanisms
JavaScript offers several loop structures to repeat operations:
* **`while (condition) { ... }`**: Runs a block of code as long as the condition evaluates to true.
* **`for (initialization; condition; update) { ... }`**: The classic counting loop, typically used with a counter variable.
* **`for (let item of iterable) { ... }`**: Loops over values produced by an **iterable** (arrays, strings, Maps, etc.), hiding manual iteration details.

---

### 3. The Iterator Protocol
ES6 standardized a protocol for consuming data source chunks iteratively.

#### A. Iterators and Iterables
* **Iterator**: An object with a `next()` method. Calling `next()` returns an *iterator result* object:
  ```js
  { value: "some value", done: false } // done is true when finished
  ```
* **Iterable**: A value/structure (such as a string, array, Map, or Set) that can produce an iterator. Calling its default iterator method creates a new iterator instance.

#### B. Consuming Iterators
* **`for...of` Loop**: Automatically requests an iterator from the iterable and consumes it until `done: true`.
* **Spread Operator (`...`)**: Symmetrical to "rest/gather", this consumes an iterator to spread its values into:
  * **An array**: `var arrCopy = [ ...originalArr ]` (useful for shallow copying).
  * **Function arguments**: `doSomething( ...args )`
* **Custom Iterators**: Built-in collections provide three methods to customize iteration:
  * `keys()`: Iterates over the keys or indices.
  * `values()`: Iterates over the values.
  * `entries()`: Iterates over key/value pairs as tuples (e.g., `[idx, val]`), which can be broken down using array destructuring: `for (let [idx, val] of arr.entries())`.

---

### 4. Higher-Order Array Methods
These are methods that accept callback functions to iterate over and manipulate array data cleanly:
* **`forEach(callback)`**: Executes a callback for every element in the array. Used for side-effects.
* **`map(callback)`**: Transforms each element, returning a new array of the same length containing the returned values.
* **`filter(callback)`**: Evaluates each element against a test; returns a new array with elements that returned a truthy value.
* **`find(callback)`**: Returns the first element in the array that satisfies the test callback, or `undefined` if none match.
* **`reduce(callback, initialValue)`**: Aggregates the array into a single accumulator value (like a sum or merged object) by running a reducer callback across all elements.
