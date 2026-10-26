## Week 6 Assignment: Scoreboard

In this assignment, you will build a game scoreboard where several functions share one `scores`
array through the scope chain. Along the way, you'll deliberately create the classic `var`-in-a-loop
bug, prove it with a failing test, and then fix it with `let`. Your Git history and your pull
request will tell the story of the bug and the fix.

Submit the URL of your pull request adding this assignment to your `projects/week6` folder in your
repo. Be sure to tag me, **artzte**, as a reviewer on your PR.

---

### Challenge Requirements

1. **Players and scores**: Define an array of at least 3 player names, such as
   `['Ada', 'Grace', 'Alan']`, and a `scores` array with a starting score of `0` for each player.
2. **Shared state through the scope chain**: Declare `scores` **once**, inside `renderApp()`. At
   least three functions declared inside `renderApp()` must read or update `scores` by reaching
   outward through the scope chain, not by receiving it as a parameter. For example:
   - `addPoint(index)`: adds 1 to a player's score.
   - `removePoint(index)`: subtracts 1, but never goes below `0`.
   - `resetScores()`: sets every score back to `0`.
   - `render()`: redraws the scoreboard from the current scores.
3. **Rendered scoreboard**: Render one row per player into `#app`, showing the player's name, their
   score, a **+1** button, and a **−1** button. Give elements class names that your tests can find
   (for example, `.score`, `.add-point`, `.remove-point`).
4. **Buttons wired in a counting loop**: Create each player's row and attach its button listeners
   inside a classic counting loop, `for (... i = 0; i < players.length; i++)`, where the click
   handlers use `i` to know which player to update.
5. **Leader and reset**: Show the current leader below the table (for example, _"Leader: Grace
   (4)"_). If two or more players are tied for the lead, show all of them (_"Tied: Ada, Grace
   (4)"_). If every score is `0`, show _"No points yet"_. Add a **Reset** button that sets every
   score to `0`.
6. **Pure, exported helper**: Export a pure function `getLeaders(players, scores)` that returns an
   array of the leading players' names and scores (an empty array if every score is `0`). Your
   leader message should use it.
7. **Tests**: Write Vitest tests for `getLeaders`, plus DOM tests that click buttons and check the
   rendered scores (see the example below).
8. **Demonstrate the bug, then fix it** (see _The `var` Bug, Step by Step_ below). Your commit
   history must include a commit where the loop uses `var` and a later commit that fixes it with
   `let`.
9. **Reflection**: Add a `projects/week6/README.md` that answers:
   - What happened when your loop used `var i`? What value of `i` did every click handler see, and
     why?
   - Why does `let i` fix it? How many `i` variables exist in each version?
   - Draw (as a nested bullet list) the scope chain from inside one of your click handlers outward
     to the module scope, naming the variables in each scope.
   - What would happen if `render()` were called on a line _above_ the `scores` declaration inside
     `renderApp()`? What error would you see, and what is that error's name?

---

### The `var` Bug, Step by Step

1. Build the scoreboard with your counting loop written as `for (var i = 0; ...)`. Inside each
   handler, call something like `addPoint(i)`.
2. Write a DOM test that clicks the **second** player's **+1** button and expects the second score
   to be `1` and the first score to still be `0`.
3. Run `npm test`. The test should **fail**. Run `npm start` and click buttons: nothing changes (or
   worse, a mystery row appears).
4. Commit this broken version, failing test and all:
   ```bash
   git commit -am "demo(week6): var loop bug - every button updates scores[players.length]"
   ```
5. Change `var i` to `let i`. Run `npm test` again; the test should pass. Commit the fix:
   ```bash
   git commit -am "fix(week6): use let so each loop iteration gets its own i"
   ```
6. In your pull request description, paste the failing test output from step 3 and link both
   commits.

> 💡 Committing a failing test on purpose is unusual. We do it here so that your history shows the
> bug before the fix. On a real team, you'd describe the bug in the PR and commit only the fix.

---

### Some Helpful References

| Topic                      | Documentation                                                                                                 | Usefulness in this Assignment                                 |
| :------------------------- | :------------------------------------------------------------------------------------------------------------ | :------------------------------------------------------------ |
| `let` in loops             | [MDN: for statement](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for)        | How `let` creates a new binding per iteration                 |
| `Math.max()`               | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max)     | Finding the top score (`Math.max(...scores)`)                 |
| `Array.prototype.fill()`   | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/fill)   | Starting or resetting every score at `0`                      |
| `Array.prototype.filter()` | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) | Picking out the leaders (the callback's 2nd arg is the index) |
| `document.createElement()` | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement)                       | Building rows and buttons you can attach listeners to         |
| `HTMLElement.click()`      | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click)                            | Simulating a button click in your tests                       |

---

### Suggested Structure

- Declare `players` and `scores` at the top of `renderApp()`, before any function that uses them is
  called. (Remember the TDZ!)
- Keep `getLeaders` outside `renderApp()` and pass it what it needs. It's pure, so it's easy to test
  without the DOM.
- Have `render()` rebuild the whole scoreboard each time a score changes. Since `render()` creates
  new buttons, the loop that attaches listeners belongs inside `render()`.
- Because `scores` lives inside `renderApp()`, every call to `renderApp()` starts a fresh game.
  That's what keeps your tests independent of each other.

```js
import { beforeEach, describe, it, expect } from 'vitest'
import { renderApp, getLeaders } from '../src/app.js'

describe('getLeaders', () => {
  it('returns every player tied for the top score', () => {
    expect(getLeaders(['Ada', 'Grace', 'Alan'], [4, 4, 1])).toEqual(['Ada', 'Grace'])
  })

  it('returns an empty array when nobody has scored', () => {
    expect(getLeaders(['Ada', 'Grace'], [0, 0])).toEqual([])
  })
})

describe('scoreboard', () => {
  beforeEach(() => {
    renderApp()
  })

  it('adds a point to the clicked player only', () => {
    document.querySelectorAll('.add-point')[1].click()

    const scores = document.querySelectorAll('.score')
    expect(scores[0].textContent).toBe('0')
    expect(scores[1].textContent).toBe('1')
  })
})
```

#### Hints

- Query for the buttons _after_ each click, not once before. Since `render()` replaces the rows,
  elements you found earlier are no longer on the page.
- Add a test for each rule: −1 never goes below `0`, **Reset** zeroes everything, and the leader
  message updates after clicks.
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
2. **Create a `week6` branch**:
   ```bash
   git checkout -b week6
   ```
3. **Run the `mpf.sh` script to create your `week6` project**:
   ```bash
   scripts/mpf.sh week6
   ```
4. **Stage, commit, and push the generated project files**:
   ```bash
   git add projects/week6
   git commit -m "feat(week6): scaffold week6 project workspace"
   git push -u origin week6
   ```
5. **Work on the exercise**:
   - Navigate to `projects/week6` and install dependencies:
     ```bash
     cd projects/week6
     npm install
     ```
   - Implement the scoreboard in `src/app.js`, following _The `var` Bug, Step by Step_.
6. **Commit updates, verify everything is working, and push fixes**:
   - Preview your application in the browser:
     ```bash
     npm start
     ```
   - Run tests to verify your code:
     ```bash
     npm test
     ```
   - Write your reflection in `projects/week6/README.md`.
   - Stage, commit, and push your changes.
7. **Open a Pull Request**:  
   Open a pull request on GitHub comparing `week6` against `main`, and request **artzte** as a
   reviewer. Include the failing test output and links to your bug and fix commits.
8. **Submit on Canvas**:  
   Copy the URL of your PR, paste it into the Canvas assignment submission box, and submit it.
9. **Deadline**: This programming assignment is due by **Monday, November 2, 2026 at 11:59 PM** (the
   Monday following Week 6).
