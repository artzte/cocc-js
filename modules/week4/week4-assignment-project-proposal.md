## Final Project Milestone 1: Project Proposal

Welcome to the kickoff of your **CIS-133JS Final Project**!

In this course, we do not have a traditional timed, multiple-choice final exam. Instead, your Final
Project serves as the comprehensive capstone evaluation for the term. It accounts for **40% of your
total grade**, divided across four equal milestones:

1. **Week 4 (This Week)**: Project Proposal (`projects/final/README.md`) — **Due Monday, October 19,
   2026 (11:59 PM)**
2. **Week 7**: Design Document & Architecture Plan — **Due Monday, November 9, 2026 (11:59 PM)**
3. **Week 9**: Initial Project Structure, Stubs & Vitest Test Scaffold — **Due Monday, November 23,
   2026 (11:59 PM)**
4. **Week 12 (Finals Week)**: Complete, Working, Tested & Deployed Application:
   - **Initial Pull Request**: Due **Monday, December 7, 2026 (11:59 PM)** (with instructor tagged
     as reviewer and live preview app running)
   - **Instructor Comments Returned**: **Wednesday, December 9, 2026**
   - **Final PR Approval Required**: **Friday, December 11, 2026**

Each project milestone deliverable is due on the Monday following the delivery week, with the
exception of Milestone 4, which follows the Finals Week review-and-approval schedule above.

For detailed information on how the Final Project satisfies our course learning outcomes and acts as
our final exam, see the [Week 4 Exam Writeup](week4-exam-writeup.md).

---

## Final Project Requirements Overview

Before drafting your proposal, review the core requirements that your finished application must
satisfy by Week 12:

- **Vanilla JavaScript**: Built using modern vanilla JavaScript and the course starter kit (Vite +
  Vitest). No front-end frameworks (React, Vue, Angular, Svelte, etc.).
- **ES Modules**: At least **four (4) separate ES modules** (`import`/`export`) demonstrating a
  clean separation of concerns (for example: API client, state/data management, DOM rendering, and
  user interaction handlers).
- **ES6 Class**: At least **one (1) ES6 `class`** modeling a key entity or stateful service in your
  application.
- **Public API Integration**: Consumes at least one real, public Application Programming Interface
  (API) via asynchronous `fetch()`, handling loading spinners, error states, and response parsing
  safely.
- **Interactive UI**: An event-driven interface featuring at least **three (3) distinct user
  interactions** (such as live search filtering, category dropdowns, favorites toggling, sorting,
  modal detail popups, or pagination).
- **Accessibility & UX**: An attractive, responsive, and accessible layout (semantic HTML, proper
  ARIA attributes, keyboard navigability, clear contrast).
- **Unit Testing**: Thorough automated tests written with **Vitest** covering all non-DOM business
  logic, data transformations, and class methods.
- **Deployment**: Deployed and publicly accessible on GitHub Pages or Netlify.

---

## Deliverable: Milestone 1 Proposal

For Milestone 1, create a markdown document in your repository at `projects/final/README.md` that
proposes your application. Your proposal must address the following six sections:

### 1. Title and Overview

- What is the name of your project?
- In 2–4 sentences, what does the application do, and what problem does it solve or what value does
  it provide?

### 2. Target Audience

- Who is this application built for? (e.g., hobbyists, students, outdoor enthusiasts, collectors)
- What specific goal does a user want to achieve when opening your page?

### 3. Core Features (3 to 5 Interactive Capabilities)

List 3 to 5 specific user features you plan to build. Examples:

- Live search input filtering API results in real time
- Category pill buttons or dropdowns to filter by topic/genre
- Interactive card view where clicking an item opens detailed modal statistics
- A "Favorites" or "Saved Items" list persisted in `localStorage`
- Sorting controls (e.g., sort by name, date, rating, or score)

### 4. Chosen Public API

- Which public API do you plan to consume? Include a link to the official documentation.
- What specific endpoint URL(s) will you fetch?
- Provide an example JSON snippet showing the key fields you plan to extract and display.
- What authentication (if any) is required?

> **Need an API idea?** See our dedicated resource:  
> 🔗 [**Free Public APIs for Your Final Project**](week4-free-apis-for-project.md) — a curated
> directory of verified, student-friendly APIs with permissive CORS policies, free access,
> documentation links, and live example endpoints!

### 5. Architectural Outline (Draft of Modules & Class)

Outline how you anticipate splitting your code across at least four modules, and what role your ES6
class will play. For example:

- `src/api.js`: Handles asynchronous `fetch` calls and returns formatted data.
- `src/models/Item.js`: An ES6 class that encapsulates item properties and formatting methods.
- `src/ui.js`: DOM rendering functions that convert data into accessible HTML cards and tables.
- `src/app.js`: Application controller that binds event listeners and coordinates state.

### 6. Testing Strategy

- What pure logic functions and model methods do you plan to unit test with Vitest? (e.g., search
  matchers, data mappers, formatting functions, sorters).

---

## Technical Guidance on APIs & CORS

### The Rule: Choose APIs with Open CORS

In browser JavaScript, the browser enforces the **Same-Origin Policy**. If an external API does not
send back the header `Access-Control-Allow-Origin: *`, the browser will refuse to let your
JavaScript code read the response and throw a `CORS error`.

- **Favor APIs with permissive/open CORS**: All APIs listed in our
  [Free Public APIs Guide](week4-free-apis-for-project.md) already permit browser requests out of
  the box.
- **Why not use a proxy?**: While the Vite dev server can proxy requests locally during development
  (`localhost`), Vite's dev server does not exist when your site is built and published to **GitHub
  Pages** (which is static hosting). Choosing a CORS-friendly API ensures your code works
  identically in local development and on your live public site!
- **Quick Browser Check**: Before writing your proposal, open your browser DevTools console and test
  fetching your endpoint:
  ```js
  fetch('https://api.your-choice.com/data')
    .then((res) => res.json())
    .then((data) => console.log('API works!', data))
    .catch((err) => console.error('Blocked by CORS or network error:', err))
  ```

---

## Submission Instructions

1. In your local repository, create a branch for your final project proposal:
   ```bash
   git checkout -b final-project-proposal
   ```
2. Create the directory `projects/final/` if it does not already exist, and create
   `projects/final/README.md`.
3. Fill out the six sections described above in `projects/final/README.md`.
4. Stage, commit, and push your branch:
   ```bash
   git add projects/final/README.md
   git commit -m "feat(final): submit Milestone 1 project proposal"
   git push --set-upstream origin final-project-proposal
   ```
5. Open a Pull Request on GitHub against `main`.
6. Submit your Pull Request URL on Canvas, and assign **artzte** as a reviewer.
7. **Deadline**: Milestone 1 is due by **Monday, October 19 at 11:59 PM** (the Monday following Week
   4).

---

## Milestone 1 Rubric (100 Points)

| Criteria                             | Points | Description                                                                                        |
| :----------------------------------- | :----- | :------------------------------------------------------------------------------------------------- |
| **Concept & Audience**               | 20 pts | Clear definition of project purpose, target audience, and value proposition.                       |
| **Core Feature Set**                 | 25 pts | 3–5 well-defined interactive user features that fit vanilla JS and DOM scope.                      |
| **Public API Selection**             | 25 pts | Appropriate API selected with verified open CORS support, documentation links, and sample JSON.    |
| **Architecture & Testing Plan**      | 20 pts | Logical separation into ≥4 ES modules, role for an ES6 class, and concrete Vitest testing targets. |
| **Submission & Markdown Formatting** | 10 pts | Cleanly formatted `projects/final/README.md` submitted on time via GitHub PR.                      |
