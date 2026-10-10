## Week 4 Assignment: Filterable Item List

In this assignment, you will render an array of structured data objects into the DOM, provide a
search input field, and filter the displayed items in real time as the user types—with no hardcoded
data in your HTML template.

Submit the URL of your pull request adding this assignment to your `projects/week4` folder in your
repo. Be sure to tag me, **artzte**, as a reviewer on your PR.

---

### Challenge Requirements

1. **Structured Data Collection**: Define an array of at least 6–10 items representing a real-world
   domain of your choice (e.g., books, movies, courses, products, video game characters, or
   recipes). Each item must be an object with at least 3 distinct attributes (e.g., `id`, `title`,
   `category`, `description`, `price` or `rating`). If you'd like, poke around at a few of the free
   API service suggestions!
2. **Pure Filtering Function**: Write a dedicated, pure helper function (e.g.,
   `filterItems(items, query)`) that takes an array of items and a search string, and returns a new
   filtered array. (A pure function receives all its data inputs from arguments, and does not mutate
   those passed elements as it performs its work. It communicates with the caller by way of a return
   value. It does not introduce side-effects, such as creating or mutating values outside of its
   arguments and function scope)
   - Use array methods such as `.filter()` and string methods like `.toLowerCase()` and
     `.includes()`.
   - Your function must be case-insensitive (searching "react" should match "React").
   - It should search across at least two object fields (for example, matching either the `title` or
     the `category`).
   - If the query is empty or whitespace-only, return all items.
   - Do **not** mutate the original data array.
3. **Dynamic DOM Rendering**: Render the filtered array into the `#app` container using template
   literals and `.innerHTML` (or `document.createElement`).
4. **Live User Input**: Connect an `input` event listener to your text input field so that the
   displayed list updates immediately as the user types.
5. **Empty State Message**: If no items match the current search query, render a helpful message to
   the user (e.g., _"No items found matching '{query}'"_).

If you have extra time, make it look great! Add CSS styling to make your list render as a clean grid
of cards or a formatted table.

---

### Some Helpful JavaScript Methods

| Method                           | Documentation                                                                                                       | Usefulness in this Assignment                                         |
| :------------------------------- | :------------------------------------------------------------------------------------------------------------------ | :-------------------------------------------------------------------- |
| `Array.prototype.filter()`       | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)       | Returns a new array with elements that pass the predicate test.       |
| `Array.prototype.map()`          | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)          | Transforms array items into HTML template strings.                    |
| `Array.prototype.join()`         | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join)         | Glues an array of HTML strings into a single string for `.innerHTML`. |
| `String.prototype.toLowerCase()` | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/toLowerCase) | Enables case-insensitive string matching.                             |
| `String.prototype.includes()`    | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes)    | Determines whether a substring exists within a string.                |
| `String.prototype.trim()`        | [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/trim)        | Strips leading and trailing whitespace from the user's search input.  |

---

### Suggested Structure

- Keep your business logic (the filtering function) separate from your UI rendering and DOM
  manipulation. This architectural separation makes your code cleaner, easier to understand, and
  straightforward to test.
- Write a pure filtering function that accepts your data array and a search string, returning a new
  filtered array without mutating the original list.
- Wire an `input` event listener to your search box that re-runs the filter and re-renders the list
  into the DOM whenever the user types.
- Include tests that exercise your filtering function with variants such as casing, whitespace, etc.

---

### Steps to Complete & Submit

1. **Check out your `main` branch and pull latest changes**:  
   Ensure all prior weeks' content has been pulled into your local repository before branching:
   ```bash
   git checkout main
   git pull origin main
   ```
2. **Create a `week4` branch**:
   ```bash
   git checkout -b week4
   ```
3. **Run the `mpf.sh` script to create your `week4` project**:
   ```bash
   scripts/mpf.sh week4
   ```
4. **Stage, commit, and push the generated project files**:
   ```bash
   git add projects/week4
   git commit -m "feat(week4): scaffold week4 project workspace"
   git push -u origin week4
   ```
5. **Work on the exercise**:
   - Navigate to `projects/week4` and install dependencies:
     ```bash
     cd projects/week4
     npm install
     ```
   - Implement your structured dataset, filtering logic, and live DOM rendering in `src/app.js`.
6. **Commit updates, verify everything is working, and push fixes**:
   - Preview your application in the browser to ensure the live filter works as expected:
     ```bash
     npm start
     ```
   - Run tests to verify your code:
     ```bash
     npm test
     ```
   - Stage, commit, and push any changes needed to fix and finalize your solution.
7. **Open a Pull Request**:  
   Open a pull request on GitHub comparing `week4` against `main`, and request **artzte** as a
   reviewer.
8. **Submit on Canvas**:  
   Copy the URL of your PR, paste it into the Canvas assignment submission box, and submit it.
9. **Deadline**: This programming assignment is due by **Monday, October 19, 2026 at 11:59 PM** (the
   Monday following Week 4).
