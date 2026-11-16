# Week 10: Form Events and a First Look at `fetch` Examples

This guide walks through an interactive DevTools demo for the Week 10 lecture: **`input` vs.
`change`**, **`submit` and `preventDefault()`**, **`preventDefault()` vs. `stopPropagation()`**,
**`target` vs. `currentTarget`**, a **preview of `fetch`**, and a **debug challenge**.

The full snippet is in [`week10-form-events.js`](week10-form-events.js). Each demo puts a small form
at the top of the page so you can try it with the console open.

---

## Setup for Chrome DevTools Snippets

1. Open Google Chrome to a blank tab (`about:blank`) or your running Vite dev server
   (`http://localhost:5173`).
2. Open DevTools (`F12` or `Ctrl+Shift+I` on Windows/Linux, `Cmd+Option+I` on macOS).
3. Switch to the **Sources** tab.
4. In the left panel, click **Snippets** (or press `Ctrl+Shift+P` / `Cmd+Shift+P` and type
   `Create snippet`).
5. Name the snippet `week10-form-events.js`.
6. Paste in the contents of [`week10-form-events.js`](week10-form-events.js), press `Ctrl+S`
   (`Cmd+S`) to save, and `Ctrl+Enter` (`Cmd+Enter`) to run.
7. Running the snippet only defines the demos. Switch to the **Console** and call them one at a
   time, for example `inputVsChangeDemo()`.

---

## What Each Demo Shows

| Demo                                          | Function                      | Watch for                                                                                                                   |
| :-------------------------------------------- | :---------------------------- | :-------------------------------------------------------------------------------------------------------------------------- |
| 1. `input` vs. `change`                       | `inputVsChangeDemo()`         | In the text field, `input` logs on every keystroke and `change` logs once when you click away                               |
| 2. `submit` and `preventDefault()`            | `submitDemo()`                | Clicking **Search** and pressing Enter both fire one `submit` on the form; `FormData` reads both fields                     |
| 3. `preventDefault()` vs. `stopPropagation()` | `preventVsStopDemo()`         | The first link doesn't navigate but the outer `<div>` still hears it; the second link opens but the `<div>` doesn't hear it |
| 4. `target` vs. `currentTarget`               | `targetVsCurrentTargetDemo()` | `target` is `STRONG` or `BUTTON` depending on where you click; `currentTarget` is always the `<ul>`                         |
| 5. Preview: a first `fetch` call              | `fetchPreviewDemo()`          | The first request logs a table of places named Bend; the second gets status 400 and lands in `catch`                        |
| 6. Debug challenge                            | `debugChallenge()`            | The character count only updates after you click away from the text area. Fix it                                            |

---

## Debug Challenge

`debugChallenge()` shows a comment box with a `0 / 140` character count underneath. The count is
supposed to update as you type, but it stays at `0 / 140` until you click somewhere else on the
page.

Before you change anything, answer these questions:

1. Which event is the listener waiting for?
2. When does that event fire for a `<textarea>`?
3. Which event fires on every keystroke instead?

<details>
<summary>Solution</summary>

The listener uses `change`, which fires on a text field only when the user commits the change by
leaving the field. For live feedback, listen for `input`, which fires every time the value changes:

```js
textarea.addEventListener('input', () => {
  count.textContent = `${textarea.value.length} / 140`
})
```

</details>
