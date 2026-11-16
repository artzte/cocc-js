// ====================================================================
// CIS 133JS — Week 10: Form Events and a First Look at fetch
// input vs. change, submit and preventDefault(), preventDefault() vs.
// stopPropagation(), target vs. currentTarget, and a fetch preview
// ====================================================================

// --------------------------------------------------------------------
// Setup for Chrome DevTools Snippets:
// 1. Open Google Chrome to a blank tab (about:blank) or your running
//    `npm start` tab at http://localhost:5173.
// 2. Open DevTools (F12 or Ctrl+Shift+I / Cmd+Option+I).
// 3. Switch to the "Sources" tab.
// 4. In the left panel, click "Snippets" (or press Ctrl+Shift+P / Cmd+Shift+P
//    and type "Create snippet").
// 5. Name the snippet "week10-form-events.js".
// 6. Paste this code into the editor.
// 7. Press Ctrl+S (Cmd+S) to save, and Ctrl+Enter (Cmd+Enter) to run.
//
// Running the snippet defines the demo functions. Call them one at a
// time from the Console, for example: inputVsChangeDemo()
// Each demo puts a small form on the page for you to try.
// --------------------------------------------------------------------

function header(title) {
  console.log(
    `\n%c=== ${title} ===`,
    'color: #10b981; font-weight: bold; font-size: 13px;',
  )
}

// Replaces the demo area with fresh markup and returns it
function showDemo(markup) {
  let demo = document.querySelector('#week10-demo')
  if (demo) {
    // replacing the element also throws away the old demo's listeners
    const fresh = demo.cloneNode(false)
    demo.replaceWith(fresh)
    demo = fresh
  } else {
    demo = document.createElement('section')
    demo.id = 'week10-demo'
    demo.style.cssText =
      'font: 16px sans-serif; padding: 1rem; border: 2px solid #10b981; margin: 1rem;'
    document.body.prepend(demo)
  }
  demo.innerHTML = markup
  return demo
}

// --------------------------------------------------------------------
// 1. input vs. change
// Type in the text field, then click somewhere else. Change the
// select and toggle the checkbox. Watch which events fire, and when.
// --------------------------------------------------------------------
function inputVsChangeDemo() {
  header('1. input vs. change')
  const demo = showDemo(`
    <label>Name <input name="name" /></label>
    <label>Units
      <select name="units">
        <option value="fahrenheit">°F</option>
        <option value="celsius">°C</option>
      </select>
    </label>
    <label><input type="checkbox" name="alerts" /> Weather alerts</label>
  `)

  // Both events bubble, so one listener of each kind on the demo
  // container hears every control inside it.
  demo.addEventListener('input', (event) => {
    const control = event.target
    const value = control.type === 'checkbox' ? control.checked : control.value
    console.log(`input  → ${control.name}:`, value)
  })

  demo.addEventListener('change', (event) => {
    const control = event.target
    const value = control.type === 'checkbox' ? control.checked : control.value
    console.log(`change → ${control.name}:`, value)
  })

  console.log(
    'Type in Name, then click away. Then try the select and checkbox.',
  )
  console.log(
    'Text field: input fires on every keystroke, change fires on blur.',
  )
  console.log('Select and checkbox: both events fire right away.')
}

// --------------------------------------------------------------------
// 2. submit and preventDefault()
// Submit the form by clicking the button AND by pressing Enter in the
// text field. Both fire one submit event on the form.
// --------------------------------------------------------------------
function submitDemo() {
  header('2. submit and preventDefault()')
  const demo = showDemo(`
    <form id="city-form">
      <label>City <input name="city" required /></label>
      <label>Units
        <select name="units">
          <option value="fahrenheit">°F</option>
          <option value="celsius">°C</option>
        </select>
      </label>
      <button type="submit">Search</button>
    </form>
    <p><a href="https://developer.mozilla.org/">A link that won't navigate</a></p>
  `)

  const form = demo.querySelector('#city-form')
  form.addEventListener('submit', (event) => {
    // without this line, the browser reloads the page and the
    // console log (and all of our JavaScript state) is gone
    event.preventDefault()

    const data = new FormData(form)
    console.log('submit fired on', event.currentTarget.id)
    console.log('city:', data.get('city'), '| units:', data.get('units'))
    form.reset()
  })

  demo.querySelector('a').addEventListener('click', (event) => {
    event.preventDefault()
    console.log('Link click: preventDefault() cancelled the navigation')
  })

  console.log('Submit with the button, then with Enter. Then click the link.')
}

// --------------------------------------------------------------------
// 3. preventDefault() vs. stopPropagation()
// Click each link. One cancels the navigation, one stops the event
// from bubbling to the outer <div>. Neither one does the other's job.
// --------------------------------------------------------------------
function preventVsStopDemo() {
  header('3. preventDefault() vs. stopPropagation()')
  const demo = showDemo(`
    <div id="outer" style="padding: 1rem; background: #ecfdf5;">
      outer div
      <p><a id="prevent" href="https://developer.mozilla.org/">preventDefault() link</a></p>
      <p><a id="stop" href="https://developer.mozilla.org/" target="_blank">
        stopPropagation() link (opens a new tab)
      </a></p>
    </div>
  `)

  demo.querySelector('#outer').addEventListener('click', (event) => {
    console.log(`outer div heard a click that started on #${event.target.id}`)
  })

  demo.querySelector('#prevent').addEventListener('click', (event) => {
    event.preventDefault()
    console.log('#prevent: no navigation, but the click still bubbles…')
  })

  demo.querySelector('#stop').addEventListener('click', (event) => {
    event.stopPropagation()
    console.log('#stop: the click stops here, but the link still opens')
  })
}

// --------------------------------------------------------------------
// 4. target vs. currentTarget in a delegated listener
// --------------------------------------------------------------------
function targetVsCurrentTargetDemo() {
  header('4. target vs. currentTarget')
  const demo = showDemo(`
    <ul id="cities">
      <li><button type="button" data-city="Bend"><strong>Bend</strong>, Oregon</button></li>
      <li><button type="button" data-city="Chicago"><strong>Chicago</strong>, Illinois</button></li>
    </ul>
  `)

  demo.querySelector('#cities').addEventListener('click', (event) => {
    const button = event.target.closest('button')
    console.log('target:       ', event.target.tagName)
    console.log('currentTarget:', event.currentTarget.id)
    if (!button) {
      // a click on the list itself, between buttons
      return
    }
    console.log('closest button:', button.dataset.city)
  })

  console.log('Click a bold city name, then the state name next to it.')
  console.log('target changes; currentTarget is always the <ul>.')
}

// --------------------------------------------------------------------
// 5. Preview: a first fetch call
// Uses the Open-Meteo geocoding API (no key needed). The second call
// sends a bad latitude, so the server answers with status 400.
// --------------------------------------------------------------------
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

async function fetchPreviewDemo() {
  header('5. Preview: a first fetch call')

  const searchUrl =
    'https://geocoding-api.open-meteo.com/v1/search?name=Bend&count=5&language=en&format=json'
  const data = await loadJson(searchUrl)
  console.log('Places named Bend:')
  console.table(
    data.results.map((place) => ({
      name: place.name,
      region: place.admin1,
      country: place.country,
    })),
  )

  const badUrl =
    'https://api.open-meteo.com/v1/forecast?latitude=999&longitude=-121.3&current=temperature_2m'
  try {
    await loadJson(badUrl)
  } catch (error) {
    console.log(
      `The bad request ended up in catch with "${error.message}".`,
      'fetch itself did not throw; our !response.ok check did.',
    )
  }
}

// --------------------------------------------------------------------
// 6. Debug Challenge
// This character counter is supposed to update as you type, but it
// only updates after you click away from the text area. Why? Fix it.
// --------------------------------------------------------------------
function debugChallenge() {
  header('6. Debug Challenge')
  const demo = showDemo(`
    <label>Comment<br /><textarea name="comment" rows="3" cols="40"></textarea></label>
    <p class="count">0 / 140</p>
  `)

  const textarea = demo.querySelector('textarea')
  const count = demo.querySelector('.count')

  textarea.addEventListener('change', () => {
    count.textContent = `${textarea.value.length} / 140`
  })

  console.log('Type in the comment box. When does the count update?')
}

console.log(
  'Week 10 demos loaded. Run one at a time: inputVsChangeDemo(), submitDemo(),',
  'preventVsStopDemo(), targetVsCurrentTargetDemo(), fetchPreviewDemo(), debugChallenge()',
)
