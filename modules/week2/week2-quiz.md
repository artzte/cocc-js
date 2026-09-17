## Week 2 Quiz: Values, Types, and Variables

### Instructions

Answer each of the following five questions in a short essay response. Focus on explaining the
concepts in your own words, and feel free to include examples or personal observations to illustrate
your reasoning.

---

### Question 1: Primitives vs. Objects

In JavaScript, all values belong either to a primitive type or an object type. What are some
differences between primitives and objects?

---

### Question 2: Choosing Variable Declarations (`let`, `const`, `var`)

JavaScript offers three keywords for declaring variables: `var`, `let`, and `const`. Choose one of
these and explain how it works with regards to scoping and mutability. Are there any quirks with
your chosen keyword?

---

### Question 3: Re-assignment vs. Mutation

A common point of confusion in JavaScript is that an array or object declared with `const` can still
have its contents modified (such as adding an item to an array or updating an object property).
Explain the difference between re-assigning a variable and mutating an object or array, and explain
why `const` permits one but not the other.

---

### Question 4: Type Inspection and JavaScript Quirks

The `typeof` operator helps inspect data types at runtime, but JavaScript has several well-known
type quirks (such as `typeof null`, `typeof []`, or the behavior of `NaN`). Choose a type behavior
that you find interesting or surprising, explain what happens, and discuss how a developer should
handle or test for that value in practice.

---

### Question 5: Rendering Data to the DOM (`textContent` vs. `innerHTML`)

When rendering JavaScript data into the browser's Document Object Model (DOM), developers typically
update an element using either `.textContent` or `.innerHTML`. Why you might choose one over the
other when displaying data on a web page?
