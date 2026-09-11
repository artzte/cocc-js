## Overview of Week 2: Values, Types, and Variables

All the things you can manipulate in JavaScript!

Now that our developer environment, Git workflow, and starter tools are established from Week 1, we
dive into the fundamental building blocks of JavaScript: **values, types, and variables**.

In this module, we examine how JavaScript organizes data into primitives and objects, how variables
act as containers for those values, and how modern variable declarations (`let` and `const`) compare
to legacy `var`. We also explore JavaScript's idiosyncratic type behaviors—including famous quirks
like `typeof null === "object"` and `NaN !== NaN`—and connect your script logic directly to the
browser by querying the Document Object Model (DOM) and rendering data into HTML templates.

### Module Objectives

By the end of this module you will be able to:

- Identify JavaScript's 7 primitive types (`string`, `number`, `boolean`, `null`, `undefined`,
  `bigint`, `symbol`) and distinguish them from objects using `typeof`.
- Declare variables using `let`, `const`, and `var`, explaining their scoping rules and the vital
  distinction between variable re-assignment and object mutation.
- Manipulate strings and numbers with core built-in features, including template literals (`${...}`
  interpolation), string methods (`slice`, `includes`, `split`, `trim`), number parsing (`parseInt`,
  `parseFloat`, `Number`), and the `Math` object.
- Select DOM elements using `document.querySelector` and update their content and attributes
  (`textContent`, `innerHTML`, class modifiers).
- Read properties from a structured JavaScript data object and render them dynamically into a
  prepared HTML template without hardcoding values in the markup.

### Week 2 Activities & Materials

1. **Reading Assignment**:
   - **Textbook**: _You Don't Know JS Yet: Get Started_ (2nd Edition) — Chapter 2: _Surveying JS_
     (Sections: _Each File is a Program_, _Values_, _Arrays and Objects_, _Value Type
     Determination_, and _Declaring and Using Variables_).
   - Review the [Week 2 Reading Summary](../../weekly-readings/week-02.md).
2. **Concept Lecture**:
   - [Week 2 Lecture: Values, Types, and Variables](../../lectures/week2-concepts.md) — an
     interactive breakdown of primitive vs. object types, template literals, number handling,
     `typeof` quirks, block scoping, and DOM integration.
3. **Video Exploration — "JavaScript Can Be Weird"**:
   - Explore JavaScript's type coercion and surprising historical quirks through classic community
     references:
     - [Wat by Gary Bernhardt (CodeMash Talk)](https://www.destroyallsoftware.com/talks/wat)
     - [wtfjs — A curated list of funny and tricky JavaScript examples](https://github.com/denysdovhan/wtfjs)
     - Reference: Douglas Crockford's _JavaScript: The Good Parts_
4. **Hands-On Practice — Using the Browser Console to Learn**:
   - Experimenting with `typeof` and type conversions in the Chrome DevTools console.
   - Inspecting DOM elements and selecting them directly in the console (`$0`,
     `document.querySelector`).
   - Selecting and modifying DOM element content and attributes live in the browser.
5. **Assessment — Quiz 2**:
   - Complete Quiz 2 on Canvas, testing comprehension of primitives vs. objects, `typeof`
     evaluations, and `let` vs. `const` vs. `var`.
6. **Programming Assignment — Print Out Object Properties**:
   - Create your `week2` project folder and branch using `scripts/mpf.sh week2`.
   - Read a structured JavaScript data object (containing name, score, and status) and render its
     properties into a pre-built HTML template using DOM manipulation methods.
   - Verify tests pass with `npm test`, preview with `npm start`, and submit your GitHub pull
     request for instructor review.

### Steps to Complete

1. Complete the assigned reading in _You Don't Know JS Yet: Get Started_, Chapter 2.
2. Watch the Week 2 lecture and the "JavaScript Can Be Weird" video resources.
3. Follow along with the browser console exercises (practicing `typeof` and
   `document.querySelector`).
4. Complete and submit **Quiz 2**.
5. Complete the **Week 2 Assignment: Print Out Object Properties**, ensure the test suite passes,
   and submit your pull request link on GitHub.

### Course Outcomes Supported

This week directly supports the following course outcomes:

- **CO1**: Implement scripts that rely on knowledge of Document Object Model (DOM) architecture and
  includes methods for manipulating DOM objects.
- **CO2**: Construct functions that effectively utilize variables, conditionals, loops, and arrays.
- **CO3**: Generate scripts that process user input and provide meaningful output.
