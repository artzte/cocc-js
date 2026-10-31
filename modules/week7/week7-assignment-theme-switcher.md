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
4. **Sample Elements Preview**: A short section with a blockquote, inline `<code>`, and a link so
   you can watch all semantic CSS variables update across the page in real time.

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
|  > "Closures keep state private while exposing a clean interface."          |
|  Try reading the `code snippet` or clicking the GitHub repo link above to   |
|  see how the starter kit's semantic CSS variables style every element.      |
+-----------------------------------------------------------------------------+
```

---

### Community Color Themes Dataset

Export this `themes` array from `src/app.js` (or copy it from
[`examples/week7-themes.js`](../../examples/week7-themes.js)):

```javascript
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
  {
    id: 'catppuccin-mocha',
    name: 'Catppuccin Mocha',
    mode: 'dark',
    author: 'Catppuccin Org',
    repoUrl: 'https://github.com/catppuccin/catppuccin',
    colors: {
      '--color-bg': '#1e1e2e',
      '--color-surface': '#313244',
      '--color-surface-hover': '#45475a',
      '--color-border': '#585b70',
      '--color-text': '#cdd6f4',
      '--color-text-muted': '#a6adc8',
      '--color-primary': '#89b4fa',
      '--color-primary-hover': '#b4befe',
    },
  },
  {
    id: 'nord',
    name: 'Nord',
    mode: 'dark',
    author: 'Sven Greb (Arctic Ice Studio)',
    repoUrl: 'https://github.com/nordtheme/nord',
    colors: {
      '--color-bg': '#2e3440',
      '--color-surface': '#3b4252',
      '--color-surface-hover': '#434c5e',
      '--color-border': '#4c566a',
      '--color-text': '#eceff4',
      '--color-text-muted': '#d8dee9',
      '--color-primary': '#88c0d0',
      '--color-primary-hover': '#81a1c1',
    },
  },
  {
    id: 'rose-pine-dawn',
    name: 'Rosé Pine Dawn',
    mode: 'light',
    author: 'Rosé Pine',
    repoUrl: 'https://github.com/rose-pine/rose-pine-theme',
    colors: {
      '--color-bg': '#faf4ed',
      '--color-surface': '#fffaf3',
      '--color-surface-hover': '#f2e9e1',
      '--color-border': '#dfdad9',
      '--color-text': '#575279',
      '--color-text-muted': '#797593',
      '--color-primary': '#907aa9',
      '--color-primary-hover': '#d7827e',
    },
  },
  {
    id: 'dracula',
    name: 'Dracula',
    mode: 'dark',
    author: 'Zeno Rocha & Dracula Team',
    repoUrl: 'https://github.com/dracula/dracula-theme',
    colors: {
      '--color-bg': '#282a36',
      '--color-surface': '#343746',
      '--color-surface-hover': '#44475a',
      '--color-border': '#6272a4',
      '--color-text': '#f8f8f2',
      '--color-text-muted': '#bfbfbf',
      '--color-primary': '#bd93f9',
      '--color-primary-hover': '#ff79c6',
    },
  },
  {
    id: 'solarized-dark',
    name: 'Solarized Dark',
    mode: 'dark',
    author: 'Ethan Schoonover',
    repoUrl: 'https://github.com/altercation/solarized',
    colors: {
      '--color-bg': '#002b36',
      '--color-surface': '#073642',
      '--color-surface-hover': '#0d4654',
      '--color-border': '#586e75',
      '--color-text': '#eee8d5',
      '--color-text-muted': '#93a1a1',
      '--color-primary': '#268bd2',
      '--color-primary-hover': '#2aa198',
    },
  },
]
```

---

### Challenge Requirements

1. **Closure Factory (`createThemeSwitcher(themeList = themes)`)**:
   - Export a factory function `createThemeSwitcher(themeList = themes)`.
   - Inside `createThemeSwitcher`, store the current theme index (`let currentIndex = 0`) in a
     private lexical variable. Do **not** expose `currentIndex` or the array as properties on the
     returned object.
   - Return an object with these methods (all closing over `currentIndex` and `themeList`):
     - `getCurrentTheme()`: returns the current theme object (`themeList[currentIndex]`).
     - `getCurrentIndex()`: returns the current numeric index (`currentIndex`).
     - `next()`: advances to the next theme, wrapping around from the last theme back to `0`, and
       returns the new current theme.
     - `prev()`: moves to the previous theme, wrapping around from `0` to `themeList.length - 1`,
       and returns the new current theme.
     - `select(index)`: if `index` is a valid integer from `0` to `themeList.length - 1`, updates
       `currentIndex` to `index`; otherwise leaves `currentIndex` unchanged. Returns the current
       theme.
     - `reset()`: resets `currentIndex` back to `0` and returns the current theme.
2. **Applying CSS Custom Properties (`applyTheme(theme)`)**:
   - Export a helper function `applyTheme(theme)` that loops over `Object.entries(theme.colors)` and
     calls `document.documentElement.style.setProperty(prop, value)` for each of the 8 CSS custom
     properties.
3. **Rendering & Attribution (`renderApp()`)**:
   - Inside `renderApp()`, create a switcher instance
     (`const switcher = createThemeSwitcher(themes)`).
   - Have `render()` call `applyTheme(switcher.getCurrentTheme())` and update `app.innerHTML` with:
     - The active theme's name, mode (`light` or `dark`), and position (e.g., `1 of 6`).
     - Attribution showing the theme's `author` and an `<a>` link pointing to `repoUrl`.
     - **Previous** (`data-action="prev"`), **Next** (`data-action="next"`), and **Reset**
       (`data-action="reset"`) buttons.
     - One button per theme with `data-action="select"` and `data-index="${i}"`. Mark the active
       theme button (for example, with class `active` or `aria-pressed="true"`).
     - A table of the 8 CSS variables, their hex values, and a color swatch cell.
4. **Single Delegated Event Listener**:
   - Do **not** attach event listeners inside `render()` or inside a loop.
   - Attach **one** `click` listener to `#app` inside `renderApp()`. Use
     `event.target.closest('button')` and `button.dataset` (`action` and `index`) to call the
     matching method on `switcher` and then call `render()`.
5. **Automated Tests (`test/starter.test.js`)**:
   - Write Vitest unit tests for `createThemeSwitcher` verifying:
     - Initial state starts at index `0`.
     - `next()` and `prev()` wrap around at both ends of the list.
     - `select(index)` jumps to a valid index and ignores out-of-range indices.
     - `reset()` returns to index `0`.
     - Privacy: `switcher.currentIndex` is `undefined` (cannot be read or mutated directly on the
       returned object).
   - Write DOM tests for `renderApp()` verifying:
     - Clicking the **Next**, **Previous**, **Reset**, and individual theme (`data-action="select"`)
       buttons updates the displayed theme name, GitHub attribution link (`href`), and
       `document.documentElement.style.getPropertyValue('--color-bg')`.
6. **Reflection (`projects/week7/README.md`)**:
   - How does `createThemeSwitcher` apply the Principle of Least Exposure (POLE)? What happens if
     external code runs `switcher.currentIndex = 99`?
   - Which variables does your `#app` click listener close over?
   - Compare your single delegated click listener in `renderApp()` to the `for` loop inside
     `render()` from Week 6. Why does the `#app` listener keep working even after `app.innerHTML`
     replaces all the `<button>` elements?

---

### Some Helpful References

| Topic                                    | Documentation                                                                                                   | Usefulness in this Assignment                                     |
| :--------------------------------------- | :-------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------- |
| `CSSStyleDeclaration.setProperty()`      | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/setProperty)                | Setting `--color-*` variables on `document.documentElement.style` |
| `CSSStyleDeclaration.getPropertyValue()` | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/CSSStyleDeclaration/getPropertyValue)           | Checking `--color-bg` in your Vitest DOM tests                    |
| `HTMLElement.dataset`                    | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)                            | Reading `data-action` and `data-index` from the clicked button    |
| `Element.closest()`                      | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Element/closest)                                | Finding the enclosing `<button>` from `event.target`              |
| `Object.entries()`                       | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/entries) | Looping through `[prop, value]` pairs in `theme.colors`           |
| Remainder (`%`) for wrap-around          | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder)           | `(currentIndex + 1) % themeList.length`                           |

---

### Suggested Structure & Example Tests

```javascript
import { beforeEach, describe, it, expect } from 'vitest'
import { themes, createThemeSwitcher, renderApp } from '../src/app.js'

describe('createThemeSwitcher (closure unit tests)', () => {
  it('starts at index 0 and keeps currentIndex private', () => {
    const switcher = createThemeSwitcher(themes)
    expect(switcher.getCurrentIndex()).toBe(0)
    expect(switcher.getCurrentTheme().id).toBe('catppuccin-latte')
    expect(switcher.currentIndex).toBeUndefined()
  })

  it('wraps around forward with next() and backward with prev()', () => {
    const switcher = createThemeSwitcher(themes)
    switcher.prev()
    expect(switcher.getCurrentIndex()).toBe(themes.length - 1)
    switcher.next()
    expect(switcher.getCurrentIndex()).toBe(0)
  })

  it('selects a valid index and resets to 0', () => {
    const switcher = createThemeSwitcher(themes)
    switcher.select(2)
    expect(switcher.getCurrentTheme().id).toBe('nord')
    switcher.reset()
    expect(switcher.getCurrentIndex()).toBe(0)
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
   - Implement `themes`, `createThemeSwitcher`, `applyTheme`, and `renderApp` in `src/app.js`.
   - Write your unit and DOM tests in `test/starter.test.js`.
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
   - Write your reflection in `projects/week7/README.md`.
   - Stage, commit, and push your changes.
7. **Open a Pull Request**: Open a pull request on GitHub comparing `week7` against `main`, and
   request **artzte** as a reviewer.
8. **Submit on Canvas**: Copy the URL of your PR, paste it into the Canvas assignment submission
   box, and submit it.
9. **Deadline**: This programming assignment is due by **Monday, November 9, 2026 at 11:59 PM** (the
   Monday following Week 7).
