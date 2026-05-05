# CIS 133JS Starter Kit

Vite + Vitest starter for CIS 133JS. Provides a dev server, build pipeline, and unit testing with DOM support out of the box.

## Setup

```
npm install
```

## Commands

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server at `http://localhost:5173` |
| `npm run build` | Build for production into `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm test` | Run all tests once |
| `npm run test:watch` | Run tests in watch mode |

## Two Ways to Use This Kit

### Option 1 — Weekly Assignments Repo

Fork or clone this repo once as your **assignments** repo. Each week, add a new folder under `src/`:

```
src/
  week01/
    index.html
    main.js
  week02/
    index.html
    main.js
test/
  week01.test.js
  week02.test.js
```

The dev server serves all HTML files from the project root. Access each week at:
- `http://localhost:5173/src/week01/`
- `http://localhost:5173/src/week02/`

The root `index.html` can serve as a simple link hub to each week if you like.

### Option 2 — Final Project Repo

Fork or clone this repo once as your **project** repo. Treat `src/` as your application source and organize it into modules:

```
src/
  main.js
  api.js
  components/
    Card.js
    List.js
test/
  api.test.js
  components/Card.test.js
```

## Testing

Tests live in `test/` and use [Vitest](https://vitest.dev/) with a jsdom environment, so DOM APIs are available.

```js
import { describe, it, expect, beforeEach } from 'vitest'

describe('my module', () => {
  it('does something', () => {
    expect(1 + 1).toBe(2)
  })
})
```

Test your logic, not your DOM wiring. Functions that compute, transform, or validate are good test targets. Event listeners and `querySelector` calls are not.

## Stack

- [Vite](https://vitejs.dev/) — dev server and bundler
- [Vitest](https://vitest.dev/) — unit testing
- [jsdom](https://github.com/jsdom/jsdom) — DOM environment for tests
- Vanilla JS — no frameworks
