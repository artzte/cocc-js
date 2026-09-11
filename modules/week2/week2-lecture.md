## Values, Types, and Variables

This lecture explores the fundamental building blocks of JavaScript: values, their types, and how we
store and manipulate them with variables. While our reading from _You Don't Know JS Yet: Get
Started_ (Chapter 2) provides deep conceptual background, this lecture connects those concepts
directly to practical coding and browser Document Object Model (DOM) manipulation.

### Key Lecture Topics

1. **Primitives vs. Objects**: Understanding JavaScript's 7 primitive types (`string`, `number`,
   `boolean`, `null`, `undefined`, `bigint`, `symbol`) and how they differ from objects and arrays.
2. **Strings & Template Literals**: Delimiting strings, expression interpolation using
   `${expression}` syntax, and essential methods (`slice`, `includes`, `split`, `trim`).
3. **Numbers and `NaN`**: Parsing numeric strings with `parseInt` and `parseFloat`, using the global
   `Math` object, and handling the unique behavior of `NaN` (and why `NaN !== NaN`).
4. **Type Inspection with `typeof`**: How to determine runtime types and understanding historical
   quirks like `typeof null === "object"` and `typeof [] === "object"`.
5. **Variable Declarations (`let`, `const`, `var`)**: Block scoping vs. function scoping, avoiding
   accidental globals, and the crucial difference between variable re-assignment and object/array
   mutation.
6. **Rendering Data to the Browser**: Using `document.querySelector` to locate HTML elements and
   dynamically populating their content and attributes with `.textContent` and `.innerHTML`.

### Resources & References

- Full Script: [Week 2 Lecture Script](../../lectures/week2-concepts.md)
- Textbook: _You Don't Know JS Yet: Get Started_, Chapter 2 (_Surveying JS_)
- Summary: [Week 2 Reading Summary](../../weekly-readings/week-02.md)
- CodeMash Talk: [Wat by Gary Bernhardt](https://www.destroyallsoftware.com/talks/wat)
- Quirks Reference: [wtfjs](https://github.com/denysdovhan/wtfjs)
