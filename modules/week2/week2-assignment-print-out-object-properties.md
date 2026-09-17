## Week2 Assignment: Render object properties and types

Given a JS data object describing some real-world entity, like an animal, or a place, or a person,
write a script that reads the object and renders its contents into a pre-built HTML template — no
hardcoded strings in the HTML. Include the type of each attribute as reported by the `typeof`
operator. Insert the generated string into the DOM node identified by `#app`.

If you have time, make it look good! For example, you might extend your template to include a
heading, and a code block (using the `<pre>` tag) showing the original object from your source code.

Here's an example object:

```
{
  name: 'Sherman',
  breed: 'Standard poodle',
  age: 6,
  sheds: false,
  friends: ['Frankie', 'Buddy', 'Toast', 'Hattie-Mae'],
}
```

### Some possibly helpful JavaScript methods

| Method                                                                                                            | Usefulness                                                                      |
| ----------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------- |
| [Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)     | Yields an array of keys to an object                                            |
| [Array.prototype.map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) | Returns an array in which each value is the return value of the passed function |     |

### For your tests:

Create a new `week2.test.js` file, copy the starter test into it, and change the test so that it
finds the dom node that you rendered the template into, and add a few `it` invocations to check for
specific strings within your output.

Since we're populating the `#app` DOM node with some different text, you'll probably need to delete
or comment-out one or more tests in the `starter-test.js`.

#### Hints

If you rendered your output using an html table, you might include a `data-` attribute within your
table rows that will make it easier to locate the specific rows.

For:

```
<table>
  <tr>
    <td>name</td>
    <td>Sherman</td>
    <td>string</td>
  </tr>
</table>
```

One might use this test:

```
it('renders the name', () => {
  const row = document.querySelector('tr[data-test="name"]')
  expect(row).not.toBeNull();
  expect(row.textContent).toMatch(/sherman/i);
})
```

That `toMatch` assertion is great, right? It uses a
[regular expression](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp),
which permits flexible matching patterns (such as using the `i` modifier, which tells the JavaScript
engine to ignore case variations), thus making your test more resilient to future changes.
