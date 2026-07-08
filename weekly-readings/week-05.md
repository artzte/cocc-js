# Week 5 Reading Summary: Lexical Scope

**Sources**:
* *You Don't Know JS Yet: Scope & Closures* — Chapter 1: What's the Scope?
* *You Don't Know JS Yet: Scope & Closures* — Chapter 2: Illustrating Lexical Scope
* *You Don't Know JS Yet: Get Started* — Chapter 4: The Bigger Picture (Pillar 1: Scope & Closures)

---

### 1. The Two-Phase Processing Model
JavaScript is a **compiled language** in practice. The engine processes programs in two distinct phases: **parsing/compilation first**, then **execution**. 

#### Proof of Compilation
1. **Syntax Errors**: A syntax error anywhere in a file (e.g., `.` before a string) halts the entire file. If JS were purely line-by-line interpreted, code preceding the error would execute first.
2. **Early Errors**: Strict-mode violations (e.g., duplicate function parameters) are caught and thrown before execution begins.
3. **Hoisting / TDZ**: Accessing a block-scoped variable before its declaration causes a `ReferenceError`, showing that the engine is already aware of the inner variable before executing the line.

---

### 2. Lexical Scope Metaphors
* **Marbles and Buckets**: Variables are marbles; scopes (functions and blocks) are colored buckets. The color of a variable marble is fixed at compile time based on where it was declared.
* **The Scope Building**: A nested scope hierarchy is like an office building. The current executing scope is the first floor. Resolving a variable involves checking the current floor, then taking the elevator up one floor at a time to check outer scopes, stopping at the global scope (the roof). Lookups are strictly one-directional (upward/outward).
* **The Engine Conversation**: 
  * *Compiler* and *Scope Manager* converse at compile time to declare variables in their respective scopes.
  * *Engine* and *Scope Manager* converse at runtime to perform lookups, retrieve values (sources), and assign values (targets).

---

### 3. Compiler Terminology: Targets vs. Sources
Variables in execution play one of two roles:
* **Target (LHS)**: The variable is receiving a value (e.g., assignment `x = 2`, function parameters receiving arguments, loop variables, function declarations).
* **Source (RHS)**: The variable is supplying a value (e.g., referencing a variable to print it, returning it, or calling it as a function).

---

### 4. Runtime Scope Modifications (Cheating Lexical Scope)
In non-strict mode, developers can bypass lexical scope, causing performance penalties because the engine cannot optimize compile-time lookups:
* **`eval(codeStr)`**: Compiles and executes code strings on the fly, dynamically introducing declarations into the active scope.
* **`with (obj)`**: Dynamically converts an object's properties into identifiers inside a block scope.
* *Note*: Both cheats are **forbidden in strict mode**.

---

### 5. Lexical Scope vs. Dynamic Scope
* **Lexical Scope**: Scope boundaries and variable associations are established at compile time (author-time code placement). JS is strictly lexically scoped.
* Lookups are optimized away at compile time; runtime lookups are mostly conceptual.
