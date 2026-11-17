# Week 10 Reading Summary: Form Events and a First Look at `fetch`

**Sources** (MDN, student-directed):

- [Introduction to events](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events)
- [HTMLElement: input event](https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event)
- [HTMLElement: change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event)
- [Event: preventDefault() method](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)
- [Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)
  (preview: read through "Making a request" and "Handling the response")

---

### 1. The DOM Event Model (Review from Week 7)

Events are signals the browser fires when something happens, such as a click, a keypress, or a form
submission. An event listener is a function registered to run when a particular event fires on a
particular element.

When an event fires on an element nested inside other elements, it travels in three phases:

1. **Capturing phase**: down the tree from `window` to the target element.
2. **Target phase**: on the element where the event started.
3. **Bubbling phase**: back up the tree from the target to `window`.

Listeners run during the **bubbling** phase by default. Bubbling is what makes **event delegation**
work: one listener on a parent (like `#app`) sees clicks on every child, including children that
`render()` creates later.

---

### 2. Managing Event Listeners

- **`addEventListener(type, listener, options)`** registers a listener. The options object can
  include:
  - `capture: true` to run the listener during the capturing phase instead of bubbling.
  - `once: true` to remove the listener automatically after it runs once.
  - `passive: true` to promise the listener won't call `preventDefault()`, which lets the browser
    scroll smoothly.
- **`removeEventListener(type, listener, options)`** removes a listener. You have to pass the same
  type, the **same function reference**, and the same `capture` value you used to add it, so an
  anonymous function can't be removed this way.

---

### 3. The Event Object

The browser passes an `Event` object to every listener:

- **`target`**: the element where the event **started** (the button that was clicked).
- **`currentTarget`**: the element whose listener is **running right now** (the element you called
  `addEventListener` on). In a delegated listener on `#app`, `currentTarget` is always `#app`, while
  `target` is whatever was clicked inside it.
- **`preventDefault()`**: cancels the browser's default action for the event.
- **`stopPropagation()`**: stops the event from traveling any further through the tree.

---

### 4. `input` vs. `change`

Both events fire on `<input>`, `<textarea>`, and `<select>` elements, and both bubble. The
difference is **when** they fire:

- **`input`** fires every time the value changes: each keystroke, each paste, each deletion. Use it
  for live feedback, such as enabling a button once a field has enough text, filtering a list as the
  user types, or showing a character count.
- **`change`** fires when the user **commits** a change:
  - For a text field, when the field loses focus (or the user presses Enter) after its value
    changed.
  - For a `<select>`, a checkbox, or a radio button, as soon as the user picks a new option or
    toggles the box.

Use `change` when you want to react once to a finished choice, such as switching units or a sort
order.

#### Reading values

| Control                      | Read with            | Type you get                               |
| :--------------------------- | :------------------- | :----------------------------------------- |
| Text `<input>`, `<textarea>` | `element.value`      | string                                     |
| Number `<input>`             | `element.value`      | string (convert with `Number()`)           |
| Checkbox                     | `element.checked`    | boolean                                    |
| `<select>`                   | `element.value`      | string (the selected `<option>`'s `value`) |
| A whole form                 | `new FormData(form)` | `FormData`, read with `.get(name)`         |

---

### 5. The `submit` Event and `preventDefault()`

- The **`submit`** event fires on the `<form>`, not on the button. It fires when the user clicks a
  submit button **or** presses Enter in a text field, so listening for `submit` on the form handles
  both. A `click` listener on the button would miss the Enter key.
- A form's **default action** is to send its data to the server and load a new page. In a
  single-page app, that reload wipes out your JavaScript state. Calling `event.preventDefault()` at
  the top of the `submit` listener cancels the reload so your code can handle the data instead.
- Other default actions you can cancel: following a link (`click` on an `<a>`), toggling a checkbox
  (`click` on a checkbox), and typing a character (`keydown`).
- **`preventDefault()` vs. `stopPropagation()`**: they control different things. `preventDefault()`
  cancels what the **browser** would do. `stopPropagation()` stops the event from reaching **other
  listeners** further along the path. Calling one doesn't do the other.

---

### 6. Preview: A First `fetch` Call

This is a preview for Week 11 and for your final project. We'll cover Promises and the event loop in
Week 11.

- **`fetch(url)`** starts a network request and returns a Promise. `await` pauses your `async`
  function until the Promise settles, then hands you a **`Response`** object.
- **`response.ok`** is `true` for status codes 200–299. `fetch` does **not** throw for a 404 or a
  500; it gives you a `Response` with `ok` set to `false`. Always check `ok` before using the body.
- **`await response.json()`** reads the body and parses it as JSON. It also returns a Promise, so it
  needs its own `await`.
- Wrap the whole thing in **`try/catch`**. A network failure (no connection, bad host name) makes
  `fetch` throw, and so does your own `throw` when `ok` is `false`.

```js
async function loadJson(url) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('fetch failed:', error)
    throw error // let the caller show an error message
  }
}
```
