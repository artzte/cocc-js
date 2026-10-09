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
   `category`, `description`, `price` or `rating`).
2. **Pure Filtering Function**: Write a dedicated, pure helper function (e.g.,
   `filterItems(items, query)`) that takes an array of items and a search string, and returns a new
   filtered array.
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

### Suggested Code Structure

Keep your business logic (the filtering function) separate from your UI rendering and event logic.
This architectural separation makes your code easier to read and straightforward to unit test.

```js
// src/app.js

export const items = [
  { id: 1, title: 'JavaScript: The Definitive Guide', author: 'David Flanagan', category: 'Books' },
  { id: 2, title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', category: 'Books' },
  { id: 3, title: 'You Don’t Know JS Yet', author: 'Kyle Simpson', category: 'Books' },
  // ...add more items
]

export function filterItems(itemsList, query) {
  const normalizedQuery = (query || '').trim().toLowerCase()
  if (!normalizedQuery) {
    return itemsList
  }

  return itemsList.filter((item) => {
    const titleMatch = item.title.toLowerCase().includes(normalizedQuery)
    const authorMatch = item.author.toLowerCase().includes(normalizedQuery)
    const categoryMatch = item.category.toLowerCase().includes(normalizedQuery)
    return titleMatch || authorMatch || categoryMatch
  })
}

export function renderApp() {
  const root = document.querySelector('#app')
  // Render search box and initial list
  // Attach 'input' event listener to search input
}
```

---

### For Your Tests

Create a new test file at `test/week4.test.js`. Import your `filterItems` function and sample data,
and write Vitest tests covering standard, edge, and empty cases:

```js
import { describe, it, expect } from 'vitest'
import { filterItems } from '../src/app.js'

const testItems = [
  {
    id: 1,
    title: 'JavaScript: The Definitive Guide',
    author: 'David Flanagan',
    category: 'Reference',
  },
  { id: 2, title: 'Eloquent JavaScript', author: 'Marijn Haverbeke', category: 'Tutorial' },
  { id: 3, title: 'You Don’t Know JS Yet', author: 'Kyle Simpson', category: 'Deep Dive' },
]

describe('filterItems', () => {
  it('returns all items when the search query is empty', () => {
    expect(filterItems(testItems, '')).toEqual(testItems)
    expect(filterItems(testItems, '   ')).toEqual(testItems)
  })

  it('filters items matching the query in a case-insensitive manner', () => {
    const result = filterItems(testItems, 'eloquent')
    expect(result).toHaveLength(1)
    expect(result[0].title).toBe('Eloquent JavaScript')
  })

  it('matches across secondary fields like author or category', () => {
    const result = filterItems(testItems, 'simpson')
    expect(result).toHaveLength(1)
    expect(result[0].author).toBe('Kyle Simpson')
  })

  it('returns an empty array when no items match the query', () => {
    const result = filterItems(testItems, 'nonexistent query')
    expect(result).toEqual([])
  })

  it('does not mutate the original items array', () => {
    const copy = [...testItems]
    filterItems(testItems, 'JavaScript')
    expect(testItems).toEqual(copy)
  })
})
```

#### Testing Hints

Testing pure functions like `filterItems` directly isolates your algorithm logic from browser DOM
quirks. Verify your tests pass by running:

```bash
npm test
```

---

### Steps to Complete & Submit

1. Create your `week4` project folder from the starter template:
   ```bash
   scripts/mpf.sh week4
   ```
2. Navigate to `projects/week4` and install dependencies:
   ```bash
   cd projects/week4
   npm install
   ```
3. Implement your data list, `filterItems`, DOM rendering, and event listener in `src/app.js`.
4. Add unit tests in `test/week4.test.js` and verify with `npm test`.
5. Preview your application in the browser:
   ```bash
   npm run dev
   ```
6. Commit and push your changes to GitHub, create a Pull Request, and submit the PR link on Canvas
   with **artzte** assigned as a reviewer.
7. **Deadline**: This programming assignment is due by **Monday, October 19, 2026 at 11:59 PM** (the
   Monday following Week 4).
