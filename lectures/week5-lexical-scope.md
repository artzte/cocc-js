# Week 5 Lecture Guide: Lexical Scope

**Reading**: _You Don't Know JS Yet: Scope & Closures_ (2nd Edition) — Chapter 1: _What's the
Scope?_ & Chapter 2: _Illustrating Lexical Scope_; bridge reading: _Get Started_ Chapter 4: _The
Bigger Picture_  
**Format**: Interactive Lecture & Chrome DevTools Snippet Walkthrough
([`examples/week5-lexical-scope.js`](../examples/week5-lexical-scope.js)), plus a tour of
[`examples/week5-global-mess/`](../examples/week5-global-mess/)  
**Duration**: ~20 Minutes  
**Prereq Context**: Weeks 2–4 (`let`/`const`/`var`, function forms, ES modules)

---

## Pacing & Timeline

| Time              | Section                              | Focus / Snippet Function                                               |
| :---------------- | :----------------------------------- | :--------------------------------------------------------------------- |
| **00:00 - 02:30** | **1. The Bigger Picture**            | _Get Started_ Ch4: three pillars; why scope comes first                |
| **02:30 - 06:00** | **2. Compile First, Then Execute**   | Syntax errors, early errors, TDZ as evidence (`twoPhasesDemo`)         |
| **06:00 - 09:00** | **3. Targets and Sources**           | Which references receive vs. supply (`targetsAndSourcesDemo`)          |
| **09:00 - 13:00** | **4. Marbles, Buckets, and Bubbles** | Nested scopes, outward-only lookup (`scopeBucketsDemo`)                |
| **13:00 - 15:30** | **5. Lookup Failures**               | ReferenceError, accidental globals, strict mode (`lookupFailuresDemo`) |
| **15:30 - 19:00** | **6. Scope in the Browser**          | Nested handlers (`nestedHandlersDemo`); the Global Mess tour           |
| **19:00 - 20:00** | **7. Wrap-Up & Deliverables**        | Quiz 5, Scope Refactor challenge                                       |

---

## 1. The Bigger Picture (2.5 mins)

### Talking Points & Concept Cues

- **Where we are**: Weeks 1–4 surveyed the language (_Get Started_ Ch1–3). Now we start going deep,
  with _Scope & Closures_ as the main text through week 9.
- **Kyle Simpson's three pillars of JS** (_Get Started_ Ch4):
  1. **Scope and closure**: how variables are organized and found. Weeks 5–7, and modules in week 9.
  2. **Prototypes**: how objects link to each other. Week 8, at the awareness level, under classes.
  3. **Types and coercion**: we touched this in weeks 2–3 (`typeof`, `==` vs. `===`).
- **Why scope first**: every bug in the Global Mess example is a scope bug. Closures (week 7) and
  modules (week 9) are built entirely out of scope.
- **"With the grain"**: Simpson argues for learning how JS actually works rather than fighting it.
  Scope is the place where that matters most.

---

## 2. Compile First, Then Execute (3.5 mins)

### Talking Points & Concept Cues

- **Common belief**: "JS is interpreted, one line at a time." **Reality**: the engine processes the
  whole program in two phases: parsing/compilation, then execution.
- **Python bridge (CIS 122)**: Python also compiles to bytecode before running. A Python file with a
  syntax error on line 50 doesn't run lines 1–49 either.
- **Three pieces of evidence** (_S&C_ Ch1):
  1. **Syntax errors**: a bad token at the end of a file means nothing at the top runs. (Show the
     bonus two-line snippet from `week5-lexical-scope.md`.)
  2. **Early errors**: strict mode rejects things like duplicate parameter names before anything
     runs.
  3. **Hoisting / TDZ**: reading a `let` variable before its declaration line throws
     `ReferenceError` instead of finding an outer variable of the same name. The engine already knew
     which scope `greeting` belonged to.
- **Why it matters**: scopes are decided when the code is _compiled_, based on where you wrote
  things. That's what "lexical" means: determined at lex/parse time, by code position.

### Code Demo: `twoPhasesDemo()`

```javascript
function twoPhasesDemo() {
  try {
    console.log(greeting)
  } catch (err) {
    console.log('Caught before declaration:', err.name, '-', err.message)
  }

  let greeting = 'Hello, scope!'
  console.log('After declaration:', greeting)
}
```

---

## 3. Targets and Sources (3 mins)

### Talking Points & Concept Cues

- Every time a variable shows up in code, it plays one of two roles:
  - **Target**: the variable is _receiving_ a value. `x = 2`, a parameter receiving an argument, a
    `for...of` loop variable, a function declaration.
  - **Source**: the variable is _supplying_ a value. Reading it, logging it, calling it, returning
    it.
- **Why care**: the engine handles them differently when a lookup fails (section 5). An unknown
  source always throws. An unknown target in sloppy mode quietly creates a global.
- Walk through the labeled comments in `targetsAndSourcesDemo()` (this is the book's
  `getStudentName` example).
- **Quick check**: in `var nextStudent = getStudentName(73)`, which identifier is the target and
  which is the source? (`nextStudent` is the target; `getStudentName` is the source.)

---

## 4. Marbles, Buckets, and Bubbles (4 mins)

### Talking Points & Concept Cues

- **Simpson's metaphor** (_S&C_ Ch2): variables are marbles; scopes are colored buckets. Each
  marble's color is set by the bucket it was _declared_ in, at compile time.
- **What makes a bucket**: the global scope, each function, and (for `let`/`const`) each `{ }`
  block.
- **Scope bubbles nest**: a function written inside another function sits in a bubble inside the
  outer bubble. The nesting comes from where you typed it, not from where or when it's called.
- **Lookup goes outward only**: the engine checks the current scope, then the next one out, and so
  on up to global. It never looks _inward_.
- **The building metaphor**: the current scope is the first floor; each outer scope is one floor up;
  global is the roof. You can take the elevator up, never down.
- **Lookup is (mostly) conceptual**: because scopes are fixed at compile time, the engine usually
  knows each marble's color in advance. The "walking outward" picture is how _we_ reason about it.

### Code Demo: `scopeBucketsDemo()`

```javascript
// RED bucket (global scope): `scopeBucketsDemo`
function scopeBucketsDemo() {
  // BLUE bucket: `course`, `teach`
  const course = 'CIS 133JS'

  function teach(topic) {
    // GREEN bucket: `topic`, `week`
    const week = 5
    console.log(`${course}, week ${week}: ${topic}`) // `course` found in BLUE
  }

  teach('lexical scope')
  console.log('typeof week from BLUE:', typeof week) // "undefined": can't look inward
}
```

- **The conversation** (_S&C_ Ch2): if time permits, narrate `teach('lexical scope')` as Engine
  asking Scope Manager: "I have a source reference for `course`. Ever heard of it?" GREEN says no,
  BLUE says yes.

---

## 5. Lookup Failures (2.5 mins)

### Talking Points & Concept Cues

- **Unknown source**: always `ReferenceError: x is not defined`.
- **Unknown target, sloppy mode**: the global scope _creates_ the variable for you. This is the
  accidental global, and it's the root of a whole category of bugs.
- **Unknown target, strict mode**: `ReferenceError`. Much better: the bug shows up immediately.
- **ES modules are always strict**. Our Vite projects use `<script type="module">`, so we get this
  protection for free. DevTools snippets and classic `<script>` tags do not.
- **Undefined mess**: "not defined" (no such variable) is different from `undefined` (variable
  exists, has no value). `typeof` reports `"undefined"` for both, which doesn't help.
- **Cheating lexical scope**: `eval()` and `with` can change scopes at runtime. Both are banned in
  strict mode, and you should never use them. Mention and move on.

---

## 6. Scope in the Browser (3.5 mins)

### Talking Points & Concept Cues

- Run `nestedHandlersDemo()` and click the buttons:
  - Scope A (`nestedHandlersDemo`) holds `panel` and `clickCount`.
  - Scope B (`addButton`) holds `label` and `button`, and there's a **new scope B every time
    `addButton` runs**.
  - Scope C (`onClick`) holds `event` and `message`.
- Each handler reaches outward to its own scope B for `label`, then out to the one shared scope A
  for `clickCount`.
- **Preview**: the handlers keep using scope B after `addButton` has returned. That's closure, and
  it's week 7.
- **Global Mess tour**: open `examples/week5-global-mess/index.html` in Chrome (double-click the
  file; no server needed). Click **Split**. The word counter's result changes instead.
  - Two `function calculate()` declarations in the same (global) scope: the second one wins.
  - Both widgets share `input`, `result`, and `count`.
  - `words`, `longest`, and `i` were never declared, so they became accidental globals. Type
    `window.words` in the console.
- Don't fix it on screen. That's the challenge.

---

## 7. Wrap-Up & Deliverables (1 min)

### Talking Points & Concept Cues

- **Key Takeaways**:
  1. JS compiles before it runs, and scopes are decided at compile time from code position.
  2. Every reference is a target or a source.
  3. Scopes nest; lookup goes outward only, stopping at the first match.
  4. Undeclared targets become accidental globals in sloppy mode. Modules are strict, so use them.
- **Week 5 Deliverables**:
  - **Quiz 5**: lexical scope, nesting, lookup.
  - **Challenge: Scope Refactor**: rebuild the Global Mess as scoped, tested ES module code, with a
    written scope report.
