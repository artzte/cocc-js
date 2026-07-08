# Week 6 Reading Summary: Scope Chain, Global Scope, and Variable Lifecycle

**Sources**:
* *You Don't Know JS Yet: Scope & Closures* — Chapter 3: The Scope Chain
* *You Don't Know JS Yet: Scope & Closures* — Chapter 4: Around the Global Scope
* *You Don't Know JS Yet: Scope & Closures* — Chapter 5: The (Not So) Secret Lifecycle of Variables

---

### 1. The Scope Chain and Shadowing
* **Scope Chain**: Nesting of scopes that creates a one-way (upward/outward) lookup path to resolve variables.
* **Variable Shadowing**: When an inner scope declares a variable with the exact same name as an outer scope variable. Lookups stop at the first match, making the outer variable lexically inaccessible from the inner scope.
* **Global Unshadowing**: Global variables declared with `var` or `function` are mirrored as properties on the global object (`window` in browsers). If shadowed, they can still be accessed as `window.variableName`.
  * *Warning*: Globals declared with `let`, `const`, or `class` do **not** create properties on the global object and cannot be unshadowed.
* **Illegal Shadowing**:
  * An inner `let` can shadow an outer `var`.
  * An inner `var` **cannot** shadow an outer `let` within the same block scope (results in a `SyntaxError`), unless separated by a function boundary.

### 2. Specialized Function Scopes
* **Function Name Scope**: 
  * A function declaration (e.g., `function foo() {}`) registers its name in the outer enclosing scope.
  * A named function expression (e.g., `var a = function b() {}`) registers its name (`b`) **only inside the function itself** as a read-only variable (throws a `TypeError` on assignment in strict mode).
* **Arrow Functions**: Syntactically anonymous. They create their own inner block/function scope and follow the exact same lexical scope rules as standard functions.

### 3. Global Scope and Environments
* **Stitching Separate Files**: Separate non-module `.js` files loaded in the same environment share the global scope as their coordinate workspace.
* **Global Environments**:
  * **Browser (`window`)**: Standalone scripts run in the true global scope. DOM elements with `id` attributes automatically create global variables pointing to them.
  * **Web Workers (`self`)**: Separate thread execution. No DOM access. Standard global object is accessed via `self`.
  * **Node**: Node wraps files in a hidden wrapper function `Module(..)`. Thus, the top level of a Node file is **never the global scope**. The global object must be accessed via `global`.
  * **`globalThis`**: Standardized in ES2020, it provides a universal way to access the global scope object across all environments (browsers, workers, Node).

### 4. Variable Lifecycle and Hoisting
* **Hoisting**: A compile-time metaphor representing the registration of variables at the beginning of a scope.
* **Function Hoisting**: Function declarations are hoisted and **auto-initialized** to their function reference.
* **`var` Hoisting**: Hoisted to the top of the function scope and **auto-initialized** to `undefined`.
* **Re-declaration**:
  * Multiple `var` declarations of the same identifier in a scope are treated as harmless no-ops.
  * Attempting to re-declare a variable using `let` or `const` in the same scope throws a `SyntaxError`.
* **Loops**: Scope resets per iteration (instance). In `for (let i = 0; ...)` loops, a new variable `i` is created and bound for each iteration. `const` cannot be used in classic `for` loops due to counter re-assignment (`i++`).
* **Temporal Dead Zone (TDZ)**:
  * The time between entering a scope and executing the actual declaration/initialization statement for a `let` or `const` variable.
  * Accessing a variable in its TDZ throws a `ReferenceError` ("Cannot access before initialization").
  * TDZ is *temporal* (time-based), not *spatial* (code position). Calling a function referencing a TDZ variable before the declaration executes will crash, even if the function definition is positionally below the declaration.
