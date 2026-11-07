// ====================================================================
// CIS 133JS — Week 8: Classes and Object-Oriented Programming
// class syntax, `this` binding, inheritance with extends/super,
// static members, private fields and getters, toJSON(), and a peek at
// the prototype underneath
// ====================================================================

// --------------------------------------------------------------------
// Setup for Chrome DevTools Snippets:
// 1. Open Google Chrome to a blank tab (about:blank).
// 2. Open DevTools (F12 or Ctrl+Shift+I / Cmd+Option+I).
// 3. Switch to the "Sources" tab.
// 4. In the left panel, click "Snippets" (or press Ctrl+Shift+P / Cmd+Shift+P
//    and type "Create snippet").
// 5. Name the snippet "week8-classes.js".
// 6. Paste this code into the editor.
// 7. Press Ctrl+S (Cmd+S) to save, and Ctrl+Enter (Cmd+Enter) to run.
//
// Every class is declared inside a demo function, so you can run the
// snippet again without "Identifier has already been declared" errors.
// --------------------------------------------------------------------

function header(title) {
  console.log(
    `\n%c=== ${title} ===`,
    'color: #10b981; font-weight: bold; font-size: 13px;',
  )
}

// --------------------------------------------------------------------
// DEMO 1: Class Basics — constructor, properties, methods, `new`
// --------------------------------------------------------------------
function classBasicsDemo() {
  header('1. Class Basics')

  // Compare with last week's createCounter() factory function.
  class Counter {
    constructor(initialValue = 0) {
      this.initialValue = initialValue
      this.count = initialValue
    }

    increment() {
      this.count += 1
      return this.count
    }

    reset() {
      this.count = this.initialValue
      return this.count
    }
  }

  // Each `new Counter()` creates a separate instance with its own data.
  const laps = new Counter()
  const score = new Counter(10)

  console.log('laps.increment():', laps.increment()) // 1
  console.log('laps.increment():', laps.increment()) // 2
  console.log('score.increment():', score.increment()) // 11
  console.log('laps.reset():', laps.reset()) // 0

  // Unlike the closure version, `count` is a public property.
  laps.count = 999
  console.log('after laps.count = 999:', laps.increment()) // 1000
}

// --------------------------------------------------------------------
// DEMO 2: `this` Depends on How a Function Is Called
// --------------------------------------------------------------------
function thisBindingDemo() {
  header('2. `this` Depends on the Call')

  class Greeter {
    constructor(name) {
      this.name = name
    }

    greet() {
      return `Hello from ${this.name}`
    }
  }

  const ada = new Greeter('Ada')
  const grace = new Greeter('Grace')

  // Implicit binding: `this` is the object before the dot.
  console.log('ada.greet():', ada.greet())

  // Explicit binding: `.call()` chooses `this` for one call.
  console.log('ada.greet.call(grace):', ada.greet.call(grace))

  // Default binding: called on its own, `this` is undefined
  // (class bodies always run in strict mode), so this.name throws.
  const detachedGreet = ada.greet
  try {
    detachedGreet()
  } catch (err) {
    console.log('detachedGreet() failed:', err.name, '-', err.message)
  }

  // The fix for callbacks: wrap the call in an arrow function so the
  // method is still called with `ada.` in front of it.
  const wrapped = () => ada.greet()
  console.log('wrapped():', wrapped())

  // Or use .bind() to make a copy with `this` locked in.
  const bound = ada.greet.bind(ada)
  console.log('bound():', bound())
}

// --------------------------------------------------------------------
// DEMO 3: Inheritance — extends, super(), and overriding
// --------------------------------------------------------------------
function inheritanceDemo() {
  header('3. Inheritance with extends and super')

  class Component {
    constructor(title) {
      this.title = title
    }

    toHTML() {
      return `<h3>${this.title}</h3>`
    }

    render(container) {
      container.innerHTML = this.toHTML()
    }
  }

  class Card extends Component {
    constructor(title, body) {
      // super() must run before we can use `this` in a child constructor
      super(title)
      this.body = body
    }

    // Override: same method name, more specific behavior
    toHTML() {
      return `${super.toHTML()}<p>${this.body}</p>`
    }
  }

  class List extends Component {
    constructor(title, items) {
      super(title)
      this.items = items
    }

    toHTML() {
      const listItems = this.items.map((item) => `<li>${item}</li>`).join('')
      return `${super.toHTML()}<ul>${listItems}</ul>`
    }
  }

  const card = new Card('Week 8', 'Classes bundle data with behavior.')
  const list = new List('Topics', ['constructor', 'this', 'extends', 'static'])

  // Polymorphism: same method name, different output for each class
  console.log('card.toHTML():', card.toHTML())
  console.log('list.toHTML():', list.toHTML())

  console.log('card instanceof Card:', card instanceof Card) // true
  console.log('card instanceof Component:', card instanceof Component) // true
  console.log('card instanceof List:', card instanceof List) // false

  return { card, list }
}

// --------------------------------------------------------------------
// DEMO 4: Browser Components (Inspect the page!)
// --------------------------------------------------------------------
function browserComponentsDemo({ card, list }) {
  header('4. Browser Components (Inspect the page!)')

  let host = document.querySelector('#class-components-demo')
  if (!host) {
    host = document.createElement('div')
    host.id = 'class-components-demo'
    host.style.cssText =
      'font-family: system-ui, sans-serif; display: flex; gap: 1rem; margin: 1rem;'
    host.innerHTML = '<section></section><section></section>'
    document.body.append(host)
  }

  const [cardSlot, listSlot] = host.querySelectorAll('section')

  // Same render() method, inherited from Component, used by both classes.
  card.render(cardSlot)
  list.render(listSlot)

  console.log('Rendered a Card and a List into the page.')
}

// --------------------------------------------------------------------
// DEMO 5: Static Members Belong to the Class, Not the Instances
// --------------------------------------------------------------------
function staticDemo() {
  header('5. Static Members')

  class Temperature {
    static FREEZING_F = 32

    static fromCelsius(celsius) {
      return new Temperature((celsius * 9) / 5 + 32)
    }

    constructor(fahrenheit) {
      this.fahrenheit = fahrenheit
    }

    isFreezing() {
      return this.fahrenheit <= Temperature.FREEZING_F
    }
  }

  const boiling = Temperature.fromCelsius(100)
  console.log('boiling.fahrenheit:', boiling.fahrenheit) // 212
  console.log('boiling.isFreezing():', boiling.isFreezing()) // false
  console.log('Temperature.FREEZING_F:', Temperature.FREEZING_F) // 32

  // Static members are not on the instances:
  console.log('boiling.fromCelsius:', boiling.fromCelsius) // undefined
}

// --------------------------------------------------------------------
// DEMO 6: Private Fields, Getters, and toJSON() (plus the Prototype)
// --------------------------------------------------------------------
function privateFieldsDemo() {
  // Strict mode, like class bodies and ES modules (see Week 1)
  'use strict'

  header('6. Private Fields, Getters, and toJSON()')

  class Note {
    #id
    #text
    #starred = false

    static fromJSON(data) {
      const note = new Note(data.id, data.text)
      if (data.starred) note.star()
      return note
    }

    constructor(id, text) {
      this.#id = id
      this.#text = text
    }

    // Getters: read like properties, but there is no way to assign them
    get id() {
      return this.#id
    }

    get text() {
      return this.#text
    }

    get starred() {
      return this.#starred
    }

    // A computed getter: nothing is stored, it's worked out on each read
    get preview() {
      return this.#text.length > 12
        ? `${this.#text.slice(0, 12)}...`
        : this.#text
    }

    star() {
      this.#starred = true
    }

    // JSON.stringify() calls this automatically
    toJSON() {
      return { id: this.#id, text: this.#text, starred: this.#starred }
    }
  }

  const note = new Note('n1', 'Read about private fields')
  note.star()

  console.log('note.text:', note.text)
  console.log('note.preview:', note.preview) // Read about p...
  console.log('note.starred:', note.starred) // true

  // Getter with no setter: in strict mode, assigning throws a TypeError.
  // (Outside strict mode it would be silently ignored.)
  try {
    note.starred = false
  } catch (err) {
    console.log('note.starred = false failed:', err.name)
  }
  console.log('note.starred is still:', note.starred) // true

  // Private fields are invisible from outside the class body. Even
  // writing note.#text out here is a SyntaxError.
  console.log('Object.keys(note):', Object.keys(note)) // []

  // Without toJSON(), JSON.stringify() would give '{}' here.
  const json = JSON.stringify(note)
  console.log('JSON.stringify(note):', json)

  const copy = Note.fromJSON(JSON.parse(json))
  console.log('copy instanceof Note:', copy instanceof Note) // true
  console.log('copy.starred:', copy.starred) // true

  // Under the hood: a class is a special function, and its methods and
  // getters live ONCE on Note.prototype, shared by every instance
  // through the prototype chain.
  console.log('typeof Note:', typeof Note) // function
  console.log('note.star === copy.star:', note.star === copy.star) // true
  console.log(
    'Object.getPrototypeOf(note) === Note.prototype:',
    Object.getPrototypeOf(note) === Note.prototype,
  ) // true
}

// --------------------------------------------------------------------
// DEMO 7: Debug Challenge — The Lost `this`
// --------------------------------------------------------------------
// `ClickCounter` renders a button that should count clicks. Instead,
// every click logs a TypeError in the console. Find out what `this`
// is inside handleClick() when the browser calls it, and fix the
// addEventListener() line.
function debugChallenge() {
  header('7. Debug Challenge')

  class ClickCounter {
    constructor(container) {
      this.container = container
      this.clicks = 0
      this.render()
      this.container.addEventListener('click', this.handleClick)
    }

    handleClick() {
      this.clicks += 1
      this.render()
    }

    render() {
      this.container.innerHTML = `<button>Clicked ${this.clicks} times</button>`
    }
  }

  let host = document.querySelector('#click-counter-demo')
  if (!host) {
    host = document.createElement('div')
    host.id = 'click-counter-demo'
    host.style.cssText = 'font-family: system-ui, sans-serif; margin: 1rem;'
    document.body.append(host)
  }

  new ClickCounter(host)
  console.log('Click the button on the page, then watch the console.')
}

// --------------------------------------------------------------------
// Run all demos
// --------------------------------------------------------------------
classBasicsDemo()
thisBindingDemo()
browserComponentsDemo(inheritanceDemo())
staticDemo()
privateFieldsDemo()
debugChallenge()
