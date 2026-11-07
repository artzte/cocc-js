## Week 8 Quiz: Classes, `this`, and Inheritance

### Instructions

Answer each of the following five questions in a short essay response. Focus on explaining the
concepts in your own words, and feel free to include examples or personal observations to illustrate
your reasoning.

---

### Question 1: Classes and Instances

In
[Get Started (2nd Edition), Chapter 2: Surveying JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch2.md),
Kyle Simpson describes a class as a definition of a "type" of data structure that is not itself a
concrete value. Explain the difference between a **class** and an **instance** of that class.

---

### Question 2: `this` Is Decided by the Call

Explain how JavaScript decides what `this` refers to inside a function, as discussed in
[Get Started (2nd Edition), Chapter 3: Digging to the Roots of JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch3.md).
Be sure to contrast this with lexical scope, which we studied in Weeks 5–7.

---

### Question 3: Keeping `this` in an Event Listener

In this week's Task List assignment, the `TaskList` constructor attaches its click listener with an
arrow function: `(event) => this.#handleClick(event)`. Explain why this keeps `this` pointing at the
`TaskList` instance when the browser calls the listener.

---

### Question 4: `extends` and `super`

Using the `Publication`, `Book`, and `BlogPost` example from
[Get Started (2nd Edition), Chapter 2: Surveying JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch2.md),
explain what the `super(...)` call does inside a child class's constructor.

---

### Question 5: Static Members

Explain the difference between a **static** method (such as `TaskList.isValidText(text)` from this
week's assignment) and an ordinary instance method (such as `list.add(text)`).
