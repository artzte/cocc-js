# CIS 133JS — Course Development

## What This Is

Course materials for CIS 133JS (Introduction to JavaScript) at Central Oregon Community College. The working directory contains a 12-week course outline and the YDKJSY book source used as the primary text.

See `course-outline.md` for the full outline.

## Course Catalog Description

This outline must fulfill the following information [published in the COCC catalog](https://catalog.cocc.edu/course-outlines/cis-133js/)

### Course Description
Learn programming fundamentals and object-oriented concepts using vanilla JavaScript syntax. Add interactivity and custom behaviors to web applications by employing front-end JavaScript techniques combined with HTML and CSS.

### Outcomes
1. Implement scripts that rely on knowledge of Document Object Model (DOM) architecture and includes methods for manipulating DOM objects.
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
- **JS fundamentals first, browser as the exercise vehicle.** The COCC catalog description is browser-centric, but the course teaches the language deeply using *You Don't Know JS Yet* as the primary text. Students learn DOM/HTML5 APIs self-directed via MDN; lectures focus on JS itself.
- **Modern class-based OOP only.** ES6 `class` syntax is the target. Prototype chains are acknowledged briefly as what classes compile to, but not taught in depth. No old-style constructor functions.
- **Cherry-pick *Scope & Closures*.** Course outcomes override book chapter sequence. Appendix material (implied scopes, TDZ edge cases, named function nuances) is optional self-study.

### Student Background
- Prereq is CIS 122, which teaches Python basics — bare minimum program logic. Students may not have seen JS or web programming before.
- No deep CS background assumed. Closures and scope chain (weeks 5–7) should be paced carefully; they're the hardest conceptual stretch in the course.

### Starter Kit
- **Vite** (dev server + build, native ESM, near-zero config) + **Vitest** (unit testing, Jest-compatible API, same Vite config)
- No UI frameworks — vanilla JS throughout
- `jsdom` environment in Vitest so DOM-touching code can be tested
- Students get `npm run dev`, `npm run build`, `npm run test` from day one (week 1 lab)

### Async Coverage
- Async (Promises, `fetch`, `async`/`await`) is week 11 — not in either YDKJSY book but essential for browser programming. MDN-directed reading.
- Emphasis on healthy patterns: always `try/catch` with `await`, check `res.ok` before `.json()`, always handle loading and error states in the DOM.

### Final Project
- Four milestones: proposal (wk 4), design doc (wk 7), initial structure (wk 9), final submission (wk 12)
- Requirements: vanilla JS, ≥4 ES modules, ≥1 `fetch` call to a real public API, ≥3 user interactions, ≥1 ES6 class, Vitest tests for all non-DOM logic, deployed to GitHub Pages or Netlify

## Book Source

The YDKJSY books are in `book/`. Relevant volumes:
- `book/get-started/` — Ch1–4 used (ch4 as bridge reading into scope unit)
- `book/scope-closures/` — Ch1–3, 5–8 used; appendices are optional

## What Still Needs To Be Built

- Course starter kit repo (Vite + Vitest scaffold)
- Week-by-week lecture notes / slide decks
- Weekly quiz question banks
- Weekly programming challenge specs (problem statement, starter HTML, grading rubric)
- Final project rubric
