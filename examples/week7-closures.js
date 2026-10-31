// ====================================================================
// CIS 133JS — Week 7: Closures
// Limiting scope exposure (POLE), closures, factory functions,
// closures vs. classes, and closure memory lifecycle
// ====================================================================

// --------------------------------------------------------------------
// Setup for Chrome DevTools Snippets:
// 1. Open Google Chrome to a blank tab (about:blank).
// 2. Open DevTools (F12 or Ctrl+Shift+I / Cmd+Option+I).
// 3. Switch to the "Sources" tab.
// 4. In the left panel, click "Snippets" (or press Ctrl+Shift+P / Cmd+Shift+P
//    and type "Create snippet").
// 5. Name the snippet "week7-closures.js".
// 6. Paste this code into the editor.
// 7. Press Ctrl+S (Cmd+S) to save, and Ctrl+Enter (Cmd+Enter) to run.
// --------------------------------------------------------------------

function header(title) {
  console.log(
    `\n%c=== ${title} ===`,
    'color: #10b981; font-weight: bold; font-size: 13px;',
  )
}

// --------------------------------------------------------------------
// DEMO 1: The Principle of Least Exposure (POLE) & Block Scoping
// --------------------------------------------------------------------
function poleDemo() {
  header('1. Principle of Least Exposure (POLE)')

  // Function-scoped private cache: nothing outside `getFactorial` can
  // tamper with `cache`.
  function buildFactorial() {
    const cache = {}

    return function factorial(n) {
      if (n < 2) return 1
      if (!(n in cache)) {
        console.log(`  computing ${n}! ...`)
        cache[n] = n * factorial(n - 1)
      } else {
        console.log(`  cache hit for ${n}!`)
      }
      return cache[n]
    }
  }

  const factorial = buildFactorial()
  console.log('factorial(4):', factorial(4))
  console.log('factorial(5):', factorial(5)) // reuses 4! from private cache
  console.log('typeof cache outside:', typeof cache) // undefined

  // Explicit block scope for temporary work:
  const items = ['apple', 'banana', 'cherry']
  {
    // `tempJoined` is only needed for these two lines.
    const tempJoined = items.join(' | ')
    console.log('inside block:', tempJoined)
  }
  console.log('typeof tempJoined outside block:', typeof tempJoined) // undefined
}

// --------------------------------------------------------------------
// DEMO 2: Closure Is a Live Link, Not a Snapshot
// --------------------------------------------------------------------
function liveLinkDemo() {
  header('2. Closure Is a Live Link, Not a Snapshot')

  function makeCounter(start = 0) {
    let count = start

    return function step() {
      count += 1
      return count
    }
  }

  // Each call to `makeCounter` creates a NEW scope bubble with its own `count`.
  const hitsA = makeCounter(0)
  const hitsB = makeCounter(10)

  console.log('hitsA():', hitsA()) // 1
  console.log('hitsA():', hitsA()) // 2
  console.log('hitsB():', hitsB()) // 11 (independent scope)
  console.log('hitsA():', hitsA()) // 3 (live link keeps updating)
}

// --------------------------------------------------------------------
// DEMO 3: Factory Functions — Encapsulating State & Behavior
// --------------------------------------------------------------------
function factoryFunctionDemo() {
  header('3. Factory Functions (Encapsulated State)')

  function createCounter(initialValue = 0) {
    let count = initialValue

    return {
      increment() {
        count += 1
        return count
      },
      decrement() {
        count -= 1
        return count
      },
      reset() {
        count = initialValue
        return count
      },
      getCount() {
        return count
      },
    }
  }

  const counter = createCounter(5)
  console.log('initial:', counter.getCount()) // 5
  console.log('increment:', counter.increment()) // 6
  console.log('increment:', counter.increment()) // 7
  console.log('decrement:', counter.decrement()) // 6
  console.log('reset:', counter.reset()) // 5

  // Try to cheat and mutate `count` from the outside:
  counter.count = 999
  console.log(
    'after setting counter.count = 999, getCount() is still:',
    counter.getCount(),
  ) // 5
}

// --------------------------------------------------------------------
// DEMO 4: Closure vs. Class — Privacy and `this` Binding
// --------------------------------------------------------------------
function closureVsClassDemo() {
  header('4. Closure vs. Class Tradeoffs')

  // 1. Class version: state lives on `this`, which is public by default
  //    and depends on how the method is called.
  class ClassCounter {
    constructor() {
      this.count = 0
    }
    increment() {
      this.count += 1
      return this.count
    }
  }

  const classInstance = new ClassCounter()
  console.log('classInstance.count is public:', classInstance.count) // 0

  // Detaching the method loses `this` (simulating passing it as a callback):
  const detachedClassIncrement = classInstance.increment
  try {
    detachedClassIncrement()
  } catch (err) {
    console.log('detached class method failed:', err.name, '-', err.message)
  }

  // 2. Closure factory version: state lives in lexical scope, so it is
  //    private AND detached callbacks never lose their context.
  function createClosureCounter() {
    let count = 0
    return {
      increment() {
        count += 1
        return count
      },
    }
  }

  const closureInstance = createClosureCounter()
  const detachedClosureIncrement = closureInstance.increment
  console.log('detached closure method works:', detachedClosureIncrement()) // 1
  console.log(
    'detached closure method works again:',
    detachedClosureIncrement(),
  ) // 2
}

// --------------------------------------------------------------------
// DEMO 5: Browser Counter Widget (Closure + Event Delegation Preview)
// --------------------------------------------------------------------
function browserCounterDemo() {
  header('5. Browser Counter Widget (Inspect the page!)')

  function createCounter(initial = 0) {
    let count = initial
    return {
      increment: () => ++count,
      decrement: () => --count,
      reset: () => (count = initial),
      getCount: () => count,
    }
  }

  const counter = createCounter(0)

  let host = document.querySelector('#closure-counter-demo')
  if (!host) {
    host = document.createElement('div')
    host.id = 'closure-counter-demo'
    host.style.cssText =
      'font-family: system-ui, sans-serif; padding: 1rem; margin: 1rem; border: 1px solid #ccc; border-radius: 8px; max-width: 320px;'
    document.body.append(host)
  }

  function render() {
    host.innerHTML = `
      <h3 style="margin-top: 0;">Closure Counter: <span>${counter.getCount()}</span></h3>
      <div style="display: flex; gap: 0.5rem;">
        <button data-action="decrement">-1</button>
        <button data-action="reset">Reset</button>
        <button data-action="increment">+1</button>
      </div>
    `
  }

  // One delegated click listener on `host` closes over `counter` and `render`.
  host.addEventListener('click', (event) => {
    const { action } = event.target.dataset
    if (!action) return

    if (action === 'increment') counter.increment()
    if (action === 'decrement') counter.decrement()
    if (action === 'reset') counter.reset()

    render()
  })

  render()
  console.log('Rendered counter widget into the page. Click the buttons!')
}

// --------------------------------------------------------------------
// DEMO 6: Debug Challenge — The Stale Snapshot Trap
// --------------------------------------------------------------------
// `createCart()` is supposed to track items added to a shopping cart
// and report the updated summary each time. Instead, `getSummary()`
// always says "0 items: (empty)", even after items are added!
//
// Find why `summary` never updates, and fix `createCart()` so that
// `getSummary()` always reflects the current `items` array.
function debugChallenge() {
  header('6. Debug Challenge')

  function createCart() {
    const items = []
    const summary = `${items.length} items: ${items.join(', ') || '(empty)'}`

    return {
      addItem(item) {
        items.push(item)
      },
      getSummary() {
        return summary
      },
    }
  }

  const cart = createCart()
  cart.addItem('Keyboard')
  cart.addItem('Monitor')
  console.log('Cart summary:', cart.getSummary()) // Expected: "2 items: Keyboard, Monitor"
}

// --------------------------------------------------------------------
// Run all demos
// --------------------------------------------------------------------
poleDemo()
liveLinkDemo()
factoryFunctionDemo()
closureVsClassDemo()
browserCounterDemo()
debugChallenge()
