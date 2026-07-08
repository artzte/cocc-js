# Week 7 Reading Summary: Closures

**Sources**:
* *You Don't Know JS Yet: Scope & Closures* — Chapter 6: Limiting Scope Exposure
* *You Don't Know JS Yet: Scope & Closures* — Chapter 7: Using Closures

---

### 1. Limiting Scope Exposure
* **POLE (Principle of Least Exposure)**: Default to exposing the bare minimum data and functions necessary, keeping everything else as private as possible. This prevents:
  1. **Naming Collisions**: Variables of the same name in different modules overwriting each other.
  2. **Unexpected Behavior**: External code mutating private state variables.
  3. **Unintended Dependency**: Other developers depending on private implementation details, creating refactoring hurdles.
* **Immediately Invoked Function Expressions (IIFEs)**:
  * Used to wrap blocks of code to hide variables inside a function scope.
  * Form: `(function(){ ... })();`
  * **Boundary Issues**: IIFEs introduce a new function boundary, which alters the behavior of `return`, `this`, `break`, and `continue`.
* **Block Scoping**: Enclosing variables in explicit `{ ... }` blocks with `let` or `const` declarations. This is cleaner than using IIFEs when function boundaries are not desired.

---

### 2. Definition of Closure
* **Core Definition**: Closure is observed when a function accesses variable(s) from its outer scope(s) even when that function is executed in a different scope (outside its original lexical scope).
* **Key Criteria**:
  1. A function must be involved.
  2. The function must reference at least one variable from an outer scope.
  3. The function must be invoked in a different branch of the scope chain from where the variable was defined.
* **Live Link, Not a Snapshot**: Closure is not a snapshot of a value at a point in time; it is a **direct link to the variable itself**. The function can read and modify the variable, and updates are preserved dynamically.

---

### 3. Loop Closures
* **The `var` Loop Issue**:
  ```js
  for (var i = 0; i < 3; i++) {
      keeps[i] = function() { return i; };
  }
  keeps[0](); // Returns 3, not 0
  ```
  Since `var` is function-scoped, there is only one shared variable `i` for the entire loop. By the time the functions run, `i` has been updated to `3`.
* **The `let` Solution**: Using `let i = 0` creates a **new, unique variable `i` for each loop iteration**. The functions close over these separate variables, returning `0`, `1`, and `2` as expected.

---

### 4. Memory Management and Garbage Collection
* **Memory Lifecycle**: Closed-over variables are protected from garbage collection (GC) as long as the referencing function instance remains alive.
* **Per-Scope vs. Per-Variable**: Conceptually, closure is per-variable. However, engines internally treat closure per-scope. Modern JS engines optimize memory by stripping out unreferenced variables from the closed scope.
  * **Evaluation Trap**: Lexical cheats like `eval(..)` prevent this optimization, forcing the engine to keep the entire scope chain in memory.
* **Memory Leak Mitigation**: For long-lived closures (like global click handlers), manually clean up memory by unsetting large variables when they are no longer needed (e.g., `largeArray = null`).

---

### 5. Alternative Perspective on Closure
* **The Traditional View**: A function is passed around as a value and carries a hidden link to its original birth scope.
* **The Reference View**: Functions (as objects) are passed by reference-copy. The function instance itself **never moves**; it stays inside its original scope environment. Closure is simply the mechanism that **prevents the function instance and its birth scope from being garbage collected** as long as an active reference to the function exists.

---

### 6. Closure vs. Class (Tradeoffs)
Both closures (used in module factory functions) and classes package state (data) and behavior (methods) together, but they differ in crucial ways:
* **State Storage and Visibility**:
  * **Closure**: Stores state in local lexical variables (e.g., variables inside a factory function). These variables are **strictly private** by default; external code cannot read or modify them unless public getter/setter methods are explicitly returned on the API.
  * **Class**: Stores state as properties on the object instance (`this.propertyName`). In standard ES6 classes, these properties are **public** by default and can be modified or read directly from the outside.
* **Context Binding Safety (`this`)**:
  * **Closure**: Methods access state directly through lexical scope. They do not use `this`, meaning they are safe from dynamic `this` binding bugs when passed around as callbacks or event listeners.
  * **Class**: Methods access state via the dynamic `this` keyword. If a class method is detached and passed as a callback (e.g., `btn.addEventListener("click", myInstance.myMethod)`), its `this` binding is lost (resulting in runtime errors), requiring manual binding (e.g., `.bind(this)` or arrow wrapper).
* **Memory and Performance**:
  * **Closure**: Every new instance of a factory function creates **new function instances** in memory for each of its methods, which uses more memory when creating many instances.
  * **Class**: Methods are defined once on the shared **prototype** object and inherited dynamically by all instances, making classes highly memory-efficient for large quantities of objects.
