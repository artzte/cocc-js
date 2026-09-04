# CIS 133JS Starter Kit

Vite + Vitest starter for CIS 133JS. Provides a dev server, build pipeline, and unit testing with
DOM support out of the box.

## Setup

Fork this repo to your own GitHub account, then clone your fork:

```
git clone https://github.com/<your-username>/<repo-name>.git
cd <repo-name>
npm install
```

Don't have a GitHub account? Sign up at [github.com](https://github.com) and claim the
[GitHub Student Developer Pack](https://education.github.com/pack) for free extras.

## Commands

| Command                | What it does                                    |
| ---------------------- | ----------------------------------------------- |
| `npm run dev`          | Start the dev server at `http://localhost:5173` |
| `npm run build`        | Build for production into `dist/`               |
| `npm run preview`      | Preview the production build locally            |
| `npm test`             | Run all tests once                              |
| `npm run test:watch`   | Run tests in watch mode                         |
| `npm run test:ui`      | Run tests with browser-based Vitest UI          |
| `npm run format`       | Format code with Prettier                       |
| `npm run format:check` | Check code formatting with Prettier             |

## Project Architecture

```
starter/
├── index.html          # Entry HTML page (loads /src/common/main.js)
├── package.json        # Dependencies and scripts
├── vite.config.js      # Vite and Vitest configuration
├── src/
│   ├── app.js          # Student anchor file (exports renderApp)
│   └── common/
│       └── main.js     # Wrapper entry point (mounts renderApp into #app)
└── test/
    ├── setup.js        # Vitest DOM test setup (loads index.html into jsdom)
    └── starter.test.js # Sanity check tests
```

### The Student Anchor Point (`src/app.js`)

`src/app.js` is the primary file where you will write your code:

```javascript
export function renderApp() {
  const app = document.querySelector('#app')
  app.textContent = 'Hello, JavaScript!'
}
```

- **Wrapper Entry**: `src/common/main.js` is already wired up to `index.html` to import and run
  `renderApp()`.
- **Modularity**: As your project grows, create additional modules in `src/` (such as `api.js`,
  `storage.js`, or component classes) and import them into `src/app.js`.

## Git Workflow: Branch-Based Assignments

All coursework is managed using Git branches:

### 1. Weekly Assignments (Short-Lived Branches)

For each weekly assignment, create a new branch from `main`:

```bash
git checkout main
git checkout -b week-01
```

Do your work in `src/app.js` (and any helper modules), verify tests pass (`npm test`), and push your
branch:

```bash
git add .
git commit -m "Complete Week 1 assignment"
git push -u origin week-01
```

### 2. Final Project (Long-Lived Feature Branch)

The final project is developed incrementally over the entire term on a dedicated feature branch:

```bash
git checkout main
git checkout -b final-project
git push -u origin final-project
```

You will add to this feature branch across the four project milestones:

1. **Milestone 1 (Week 4) — Proposal**: Commit your `PROPOSAL.md` document outlining your project
   idea and chosen public API to your `final-project` branch.
2. **Milestone 2 (Week 7) — Design Document**: Add `DESIGN.md` (sketches, data structures, module
   plans) and commit.
3. **Milestone 3 (Week 9) — Initial Structure**: Stub all planned module files in `src/`, export
   your functions and classes, import them into `src/app.js`, and write passing unit tests in
   `test/`.
4. **Milestone 4 (Week 12) — Final Submission**: Complete the application, verify all tests pass
   (`npm test`), build for production (`npm run build`), and deploy.

### Switching Between Branches

Always check out the branch for the work you are doing:

```bash
# Switch to a weekly assignment branch
git checkout week-01

# Switch to your final project feature branch
git checkout final-project

# Return to main
git checkout main
```

## Testing

Tests live in `test/` and use [Vitest](https://vitest.dev/) with a jsdom environment, so DOM APIs
are available.

```javascript
import { describe, it, expect } from 'vitest'
import { renderApp } from '../src/app.js'

describe('my module', () => {
  it('renders application content', () => {
    renderApp()
    expect(document.querySelector('#app').textContent).toBe('Hello, JavaScript!')
  })
})
```

Test your logic, not your DOM wiring. Pure functions that compute, transform, or validate are ideal
test targets.

## Deployment (GitHub Pages)

This repository includes automated deployment to GitHub Pages via GitHub Actions.

### 1. One-Time Setup in GitHub

1. Ensure your account is enrolled in the **GitHub Student Developer Pack** (which grants GitHub
   Pro, allowing private repositories to publish to GitHub Pages).
2. Go to your repository on GitHub and click **Settings** → **Pages**.
3. Under **Build and deployment** > **Source**, select **GitHub Actions**.

### 2. Automated Deployments

Whenever you push to `final-project` (or `main`), the included GitHub Actions workflow builds your
Vite application and publishes it:

```bash
git push origin final-project
```

Your live project will be accessible at:

```
https://<your-github-username>.github.io/<your-repo-name>/
```

## Stack

- [Vite](https://vitejs.dev/) — dev server and bundler
- [Vitest](https://vitest.dev/) — unit testing
- [jsdom](https://github.com/jsdom/jsdom) — DOM environment for tests
- Vanilla JS — modern ES modules without frameworks
