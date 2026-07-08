# Week 3 Reading Summary: Functions and Comparisons

**Source**: *You Don't Know JS Yet: Get Started* — Chapter 2: Surveying JS (Functions and Comparisons)

---

### 1. Functions in JavaScript
Functions in JS act as **procedures**—collections of statements that can be run multiple times, receive parameter inputs, and return output.

#### A. Function Forms
* **Function Declarations**:
  * Standalone statements starting with the `function` keyword (e.g., `function hello() {}`).
  * The identifier is associated with the function at **compile time** (facilitating *function hoisting*).
* **Function Expressions**:
  * Functions defined as expressions and assigned to variables (e.g., `var hello = function() {}`).
  * The identifier is not associated with the function until **runtime** execution reaches the statement.
* **Functions as First-Class Values**:
  * Functions are a specialized subtype of object values.
  * They can be passed as arguments to other functions, returned from functions, and assigned as properties on objects (where they are called **methods**).

#### B. Inputs and Outputs
* **Parameters and Arguments**: Parameters are local variables defined in the function signature; arguments are the actual values passed into those parameters during invocation.
* **Return Values**: Functions return a single value via the `return` keyword. To return multiple values, they must be bundled into an object or array.

---

### 2. Comparisons
JS supports comparisons to make decisions, distinguishing between **equality** (exact match) and **equivalence** (interchangeable match).

#### A. Strict Equality (`===`)
* Compares both value and type without allowing any type conversion (coercion).
* **Nuances and "Lies"**:
  * `NaN === NaN` $\rightarrow$ `false` (Lies! Use `Number.isNaN(..)` or `Object.is(..)`).
  * `0 === -0` $\rightarrow$ `true` (Lies! Use `Object.is(..)`).
  * `Object.is(..)` can be thought of as a "quadruple equals" (`====`) that handles these corner cases accurately.

#### B. Object Comparisons (Reference Equality)
* JS does **not** perform **structural equality** checks (comparing object contents).
* It uses **identity/reference equality**: two variables are equal only if they reference the *exact same object in memory*.
  * `[1, 2, 3] === [1, 2, 3]` $\rightarrow$ `false` (different arrays in memory).
  * `var x = [1, 2, 3]; var y = x; y === x;` $\rightarrow$ `true` (reference to the same array).

#### C. Coercive/Loose Equality (`==`)
* Commonly called "loose equality," but more accurately described as **coercive equality**.
* **Behavior**:
  * If the types of the compared values are the same, `==` performs the exact same comparison as `===`.
  * If the types differ, `==` allows type conversion (**coercion**) before comparison (generally preferring numeric coercion, converting non-numbers to numbers).
  * *Tip*: Avoid using `==` with empty strings (`""`), `0`, or `false` to avoid confusing corner cases.

#### D. Relational Comparisons (`<`, `>`, `<=`, `>=`)
* There are no "strict" versions of relational comparisons; they always allow coercion.
* If both values are strings, they are compared alphabetically (lexicographically).
* If one or both values are not strings, they are coerced to numbers and compared numerically.

#### E. Truthy and Falsy Values
* **Falsy Values**: Values that coerce to `false` when forced into a boolean context (like `if` statements or loops). There are exactly 8 falsy values in JS:
  1. `false`
  2. `0` (and `-0`)
  3. `0n` (BigInt zero)
  4. `""` (empty string)
  5. `null`
  6. `undefined`
  7. `NaN`
  8. `document.all` (rare browser-specific object exception)
* **Truthy Values**: Any value not on the falsy list (e.g., `"hello"`, `42`, empty arrays `[]`, empty objects `{}`, and functions).
