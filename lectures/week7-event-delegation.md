# Week 7 Side Lecture Guide: Efficient Event Handling with Event Delegation

**Module Page**:
[`modules/week7/week7-event-delegation.md`](../modules/week7/week7-event-delegation.md)  
**Example File**:
[`examples/week7-event-delegation-scoreboard.js`](../examples/week7-event-delegation-scoreboard.js)  
**Format**:
Side Lecture & Code Refactoring Walkthrough  
**Duration**: ~10 Minutes  
**Prereq Context**: Week 6 Scoreboard Assignment (`var`/`let` loop listeners, `render()` rebuilding
`app.innerHTML`)

---

## Pacing & Timeline

| Time              | Section                                        | Focus                                                              |
| :---------------- | :--------------------------------------------- | :----------------------------------------------------------------- |
| **00:00 - 02:30** | **1. Reviewing the Week 6 Scoreboard Pattern** | Why `render()` had to re-query and re-attach listeners every click |
| **02:30 - 05:00** | **2. Event Bubbling & Persistent Containers**  | How clicks travel up to `#app`, which never gets destroyed         |
| **05:00 - 08:00** | **3. Indexing State with `data-*` Attributes** | Adding `data-type` and `data-index`; reading `button.dataset`      |
| **08:00 - 10:00** | **4. The Clean `render()` & Week 7 Preview**   | Deleting the loop from `render()`; applying this to Theme Switcher |

---

## 1. Reviewing the Week 6 Scoreboard Pattern (2.5 mins)

### Talking Points & Concept Cues

- Pull up the Week 6 Scoreboard solution (`render()`).
- In Week 6, we purposely wired buttons inside `for (let i = 0; i < players.length; i++)` to see how
  `let` creates a fresh binding per iteration.
- Look at what happens every time a user clicks **+1**:
  1. `scores` updates and `render()` is called.
  2. `app.innerHTML = ...` completely tears down the `<table>` and all `<button>` nodes and replaces
     them with new DOM nodes.
  3. Because the old buttons are gone, `render()` has to run `querySelectorAll('.buttons')` and loop
     through all players again to attach brand-new click handlers to the brand-new buttons.
- While modern browsers clean up the old nodes and closures well, our `render()` function is doing
  two jobs at once: **rendering HTML** and **wiring event listeners**.

---

## 2. Event Bubbling & Persistent Containers (2.5 mins)

### Talking Points & Concept Cues

- When you click a `<button>` inside `<tbody>`, the browser fires the `click` event on the button,
  and then the event **bubbles up** through every parent element: `button` → `div.buttons` → `td` →
  `tr` → `tbody` → `table` → `div#app`.
- Which element in that chain **never** gets destroyed when `app.innerHTML` is replaced?
  - `<div id="app">`!
- If we attach **one** `click` listener to `#app` once inside `renderApp()`, it will catch clicks on
  any button inside `#app`—even buttons that `render()` just created a millisecond ago.

---

## 3. Indexing State with `data-*` Attributes (3 mins)

### Talking Points & Concept Cues

- Question: In Week 6, each button's arrow function knew its player index `i` from the `for` loop.
  If we only have **one** listener on `#app`, how does it know _which_ button was clicked and
  _which_ player index to update?
- Answer: Let the HTML element carry its own metadata using `data-*` attributes!
- In our row template, we already had `data-type="add"` and `data-type="subtract"`. We just add
  `data-index="${i}"`, and add `data-type="reset"` to the Reset button:
  ```html
  <button data-type="add" data-index="${i}">+1</button>
  <button data-type="subtract" data-index="${i}">-1</button>
  ...
  <button id="reset" data-type="reset">Reset scores</button>
  ```
- Inside our single `#app` click listener:
  - Use `const button = event.target.closest('button')` so clicks on empty space (or inner spans)
    are handled safely.
  - Convert the index: `const i = parseInt(button.dataset.index, 10)`. All `dataset` values are
    strings, so we need a number before calling `addPoint` / `removePoint`.
  - `switch (button.dataset.type)` with `'add'`, `'subtract'`, and `'reset'` cases; each updates
    `scores` and calls `render()`. A `default` case ignores unknown buttons.
  - Reset has no `data-index`, so `i` is `NaN` there, which is harmless because the `'reset'` case
    never uses it.

---

## 4. The Clean `render()` & Week 7 Preview (2 mins)

### Talking Points & Concept Cues

- Compare the before and after in
  [`examples/week7-event-delegation-scoreboard.js`](../examples/week7-event-delegation-scoreboard.js):
  - We deleted 20 lines of `querySelectorAll` and `addEventListener` from `render()`.
  - `render()` is now a pure "state in, HTML out" function.
  - And remember the test hint from Week 6 (_"Query for the buttons after each click..."_)? Our
    event wiring no longer cares how many times `render()` rebuilds the DOM.
  - `renderApp()` now ends with `return app`, so the tests can do `app = renderApp()` and click
    buttons with a fresh `app.querySelector(...)` after every render.
- **Bridge to Week 7 Assignment**: In the **Color Theme Switcher**, you will render buttons for 6
  community color themes plus **Previous**, **Next**, and **Reset** controls. Instead of attaching 9
  separate event listeners every time the UI re-renders, you'll attach **one** delegated click
  listener on `#app` that dispatches into your closure state manager!
