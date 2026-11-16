## Overview of Week 10: Form Events and a First Look at `fetch`

This is Thanksgiving week, and it's a **catch-up week**. There is no programming assignment. If
you're behind on any weekly projects, this is the time to finish them and get your pull requests in.
The lecture and reading are short, and there's one quiz.

The topic is the events that forms produce. We've handled `click` events since Week 2 and switched
to event delegation in Week 7. This week we add:

- **`input` and `change`**: two events that both fire when a form control's value changes, but at
  different times.
- **`submit` and `preventDefault()`**: handling a form in JavaScript instead of letting the browser
  reload the page.

There's also a short **preview of `fetch`**. It isn't on the quiz, but it's enough to start on the
API part of your final project. We'll cover `fetch`, Promises, and `async`/`await` properly in Week
11, and the Week 11 assignment uses both this week's events and `fetch`.

My own final project, an Art Institute of Chicago browser, is published for you to look at. It's a
complete example of what the final submission should look like, and I'll walk through it in Week 11.

---

### Part 1: `input` vs. `change`

- **When each one fires**: `input` on every change to the value, and `change` when the user commits
  a change (leaving a text field, or picking a new option in a select).
- **Reading values**: `value` for text fields and selects, `checked` for checkboxes, and `FormData`
  for a whole form.

### Part 2: `submit` and `preventDefault()`

- **Why listen on the form**: `submit` fires for both a button click and the Enter key.
- **Default actions**: what the browser does on its own when a form is submitted or a link is
  clicked, and how `preventDefault()` cancels it.
- **`preventDefault()` vs. `stopPropagation()`**: cancelling the browser's action vs. stopping the
  event from reaching other listeners.
- **Review**: `target` vs. `currentTarget` in a delegated listener.

### Part 3: Preview of `fetch`

- One `async` function that calls `fetch`, checks `response.ok`, and parses JSON inside `try/catch`.

---

### Module Objectives

By the end of this module you will be able to:

- Choose between the `input` and `change` events based on when the page needs to react.
- Read the values of text fields, selects, and checkboxes.
- Handle a form's `submit` event and use `preventDefault()` to keep the page from reloading.
- Explain the difference between `preventDefault()` and `stopPropagation()`.
- Explain the difference between `event.target` and `event.currentTarget` in a delegated listener.

---

### Week 10 Activities & Materials

1. **Catch Up on Weekly Projects**:
   - There's no new programming assignment this week. Use the time to finish and submit any weekly
     projects you haven't turned in yet.
2. **Reading Assignment** (MDN):
   - [Introduction to events](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events)
   - [HTMLElement: input event](https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event)
   - [HTMLElement: change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event)
   - [Event: preventDefault() method](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
   - Preview:
     [Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch),
     through "Handling the response"
   - Review the [Week 10 Reading Summary](../../weekly-readings/week-10.md).
3. **Lecture**:
   - [Week 10 Lecture: Form Events and a First Look at `fetch`](week10-lecture-form-events.md)
   - [Lecture Guide: Form Events and a First Look at `fetch`](../../lectures/week10-form-events.md)
4. **Hands-On Practice & Code Exploration**:
   - Run the [Week 10 Form Events DevTools Snippet](../../examples/week10-form-events.md)
     ([`examples/week10-form-events.js`](../../examples/week10-form-events.js)) in Chrome DevTools
     and solve the Debug Challenge.
5. **Final Project Example**:
   - Look through my Art Institute of Chicago browser final project, especially how it splits its
     code into modules and where its `fetch` calls live.
6. **Assessment — Quiz 10**:
   - Complete [Week 10 Quiz](week10-quiz.md) on Canvas (covering `input` vs. `change`, `submit`,
     `preventDefault()`, `stopPropagation()`, and `target` vs. `currentTarget`). Due **Monday,
     November 30, 2026 at 11:59 PM**.

---

### Steps to Complete

1. Catch up on any missing weekly projects.
2. Read the MDN pages and review the reading summary.
3. Review the **Form Events** lecture and run the Week 10 DevTools snippet.
4. Complete and submit **Quiz 10** by Monday, November 30.
5. If you have time, try the `fetch` preview against your final project's API.

---

### Course Outcomes Supported

This week directly supports the following course outcomes:

- **CO1**: Implement scripts that rely on knowledge of Document Object Model (DOM) architecture and
  includes methods for manipulating DOM objects.
- **CO3**: Generate scripts that process user input and provide meaningful output.
- **CO4**: Plan and create scripts utilizing events and event handlers that respond to user inputs.
