## Week 7 Assignment: Color Theme Switcher

In this assignment, you will build an interactive **Color Theme Switcher** that combines the two
core ideas of Week 7:

1. **Encapsulated State with Closures**: You will write a factory function,
   `createThemeSwitcher(themes)`, that holds the current theme index in a private lexical variable
   (applying the **Principle of Least Exposure** from
   [Scope & Closures (2nd Edition), Chapter 6: Limiting Scope Exposure](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch6.md)
   and
   [Scope & Closures (2nd Edition), Chapter 7: Using Closures](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch7.md))
   and exposes only controlled methods to read or change the active theme.
2. **Efficient Event Handling with Event Delegation**: Instead of attaching a separate click
   listener to every button inside `render()`, you will attach **one** delegated click listener to
   the `#app` container and use `data-*` attributes (`button.dataset`) to dispatch actions into your
   closure, just as shown in the
   [Week 7 Side Lecture: Efficient Event Handling with Event Delegation](week7-event-delegation.md).

Because our starter kit's stylesheet (`src/common/style.css`) already uses 8 semantic CSS custom
properties (`--color-bg`, `--color-surface`, `--color-surface-hover`, `--color-border`,
`--color-text`, `--color-text-muted`, `--color-primary`, and `--color-primary-hover`), plugging
community color themes into `document.documentElement.style` will automatically restyle every
element on the page—and give you a ready-made library of color palettes you can reuse in your Final
Project!

Submit the URL of your pull request adding this assignment to your `projects/week7` folder in your
repo. Be sure to tag me, **artzte**, as a reviewer on your PR.

---

### Wireframe & Target UX

When rendered into `#app`, your Theme Switcher should display:

1. **Active Theme Header & Attribution**: The active theme's name, mode (`light` or `dark`),
   position (`1 of 6`), and a clickable link
   (`<a href="..." target="_blank" rel="noopener noreferrer">`) to the theme's open-source GitHub
   repository (`repoUrl`) crediting its author (`author`).
2. **Control Bar (Handled by ONE Delegated Click Listener on `#app`)**:
   - Cycle and reset buttons: **Previous** (`data-action="prev"`), **Next** (`data-action="next"`),
     and **Reset** (`data-action="reset"`).
   - Direct theme selector buttons for every theme in the dataset (`data-action="select"` and
     `data-index="${i}"`), with the currently active theme visually indicated (for example, with an
     `.active` class or `aria-pressed="true"`).
3. **Current Palette Tokens Table**: A table listing all 8 CSS custom properties in the active
   theme's `colors` object, their hex values, and a small visual color swatch
   (`style="background-color: ${value}"`).
4. **Sample Elements Preview**: A short section with a heading, a paragraph, a blockquote, inline
   `<code>`, and an anchor link to Kyle Simpson's GitHub repository so you can watch all semantic
   CSS variables update across the page in real time.

```text
+-----------------------------------------------------------------------------+
|  Theme Switcher                                                             |
|  Active Theme: Nord (dark) — 3 of 6                                         |
|  Created by Sven Greb (Arctic Ice Studio) • View on GitHub (↗)              |
|                                                                             |
|  +-----------------------------------------------------------------------+  |
|  |  [ ← Prev ]   [ Next → ]   [ Reset ]                                  |  |
|  |                                                                       |  |
|  |  [ Catppuccin Latte ]  [ Catppuccin Mocha ]  [ * Nord * ]             |  |
|  |  [ Rosé Pine Dawn ]    [ Dracula ]           [ Solarized Dark ]       |  |
|  +-----------------------------------------------------------------------+  |
|     ^ All buttons use data-action="prev|next|reset|select" & data-index     |
|       and are handled by ONE click listener on #app!                        |
|                                                                             |
|  -------------------------------------------------------------------------  |
|                                                                             |
|  Current Palette Tokens                                                     |
|  +------------------------+-------------+--------------------------------+  |
|  | CSS Variable           | Value       | Swatch                         |  |
|  +------------------------+-------------+--------------------------------+  |
|  | --color-bg             | #2e3440     | [####]                         |  |
|  | --color-surface        | #3b4252     | [####]                         |  |
|  | --color-surface-hover  | #434c5e     | [####]                         |  |
|  | --color-border         | #4c566a     | [####]                         |  |
|  | --color-text           | #eceff4     | [####]                         |  |
|  | --color-text-muted     | #d8dee9     | [####]                         |  |
|  | --color-primary        | #88c0d0     | [####]                         |  |
|  | --color-primary-hover  | #81a1c1     | [####]                         |  |
|  +------------------------+-------------+--------------------------------+  |
|                                                                             |
|  Sample Elements Preview                                                    |
|  Every element in this preview is styled automatically by the semantic      |
|  `--color-*` custom properties in `src/common/style.css`. For a deeper      |
|  dive into scope and closures, explore Kyle Simpson's                       |
|  You Don't Know JS Yet (GitHub repository).                                 |
|                                                                             |
|  > "Closure is observed when a function uses variable(s) from outer         |
|  > scope(s) even while running in a scope where those variables wouldn't    |
|  > be accessible."                                                          |
+-----------------------------------------------------------------------------+
```

---

### Provided Fixture & Sample Preview Markup

To save you from typing out hex codes and boilerplate HTML, we have provided both the **Community
Color Themes dataset** and **sample preview markup** (in
[`examples/week7-themes.js`](../../examples/week7-themes.js)). You are encouraged to copy and use
both of these directly in your project if they fit your needs!

```javascript
// retrieve these from themes file, linked above

export const themes = [
  {
    id: 'catppuccin-latte',
    name: 'Catppuccin Latte',
    mode: 'light',
    author: 'Catppuccin Org',
    repoUrl: 'https://github.com/catppuccin/catppuccin',
    colors: {
      '--color-bg': '#eff1f5',
      '--color-surface': '#e6e9ef',
      '--color-surface-hover': '#ccd0da',
      '--color-border': '#bcc0cc',
      '--color-text': '#4c4f69',
      '--color-text-muted': '#6c6f85',
      '--color-primary': '#1e66f5',
      '--color-primary-hover': '#7287fd',
    },
  },
  [...moreThemes],
]

export const previewMarkup = `
  sample markup
`
```

---

### Challenge Requirements

1. **Closure Factory (`createThemeSwitcher(themeList = themes)`)**:
   - Export a factory function `createThemeSwitcher(themeList = themes)`.
   - Inside `createThemeSwitcher`, store the current theme index (`let currentIndex = 0`) in a
     private lexical variable. Do **not** expose `currentIndex` or the array as properties on the
     returned object.
   - Return an object with these methods (all closing over `currentIndex` and `themeList`). **All
     functions updating the active index should handle invalid situations, such as retreating behind
     the first theme in the list**
     - `getCurrentTheme()`: returns the current theme object (`themeList[currentIndex]`).
     - `getCurrentIndex()`: returns the current numeric index (`currentIndex`).
     - `next()`: advances to the next theme, and returns the new current theme
     - `prev()`: moves to the previous theme, and returns the new current theme
     - `select(index)`: if `index` is a valid integer from `0` to `themeList.length - 1`, updates
       `currentIndex` to `index`; otherwise leaves `currentIndex` unchanged. Returns the current
       theme.
     - `reset()`: resets `currentIndex` back to `0` and returns the current theme.
2. **Applying CSS Custom Properties (`applyTheme(theme)`)**:
   - Create a helper function `applyTheme(theme)` that loops over `Object.entries(theme.colors)` and
     calls `document.documentElement.style.setProperty(prop, value)` for each of the 8 CSS custom
     properties.
3. **Rendering & Attribution (`renderApp()`)**:
   - Inside `renderApp()`, create a switcher instance
   - Have `render()` call `applyTheme`, which should update all of:
     - header details:
       - theme name and mode
       - position (e.g., `1 of 6`)
       - theme author
       - link to theme github repo
     - navigation buttons:
       - **Previous** (`data-action="prev"`)
       - **Next** (`data-action="next"`)
       - **Reset** (`data-action="reset"`)
     - One button per theme with `data-action="select"` and `data-index="${i}"`. Mark the active
       theme button (for example, with class `active` or `aria-pressed="true"` or `[disabled]`)
     - A table of the 8 CSS variables, their hex values, and a color swatch cell.
     - The preview HTML
4. **Single Delegated Event Listener**:
   - Do **not** attach event listeners inside `render()` or inside a loop.
   - Attach **one** `click` listener to `#app` inside `renderApp()`. Use
     `event.target.closest('button')` and `button.dataset` (`action` and `index`) to call the
     matching method on `switcher` and then call `render()`.
5. **Automated Tests (`test/starter.test.js`)**:
   - Write Vitest unit tests for `createThemeSwitcher` verifying:
     - Initial state starts at index `0`.
     - `next()` and `prev()` work and handle illogical operations
     - `select(index)` jumps to a valid index and ignores out-of-range indices.
     - `reset()` returns to index `0`.
     - Privacy: `switcher.currentIndex` is `undefined` (cannot be read or mutated directly on the
       returned object).
   - Write DOM tests for `renderApp()` verifying:
     - Clicking the **Next**, **Previous**, **Reset**, and individual theme (`data-action="select"`)
       buttons updates the displayed theme name, GitHub attribution link (`href`), and
       `document.documentElement.style.getPropertyValue('--color-bg')`.

---

### Some Helpful References

| Topic                                    | Documentation                                                                                                   | Usefulness in this Assignment                                     |
| :--------------------------------------- | :-------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------- |
| `CSSStyleDeclaration.setProperty()`      | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty)                | Setting `--color-*` variables on `document.documentElement.style` |
| `CSSStyleDeclaration.getPropertyValue()` | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/getPropertyValue)           | Checking `--color-bg` in your Vitest DOM tests                    |
| `HTMLElement.dataset`                    | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)                            | Reading `data-action` and `data-index` from the clicked button    |
| `Element.closest()`                      | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest)                                | Finding the enclosing `<button>` from `event.target`              |
| `Object.entries()`                       | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) | Looping through `[prop, value]` pairs in `theme.colors`           |

---

### Suggested Example Tests

**NOTE: these are just starter tests from my own attempt at this project. You will likely need to
modify them to your own naming, exports, etc.**

```javascript
import { beforeEach, describe, it, expect } from 'vitest'
import { renderApp } from '../src/app.js'
import { createThemeSwitcher } from '../src/theme-switcher.js'
import { themes } from '../src/themes.js'

describe('createThemeSwitcher (closure unit tests)', () => {
  it('starts at index 0 and keeps currentIndex private', () => {
    const switcher = createThemeSwitcher(themes)
    expect(switcher.getCurrentIndex()).toBe(0)
    expect(switcher.getCurrentTheme().id).toBe('catppuccin-latte')
    expect(switcher.currentIndex).toBeUndefined()
  })

  it('handles next() and prev()', () => {
    const switcher = createThemeSwitcher(themes)
    switcher.prev()
    expect(switcher.getCurrentIndex(), 'prev ignores retreat behind first theme').toBe(0)
    switcher.next()
    expect(switcher.getCurrentIndex(), 'next advances to next them').toBe(1)
    switcher.prev()
    expect(switcher.getCurrentIndex(), 'prev retreats to previous theme').toBe(0)
    switcher.select(themes.length)
    expect(switcher.getCurrentIndex(), 'select ignores out-of-range index').toBe(0)

    switcher.select(themes.length - 1)

    switcher.next()
    expect(switcher.getCurrentIndex(), 'select ignores advance beyond last theme').toBe(
      themes.length - 1,
    )
  })

  it('selection and retrieval of current theme', () => {
    const switcher = createThemeSwitcher(themes)
    switcher.select(2)

    expect(switcher.getCurrentTheme().id).toBe(themes[2].id)
    switcher.reset()
    expect(switcher.getCurrentIndex()).toBe(0)

    switcher.select(themes.length)
    expect(switcher.getCurrentIndex(), 'select ignores invalid index').toBe(0)
  })
})

describe('Theme Switcher DOM & Event Delegation', () => {
  beforeEach(() => {
    renderApp()
  })

  it('renders the initial theme, GitHub repo link, and CSS variables', () => {
    expect(document.querySelector('#app').textContent).toContain('Catppuccin Latte')
    const repoLink = document.querySelector('[data-test-repo-link]')
    expect(repoLink.getAttribute('href')).toBe('https://github.com/catppuccin/catppuccin')
    expect(document.documentElement.style.getPropertyValue('--color-bg')).toBe('#eff1f5')
  })

  it('switches themes when clicking a theme button via event delegation', () => {
    document.querySelector('button[data-action="select"][data-index="2"]').click()
    expect(document.querySelector('#app').textContent).toContain('Nord')
    expect(document.documentElement.style.getPropertyValue('--color-bg')).toBe('#2e3440')
  })
})
```

---

### Steps to Complete & Submit

1. **Check out your `main` branch and pull latest changes**:
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Create a `week7` branch**:
   ```bash
   git checkout -b week7
   ```
3. **Run the `mpf.sh` script to create your `week7` project**:
   ```bash
   scripts/mpf.sh week7
   ```
4. **Stage, commit, and push the generated project files**:
   ```bash
   git add projects/week7
   git commit -m "feat(week7): scaffold week7 project workspace"
   git push -u origin week7
   ```
5. **Work on the exercise**:
   - Navigate to `projects/week7` and install dependencies:
     ```bash
     cd projects/week7
     npm install
     ```
   - Implement `themes`, `createThemeSwitcher`, `applyTheme`, and `renderApp`
   - Write your unit and DOM tests
6. **Commit updates, verify everything is working, and push fixes**:
   - Preview your application in the browser:
     ```bash
     npm start
     ```
   - Run tests and linter to verify your code:
     ```bash
     npm test
     npm run lint
     ```
   - Clean up your formatting:
     ```bash
     npm test
     npm run lint
     ```
   - Stage, commit, and push your changes.
7. **Open a Pull Request**: Open a pull request on GitHub comparing `week7` against `main`, and
   request **artzte** as a reviewer.
8. **Submit on Canvas**: Copy the URL of your PR, paste it into the Canvas assignment submission
   box, and submit it.
9. **Deadline**: This programming assignment is due by **Monday, November 9, 2026 at 11:59 PM** (the
   Monday following Week 7).
