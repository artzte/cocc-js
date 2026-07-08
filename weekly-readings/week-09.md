# Week 9 Reading Summary: Modules

**Sources**:
* *You Don't Know JS Yet: Scope & Closures* — Chapter 8: The Module Pattern
* *You Don't Know JS Yet: Get Started* — Chapter 2: Surveying JS (Modules portion)

---

### 1. Modularity and Encapsulation
* **Encapsulation**: Bundling related data (state) and behavior (functions) serving a common purpose.
* **Namespace (Stateless Grouping)**: Grouping functions under a single namespace object (e.g. `var Utils = { ... }`) without state. Not a module.
* **Data Structure (Stateful Grouping)**: Bundling state and functions together publicly (e.g. `var Student = { records: [...], getName() {...} }`), but without restricting access. Not a module.
* **Module (Stateful Access Control)**: Encapsulating state and methods with distinct **private** (hidden implementation details) and **public** (exposed API) boundaries.

---

### 2. Classic/Revealing Modules
* **Structure**: Created using an outer wrapper function (IIFE for singletons; factory function for multiple instances).
* **Privacy**: Leverages lexical scope to make variables and helper functions private by default.
* **API Exposure**: Returns a public API object holding references to inner functions.
* **State Maintenance**: The exported functions maintain access to the hidden state variables via **closure** across the program's lifetime.

---

### 3. Node CommonJS Modules
* **File-Based**: CommonJS is file-based (one module per file).
* **Implicit Wrapping**: Node wraps module files in a hidden wrapper function `Module(module, require, __dirname, ...)` making all top-level variables module-private by default.
* **Exporting**: Exposes APIs by adding properties to the `module.exports` object.
  * *Tip*: Avoid replacing `module.exports` with a new object literal directly (can cause cyclic dependency bugs). Instead, use `Object.assign(module.exports, { ... })`.
* **Importing**: Consumed via the `require(..)` function. Returns the module's public API. CommonJS modules are singletons; multiple requires load the cached module instance.

---

### 4. Modern ES Modules (ESM)
* **Native Standard**: Introduced in ES6. ESMs are file-based, singletons, and run in **strict mode by default** (cannot be disabled).
* **Exports**: Exposes API members using the `export` keyword:
  * **Named Exports**: E.g., `export { getName };` or `export function getName() {}`.
  * **Default Export**: E.g., `export default function getName() {}` (allows consumers to import without curly braces).
* **Imports**: Consumed using the `import` keyword at the top-level scope:
  * **Named Import**: `import { getName } from "./students.js";` (supports renaming: `import { getName as getStudent }`).
  * **Default Import**: `import getName from "./students.js";`.
  * **Namespace Import**: `import * as Student from "./students.js";`.
* **Instantiation**: Since ESM is a singleton, it cannot be instantiated multiple times. If multiple instances are required, the ESM must export a classic module-style factory function or a class.
