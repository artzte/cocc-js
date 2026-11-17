## Week 10 Quiz: Form Events and `preventDefault()`

### Instructions

Answer each of the following five questions in a short essay response. Focus on explaining the
concepts in your own words, and feel free to include examples or personal observations to illustrate
your reasoning.

---

### Question 1: `input` vs. `change`

As discussed in the reading on the
[`input` event](https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event) and the
[`change` event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event), both
events fire on a text field when its value changes. What is the difference in **when** each one
fires?

---

### Question 2: Listening for `submit`

Why is it better to listen for the `submit` event on a `<form>` than to listen for the `click` event
on its submit button?

---

### Question 3: What `preventDefault()` Cancels

As discussed in
[Event: preventDefault() method](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault),
calling `event.preventDefault()` cancels the browser's default action for an event. What would
happen in one of our apps if a form's `submit` listener didn't call `preventDefault()`?

---

### Question 4: `preventDefault()` vs. `stopPropagation()`

Explain the difference between `event.preventDefault()` and `event.stopPropagation()`.

---

### Question 5: `target` vs. `currentTarget`

As discussed in
[Introduction to events](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events),
in a delegated click listener attached to `#app`, what is the difference between `event.target` and
`event.currentTarget`?
