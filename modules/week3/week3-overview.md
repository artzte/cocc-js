## Overview of Week 3: Functions and Comparisons

The verbs of JavaScript, and how it decides what's true.

Now that we can describe and hold data with values, types, and variables (Week 2), we move to
**functions**—the primary way JavaScript organizes reusable behavior—and **comparisons**—how
JavaScript decides whether two values are "the same" and how it evaluates conditions.

In this module, we examine the three syntactic forms a function can take (declarations, expressions,
and arrow functions) and how they behave differently with hoisting and `this`. We then contrast
strict equality (`===`) with coercive equality (`==`), explore JavaScript's truthy/falsy rules, and
use `if`/`else` and the ternary operator to make decisions in code. We connect this directly to the
browser by reading values out of form fields and updating the DOM conditionally based on that input.

### Module Objectives

By the end of this module you will be able to:

- Write functions using function declarations, function expressions, and arrow functions, and
  explain the behavioral differences between them (hoisting, `this` binding, syntax).
- Define parameters with default values and return meaningful values from functions.
- Explain the difference between strict equality (`===`) and coercive equality (`==`), and state why
  `===` is the safer default.
- Identify JavaScript's 8 falsy values and use truthy/falsy checks in conditional logic.
- Write conditional logic using `if`/`else` chains and the ternary operator.
- Read a value from a form field with `document.querySelector` and conditionally update DOM content
  based on that value.

### Week 3 Activities & Materials

1. **Reading Assignment**:
   - **Textbook**: _You Don't Know JS Yet: Get Started_ (2nd Edition) — Chapter 2: _Surveying JS_
     (Sections: _Functions_, _Comparisons_).
   - Review the [Week 3 Reading Summary](../../weekly-readings/week-03.md).
2. **Concept Lecture**:
   - [Week 3 Lecture: Functions and Comparisons](../../lectures/week3-concepts.md) — an interactive
     breakdown of function forms, `===` vs. `==`, truthy/falsy values, and conditional logic in the
     DOM.
3. **(Optional) Hands-On Practice — Using the Browser Console to Learn**:
   - Experiment with all three function forms in the Chrome DevTools console.
   - Try `==` comparisons between different types and predict the coercion before running them.
   - Test truthy/falsy values directly with `if (value)` checks.
4. **Assessment — Quiz 3**:
   - Complete Quiz 3 on Canvas, testing comprehension of function syntax forms, strict vs. loose
     equality, and truthy/falsy values.
5. **Programming Assignment — Username Validator**:
   - Create your `week3` project folder and branch using `scripts/mpf.sh week3`.
   - Write a function that checks whether a username meets a set of rules (minimum length, no
     spaces, starts with a letter, etc.) and displays pass/fail feedback for each rule in the DOM.
   - Add tests, and verify they pass.
   - Submit a link to your pull request via Canvas, and request **artzte** as a reviewer.

### Steps to Complete

1. Complete the assigned reading in _You Don't Know JS Yet: Get Started_, Chapter 2 (_Functions_,
   _Comparisons_).
2. Watch the Week 3 lecture and follow along with the console demos.
3. Practice function forms and comparison operators in the browser console.
4. Complete and submit **Quiz 3**.
5. Complete the **Week 3 Assignment: Username Validator**, ensure the test suite passes, and submit
   your pull request link on GitHub.

### Course Outcomes Supported

This week directly supports the following course outcomes:

- **CO2**: Construct functions that effectively utilize variables, conditionals, loops, and arrays.
- **CO3**: Generate scripts that process user input and provide meaningful output.
