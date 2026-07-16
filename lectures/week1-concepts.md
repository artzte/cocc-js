# Week 1 Lecture Script: What *Is* JavaScript?

**Duration**: 20 Minutes  
**Target Audience**: Students starting CIS 133JS (assumes basic programming logic in Python/CIS 122)  
**Lecture Objectives**:
* Demystify the origin, standards, and governance of JavaScript.
* Contrast the core JS Engine with the Host Runtime Environment.
* Dispel the myth that JS is purely interpreted by proving it is parsed/compiled.
* Introduce Strict Mode and Compatibility (Transpiling vs. Polyfilling).

---

## Lecture Timeline & Outline

* **00:00 - 03:00** | Introduction, Naming History, and TC39 (Standards)
* **03:00 - 06:00** | Engine vs. Runtime (Browser vs. Node.js)
* **06:00 - 10:00** | The Compilation Proof (Syntax/Early Errors & Hoisting)
* **10:00 - 14:00** | Compatibility: Transpiling vs. Polyfilling
* **14:00 - 18:00** | Strict Mode: Preventing Accidental Globals
* **18:00 - 20:00** | Wrap-Up & Q&A

---

## 1. Intro, History, and TC39 (3 Minutes)

### Speaking Script
> "Welcome everyone! Today we're kicking off by asking a seemingly simple question: *What is JavaScript?* 
> First, let's address the elephant in the room: **Java is to JavaScript as ham is to hamster**. They are completely different languages. JavaScript was originally created in 10 days by Brendan Eich in 1995 under the name *Mocha*, renamed *LiveScript*, and finally branded *JavaScript* as a marketing ploy to ride the coattails of Java, which was the hot new language of the day.
> 
> Because of trademarks, the official standardized name of the language is **ECMAScript**. When people talk about modern JS, you'll hear terms like *ES2019* or *ESNext*.
> 
> Who controls this language? It's not one company. It's a committee called the **TC39**, which is made up of browser makers, device manufacturers, and web giants. They meet every two months to vote on language proposals as they move from Stage 0 (strawman) to Stage 4 (finished and ready for the spec)."

### Screen Share Focus
* Highlight the official **[TC39 Proposals Repository](https://github.com/tc39/proposals)**. Scroll down to show the tables of Active Proposals at Stages 1 through 3 to show how JS is actively changing.
* Open the **[ECMAScript 2019 Specification](https://www.ecma-international.org/ecma-262/10.0/)** to show students the official document governing the language.

---

## 2. Engine vs. Runtime (3 Minutes)

### Speaking Script
> "To understand how JavaScript runs, we have to distinguish between the **JS Engine** and the **JS Runtime** (also called the Host Environment).
> 
> The **Engine** is the machine that takes JS source code, compiles it, and executes it. Google's **V8** is the engine in Chrome and Node.js. Firefox uses **SpiderMonkey**, and Safari uses **JavaScriptCore**.
> 
> The **Runtime** is the wrapper surrounding that engine. If you're in a browser runtime, the engine has access to the DOM, web timers, and network tools. If you're in the Node.js runtime, you don't have a DOM, but you have access to the file system and server tools.
> 
> This is why some things look like JS but aren't actually part of the JS specification. For example, `console.log` and `alert` are host-provided 'guest' APIs, not core JavaScript."

### Browser Demo: Browser vs. Node
1. **Browser Console**: Open the Chrome DevTools Console (`F12` or `Cmd+Option+J`) and run:
   ```js
   alert("Hello from the Browser Runtime!");
   ```
   *Point out that the browser pops up a dialog box because it provides the `alert()` API.*
2. **Terminal (Node)**: Open a terminal, type `node` to enter the Node REPL, and try running:
   ```js
   alert("Hello from Node!");
   ```
   *Explain the resulting `ReferenceError: alert is not defined`. Node.js is a different runtime and does not provide browser-specific APIs.*

---

## 3. JS is Compiled (4 Minutes)

### Speaking Script
> "Many textbooks will tell you JS is an 'interpreted' scripting language that runs line-by-line. That's a myth. Modern JS is a **compiled** language.
> 
> Before a single line of your code runs, the engine parses it into an Abstract Syntax Tree (AST) and compiles it into an intermediate bytecode, optimizing it on the fly using JIT (Just-In-Time) compilation.
> 
> How do we prove this? If JS were strictly interpreted line-by-line, a syntax error on line 3 would only crash the program *after* lines 1 and 2 had executed. Let's see if that's what happens."

### Screen Share Focus
* Open **[AST Explorer](https://astexplorer.net/)**. Type `var greeting = "Hello";` on the left and show the tree-structure representation of the code generated on the right. Explain that the engine builds this tree before compiling it to bytecode.

### Browser Demo: The Proof of Compilation
1. In the browser console, copy and run this code:
   ```js
   console.log("This is step one...");
   console.log("This is step two...");
   greeting = ."Hi"; // Syntax Error
   ```
2. **Key Question**: *Did 'step one' or 'step two' print before the syntax error?*
3. **Explanation**: *No. The console immediately throws a `SyntaxError`. The program didn't run at all. This proves the engine parsed and compiled the entire code block first.*

---

## 4. Compatibility: Transpiling vs. Polyfilling (4 Minutes)

### Speaking Script
> "Because JS is compiled before execution, we run into a major issue: **JS is backwards-compatible, but NOT forwards-compatible**.
> 
> *Backwards-compatible* means code written in 1995 still runs in modern Chrome today. TC39's golden rule is 'don't break the web'. 
> *Forwards-compatible* would mean if you run ES2020 code in a browser from 2012, it skips the parts it doesn't know and keeps going. But JS doesn't do that; it crashes.
> 
> To bridge this gap so we can write modern JS code but support older browsers, we use two tooling techniques:
> 1. **Transpiling (Babel)**: Converting newer syntax (like `let` or `const` block-scoping) into older equivalent syntax (like `var`).
> 2. **Polyfilling**: Supplying custom code for missing APIs (like `Promise.prototype.finally` or `Array.prototype.includes`)."

### Screen Share Focus
* Open the **[Babel REPL](https://babeljs.io/repl)**. 
* Turn on target environments for older browsers (e.g., IE 11).
* Paste the following code into the left pane:
  ```js
  if (true) {
      let x = 10;
      console.log(x);
  } else {
      let x = 20;
      console.log(x);
  }
  ```
* Show the output on the right: how Babel converts the block-scoped `let x` declarations into renamed `var` declarations (`var _x` and `var _x2`) to prevent collision in older browsers.

---

## 5. Strict Mode (4 Minutes)

### Speaking Script
> "Back in ES5, JS introduced **Strict Mode** using the pragma `"use strict";`. It's a way to opt into cleaner, safer version of JS where the engine throws errors for bad habits instead of letting them slide.
> 
> For example, in non-strict mode, if you assign a value to a variable you forgot to declare, JS will silently create an **accidental global variable** for you. In strict mode, it throws a `ReferenceError` immediately. 
> 
> Let's see this in action."

### Browser Demo: Accidental Globals
1. Paste and run this non-strict code in the console:
   ```js
   function createMistake() {
       accidentalGlobal = "Oops!"; // Forgot 'let', 'const', or 'var'
   }
   createMistake();
   console.log(window.accidentalGlobal); // Prints "Oops!"
   ```
   *Explain that this pollutes the global scope and leads to hard-to-find bugs.*
2. Now, paste and run this strict-mode code:
   ```js
   function strictMistake() {
       "use strict";
       anotherGlobal = "Can't touch this";
   }
   strictMistake();
   ```
   *Point out the `ReferenceError: anotherGlobal is not defined`. Strict mode successfully caught the bug before it could pollute the scope.*

---

## 6. Wrap-Up & Q&A (2 Minutes)

### Speaking Script
> "To wrap up:
> * JavaScript isn't Java. Its official specification name is **ECMAScript**, managed by the **TC39**.
> * The **engine** executes the JS code; the **runtime** environment provides the APIs and wraps the engine.
> * JS is a **compiled** language under the hood, parsing code into an AST before running.
> * Modern JS uses **Babel (transpiling)** and **polyfills** to bridge version gaps.
> * Always use **Strict Mode** (via `"use strict";` or ES Modules) to protect your code from silent bugs.
> 
> Any questions?"
