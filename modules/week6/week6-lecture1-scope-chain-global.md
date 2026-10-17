## The Scope Chain and the Global Scope

This lecture extends last week's lexical scope model. Our reading,
[Scope & Closures (2nd Edition), Chapter 3: The Scope Chain](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch3.md)
and
[Scope & Closures (2nd Edition), Chapter 4: Around the Global Scope](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch4.md),
explains how nested scopes link together, what happens when two scopes use the same variable name,
and what "the global scope" actually is in a browser, in Node, and in ES modules. This lecture
connects those ideas to console demos and to the bugs you fixed in last week's Global Mess.

---

### Key Lecture Topics

1. **The Scope Chain**: The one-way path from the current scope outward to the global scope, and why
   the first match always wins.
2. **Shadowing**: Declaring an inner variable with the same name as an outer one, when that's
   useful, and how it causes "I changed it but nothing happened" bugs.
3. **Illegal Shadowing**: The one shadowing combination the compiler rejects (an inner `var` over an
   outer `let`).
4. **Function Name Scope**: Where the name of a function declaration lives vs. the name of a named
   function expression. Arrow functions follow the same scope rules.
5. **The Global Scope in the Browser**: `window`, `globalThis`, globals created by DOM element
   `id`s, browser-reserved names, and why global pollution is dangerous.
6. **Other Environments**: How ES modules, Node, and Web Workers each change what "top level" means.

---

### Where Does a Top-Level Declaration Go?

| Where the code runs              | Top-level `var` / `function`              | Top-level `let` / `const` / `class` | Global object    |
| :------------------------------- | :---------------------------------------- | :---------------------------------- | :--------------- |
| Browser classic `<script>`       | Global variable **and** `window` property | Global variable, not on `window`    | `window`         |
| Browser `<script type="module">` | Module-scoped (private to the file)       | Module-scoped (private to the file) | `window`         |
| Node.js file                     | Scoped to that file's module              | Scoped to that file's module        | `global`         |
| Web Worker                       | Global variable **and** `self` property   | Global variable, not on `self`      | `self`           |
| **Any of the above**             |                                           |                                     | **`globalThis`** |

Our Vite projects load code with `<script type="module">`, so nothing you declare at the top of a
file leaks into the global scope.

#### Shadowing Example

```javascript
var studentName = 'Suzy'

function printStudent(studentName) {
  // This `studentName` is the parameter. It SHADOWS the global.
  studentName = studentName.toUpperCase()
  console.log(studentName) // FRANK
}

printStudent('Frank')
console.log(studentName) // Suzy: the global was never touched
```

#### Function Name Scope Example

```javascript
const ask = function ofTheTeacher() {
  console.log(typeof ofTheTeacher) // "function": the name exists inside
}

ask()
console.log(typeof ofTheTeacher) // "undefined": but not outside
```

---

### Resources & References

- **Lecture Guide & Snippet Walkthrough**:
  - [Week 6 Lecture 1 Guide: The Scope Chain and the Global Scope](../../lectures/week6-lecture1-scope-chain-global.md)
- **Textbook Readings**:
  - [Scope & Closures (2nd Edition), Chapter 3: The Scope Chain](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch3.md)
  - [Scope & Closures (2nd Edition), Chapter 4: Around the Global Scope](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch4.md)
  - [Week 6 Reading Summary](../../weekly-readings/week-06.md)
- **Interactive Code & Demos**:
  - [Week 6 DevTools Snippet Guide](../../examples/week6-scope-chain-lifecycle.md) (demos 1–3)
  - [Week 6 Source Snippet (`week6-scope-chain-lifecycle.js`)](../../examples/week6-scope-chain-lifecycle.js)
- **MDN References**:
  - [`globalThis`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis)
  - [`window`](https://developer.mozilla.org/en-US/docs/Web/API/Window)
