# Week 8: Classes and Object-Oriented Programming Examples

This guide walks through an interactive browser console demo for the Week 8 lecture: **class
basics**, **how `this` is decided**, **inheritance with `extends` and `super`**, **components that
render into the page**, **static members**, a quick look at **prototypes**, and a **debug
challenge**.

The full snippet is in [`week8-classes.js`](week8-classes.js).

---

## Setup for Chrome DevTools Snippets

1. Open Google Chrome to a blank tab (`about:blank`).
2. Open DevTools (`F12` or `Ctrl+Shift+I` on Windows/Linux, `Cmd+Option+I` on macOS).
3. Switch to the **Sources** tab.
4. In the left panel, click **Snippets** (or press `Ctrl+Shift+P` / `Cmd+Shift+P` and type
   `Create snippet`).
5. Name the snippet `week8-classes.js`.
6. Paste in the contents of [`week8-classes.js`](week8-classes.js), press `Ctrl+S` (`Cmd+S`) to
   save, and `Ctrl+Enter` (`Cmd+Enter`) to run.

---

## What Each Demo Shows

| Demo                     | Function                  | Watch for                                                                                  |
| :----------------------- | :------------------------ | :----------------------------------------------------------------------------------------- |
| 1. Class basics          | `classBasicsDemo()`       | Two `Counter` instances keep separate counts; `laps.count = 999` changes it (it's public)  |
| 2. `this` and the call   | `thisBindingDemo()`       | `ada.greet()`, `ada.greet.call(grace)`, and a detached `greet()` that throws a `TypeError` |
| 3. Inheritance           | `inheritanceDemo()`       | `Card` and `List` extend `Component`, call `super(...)`, and override `toHTML()`           |
| 4. Browser components    | `browserComponentsDemo()` | Both components use the inherited `render(container)` to draw themselves on `about:blank`  |
| 5. Static members        | `staticDemo()`            | `Temperature.fromCelsius()` is called on the class; instances don't have it                |
| 6. Prototypes underneath | `prototypeDemo()`         | `typeof Dog` is `'function'`, and every dog shares one `speak` method on `Dog.prototype`   |
| 7. Debug challenge       | `debugChallenge()`        | Clicking the button throws `TypeError: this.render is not a function`. Explain it, fix it  |

---

## References in _You Don't Know JS Yet_

- [Get Started (2nd Edition), Chapter 2: Surveying JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch2.md)
- [Get Started (2nd Edition), Chapter 3: Digging to the Roots of JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch3.md)

---

## Debug Challenge

`debugChallenge()` renders a button that should read `Clicked 1 times`, `Clicked 2 times`, and so
on. Instead, every click logs:

```
TypeError: this.render is not a function
```

Before you change anything, answer these questions:

1. Which line hands `handleClick` to the browser?
2. When the browser calls `handleClick`, is it called as a method on your `ClickCounter` instance,
   or some other way?
3. Add `console.log(this)` as the first line of `handleClick()`. What does it print?
4. How can you change the `addEventListener()` line so `this` inside `handleClick()` is the
   `ClickCounter` instance?
