## Form Events and a First Look at `fetch`

We've been handling `click` events since Week 2, and in Week 7 we switched to **event delegation**:
one listener on `#app` that handles every button `render()` creates. This week we look at the events
that forms produce: `input`, `change`, and `submit`. We'll also spend more time on
`preventDefault()`, which I've mentioned in earlier lectures but haven't really explained.

At the end there's a short preview of `fetch`. It isn't on Quiz 10, but it's enough to get started
on the API part of your final project if you have time this week. We'll cover it properly in
Week 11.

---

### Key Lecture Topics

1. **`input` vs. `change`**: When each one fires, and which one to use for live feedback vs. a
   finished choice.
2. **Reading form controls**: `value`, `checked`, and `FormData`.
3. **The `submit` event and `preventDefault()`**: Why we listen on the form, and what the browser
   does if we don't cancel it.
4. **`preventDefault()` vs. `stopPropagation()`**: Two different jobs that are easy to mix up.
5. **Review: `target` vs. `currentTarget`** in a delegated listener.
6. **Preview: a first `fetch` call** with `async`/`await`, `try/catch`, and `response.ok`.

---

### Form Events at a Glance

| Event    | Fires on                            | When                                                                                 | Typical use                                |
| :------- | :---------------------------------- | :----------------------------------------------------------------------------------- | :----------------------------------------- |
| `input`  | `<input>`, `<textarea>`, `<select>` | Every time the value changes (each keystroke)                                        | Live validation, character counts, filters |
| `change` | `<input>`, `<textarea>`, `<select>` | Text: when the field loses focus after a change. Select, checkbox, radio: right away | Units, sort order, settings                |
| `submit` | `<form>`                            | Submit button clicked, or Enter pressed in a text field                              | Handling the form's data in JavaScript     |

All three bubble, so a single listener on a parent element can hear them, the same way delegated
`click` listeners work.

#### `input` vs. `change`

The difference only shows up in text fields. Type `Bend` into a text field with both listeners
attached:

```text
input  → B
input  → Be
input  → Ben
input  → Bend
(click somewhere else)
change → Bend
```

For a `<select>` or a checkbox, there's nothing to "finish typing," so `change` fires as soon as the
user picks an option.

My rule of thumb: use `input` when the page should react **while** the user is typing, and `change`
when it should react **once** to a finished choice.

```javascript
const queryInput = form.querySelector('input[name="query"]')
const searchButton = form.querySelector('button[type="submit"]')
const unitsSelect = form.querySelector('select[name="units"]')

// live feedback: enable Search once there are at least two characters
queryInput.addEventListener('input', () => {
  searchButton.disabled = queryInput.value.trim().length < 2
})

// a finished choice: re-run whatever depends on the units
unitsSelect.addEventListener('change', () => {
  console.log('units are now', unitsSelect.value)
})
```

#### Reading values

- Text fields, text areas, and selects: `element.value`, which is always a **string**. Convert
  number fields with `Number(element.value)`.
- Checkboxes: `element.checked`, which is a boolean. A checkbox's `value` doesn't change when you
  check it.
- A whole form: `new FormData(form)`, then `data.get('fieldName')`. This uses each control's `name`
  attribute.

---

### `submit` and `preventDefault()`

Listen for `submit` on the `<form>`, not `click` on the button. The browser fires `submit` when the
user clicks a submit button **and** when they press Enter in a text field. A `click` listener on the
button misses the Enter key.

Every form has a **default action**: send the data to the server and load the response as a new
page. With no `action` attribute, that means reloading the current page. In our apps, a reload
throws away all of our JavaScript state and starts over. `event.preventDefault()` tells the browser
to skip the default action so our code can handle the data:

```javascript
form.addEventListener('submit', (event) => {
  event.preventDefault()

  const query = queryInput.value.trim()
  // nothing to search for
  if (query.length < 2) {
    return
  }
  runSearch(query)
})
```

Call `preventDefault()` first, before anything that might throw an error. If your handler crashes
before reaching it, the page reloads and the error message goes with it.

Forms aren't the only elements with default actions:

| Event     | Element    | Default action                    |
| :-------- | :--------- | :-------------------------------- |
| `submit`  | `<form>`   | Send the data and load a new page |
| `click`   | `<a href>` | Navigate to the link              |
| `click`   | checkbox   | Toggle the check mark             |
| `keydown` | text field | Type the character                |

#### `preventDefault()` vs. `stopPropagation()`

These two get mixed up a lot because they're both methods on the event that "stop" something.

- `preventDefault()` cancels what the **browser** would do (navigate, submit, toggle). The event
  keeps bubbling, and other listeners still run.
- `stopPropagation()` stops the event from reaching **other listeners** further along its path. The
  browser's default action still happens.

If you call `stopPropagation()` on a button inside `#app`, your delegated listener on `#app` never
hears the click. That's almost never what you want, so I rarely use it.

---

### Review: `target` vs. `currentTarget`

In a delegated listener:

- `event.target` is the element where the event **started**. If the button contains a `<strong>` or
  an icon, `target` might be that inner element, not the button.
- `event.currentTarget` is the element the listener is **attached to**, which is always `#app` in
  our delegated listeners.

That's why we use `event.target.closest('button')`: it walks up from wherever the click started to
the nearest `<button>`.

```javascript
resultsList.addEventListener('click', (event) => {
  const button = event.target.closest('button')
  // a click on the list itself, between buttons
  if (!button) {
    return
  }
  switch (button.dataset.action) {
    case 'select-place':
      selectPlace(parseInt(button.dataset.index, 10))
      break
    default:
      break
  }
})
```

---

### Preview: A First `fetch` Call

This section isn't on Quiz 10. It's here so you can start on the API part of your final project
during the catch-up week if you have time.

`fetch(url)` asks the browser to make a network request. The request takes time, so `fetch` doesn't
hand back the data right away. Instead, inside an `async` function, `await` pauses the function
until the response arrives:

```javascript
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

const data = await loadJson('https://geocoding-api.open-meteo.com/v1/search?name=Bend&count=5')
console.log(data.results[0].name) // 'Bend'
```

There are three things to notice now. We'll go into each one in Week 11.

1. **`response.ok`**: `fetch` doesn't throw an error when the server answers with 404 Not Found or
   500 Internal Server Error. It gives you a `Response` with `ok` set to `false`. If you don't check
   it, you'll try to use an error page as if it were data.
2. **Two `await`s**: one for the response to arrive, and one for `response.json()` to read and parse
   the body.
3. **`try/catch`**: if the network is down or the host name is wrong, `fetch` itself throws. The
   `catch` handles that and your own `throw` for a bad status.

To try it on your final project's API, paste `loadJson()` into a DevTools snippet and call it with
one of your API's URLs. You can also look at my Art Institute of Chicago browser final project to
see how a complete app organizes its `fetch` calls.

---

### Resources & References

| Topic                         | Documentation                                                                                        | Usefulness this week                          |
| :---------------------------- | :--------------------------------------------------------------------------------------------------- | :-------------------------------------------- |
| Introduction to events        | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events) | Bubbling, delegation, and the event object    |
| `input` event                 | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Element/input_event)                 | Reacting to every change in a field           |
| `change` event                | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/change_event)            | Reacting once to a finished choice            |
| `submit` event                | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLFormElement/submit_event)        | Handling a form's submission in JavaScript    |
| `Event.preventDefault()`      | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Event/preventDefault)                | Cancelling the browser's default action       |
| `Event.stopPropagation()`     | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation)               | Stopping an event from bubbling further       |
| `Event.currentTarget`         | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Event/currentTarget)                 | The element whose listener is running         |
| `FormData`                    | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/FormData)                            | Reading all of a form's fields by `name`      |
| Using the Fetch API (preview) | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch)               | Making a first request for your final project |
