# Week 2 Reading Summary: Values, Types, and Variables

**Source**: *You Don't Know JS Yet: Get Started* — Chapter 2: Surveying JS (Values through Declaring and Using Variables)

---

### 1. Programs and Files
* **File-Based Programs**: JavaScript treats each separate `.js` file as its own independent program.
* **Cooperation**: Multiple files cooperate at runtime by sharing state in the **global scope** or through module imports/exports.
* **Bundling**: If a build tool concatenates multiple files into one, the JS engine treats that single combined file as one unified program.

### 2. Values and Types
JS values are divided into two main categories: **primitives** and **objects**.

#### A. Primitive Values
* **Strings**:
  * Delimited by double quotes (`"`) or single quotes (`'`) stylistically.
  * Delimited by backticks (`` ` ``) for **template literals**, which support multiline strings and variable/expression **interpolation** via `${expression}`.
* **Numbers**: Represent numeric data. JS also supports **BigInt** (using an `n` suffix, like `42n`) for arbitrarily large integers.
* **Booleans**: `true` and `false`, representing conditional states.
* **Empty Values (`null` and `undefined`)**: Both represent the absence of a value. The author recommends using `undefined` as the sole empty value for consistency.
* **Symbols**: Unique, unguessable primitive values used primarily as private/special keys on objects.

#### B. Objects and Arrays
* **Objects**: Unordered, keyed collections of properties. Properties can be accessed using dot notation (`obj.prop`) or bracket notation (`obj["prop"]`).
* **Arrays**: A special sub-type of object representing an ordered, numerically indexed (0-based) list of values. They track their size via the `.length` property.
* **Functions**: Also a special sub-type of object that can hold logic and be executed.

#### C. Type Determination (`typeof`)
* The `typeof` operator returns a string representing the type of a value:
  * `typeof 42` $\rightarrow$ `"number"`
  * `typeof "abc"` $\rightarrow$ `"string"`
  * `typeof true` $\rightarrow$ `"boolean"`
  * `typeof undefined` $\rightarrow$ `"undefined"`
  * `typeof { a: 1 }` and `typeof [1, 2, 3]` $\rightarrow$ `"object"`
  * `typeof function() {}` $\rightarrow$ `"function"`
  * `typeof null` $\rightarrow$ `"object"` (**Note**: This is a historical, uncorrected bug in the language spec).

### 3. Declaring and Using Variables
Variables are named containers used to store and manage values.

* **`var`**:
  * Declares a variable with **function scope** (or global scope if declared outside a function).
  * Accessible throughout the entire function in which it is declared.
* **`let`**:
  * Declares a variable with **block scope** (restricted to the nearest enclosing `{ ... }` block, such as an `if` statement or a loop).
  * Limits variable exposure, preventing naming collisions.
* **`const`**:
  * Behaves like `let` (block-scoped) but must be assigned an initial value upon declaration.
  * Cannot be re-assigned to a new value.
  * **Mutation Warning**: Storing objects or arrays in a `const` prevents re-assigning the variable itself, but the *contents* of the object or array can still be mutated (e.g., `const arr = []; arr.push(1);` is valid). It is best to use `const` only with primitive values to avoid mutation confusion.
* **Other Declarations**:
  * **Function Parameters**: Automatically declared as variables local to the function body.
  * **Catch Clause Bindings**: The error variable in `catch (err)` is block-scoped to the catch clause.
