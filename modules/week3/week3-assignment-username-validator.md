## Week3 Assignment: Username Validator

Write a function that checks whether a username meets a set of rules, and display pass/fail feedback
for each individual rule in the DOM — no hardcoded results in the HTML.

### Rules to check

Implement at least the following rules. Feel free to add more.

- Minimum length (e.g., at least 4 characters)
- Maximum length (e.g., no more than 16 characters)
- No spaces allowed
- Must start with a letter (not a number or symbol)
- Only letters, numbers, and underscores allowed

### Suggested structure

Write small functions, one per rule, that each take a username string and return `true` or `false`.
Then write a function that runs all the rule functions against a given username and returns a result
you can render — for example, an array of `{ rule, passed }` objects.

Wire up a text input and a "Check" button (or an HTML form) so that submitting a username
immediately re-runs the checks and updates the pass/fail list in the DOM.

If you have time, make it look good! For example, style passing rules in green and failing rules in
red.

### For your tests:

Create a new `week3.test.js` file, copy the starter test into it, and change the test so that it
imports your individual rule functions directly and checks them against a handful of valid and
invalid usernames — you don't need the DOM for these tests, just plain function calls.

```js
import { hasMinLength, hasNoSpaces, startsWithLetter } from '../src/app.js'

it('rejects usernames that are too short', () => {
  expect(hasMinLength('ab')).toBe(false)
})

it('rejects usernames containing spaces', () => {
  expect(hasNoSpaces('bad user')).toBe(false)
})

it('accepts usernames starting with a letter', () => {
  expect(startsWithLetter('artzte')).toBe(true)
})
```

#### Hints

Testing your individual rule functions directly (rather than testing the rendered DOM output) is
usually easier and more reliable — it isolates your validation logic from your rendering logic. Only
add DOM-based tests if you have extra time.
