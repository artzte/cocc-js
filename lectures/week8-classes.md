# Week 8 Lecture Guide: Classes and Object-Oriented Programming

**Reading**:
[Get Started (2nd Edition), Chapter 2: Surveying JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch2.md)
("Classes" and "Class Inheritance") and
[Get Started (2nd Edition), Chapter 3: Digging to the Roots of JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch3.md)
("`this` Keyword" and "Prototypes")  
**Format**: Interactive Lecture & Chrome DevTools Snippet Walkthrough
([`examples/week8-classes.js`](../examples/week8-classes.js))  
**Duration**: ~20 Minutes  
**Prereq Context**: Week 7 (closures, factory functions, closure vs. class tradeoffs, event
delegation)

---

## Pacing & Timeline

| Time              | Section                                    | Focus / Snippet Function                                                          |
| :---------------- | :----------------------------------------- | :-------------------------------------------------------------------------------- |
| **00:00 - 03:00** | **1. From Factories to Classes**           | Recap `createCounter()`; the same idea as a class (`classBasicsDemo`)             |
| **03:00 - 08:00** | **2. `this` Depends on the Call**          | Implicit, default, and explicit calls; arrow and `bind` fixes (`thisBindingDemo`) |
| **08:00 - 12:30** | **3. Inheritance with `extends`/`super`**  | `Component` → `Card`, `List` (`inheritanceDemo`, `browserComponentsDemo`)         |
| **12:30 - 14:30** | **4. Static Members**                      | `Temperature.fromCelsius()` (`staticDemo`)                                        |
| **14:30 - 16:30** | **5. Private Fields, Getters, `toJSON()`** | `#` fields, getters, JSON round trip, shared prototype (`privateFieldsDemo`)      |
| **16:30 - 18:30** | **6. Debug Challenge**                     | Lost `this` in `addEventListener` (`debugChallenge`)                              |
| **18:30 - 20:00** | **7. Wrap-Up & Week 8 Deliverables**       | Choosing classes vs. closures vs. objects; Task List assignment                   |

---

## 1. From Factories to Classes (3 mins)

### Talking Points & Concept Cues

- Last week's `createCounter()` returned an object of methods that closed over a private `count`.
- A **class** is another way to bundle data with behavior. The book describes it as the definition
  of a "type" of data structure. A class isn't a concrete value you use directly; you
  **instantiate** it with `new`.
- `new Counter(10)` creates a new empty object, runs `constructor` with `this` set to that object,
  and hands the object back.
- Instance data goes on `this` (`this.count`). Methods go in the class body. No commas between
  methods, and no `function` keyword.
- **Tradeoff from Week 7**: `this.count` is public. `laps.count = 999` works, and the class can't
  stop it.

### Code Demo: `classBasicsDemo()`

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
}

const laps = new Counter()
const score = new Counter(10)
laps.increment() // 1
score.increment() // 11
```

---

## 2. `this` Depends on the Call (5 mins)

### Talking Points & Concept Cues

- **Two common wrong guesses** from the reading: `this` is not the function itself, and it is not
  automatically "the object the method was written in."
- **Scope is static; `this` is dynamic.** Lexical scope is fixed by where code is written (Weeks
  5–7). `this` is decided **each time the function is called**, by how it's called.
- Three ways to call the same `greet()`:
  1. **Method call** `ada.greet()`: `this` is `ada`, the object before the dot.
  2. **Explicit** `ada.greet.call(grace)`: `this` is whatever you pass, here `grace`.
  3. **Plain call** `detachedGreet()`: no object, so `this` is `undefined`. Class bodies always run
     in strict mode, so reading `this.name` throws a `TypeError`.
- **Why this matters in the browser**: `addEventListener('click', ada.greet)` passes the function
  without `ada`. The browser then calls it with `this` set to the element.
- **Two fixes**:
  - Arrow wrapper `() => ada.greet()`: still a method call, so `this` is `ada`.
  - `ada.greet.bind(ada)`: makes a copy of the function with `this` locked in.
- In this course we'll use the **arrow wrapper**. Arrow functions don't have their own `this`; they
  use the `this` of the surrounding code, the same way they'd look up any variable.

---

## 3. Inheritance with `extends` and `super` (4.5 mins)

### Talking Points & Concept Cues

- The book's example: `Book` and `BlogPost` both `extends Publication`.
- Our version: a `Component` base class with `toHTML()` and `render(container)`, and two child
  classes, `Card` and `List`.
- **`super(title)`** runs the parent constructor. It must come before you use `this` in a child
  constructor.
- **Overriding**: `Card` defines its own `toHTML()`. Inside it, `super.toHTML()` calls the parent's
  version so we can add to it instead of repeating it.
- **Polymorphism**: `card.toHTML()` and `list.toHTML()` share a name but produce different HTML.
  `render(container)` is written once in `Component` and works for both.
- Run `browserComponentsDemo()` and inspect the page: two components, drawn by one inherited method.
- Keep it shallow. One level of `extends` is plenty for most browser code. The book notes that
  inheritance is "a bit less commonly used in JS."

---

## 4. Static Members (2 mins)

### Talking Points & Concept Cues

- `static` puts a method or property on the **class itself**, not on instances.
- Good fits: helpers that don't need any one instance's data, such as validation
  (`TaskList.isValidText(text)`), shared constants (`Temperature.FREEZING_F`), and alternate ways to
  build an instance (`Temperature.fromCelsius(100)`).
- `boiling.fromCelsius` is `undefined`. Instances can't see static members.

---

## 5. Private Fields, Getters, and `toJSON()` (2 mins)

### Talking Points & Concept Cues

- **Closing the Week 7 gap**: Last week, privacy was a reason to pick closures over classes.
  **Private fields** (`#text`, `#starred`) change that. They can only be used inside the class body;
  even writing `note.#text` outside it is a `SyntaxError`.
- **Getters** (`get text() { ... }`) are read like properties (`note.text`, no parentheses). With no
  setter, outside code can read the value but not assign it. In strict mode, `note.starred = false`
  throws a `TypeError`. The only way to change it is a method we chose to provide, such as `star()`.
  That's POLE again.
- **Computed getters**: `get preview()` stores nothing; it works out its value on each read. In the
  assignment, `list.remainingCount` works the same way.
- **`toJSON()`**: `JSON.stringify()` skips private fields, so without help it returns `'{}'`. If an
  object has a `toJSON()` method, `JSON.stringify()` calls it automatically. `static fromJSON(data)`
  goes the other way. Next week we'll use this pair to save tasks to `localStorage`.
- **Prototypes, awareness only**: `typeof Note` is `'function'`. `Object.keys(note)` is `[]`, and
  `note.star === copy.star` is `true`. Methods and getters live once on `Note.prototype`, and every
  instance finds them by **delegating** up the prototype chain. That's why `this` has to be dynamic:
  one shared method serves every instance, and `this` tells it which one called. It's also the Week
  7 memory point: class instances share methods, while factory functions make new closures for each
  instance.

---

## 6. Debug Challenge (2 mins)

### Talking Points & Concept Cues

- Run `debugChallenge()` and click the button: `TypeError: this.render is not a function`.
- Add `console.log(this)` to `handleClick()`. It prints the `<div>`, not the `ClickCounter`.
- Why: `addEventListener('click', this.handleClick)` hands over the function alone. The browser
  calls it with `this` set to the element the listener is attached to.
- **The fix**:
  ```javascript
  this.container.addEventListener('click', (event) => this.handleClick(event))
  ```
- You'll write the same line in the `TaskList` constructor for this week's assignment, calling a
  private `this.#handleClick(event)`.

---

## 7. Wrap-Up & Week 8 Deliverables (1.5 mins)

### Talking Points & Concept Cues

- **Choosing a tool**:
  - **Plain object**: one-off data with no behavior (`{ id: 1, text: 'Read' }`).
  - **Closure / factory function**: private state, a handful of instances, methods passed around as
    callbacks.
  - **Class**: many instances of the same kind of thing, shared methods, or a parent/child
    relationship.
- **Key Takeaways**:
  1. A class defines data and behavior; `new` makes instances.
  2. `this` is decided by how a function is called. Use an arrow wrapper for callbacks.
  3. `extends` and `super` let a child class reuse and override a parent.
- **Week 8 Deliverables (Due Monday, November 16)**:
  - **Quiz 8**
  - **Week 8 Assignment: Task List with Classes**
- **Coming in Week 9**: We'll split the Task List into ES modules and save it to `localStorage`.
  Final Project Milestone 3 (Initial Structure) is also due at the end of Week 9.
