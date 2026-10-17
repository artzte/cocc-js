# CIS 133JS — Course Development

## What This Is

Course materials for CIS 133JS (Introduction to JavaScript) at Central Oregon Community College. The
working directory contains a 12-week course outline and the YDKJSY book source used as the primary
text.

See `course-outline.md` for the full outline.

## Course Catalog Description

This outline must fulfill the following information
[published in the COCC catalog](https://catalog.cocc.edu/course-outlines/cis-133js/)

### Course Description

Learn programming fundamentals and object-oriented concepts using vanilla JavaScript syntax. Add
interactivity and custom behaviors to web applications by employing front-end JavaScript techniques
combined with HTML and CSS.

### Course textbook

- **Title:** You Don't Know JS Yet (book series), 2nd Edition
- **Author:** Kyle Simpson
- **Location:** https://github.com/getify/You-Dont-Know-JS (branch `2nd-ed`)

Volumes used in this course:

- _Get Started_: Ch1–4 (Ch4 as bridge reading into the scope unit)
- _Scope & Closures_: Ch1–3, 5–8; appendices are optional

#### Linking to the book

These rules apply to **all Markdown in this repo** (lectures, modules, quizzes, weekly readings,
examples, docs):

- Every reference to a _You Don't Know JS Yet_ book or chapter MUST be a working Markdown link to
  the chapter's GitHub blob URL, taken from the list below.
- Always use the full reference as the link text: book title, edition, chapter number, and chapter
  title. No short forms like "S&C Ch2" or "Get Started Ch2 & Ch3", even in tables. For example:

  [Get Started (2nd Edition), Chapter 1: What Is JavaScript?](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch1.md)

- Never link to the local `book/` folder. It is a git-ignored copy kept for convenience; read
  chapters from it, but links into it will not work.
- Whenever you edit a file, also convert any existing unlinked or short-form book references in that
  file to full links.

Following is a full list of books and chapters.

#### Get Started (2nd Edition)

- [Chapter 1: What Is JavaScript?](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch1.md)
- [Chapter 2: Surveying JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch2.md)
- [Chapter 3: Digging to the Roots of JS](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch3.md)
- [Chapter 4: The Bigger Picture](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/ch4.md)
- [Appendix A: Exploring Further](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/apA.md)
- [Appendix B: Practice, Practice, Practice!](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/get-started/apB.md)

#### Scope & Closures (2nd Edition)

- [Chapter 1: What's the Scope?](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch1.md)
- [Chapter 2: Illustrating Lexical Scope](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch2.md)
- [Chapter 3: The Scope Chain](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch3.md)
- [Chapter 4: Around the Global Scope](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch4.md)
- [Chapter 5: The (Not So) Secret Lifecycle of Variables](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch5.md)
- [Chapter 6: Limiting Scope Exposure](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch6.md)
- [Chapter 7: Using Closures](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md)
- [Chapter 8: The Module Pattern](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch8.md)
- [Appendix A: Exploring Further](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/apA.md)
- [Appendix B: Practice](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/apB.md)

#### Objects & Classes (2nd Edition Draft)

- [Chapter 1: Object Foundations](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/objects-classes/ch1.md)
- [Chapter 2: How Objects Work](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/objects-classes/ch2.md)
- [Chapter 3: Classy Objects](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/objects-classes/ch3.md)
- [Chapter 4: This Works](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/objects-classes/ch4.md)
- [Chapter 5: Delegation](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/objects-classes/ch5.md)

#### Types & Grammar (2nd Edition Draft)

- [Chapter 1: Primitive Values](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/types-grammar/ch1.md)
- [Chapter 2: Primitive Behaviors](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/types-grammar/ch2.md)
- [Chapter 3: Object Values](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/types-grammar/ch3.md)
- [Chapter 4: Coercing Values](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/types-grammar/ch4.md)

### Outcomes

1. Implement scripts that rely on knowledge of Document Object Model (DOM) architecture and includes
   methods for manipulating DOM objects.
2. Construct functions that effectively utilize variables, conditionals, loops, and arrays.
3. Generate scripts that process user input and provide meaningful output.
4. Plan and create scripts utilizing events and event handlers that respond to user inputs.

### Content outline

- The Document Object Model (DOM)
- Events and event handling
- Variables and scope
- Conditionals
- Functions
- Strings and numbers
- Arrays
- Loops
- Objects

## Key Decisions

### Pedagogical Approach

- **JS fundamentals first, browser as the exercise vehicle.** The COCC catalog description is
  browser-centric, but the course teaches the language deeply using _You Don't Know JS Yet_ as the
  primary text. Students learn DOM/HTML5 APIs self-directed via MDN; lectures focus on JS itself.
- **Modern class-based OOP only.** ES6 `class` syntax is the target. Prototype chains are
  acknowledged briefly as what classes compile to, but not taught in depth. No old-style constructor
  functions.
- **Cherry-pick _Scope & Closures_.** Course outcomes override book chapter sequence. Appendix
  material (implied scopes, TDZ edge cases, named function nuances) is optional self-study.

### Student Background

- Prereq is CIS 122, which teaches Python basics — bare minimum program logic. Students may not have
  seen JS or web programming before.
- No deep CS background assumed. Closures and scope chain (weeks 5–7) should be paced carefully;
  they're the hardest conceptual stretch in the course.

### Starter Kit

- **Vite** (dev server + build, native ESM, near-zero config) + **Vitest** (unit testing,
  Jest-compatible API, same Vite config)
- No UI frameworks — vanilla JS throughout
- `jsdom` environment in Vitest so DOM-touching code can be tested
- Students get `npm run dev`, `npm run build`, `npm run test` from day one (week 1 lab)

### Async Coverage

- Async (Promises, `fetch`, `async`/`await`) is week 11 — not in either YDKJSY book but essential
  for browser programming. MDN-directed reading.
- Emphasis on healthy patterns: always `try/catch` with `await`, check `res.ok` before `.json()`,
  always handle loading and error states in the DOM.

### Final Project

- Four milestones: proposal (wk 4), design doc (wk 7), initial structure (wk 9), final submission
  (wk 12)
- Requirements: vanilla JS, ≥4 ES modules, ≥1 `fetch` call to a real public API, ≥3 user
  interactions, ≥1 ES6 class, Vitest tests for all non-DOM logic, deployed to GitHub Pages or
  Netlify
