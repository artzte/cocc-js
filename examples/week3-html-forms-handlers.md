# Week 3: an example of an html form handler

You need:

- a form tag wrapping your input fields
- a submit button (`type="submit"`) in the form
- an input field (or several)
- a submit handler to intercept default browser handling of forms

Useful links:

- [form tag reference on mdn](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/form)
- [addEventListener reference on mdn](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener)

```
export function renderApp() {
  const app = document.querySelector('#app')

  app.innerHTML = `
    <style>
      .result { color: slateblue; margin: 1rem 0; font-weight: bold; }
    </style>
    <h1>Event Handlers</h1>
    <form id="username-form">
      <input
        type="text"
        id="username-input"
        name="username"
        placeholder="Type a username"
      />
      <button type="submit">Check username</button>
    </form>
    <p class="result" id="result"></p>
  `

  const form = document.querySelector('#username-form')

  form.addEventListener('submit', function (event) {
    console.log('form submit', event)
    event.preventDefault()
    const input = form.querySelector('#username-input')

    const result = document.querySelector('#result')
    result.textContent = `Hello, ${input.value}`

    // clear out the input field
    input.value = ''
  })
}
```
