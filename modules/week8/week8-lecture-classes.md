## Classes and Object-Oriented Programming

For three weeks we've worked on the first pillar of JavaScript, **scope and closure**. This week we
turn to the second: **objects**, as organized with ES6 `class`. Our reading comes from
[Get Started (2nd Edition), Chapter 2: Surveying JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch2.md)
(classes and inheritance) and
[Get Started (2nd Edition), Chapter 3: Digging to the Roots of JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch3.md)
(`this` and prototypes). It answers two questions: how do we package data together with the methods
that use it, and how does one method know _which_ object's data to use?

---

### Key Lecture Topics

1. **Class Basics**: `class`, `constructor`, instance properties on `this`, methods, and `new`.
2. **`this` Depends on the Call**: The same method gives different results depending on how it's
   called: `obj.method()`, a plain `fn()`, or `fn.call(obj)`.
3. **Losing `this` in Callbacks**: Passing `this.handleClick` to `addEventListener` hands over the
   function without its object. Wrap it in an arrow function to keep `this`.
4. **Inheritance**: `extends`, `super(...)` in the constructor, overriding a method, and calling the
   parent version with `super.method()`.
5. **Static Members**: Methods and properties that belong to the class itself rather than to each
   instance.
6. **Private Fields and Getters**: `#` fields can only be used inside the class body. Getters let
   outside code read them, and `toJSON()` / `static fromJSON()` convert an instance to plain data
   and back.
7. **Prototypes Underneath**: Methods are stored once on `ClassName.prototype` and shared by every
   instance through the prototype chain.

---

### Classes at a Glance

| Concept               | What It Means                                                              | Example                                      |
| :-------------------- | :------------------------------------------------------------------------- | :------------------------------------------- |
| **Class**             | A definition of a kind of object: its data and its methods                 | `class Task { ... }`                         |
| **Instance**          | A concrete object created from a class with `new`                          | `const task = new Task(1, 'Read')`           |
| **`constructor`**     | Runs once per `new` to set up the instance's properties                    | `this.done = false`                          |
| **`this`**            | The object a method was called on, decided at call time                    | `task.toggle()` → `this` is `task`           |
| **`extends`/`super`** | A child class builds on a parent; `super(...)` runs the parent constructor | `class Card extends Component`               |
| **`static`**          | Belongs to the class, not to instances                                     | `TaskList.isValidText(text)`                 |
| **Private field**     | Only code inside the class body can read or write it                       | `#done`                                      |
| **Getter**            | Read like a property, computed by a method; no setter means read-only      | `get done() { return this.#done }`           |
| **`toJSON()`**        | Called automatically by `JSON.stringify()`                                 | `JSON.stringify(task)`                       |
| **Closure vs. class** | Both can keep state private; classes share methods on a prototype          | Week 7's switcher vs. this week's `TaskList` |

#### Class Example

```javascript
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

const laps = new Counter()
const score = new Counter(10)
console.log(laps.increment()) // 1
console.log(score.increment()) // 11: each instance has its own `count`
```

Compare this with last week's `createCounter()` factory function. Both bundle data with behavior.
Here, though, `count` is a public property, and the methods find it through `this`.

#### Private Fields and Getters

Last week, privacy was a reason to choose a closure. Private fields give a class the same
protection:

```javascript
class Task {
  #text
  #done = false

  constructor(text) {
    this.#text = text
  }

  get text() {
    return this.#text
  }

  get done() {
    return this.#done
  }

  toggle() {
    this.#done = !this.#done
  }

  // JSON.stringify() calls this automatically
  toJSON() {
    return { text: this.#text, done: this.#done }
  }
}

const task = new Task('Read Chapter 2')
task.toggle()
console.log(task.done) // true
console.log(JSON.stringify(task)) // {"text":"Read Chapter 2","done":true}
task.done = false // TypeError: there's a getter but no setter
```

#### Keeping `this` in an Event Listener

```javascript
class ClickCounter {
  constructor(container) {
    this.container = container
    this.clicks = 0
    this.render()

    // Broken: the browser calls handleClick with `this` set to the container element
    // this.container.addEventListener('click', this.handleClick)

    // Fixed: the arrow function has no `this` of its own, so it uses the constructor's `this`
    this.container.addEventListener('click', (event) => this.handleClick(event))
  }

  handleClick() {
    this.clicks += 1
    this.render()
  }

  render() {
    this.container.innerHTML = `<button>Clicked ${this.clicks} times</button>`
  }
}
```

---

### Resources & References

- **Lecture Guide & Snippet Walkthrough**:
  - [Week 8 Lecture Guide: Classes and Object-Oriented Programming](../../lectures/week8-classes.md)
- **Textbook Readings**:
  - [Get Started (2nd Edition), Chapter 2: Surveying JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch2.md)
  - [Get Started (2nd Edition), Chapter 3: Digging to the Roots of JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch3.md)
  - Optional:
    [Get Started (2nd Edition), Chapter 4: The Bigger Picture](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch4.md)
  - Optional, for going deeper:
    [Objects & Classes (2nd Edition Draft), Chapter 3: Classy Objects](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/objects-classes/ch3.md)
    and
    [Objects & Classes (2nd Edition Draft), Chapter 4: This Works](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/objects-classes/ch4.md)
  - [Week 8 Reading Summary](../../weekly-readings/week-08.md)
- **Interactive Code & Demos**:
  - [Week 8 DevTools Snippet Guide](../../examples/week8-classes.md)
  - [Week 8 Source Snippet (`week8-classes.js`)](../../examples/week8-classes.js)
- **MDN References**:
  - [Classes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes)
  - [`this`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)
  - [`extends`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends)
  - [`static`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/static)
  - [Private properties](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/Private_properties)
  - [`get`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/get)
  - [`JSON.stringify()` and `toJSON()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#tojson_behavior)
- **Assignment**:
  - [Week 8 Assignment: Task List with Classes](week8-assignment-task-list.md)
