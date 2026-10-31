## Final Project Milestone 2: Design Document & Architecture Plan

In **Milestone 1** (Week 4), you proposed your Final Project concept, target user, core features,
and public API in `projects/final/README.md`.

In **Milestone 2**, you will expand `projects/final/README.md` with a **Design Document &
Architecture Plan** that maps out _how_ your application will look, what state it will manage, how
its code will be organized into ES modules, and the exact API endpoints it will call. Planning these
details now makes **Milestone 3** (Week 9: stubbing your modules and Vitest test scaffold)
straightforward.

---

## Final Project Timeline Recap

1. **Week 4 (Completed)**: Project Proposal (`projects/final/README.md`)
2. **Week 7 (This Week)**: Design Document & Architecture Plan — **Due Monday, November 9, 2026
   (11:59 PM)**
3. **Week 9**: Initial Project Structure, Stubs & Vitest Test Scaffold — **Due Monday, November 23,
   2026 (11:59 PM)**
4. **Week 12 (Finals Week)**: Complete, Working, Tested & Deployed Application:
   - **Initial Pull Request**: Due **Monday, December 7, 2026 (11:59 PM)**
   - **Instructor Comments Returned**: **Wednesday, December 9, 2026**
   - **Final PR Approval Required**: **Friday, December 11, 2026**

---

## Deliverable: Milestone 2 Design Document Sections

Update `projects/final/README.md` by adding the following four new sections below your Milestone 1
proposal (and incorporating any feedback you received on Milestone 1):

### 1. UI Wireframes & Visual Design

Provide one or more wireframes or layout sketches showing the primary states of your interface (for
example: initial/search view, results view, and detail/empty/error states).

- You may include:
  - **ASCII/Markdown box wireframes** directly in `README.md` (similar to the wireframe in the Week
    7 Theme Switcher assignment), **or**
  - **Embedded images** (`![Main View](./wireframe-main.png)`) saved in your `projects/final/`
    folder (drawn with Excalidraw, Figma, pen-and-paper photo, etc.).
- **Color Palette / Theme Choice**: Note which color palette you plan to use (you are welcome to
  adopt one of the community palettes from the Week 7 Theme Switcher—such as Catppuccin, Nord, Rosé
  Pine, Dracula, or Solarized—or even include a theme toggle in your app!).

### 2. Data Model & State Management

Describe the data structures your application will hold in memory while running:

- **Application State**: What state variables does your app track? (e.g., `searchResults`,
  `selectedCategory`, `favorites`, `isLoading`, `errorMessage`, `activeTheme`).
- **ES6 Class Design**: Remember that your final project requires **at least one ES6 `class`** (we
  cover `class` syntax in Week 8) or a combination of classes and closure factories. Identify the
  class you plan to build, its properties, and 2–3 methods it will have.
- **State Privacy (POLE)**: Explain which state will be kept private inside a module/closure vs.
  passed into rendering functions.

### 3. Planned ES Module Breakdown (Minimum 4 Modules)

Your Final Project must be organized into **at least four (4) ES modules** under `src/`. List each
planned module file, its single responsibility, and the functions/classes it will `export`. For
example:

| Module File    | Responsibility                                         | Planned Exports                                     |
| :------------- | :----------------------------------------------------- | :-------------------------------------------------- |
| `src/api.js`   | Fetches data from the public API and parses JSON       | `fetchItems(query)`, `buildEndpointUrl(params)`     |
| `src/model.js` | Defines the core ES6 class and pure data helpers       | `class ItemCard`, `filterItems(items, filterState)` |
| `src/state.js` | Encapsulates app state using closure or state manager  | `createAppState(initialData)`                       |
| `src/ui.js`    | Pure HTML template builders and DOM rendering helpers  | `renderResults(items)`, `renderError(msg)`          |
| `src/app.js`   | Coordinates initialization and delegated event handler | `renderApp()`                                       |

### 4. API Endpoints & Event Handling Plan

- **Concrete Endpoint URLs**: List the exact HTTP `GET` URL(s) and query parameters your app will
  call (for example, `https://openlibrary.org/search.json?q={query}&limit=20`), and describe how
  your UI will represent **loading**, **empty results**, and **error** states.
- **User Interactions & Event Delegation**: List your **at least three (3) distinct user
  interactions** (e.g., search form submit/input, filter buttons, sort select, favorite toggle, or
  detail view) and note which container element(s) and `data-*` attributes you will use to handle
  events cleanly.

---

## Submission Instructions

1. Check out your `main` branch, pull latest changes, and create a branch for Milestone 2:
   ```bash
   git checkout main
   git pull origin main
   git checkout -b final-project-design
   ```
2. Update `projects/final/README.md` (and add any wireframe image files to `projects/final/`).
3. Stage, commit, and push your branch:
   ```bash
   git add projects/final
   git commit -m "docs(final): submit Milestone 2 design document"
   git push -u origin final-project-design
   ```
4. Open a Pull Request on GitHub comparing `final-project-design` against `main`, and request
   **artzte** as a reviewer.
5. Submit your Pull Request URL on Canvas.
6. **Deadline**: Milestone 2 is due by **Monday, November 9, 2026 at 11:59 PM** (the Monday
   following Week 7).

---

## Milestone 2 Rubric (100 Points)

| Criteria                         | Points | Description                                                                                      |
| :------------------------------- | :----- | :----------------------------------------------------------------------------------------------- |
| **UI Wireframes & Layout**       | 25 pts | Clear wireframe(s) showing controls, data display, and loading/error areas.                      |
| **Data Model & Class Plan**      | 25 pts | Well-defined application state and planned ES6 `class` (properties + methods).                   |
| **Module Breakdown (≥4 files)**  | 25 pts | At least 4 ES modules listed with clear separation of concerns and planned exports.              |
| **API Endpoints & Interactions** | 25 pts | Concrete endpoint URLs, error/loading state plan, and ≥3 user interactions mapped to DOM events. |
