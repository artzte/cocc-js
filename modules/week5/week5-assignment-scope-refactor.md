## Week 5 Assignment: Scope Refactor

In this assignment, you will take a working-but-broken script full of global variables and naming
collisions, and rebuild it as properly scoped ES module code. The finished page must behave the way
the original authors _intended_, with no leaking globals, and you'll write a short scope report
explaining what went wrong and why your version fixes it.

Submit the URL of your pull request adding this assignment to your `projects/week5` folder in your
repo. Be sure to tag me, **artzte**, as a reviewer on your PR.

---

### The Broken Script

Open [`examples/week5-global-mess/index.html`](../../examples/week5-global-mess/index.html) directly
in Chrome (double-click the file, or drag it into a browser tab). No dev server is needed. The page
has two widgets, each written by a different developer:

- **Tip Splitter**: enter a bill, a tip percentage, and a number of people; click **Split** to see
  the amount each person owes.
- **Word Counter**: enter some text; click **Count** to see how many words it has and which word is
  longest.

Each widget worked when it was the only thing on the page. Together, they don't. Click **Split** and
watch what happens. Then open DevTools and type `window.words`, `window.i`, and `window.calculate`
into the console.

Read [`global-mess.js`](../../examples/week5-global-mess/global-mess.js) and find every scope
problem you can. There are at least three _kinds_ of problems.

---

### Challenge Requirements

1. **Same intended behavior**: Your page has both widgets with the same inputs and buttons.
   **Split** shows the per-person amount (formatted like `$33.80 per person` for the default
   inputs). **Count** shows the word count and the longest word.
2. **No globals**: Your code runs as ES modules (the starter kit already does this). Nothing you
   write may create a variable on `window`. Every variable must be declared with `const` or `let`
   (no `var`) in the narrowest scope that works.
3. **One job per function**: Each widget gets its own functions with distinct, descriptive names. No
   two functions may share a name, and no function may read or write a variable that belongs to the
   other widget.
4. **Pure, exported logic**: Separate calculation from DOM work. Export at least two pure functions
   from `src/app.js` (or from separate module files, if you like):
   - `splitBill(bill, tipPercent, people)` returns the per-person amount as a number.
   - `countWords(text)` returns an object like `{ count: 9, longest: 'quick' }`.
5. **Handle the edge cases**: Empty or whitespace-only text (`''` or `'   '`) counts as zero words
   with an empty longest word. A `people` value of `0` (or less) must not show `Infinity` or `NaN`
   in the page; show a helpful message instead.
6. **Tests**: Write Vitest tests for both pure functions, including the edge cases above.
7. **Scope report**: Add a `projects/week5/README.md` with two sections:
   - **What was wrong**: For each problem you found in `global-mess.js`, name the variable(s) or
     function(s) involved and explain the bug in scope terms (which scope it lived in, who else
     could reach it, and what happened as a result). Use the words _target_, _source_, and
     _accidental global_ where they apply.
   - **My scope map**: For your refactored code, list each scope (global, module, each function, any
     blocks) and the variables declared in it. A nested bullet list is fine:
     ```
     - module scope (app.js): splitBill, countWords, renderTip, renderWords
       - splitBill: bill, tipPercent, people, total
       - countWords: text, words, longest
         - for...of block: word
     ```

---

### Some Helpful References

| Topic                        | Documentation                                                                                                    | Usefulness in this Assignment                                   |
| :--------------------------- | :--------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- |
| `let` and `const`            | [MDN: let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)                     | Block-scoped declarations to replace `var` and undeclared names |
| Strict mode                  | [MDN: Strict mode](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Strict_mode)                | Why undeclared assignments throw in your module code            |
| JavaScript modules           | [MDN: JavaScript modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)                 | Module scope keeps top-level names off `window`                 |
| `String.prototype.split()`   | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split)    | Breaking text into words                                        |
| `Number.prototype.toFixed()` | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toFixed)  | Formatting dollar amounts                                       |
| `Number.isFinite()`          | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite) | Catching `Infinity` and `NaN` before they reach the page        |

---

### Suggested Structure

- Copy the two `<section>` blocks from `examples/week5-global-mess/index.html` into the `#app` div
  of your `projects/week5/index.html`. Don't copy the `<script src="global-mess.js">` tag; your code
  loads through `src/common/main.js` like every other week.
- Write the pure functions first and test them before touching the DOM.
- Then write one small render function per widget that reads its inputs, calls its pure function,
  and writes its own result element. Wire each button to its own render function inside
  `renderApp()`.
- Keep variables inside the function that uses them. If a value doesn't need to outlive a single
  click, it shouldn't live outside the click handler.

```js
import { splitBill, countWords } from '../src/app.js'

it('splits an $84.50 bill with a 20% tip three ways', () => {
  expect(splitBill(84.5, 20, 3)).toBeCloseTo(33.8)
})

it('counts words and finds the longest one', () => {
  expect(countWords('the quick brown fox')).toEqual({ count: 4, longest: 'quick' })
})
```

#### Hints

- `toBeCloseTo` is the right matcher for money math, since floating-point results like
  `33.800000000000004` won't pass `toBe(33.8)`.
- To check for leaked globals in the browser, run your page with `npm start`, open the console, and
  type the name of any variable from your code (for example, `words`). You should get
  `ReferenceError: words is not defined`.
- The starter test checks that `renderApp()` writes `Hello, JavaScript!`. Update or replace it once
  your `renderApp()` does something else.

---

### Steps to Complete & Submit

1. **Check out your `main` branch and pull latest changes**:  
   Ensure all prior weeks' content has been pulled into your local repository before branching:
   ```bash
   git checkout main
   git pull origin main
   ```
   Then pull in the course template updates (see "Pulling in cocc-js template updates" in the
   [README](../../README.md#pulling-in-cocc-js-template-updates)) so that you have
   `examples/week5-global-mess/`.
2. **Create a `week5` branch**:
   ```bash
   git checkout -b week5
   ```
3. **Run the `mpf.sh` script to create your `week5` project**:
   ```bash
   scripts/mpf.sh week5
   ```
4. **Stage, commit, and push the generated project files**:
   ```bash
   git add projects/week5
   git commit -m "feat(week5): scaffold week5 project workspace"
   git push -u origin week5
   ```
5. **Work on the exercise**:
   - Navigate to `projects/week5` and install dependencies:
     ```bash
     cd projects/week5
     npm install
     ```
   - Copy the widget markup into `index.html`, then implement your scoped code in `src/app.js`.
6. **Commit updates, verify everything is working, and push fixes**:
   - Preview your application in the browser and confirm both widgets work independently:
     ```bash
     npm start
     ```
   - Run tests to verify your code:
     ```bash
     npm test
     ```
   - Write your scope report in `projects/week5/README.md`.
   - Stage, commit, and push your changes.
7. **Open a Pull Request**:  
   Open a pull request on GitHub comparing `week5` against `main`, and request **artzte** as a
   reviewer.
8. **Submit on Canvas**:  
   Copy the URL of your PR, paste it into the Canvas assignment submission box, and submit it.
9. **Deadline**: This programming assignment is due by **Monday, October 26, 2026 at 11:59 PM** (the
   Monday following Week 5).
