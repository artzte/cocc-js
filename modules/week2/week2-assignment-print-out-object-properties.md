## Week2 Assignment: Render object properties and types

Given a JS data object describing some real-world entity, like an animal, or a place, or a person,
write a script that reads the object and renders its contents into a pre-built HTML template — no
hardcoded strings in the HTML. Include the type of each attribute as reported by the `typeof`
operator. Insert the generated string into the DOM node identified by `#app`.

If you have time, make it look good! For example, you might extend your template to include a
heading, and a code block (using the <pre> tag) showing the original object from your source code.

### For your tests:

Create a new `week2.test.js` file, copy the starter test into it, and change the test so that it
finds the dom node that you rendered the template into, and add a few `it` invocations to check for
specific strings within your output.

#### Hint

If you rendered your output using an html table, you might include a `data-` attribute within your
table rows that will make it easier to locate the specific rows:

```
it('renders the name', () => {
  const row = document.querySelector('tr[data-test="name"]')
  expect(row).not.toBeNull();
  expect(row.textContent).toMatch(/josh/i);
})
```
