## Functions and Comparisons

This lecture explores the two remaining pieces of JavaScript's core surface: **functions**, the way
we package reusable behavior, and **comparisons**, the way we make decisions. While our reading from
_You Don't Know JS Yet: Get Started_ (Chapter 2) provides deep conceptual background, this lecture
connects those concepts directly to practical coding and conditional DOM updates.

### Key Lecture Topics

1. **Function Forms**: Function declarations, function expressions, and arrow functions — how each
   is written, when the identifier becomes available (hoisting), and how each handles `this`.
2. **Parameters and Return Values**: Positional parameters, default parameter values, and returning
   a single value (bundling multiple values into an object or array when needed).
3. **Strict vs. Loose Equality**: `===` compares value and type with no coercion; `==` allows type
   coercion when types differ. Why `===` is the safer default.
4. **Truthy and Falsy Values**: The exact 8 falsy values in JavaScript, and how `if` statements
   coerce any value to a boolean.
5. **Conditional Logic**: `if`/`else` chains for branching logic; the ternary operator
   (`cond ? a : b`) for compact single-expression conditionals.
6. **Rendering Decisions to the Browser**: Reading a form field's value with
   `document.querySelector` and conditionally updating DOM content based on that input.

### Function Forms Overview

JavaScript gives you three ways to define a function, and each behaves a little differently:

- **Function Declaration** (`function greet() {}`): Hoisted fully — the whole function is available
  before its line runs, anywhere in its scope.
- **Function Expression** (`const greet = function () {}`): The variable identifier follows normal
  `let`/`const`/`var` hoisting rules; the function itself is not available until the assignment line
  executes.
- **Arrow Function** (`const greet = () => {}`): Terser syntax, implicit `return` for single
  expressions, and — critically — no own `this` binding (it inherits `this` from its enclosing
  scope).

> **Note**: we will cover `this` in much greater detail during Week 6. For now: In JavaScript, the
> `this` keyword refers to the context in which a function is executed. Its value is not static—it
> depends entirely on how and where a function is called, not where it was declared (with arrow
> functions being the key exception). The `this` keyword is used to access values within the
> function context. Scope, which we do discuss this week, refers to the geographical location of a
> given variable declaration (a function argument, or a variable defined via `var`, `let`, or
> `const`; and what containing block defined it)

### Resources & References

- Full Script: [Week 3 Lecture Script](../../lectures/week3-concepts.md)
- Textbook: _You Don't Know JS Yet: Get Started_, Chapter 2 (_Surveying JS_ — Functions,
  Comparisons)
- Summary: [Week 3 Reading Summary](../../weekly-readings/week-03.md)
- Examples:
  - [Functions and comparisons](../../examples/week3-functions-comparisons.md)
  - [HTML form handlers example](../../examples/week3-html-forms-handlers.md)
