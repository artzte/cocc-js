# Week 10 Lecture Guide: Form Events and a First Look at `fetch`

**Reading**: MDN student-directed:
[Introduction to events](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events),
[input event](https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event),
[change event](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event),
[preventDefault()](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault), and a
preview of
[Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)  
**Module Page**:
[`modules/week10/week10-lecture-form-events.md`](../modules/week10/week10-lecture-form-events.md)  
**Format**: Interactive Lecture & Chrome DevTools Snippet Walkthrough
([`examples/week10-form-events.js`](../examples/week10-form-events.js))  
**Duration**: ~17 Minutes  
**Prereq Context**: Week 7 (event delegation, `data-*` attributes, `closest('button')`) and Week 9
(the Task List's `submit` handler)

---

## Pacing & Timeline

| Time              | Section                                           | Focus / Snippet Function                                              |
| :---------------- | :------------------------------------------------ | :-------------------------------------------------------------------- |
| **00:00 - 01:30** | **1. Catch-Up Week Housekeeping**                 | No assignment; finish missing projects; Quiz 10; my final project     |
| **01:30 - 05:30** | **2. `input` vs. `change`**                       | When each fires; reading `value` / `checked` (`inputVsChangeDemo`)    |
| **05:30 - 10:00** | **3. `submit` and `preventDefault()`**            | Listening on the form; default actions; `FormData` (`submitDemo`)     |
| **10:00 - 12:30** | **4. `preventDefault()` vs. `stopPropagation()`** | Two different jobs (`preventVsStopDemo`, `targetVsCurrentTargetDemo`) |
| **12:30 - 15:30** | **5. Preview: A First `fetch` Call**              | `async`/`await`, `response.ok`, `try/catch` (`fetchPreviewDemo`)      |
| **15:30 - 16:30** | **6. Wrap-Up & Week 10 Deliverables**             | Quiz 10; what's coming in Week 11                                     |

---

## 1. Catch-Up Week Housekeeping (1.5 mins)

### Talking Points & Concept Cues

- Week 10 is a catch-up week. There's **no programming assignment**. A lot of you have weekly
  projects that aren't in yet, so please use this week to finish them and open those pull requests.
- There is a **quiz** (Quiz 10), and it only covers event handling.
- My own final project, the Art Institute of Chicago browser, is published. Look through it this
  week if you have time, especially how it's split into modules. I'll walk through it in Week 11.

---

## 2. `input` vs. `change` (4 mins)

### Talking Points & Concept Cues

- Run `inputVsChangeDemo()`. Type `Bend` into the Name field, then click away. Point out four
  `input` lines and one `change` line.
- Then change the select and toggle the checkbox. Both events fire right away, because there's
  nothing to "finish typing."
- **Rule of thumb**: `input` when the page should react _while_ the user types (enable a button,
  filter a list, count characters). `change` when it should react _once_ to a finished choice
  (units, sort order).
- Both events bubble, which is why one listener on the demo container hears all three controls. Same
  idea as our delegated `click` listeners.
- **Reading values**: `value` is always a string, even for `type="number"`. Checkboxes use
  `checked`, not `value`.

### Code Demo: `inputVsChangeDemo()`

```javascript
demo.addEventListener('input', (event) => {
  const control = event.target
  const value = control.type === 'checkbox' ? control.checked : control.value
  console.log(`input  → ${control.name}:`, value)
})
```

---

## 3. `submit` and `preventDefault()` (4.5 mins)

### Talking Points & Concept Cues

- I've used `event.preventDefault()` in earlier lectures (the Week 3 forms, the Task List's add
  form) without saying much about it. Today we look at what it actually does.
- Run `submitDemo()`. Submit once with the button and once by pressing Enter in the City field. Both
  fire **one** `submit` event on the form. A `click` listener on the button would miss the Enter
  key, so we always listen for `submit` on the `<form>`.
- **Default actions**: the browser does some things on its own. A form sends its data and loads a
  new page (with no `action` attribute, that means reloading this page). A link navigates. A
  checkbox toggles.
- Comment out the `preventDefault()` line and submit again: the page reloads, and the console log
  and all our JavaScript state are gone. That's what happens in an app without it.
- Call `preventDefault()` **first** in the handler. If something later in the handler throws, the
  page doesn't reload and take the error message with it.
- `new FormData(form)` reads every field by its `name` attribute. Handy for bigger forms; for one or
  two fields, reading `.value` directly is fine.
- Click the link at the bottom: `preventDefault()` on a link's `click` cancels the navigation.

---

## 4. `preventDefault()` vs. `stopPropagation()` (2.5 mins)

### Talking Points & Concept Cues

- Run `preventVsStopDemo()` and click each link.
  - `#prevent`: no navigation, but the outer `<div>` still logs the click. The event kept bubbling.
  - `#stop`: the new tab opens, but the outer `<div>` hears nothing. The default action still
    happened.
- `preventDefault()` cancels the **browser's** action. `stopPropagation()` stops **other listeners**
  from hearing the event. Neither does the other's job.
- Warn about `stopPropagation()` inside `#app`: it hides the click from our delegated listener. I
  almost never use it.
- Quick review with `targetVsCurrentTargetDemo()`: click the bold city name, then the state name.
  `target` changes between `STRONG` and `BUTTON`; `currentTarget` is always the `<ul>`. That's why
  we call `event.target.closest('button')`.

---

## 5. Preview: A First `fetch` Call (3 mins)

### Talking Points & Concept Cues

- This part **isn't on Quiz 10**. It's here so you can start on your final project's API this week
  if you want to. Week 11 covers it properly, and the Week 11 assignment combines today's events
  with `fetch`.
- Run `fetchPreviewDemo()`. The first call logs a table of places named Bend from the Open-Meteo
  geocoding API.
- Walk through `loadJson()`:
  1. `await fetch(url)` waits for the response to arrive.
  2. `if (!response.ok) throw ...`: `fetch` does **not** throw for a 404 or 500. Point out the
     second call in the demo: the server answers with status 400, `fetch` resolves normally, and
     it's our own `throw` that sends it to `catch`.
  3. `await response.json()` reads and parses the body. Second `await`.
  4. `try/catch` handles both a network failure and our own `throw`.
- Suggest pasting `loadJson()` into a snippet and trying it with your own final project API's URL.

### Code Demo: `loadJson()`

```javascript
async function loadJson(url) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('fetch failed:', error.message)
    throw error
  }
}
```

---

## 6. Wrap-Up & Week 10 Deliverables (1 min)

### Talking Points & Concept Cues

- **Key Takeaways**:
  1. `input` fires on every change; `change` fires once the user commits a change.
  2. Listen for `submit` on the form, and call `preventDefault()` first.
  3. `preventDefault()` cancels the browser's action; `stopPropagation()` stops other listeners.
- **Week 10 Deliverables (Due Monday, November 30)**:
  - **Quiz 10**
  - Catch up on any missing weekly projects.
- **Coming in Week 11**: Promises, the event loop, HTTP status codes, and a weather search
  assignment that uses `input`, `change`, `submit`, and `fetch` together. I'll also walk through my
  Art Institute of Chicago browser.
