# Week 6: Scope Chain, Global Scope, and Variable Lifecycle Examples

This guide walks through an interactive browser console demo for the Week 6 lectures: **shadowing**,
**the global object**, **function name scope**, **hoisting**, **the Temporal Dead Zone**,
**re-declaration**, **`var` vs. `let` in loops**, and a **debug challenge**.

The full snippet is in [`week6-scope-chain-lifecycle.js`](week6-scope-chain-lifecycle.js).

---

## Setup for Chrome DevTools Snippets

1. Open Google Chrome to a blank tab (`about:blank`).
2. Open DevTools (`F12` or `Ctrl+Shift+I` on Windows/Linux, `Cmd+Option+I` on macOS).
3. Switch to the **Sources** tab.
4. In the left panel, click **Snippets** (or press `Ctrl+Shift+P` / `Cmd+Shift+P` and type
   `Create snippet`).
5. Name the snippet `week6-scope-chain-lifecycle.js`.
6. Paste in the contents of [`week6-scope-chain-lifecycle.js`](week6-scope-chain-lifecycle.js),
   press `Ctrl+S` (`Cmd+S`) to save, and `Ctrl+Enter` (`Cmd+Enter`) to run.

---

## What Each Demo Shows

| Demo                   | Function                  | Watch for                                                                              |
| :--------------------- | :------------------------ | :------------------------------------------------------------------------------------- |
| 1. Shadowing           | `shadowingDemo()`         | A parameter with the same name hides the global; the global is never changed           |
| 2. The global object   | `globalObjectDemo()`      | `var` globals appear on `window`; so do elements with an `id`                          |
| 3. Function name scope | `functionNameScopeDemo()` | A named function expression's name exists only inside the function, and is read-only   |
| 4. Hoisting            | `hoistingDemo()`          | Declarations work early; `var` is `undefined` early; a `var` function expression fails |
| 5. Temporal Dead Zone  | `tdzDemo()`               | `let`/`const` throw `ReferenceError` until their line runs, even inside a function     |
| 6. Re-declaration      | `redeclarationDemo()`     | `var` twice is fine; `const` blocks re-assignment but not mutation                     |
| 7. Loops               | `loopsDemo()`             | `var` gives one shared `i` (`[3, 3, 3]`); `let` gives one `j` per pass (`[0, 1, 2]`)   |
| 8. Debug challenge     | `debugChallenge()`        | Prints `undefined` twice. Your job: fix it                                             |

---

## Bonus: Errors the Compiler Catches

Each of these is a **SyntaxError**, so the engine refuses to run the code at all. Put each one in
its own new snippet (or paste it into the console) to see the error.

**Illegal shadowing**: a `var` can't "hop over" a `let` of the same name in an enclosing block.

```javascript
function something() {
  var special = 'JavaScript'
  {
    let special = 12345 // fine: let shadows var
    {
      var special = 'JavaScript' // SyntaxError
    }
  }
}
```

**Re-declaring with `let`**:

```javascript
function scores() {
  let round = 1
  let round = 2 // SyntaxError: Identifier 'round' has already been declared
}
```

---

## Debug Challenge

`debugChallenge()` is supposed to print:

```
Welcome back, Ada! You have 3 new messages.
```

It prints `Welcome back, undefined! You have undefined new messages.` instead. There are two bugs:
one is caused by hoisting, and one by shadowing. Fix both so the function prints the line above,
**and** still prints `You have no new messages.` when `messageCount` is `0`.

Before you change anything, answer these:

1. When `showWelcome()` is called, why does it work at all, instead of throwing?
2. At that moment, what are the values of the outer `userName` and `messageCount`? Why?
3. Inside `showWelcome()`, which `messageCount` does the template literal read? Where is that
   variable declared, and what is its value?
4. If you changed both outer `var`s to `let` without moving anything, what error would you get, and
   why is that better than `undefined`?
