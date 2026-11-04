## Side Lecture: Efficient Event Handling with Event Delegation

In last week's **Scoreboard** assignment, we needed to wire up **+1** and **−1** buttons for each
player inside a `for` loop so we could see (and fix) the classic `var`-in-a-loop bug from
[Scope & Closures (2nd Edition), Chapter 5: The (Not So) Secret Lifecycle of Variables](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch5.md)
and
[Scope & Closures (2nd Edition), Chapter 7: Using Closures](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md).

That loop taught us an important lesson about scope and closure. However, as a pattern for building
real DOM applications, wiring up individual event listeners inside `render()` has a major drawback:
**every time `render()` updates `app.innerHTML`, the browser destroys all the old buttons and builds
brand-new ones, forcing your code to query the DOM and re-create every event listener from scratch
on every single click.**

In this short side lecture, we will refactor last week's Scoreboard solution using **event
bubbling** and **`data-*` attributes** (a pattern called **event delegation**). You will use this
cleaner pattern in this week's **Color Theme Switcher** assignment—and likely throughout your Final
Project.

---

### 1. The Problem: Re-Wiring Listeners on Every Render

Here is the `render()` function from the Week 6 Scoreboard solution:

```javascript
function render() {
  const rows = players
    .map(
      (player, i) => `
    <tr>
      <td>${player}</td>
      <td data-test-score>${scores[i]}</td>
      <td>
        <div class="buttons">
          <button data-type="add">+1</button>
          <button data-type="subtract">-1</button>
        </div>
      </td>
    </tr>
  `,
    )
    .join('\n')

  app.innerHTML = `
    <table>
      <thead>
        <tr>
          <th>Player</th>
          <th>Score</th>
          <th>Buttons</th>
        </tr>
      </thead>
      <tbody>
        ${rows}
      </tbody>
    </table>
    <p>${leadersReport()}</p>
    <p><button id="reset">Reset scores</button></p>`

  // ⚠️ Every time a score changes, `render()` runs again and has to
  // find every button and attach 7 brand-new listener closures!
  const buttons = document.querySelectorAll('.buttons')
  for (let i = 0; i < players.length; i++) {
    const playerButtons = buttons[i]
    const [add, subtract] = playerButtons.querySelectorAll('button')

    add.addEventListener('click', () => {
      scores = addPoint(i)
      render()
    })
    subtract.addEventListener('click', () => {
      scores = removePoint(i)
      render()
    })
  }

  app.querySelector('#reset').addEventListener('click', () => {
    scores = resetScores()
    render()
  })
}
```

Look at what `render()` is doing:

1. **Lines 2–59**: Builds the HTML string and writes it to `app.innerHTML`.
2. **Lines 61–81**: Queries the DOM for `.buttons` and `#reset`, loops over the players, and creates
   `2 * players.length + 1` new arrow functions and attaches them to the newly created buttons.

While modern browsers are very good at garbage-collecting the old detached buttons and their old
listener closures, mixing DOM querying and listener setup inside `render()` makes `render()` twice
as long and couples _drawing the UI_ with _wiring up events_.

---

### 2. The Key Insight: Events Bubble Up the DOM

When a user clicks a `<button>` inside `<tbody>`, the click event doesn't just fire on that button
and stop. In the browser's DOM event model, the click **bubbles up** through every ancestor element:

```text
<button>  ──►  <div class="buttons">  ──►  <td>  ──►  <tr>  ──►  <tbody>  ──►  <table>  ──►  <div id="app">
```

Notice the element at the top of that chain: **`<div id="app">`**.

Unlike the table rows and buttons inside it, `<div id="app">` **is never destroyed or replaced**
when `app.innerHTML = ...` runs! If we attach **one** click listener to `app` once when
`renderApp()` starts, that single listener will hear every button click that bubbles up from inside
`app`—even on buttons that were created milliseconds ago by `render()`.

---

### 3. Carrying Context on the Element with `data-*` Attributes

In the Week 6 loop, each button knew _which_ player to update because its arrow function closed over
the loop variable `i`. If we only have **one** click listener on `app`, how does it know which
button was clicked and which player index (`0`, `1`, or `2`) to update?

We put that information right onto the HTML `<button>` element using **`data-*` attributes**, and
read it back from `event.target.dataset`!

#### Step 1: Add `data-type` and `data-index` to the buttons in the template

```html
<!-- Inside players.map((player, i) => ...) -->
<div class="buttons">
  <button data-type="add" data-index="${i}">+1</button>
  <button data-type="subtract" data-index="${i}">-1</button>
</div>

<!-- And on the Reset button: -->
<p><button id="reset" data-type="reset">Reset scores</button></p>
```

In HTML, any attribute starting with `data-` is valid and exposed by the browser on the element's
[`dataset` property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset):

- `data-type="add"` becomes `element.dataset.type` (`"add"`)
- `data-index="1"` becomes `element.dataset.index` (`"1"` — always a string, so convert with
  `parseInt(button.dataset.index, 10)` when you need a number!)

#### Step 2: Attach ONE listener to `app` outside `render()`

When any click happens inside `app`, the browser passes an `event` object to our handler. We use
`event.target.closest('button')` to find the button that was clicked, then `switch` on its
`data-type` to decide what to do:

```javascript
// Attached ONCE inside renderApp(), outside render()!
app.addEventListener('click', (event) => {
  const button = event.target.closest('button')
  if (!button) return

  const i = parseInt(button.dataset.index, 10)

  switch (button.dataset.type) {
    case 'add':
      scores = addPoint(i)
      render()
      break
    case 'subtract':
      scores = removePoint(i)
      render()
      break
    case 'reset':
      scores = resetScores()
      render()
      break
    default:
      console.log('Unknown button')
      break
  }
})
```

> 💡 **What about the Reset button?** It has no `data-index`, so `parseInt(undefined, 10)` gives
> `NaN`. That's fine: the `'reset'` case never uses `i`. Any button without a recognized `data-type`
> falls through to `default` and is ignored.

> 💡 **Why `event.target.closest('button')`?** If a button ever contains child HTML (like an icon
> `<span>+1</span>` or a color swatch), `event.target` might be that inner `<span>`. Calling
> [`event.target.closest('button')`](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest)
> walks upward from the clicked node to find the enclosing `<button>`, and returns `null` if the
> user clicked empty space in `app`.

---

### 4. The Refactored Week 6 Scoreboard (Side by Side)

Here is the complete refactored `renderApp()` using event delegation. Notice how clean `render()` is
now—its **only** job is to set `app.innerHTML`:

```javascript
export function renderApp() {
  const scoresBaseline = resetScores()
  let scores = [...scoresBaseline]

  const app = document.querySelector('#app')

  function addPoint(index) {
    const points = scores[index]
    return scores.slice(0, index).concat([points + 1], scores.slice(index + 1))
  }

  function removePoint(index) {
    const points = scores[index]
    if (points === 0) return [...scores]
    return scores.slice(0, index).concat([points - 1], scores.slice(index + 1))
  }

  function resetScores() {
    return Array(players.length).fill(0)
  }

  function render() {
    const rows = players
      .map(
        (player, i) => `
      <tr>
        <td>${player}</td>
        <td data-test-score>${scores[i]}</td>
        <td>
          <div class="buttons">
            <button data-type='add' data-index='${i}'>+1</button>
            <button data-type='subtract' data-index='${i}'>-1</button>
          </div>
        </td>
      </tr>
    `,
      )
      .join('\n')

    const leaders = getLeaders(players, scores)
    function leadersReport() {
      if (leaders.length === 0) return 'No points yet'

      const leader = leaders.shift()

      // no remainders
      if (leaders.length === 0) {
        return `Leader: ${leader.name} (${leader.score})`
      }

      // a tie
      return `Tied: ${[leader, ...leaders].map((player) => player.name).join(', ')} (${leader.score})`
    }

    // `render()` ONLY renders HTML! No loops, no addEventListener calls.
    app.innerHTML = `
      <style>
        .buttons {
          display: flex;
          gap: 10px;
        }

        .buttons > button {
          display: block;
          width: 5rem;
          text-align: center;
        }
      </style>
      <table>
        <thead>
          <tr>
            <th>Player</th>
            <th>Score</th>
            <th>Buttons</th>
          </tr>
        </thead>
        <tbody>
          ${rows}
        </tbody>
      </table>
      <p>${leadersReport()}</p>
      <p><button id="reset" data-type="reset">Reset scores</button></p>`
  }

  render()

  // ONE listener on the persistent `#app` container handles every click!
  app.addEventListener('click', (event) => {
    const button = event.target.closest('button')
    if (!button) return

    const i = parseInt(button.dataset.index, 10)

    switch (button.dataset.type) {
      case 'add':
        scores = addPoint(i)
        render()
        break
      case 'subtract':
        scores = removePoint(i)
        render()
        break
      case 'reset':
        scores = resetScores()
        render()
        break
      default:
        console.log('Unknown button')
        break
    }
  })
}
```

### Why This Pattern Wins

| Criteria                     | Per-Button Listeners in `render()` (Week 6)          | Container Event Delegation (Week 7+)               |
| :--------------------------- | :--------------------------------------------------- | :------------------------------------------------- |
| **Where listeners live**     | Attached to every `<button>` inside a `for` loop     | Attached **once** to the `#app` container          |
| **When `innerHTML` updates** | Old listeners are discarded; all must be re-attached | The `#app` listener stays put and keeps working    |
| **How state is indexed**     | Loop closure over `i` (`for (let i = 0; ...)`)       | `data-*` attributes on the HTML (`button.dataset`) |
| **Code inside `render()`**   | Mixes HTML templating with DOM queries and listeners | Purely renders state into `app.innerHTML`          |

---

### Helpful References

- [MDN: Event bubbling and Event delegation](https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling#event_delegation)
- [MDN: Using `data-*` attributes (`HTMLElement.dataset`)](https://developer.mozilla.org/en-US/docs/Web/HTML/How_to/Use_data_attributes)
- [MDN: `Element.closest()`](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest)
- [Week 7 Source Example (`examples/week7-event-delegation-scoreboard.js`)](../../examples/week7-event-delegation-scoreboard.js)
