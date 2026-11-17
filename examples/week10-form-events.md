# Week 10: Form Events and a First Look at `fetch` Examples

This guide walks through an interactive DevTools demo for the Week 10 lecture: **`input` vs.
`change`**, **`submit` and `preventDefault()`**, **`preventDefault()` vs. `stopPropagation()`**,
**`target` vs. `currentTarget`**, and a **preview of `fetch`**.

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
