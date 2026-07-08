# Week 1 Reading Summary: What *Is* JavaScript?

**Source**: *You Don't Know JS Yet: Get Started* — Chapter 1: What *Is* JavaScript?

---

### 1. Language Identity, History, and Standards
* **The Name Myth**: "JavaScript" has no relation to "Java"; it was a marketing ploy by Netscape (originally code-named Mocha, then LiveScript) to ride Java's coattails. Java and JS share C-like syntax conventions but are fundamentally different.
* **Trademarks and ECMAScript**: Oracle owns the trademark for "JavaScript". The official specification name is **ECMAScript**, managed by the ECMA standards body. Modern revisions are designated by the release year (e.g., *ES2019*).
* **TC39 Committee**: The Technical Committee 39 (consisting of 50–100 representatives from major browser and device companies) governs the language specification.
* **Proposals Stage Process**: Language features evolve through five stages (Stage 0 to Stage 4). Once a feature reaches Stage 4, it is eligible for inclusion in the next yearly ECMAScript specification.

### 2. The Dominance of the Web and Host Environments
* **Engine vs. Runtime (Host Environment)**:
  * **JS Engine**: The program that parses, compiles (JIT), and executes JS code (e.g., V8 in Chrome/Node, SpiderMonkey in Firefox).
  * **JS Runtime (Host Environment)**: The surrounding environment hosting the engine (e.g., web browser, Node.js). It adds environment-specific guest APIs (like DOM, timers, or `fs` file operations) to enable interaction with the outside world.
* **The Web Rules**: The web browser is the primary environment that dictates how JS is implemented. If a specification change conflicts with legacy web code (e.g., "smooshgate"), the specification is adapted or the feature is renamed (e.g., `flat(..)` instead of `flatten(..)`).
* **Appendix B**: The ECMAScript specification includes a web-only section (Appendix B) defining legacy browser-specific behaviors and extensions (e.g., `escape`/`unescape`, `0`-prefixed octal literals) to preserve backwards compatibility on the web without polluting core JS.
* **Host Environment APIs**: Many common browser APIs (like `alert(..)`, `fetch(..)`, and `console.log(..)`) are **not** part of the ECMAScript specification. They are guest APIs provided by the host environment (browser or Node.js) that adhere to JS syntax.
* **Developer Tool Console Quirks**: Browser DevTools prioritize developer experience (DX) over strict spec compliance. Behaviors like variable hoisting, global scope creation, and strict-mode pragma evaluation can vary slightly from actual JS execution files.

### 3. Multi-Paradigm Nature
* **No Single Style**: JS is a multi-paradigm language. It does not force developers into a single coding style.
* **Paradigms Supported**:
  * **Procedural**: Top-down, linear execution using functions grouped as procedures.
  * **Object-Oriented (OO)**: Organizing code via classes, inheritance, and instances.
  * **Functional Programming (FP)**: Structuring logic around pure computations and treating functions as values.

### 4. Compatibility: Backwards vs. Forwards
* **Backwards Compatibility (Guaranteed)**: Valid JS code written in 1995 still runs today. TC39 prioritizes "not breaking the web," which places a high bar on adding new features and makes design decisions permanent.
* **Forwards Compatibility (Unsupported)**: Older JS engines will crash (throwing syntax or runtime errors) if they encounter newer JS syntax or APIs.
* **Bridges for the Gaps**:
  * **Transpiling (for Syntax)**: Tools like Babel parse newer syntax (e.g., `let`/`const`) and transpile it into functionally equivalent older syntax (e.g., unique `var` names) for older browsers.
  * **Polyfilling/Shimming (for APIs)**: Supplying a custom JavaScript implementation of missing new APIs (e.g., `Promise.prototype.finally`) if the host environment does not natively support them.

### 5. Compiled vs. Interpreted Language
* **JS is Compiled**: Rather than line-by-line interpretation, modern JS engines parse code into an Abstract Syntax Tree (AST), convert it to binary intermediate representation (bytecode), and optimize it using JIT (Just-In-Time) compiler passes before execution.
* **Early Errors**: Because JS compiles before execution, syntax and static errors (like duplicate parameter names or strict-mode violations) are caught and reported as "early errors" before any code runs.
* **WebAssembly (WASM)**: A binary compilation format designed for AOT (Ahead-of-Time) compilation. It allows non-JS languages (like C, C++, Rust, Go) to run efficiently in browser JS engines without replacing JS itself.

### 6. Strict Mode
* **Opt-In Guardrails**: Added in ES5 (`"use strict";`), strict mode guides developers toward high-quality, optimizable JS and flags legacy pitfalls (e.g., preventing duplicate parameters, avoiding silent failures).
* **Scope**: Can be applied file-wide (recommended) or restricted to specific function scopes.
* **De Facto Default**: While technically opt-in, strict mode is active in virtually all modern production code because:
  * Transpilers automatically inject strict mode.
  * ES6 Modules default to strict mode automatically.
