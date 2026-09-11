# Week 2 Lecture Script: Values, Types, and Variables

**Duration**: 25 Minutes  
**Target Audience**: Students in CIS 133JS (assumes basic programming logic in Python/CIS 122)  
**Lecture Objectives**:

- Distinguish between JavaScript's 7 primitive types and object types.
- Master strings (template literals, interpolation, common methods) and numbers (`parseInt`,
  `parseFloat`, `Number`, `Math`, `NaN`).
- Understand value type determination with `typeof` and recognize historical quirks
  (`typeof null === "object"`).
- Contrast variable declarations (`let`, `const`, `var`) by scoping rules and re-assignment vs.
  mutation behavior.
- Connect JavaScript values to the browser DOM using `document.querySelector`, `textContent`,
  `innerHTML`, and attributes.

---

## Lecture Timeline & Outline

- **00:00 - 03:00** | Introduction: Programs, Files, and State as Values
- **03:00 - 07:30** | The Primitives: Strings & Numbers in Depth
- **07:30 - 11:30** | Containers (Objects & Arrays) & The Quirks of `typeof`
- **11:30 - 16:00** | Declaring Variables: `let` vs. `const` vs. `var` (Scope & Mutation)
- **16:00 - 21:30** | Connecting Data to the Browser: DOM Selection & Template Rendering
- **21:30 - 25:00** | Wrap-Up, Weekly Challenge Preview, and Q&A

---

## 1. Introduction: Programs, Files, and Values (3 Minutes)

### Speaking Script

> "Welcome back, everyone! Last week we covered the high-level landscape: what JavaScript is, how
> engines compile it, the difference between an engine and a runtime, and how to get your
> development environment up and running with Git and our starter kit.
>
> Today, we're diving into the actual substance of JavaScript code: **Values, Types, and
> Variables**.
>
> In Chapter 2 of _You Don't Know JS Yet: Get Started_, author Kyle Simpson starts with a key
> observation: in JavaScript, **each file is an independent program**. When you load multiple `.js`
> files in a browser or bundle them with Vite, they collaborate either through shared global scope
> or through module imports and exports.
>
> But what is the most fundamental unit of information inside any of these programs? It's a
> **value**. Values are data. Values are how your program represents and maintains state.
>
> Coming from Python in CIS 122, you're already familiar with numbers, strings, booleans, lists, and
> dictionaries. In JavaScript, all values are divided into two fundamental families:
>
> 1. **Primitives**
> 2. **Objects**
>
> Today we're going to master both, inspect their quirks, see how we store them in variables, and
> bring them to life on a real web page."

### Screen Share Focus

- Display a two-column diagram on slides or an editor scratchpad:
  - **Left Column (Primitives)**: `string`, `number`, `boolean`, `null`, `undefined`, `bigint`,
    `symbol`.
  - **Right Column (Objects)**: `Object` (`{}`), `Array` (`[]`), `Function` (`function() {}`),
    `Date`, `RegExp`.
- Highlight that primitives are immutable and passed by value, whereas objects are mutable
  collections passed by reference.

---

## 2. The Primitives: Strings & Numbers in Depth (4.5 Minutes)

### Speaking Script

> "JavaScript has seven primitive types: `string`, `number`, `boolean`, `null`, `undefined`,
> `bigint`, and `symbol`. Let's focus on the two you will use constantly: strings and numbers.
>
> First, **Strings**. You can delimit strings with double quotes (`"hello"`) or single quotes
> (`'hello'`). Stylistically, JS doesn't care—just pick one and be consistent.
>
> But modern JavaScript gives us a third delimiter: **backticks** (`` ` ``). These define **template
> literals**. Template literals give you two superpowers:
>
> 1. They can span multiple lines without concatenation or `\n`.
> 2. They support **expression interpolation** using the `${expression}` syntax.
>
> If you remember Python's `f"-strings"` (`f'Hello {name}'`), template literals are JavaScript's
> equivalent: `` `Hello ${name}` ``.
>
> Kyle Simpson makes an excellent stylistic point in the textbook: don't use backticks for _every_
> string. Reserve backticks for strings that actually interpolate expressions or need multiple
> lines. Use regular quotes for plain literals so your intent is crystal clear.
>
> Strings also come with built-in methods. Need a portion of a string? `.slice(start, end)`. Want to
> check if a word is in a phrase? `.includes('word')`. Need to strip leading and trailing
> whitespace? `.trim()`. Want to break a sentence into an array of words? `.split(' ')`. Because
> strings are primitive values, they are **immutable**—these methods never modify the original
> string; they return a brand new string.
>
> Next, **Numbers**. Coming from Python, you're used to having `int` for integers and `float` for
> decimals. In JavaScript, there is only one standard numeric type: **`number`**, which is an
> IEEE-754 64-bit double-precision floating-point number. (For arbitrarily massive integers beyond
> $2^{53} - 1$, ES2020 added `bigint`, which you write with an `n` suffix, like `42n`).
>
> When you get numbers from user input or HTML forms, they arrive as strings. To convert them, you
> have:
>
> - `parseInt(str, 10)`: Parses an integer. Always supply `10` as the radix (base 10) to avoid
>   surprises!
> - `parseFloat(str)`: Parses floating-point numbers.
> - `Number(str)`: Converts the entire string to a number.
>
> You also have the global `Math` object for operations: `Math.round()`, `Math.floor()`,
> `Math.ceil()`, and `Math.random()`.
>
> But what happens if you try to parse `'apple'` into a number? You get **`NaN`**, which stands for
> 'Not a Number'. Here is your first classic JavaScript quirk: What is `typeof NaN`? Believe it or
> not, it returns `'number'`! It's a special numeric token meaning 'invalid number'. Even weirder:
> `NaN === NaN` evaluates to `false`! `NaN` is not equal to anything, including itself. To check if
> a value is `NaN`, never use `=== NaN`; always use `Number.isNaN(value)`."

### Browser Demo: Strings, Numbers, and NaN

1. Open the Chrome DevTools Console (`F12` or `Cmd+Option+J`) and type:
   ```js
   const rawInput = '   $49.99 sale price   '
   const cleanText = rawInput.trim()
   console.log(cleanText.includes('sale')) // true
   console.log(cleanText.slice(1, 6)) // "49.99"

   const price = parseFloat(cleanText.slice(1))
   console.log(price) // 49.99
   console.log(`Final total with 10% tax: $${(price * 1.1).toFixed(2)}`)
   ```
2. Demonstrate the `NaN` quirk:
   ```js
   const badConversion = Number('invalid123')
   console.log(badConversion) // NaN
   console.log(typeof badConversion) // "number"
   console.log(badConversion === NaN) // false!
   console.log(Number.isNaN(badConversion)) // true!
   ```

---

## 3. Containers & The Quirks of `typeof` (4 Minutes)

### Speaking Script

> "If primitives are individual values, how do we group them together? With **Containers**:
> **Objects** and **Arrays**.
>
> An **Object** is an unordered collection of keyed values, delimited by curly braces `{}`:
>
> ```js
> const student = {
>   name: 'Jordan',
>   grade: 92,
>   enrolled: true,
> }
> ```
>
> You access values using dot notation (`student.name`) or bracket notation (`student["name"]`).
> This is just like a Python dictionary.
>
> An **Array** is an ordered list of values, indexed numerically starting at `0`, delimited by
> square brackets `[]`:
>
> ```js
> const courses = ['CIS 122', 'CIS 133JS', 'CIS 195']
> console.log(courses[0]) // "CIS 122"
> console.log(courses.length) // 3
> ```
>
> In JavaScript, arrays can hold any mix of types, including objects and other arrays.
>
> Now, how do we inspect the type of a value at runtime? We use the **`typeof` operator**. Let's
> look at what `typeof` returns:
>
> - `typeof "hello"` returns `"string"`
> - `typeof 42` returns `"number"`
> - `typeof true` returns `"boolean"`
> - `typeof undefined` returns `"undefined"`
> - `typeof function() {}` returns `"function"`
>
> But watch out for two huge gotchas:
>
> Gotcha #1: `typeof [1, 2, 3]` returns `"object"`! In JavaScript, arrays are not a separate
> primitive type; they are a specialized sub-type of object. If you need to check if something is an
> array, use `Array.isArray(myVar)`.
>
> Gotcha #2: `typeof null` returns `"object"`! This is the most famous bug in JavaScript history.
> Back in 1995, when Brendan Eich wrote the first version of JavaScript in 10 days, values were
> stored with a type tag. The tag for objects was `000`. Because a `null` pointer was `0x00` in C,
> the engine saw the leading zeros and thought `null` was an object! Why hasn't TC39 fixed it?
> Because millions of existing websites check `if (typeof x === "object")`. If TC39 changed
> `typeof null` to `"null"`, thousands of production websites would instantly break. Remember TC39's
> golden rule: _don't break the web_.
>
> That brings us to `null` vs. `undefined`. Python has one empty value: `None`. JavaScript has two.
>
> - `undefined` means a variable has been declared but hasn't been assigned a value yet, or a
>   missing property was accessed.
> - `null` means an intentional, explicit absence of an object value.
>
> As Kyle Simpson suggests in the textbook: the cleanest habit is to use `undefined` as your default
> representation of emptiness throughout your code."

### Browser Demo: Inspecting Types with `typeof`

1. Paste and run in the Chrome DevTools console:
   ```js
   console.log(typeof 'Bend, Oregon') // "string"
   console.log(typeof 133) // "number"
   console.log(typeof true) // "boolean"
   console.log(typeof undefined) // "undefined"
   console.log(typeof { id: 1 }) // "object"
   console.log(typeof [1, 2, 3]) // "object" (Arrays are objects!)
   console.log(Array.isArray([1, 2, 3])) // true
   console.log(typeof null) // "object" (Historical bug!)
   ```

---

## 4. Declaring Variables: `let`, `const`, and `var` (4.5 Minutes)

### Speaking Script

> "Now that we know our values, let's talk about holding them in variables. JavaScript gives us
> three keywords to declare variables: `var`, `let`, and `const`.
>
> Understanding the difference between them is a rite of passage for every JavaScript developer.
>
> **1. `var`**: `var` is the original keyword from 1995. It has **function scope** (or global scope
> if outside a function). That means `var` completely ignores `{ ... }` blocks like `if` statements,
> `for` loops, or `while` loops. If you declare a `var` inside an `if` statement, it bleeds right
> out into the surrounding code!
>
> **2. `let`**: Added in ES6 (2015), `let` has **block scope**. A block is anything between curly
> braces `{ ... }`. If you declare `let count = 0` inside an `if` block or a loop, that variable is
> strictly trapped inside that block. Outside the block, it doesn't exist. This prevents variables
> from colliding and polluting outer scopes.
>
> **3. `const`**: Also added in ES6, `const` has the same block scope as `let`, with one crucial
> extra rule: you must initialize it with a value, and you **cannot re-assign** it.
>
> But listen carefully to this next point, because this is where many junior developers stumble:
> **`const` prevents re-assignment; it does NOT mean values are immutable.**
>
> If you assign a primitive value to a `const`:
>
> ```js
> const maxLoginAttempts = 3
> maxLoginAttempts = 4 // TypeError: Assignment to constant variable!
> ```
>
> That's clear. Primitives are immutable and you can't re-assign the variable.
>
> But what happens if you put an array or object in a `const`?
>
> ```js
> const user = { name: 'Alex' }
> user.name = 'Morgan' // This is 100% valid!
> user.role = 'Admin' // Also valid!
> user = { name: 'Taylor' } // TypeError: Assignment to constant variable!
> ```
>
> The binding is constant—the variable `user` must always point to that exact object in memory. But
> the _contents_ of the object can be mutated at will!
>
> This is why Kyle Simpson recommends in Chapter 2: use `const` primarily with primitive values
> where you want to give a permanent name to a constant value. When working with objects or arrays
> that you plan to modify, using `let` makes your intention to change data clearer and avoids false
> assumptions."

### Browser Demo: Scoping and Const Mutation

1. Run the Scoping comparison:
   ```js
   if (true) {
     var leakedVar = 'I escaped the if statement!'
     let trappedLet = 'I am safe inside the block!'
   }
   console.log(leakedVar) // "I escaped the if statement!"
   // console.log(trappedLet); // Throws ReferenceError: trappedLet is not defined
   ```
2. Run the `const` mutation test:
   ```js
   const roster = ['Alice', 'Bob']
   roster.push('Charlie') // Allowed: mutating the array contents
   console.log(roster) // ["Alice", "Bob", "Charlie"]

   try {
     roster = ['Dave'] // Not allowed: re-assigning the variable identifier
   } catch (err) {
     console.error('Caught expected error:', err.message)
   }
   ```

---

## 5. Connecting Data to the Browser: DOM Selection & Rendering (5.5 Minutes)

### Speaking Script

> "So far, everything we've looked at has run in the console. But Course Outcome 1 says: _'Implement
> scripts that rely on knowledge of Document Object Model (DOM) architecture and includes methods
> for manipulating DOM objects.'_
>
> In client-side web development, the Document Object Model (DOM) is the tree of objects that
> represents the HTML document.
>
> In Python, your primary output was `print()`. In browser JavaScript, your output is the web page
> itself. To display our data, we follow a simple two-step pattern:
>
> 1. **Select** the HTML element we want to touch using `document.querySelector()`.
> 2. **Update** its content or attributes using our variables and objects.
>
> `document.querySelector(selector)` accepts any CSS selector:
>
> - `#student-name` selects an element by ID.
> - `.score-display` selects an element by class.
> - `article > h2` selects by element hierarchy.
>
> Once you have the element reference in a variable, you can modify it:
>
> - `.textContent`: Sets plain text. The browser treats the string strictly as text, not markup.
>   This is fast and prevents cross-site scripting (XSS) attacks.
> - `.innerHTML`: Parses HTML tags inside the string. Use this when you want to render bold tags,
>   lists, or markup templates.
> - Attributes and classes: `element.setAttribute('src', url)` or `element.classList.add('active')`.
>
> Let's look at how this directly prepares you for this week's programming challenge: **Print Out
> Object Properties**."

### Live Screen Demo: Populating an HTML Template from an Object

1. Show an HTML structure (in VS Code or DevTools Elements tab):
   ```html
   <div id="player-profile" class="card">
     <h2 class="player-name"></h2>
     <p class="player-score"></p>
     <div class="player-status"></div>
   </div>
   ```
2. Write the JavaScript script to select and populate it:
   ```js
   // 1. Define our structured data object
   const playerData = {
     name: 'Riley Vance',
     score: 1250,
     status: 'Active Contender',
     isChampion: true,
   }

   // 2. Select the DOM target elements using CSS selectors
   const nameHeading = document.querySelector('#player-profile .player-name')
   const scoreParagraph = document.querySelector('#player-profile .player-score')
   const statusBadge = document.querySelector('#player-profile .player-status')

   // 3. Render the data into the elements using template literals and properties
   nameHeading.textContent = playerData.name
   scoreParagraph.textContent = `Current Score: ${playerData.score.toLocaleString()} pts`

   // Using template literals to dynamically build class names and HTML
   statusBadge.textContent = playerData.status
   statusBadge.classList.add('badge')
   if (playerData.isChampion) {
     statusBadge.classList.add('badge-gold')
   }

   console.log('Profile rendered successfully!')
   ```
3. Show the live browser preview updating automatically:
   - Notice: there were **no hardcoded strings** in the HTML markup.
   - The HTML served as a blank presentation template; the JavaScript data object drove all the
     content.

---

## 6. Wrap-Up, Weekly Challenge Preview, & Q&A (3.5 Minutes)

### Speaking Script

> "Let's review the big ideas from today:
>
> 1. **Values**: JavaScript has 7 primitive types (`string`, `number`, `boolean`, `null`,
>    `undefined`, `bigint`, `symbol`) plus objects. Primitives are immutable and passed by value.
> 2. **Strings & Numbers**: Use backticks for template literals when you need `${...}`
>    interpolation. Watch out for `NaN`—it is typed as a `'number'`, but never equals itself; check
>    it with `Number.isNaN()`.
> 3. **The `typeof` operator**: Super handy, but remember its two famous historical quirks:
>    `typeof null` is `'object'`, and `typeof []` is `'object'`. Use `Array.isArray()` to check
>    arrays.
> 4. **Variables**: Avoid `var`. Use `let` for values that re-assign or for block-scoped mutability.
>    Use `const` for constants. Remember: `const` locks down the variable binding, not the contents
>    of objects or arrays!
> 5. **The DOM**: Use `document.querySelector` to grab HTML elements, then set `.textContent` or
>    `.innerHTML` using your object properties and template literals.
>
> ### This Week's Challenge: Print Out Object Properties
>
> In your assignment this week, you'll be given a structured JavaScript data object. You'll write a
> script that extracts its properties and renders them into an HTML template using the exact DOM
> techniques we just practiced.
>
> Remember to create a `week2` branch, run your dev server with `npm start`, test your logic with
> `npm test`, and submit your pull request on GitHub.
>
> What questions do you have?"
