# HTML forms

For this week's assignment, we are accepting input from a user and performing actions based on the
qualities of that input. The classic way to handle data collection in the browser is using HTML
forms. Forms have around a long time, and they are a great tool because they have built-in to them,
several good behaviors:

- The ability to submit the data either by clicking a button or pressing Enter after typing data
  into an input field
- The ability to construct data payloads consisting of key-value pairs, drawn from the name
  attributes on the form fields, and the entered values
- Nice default handling of various types of input fields, such as radio buttons
- Ability to use browser-provided validation to fields (such as an email field or a date)

They are also infinitely styleable using CSS, which is the same benefit as with other field wrappers
such as the `div`, but `div` tag wrappers don't build in all the goodness listed above.

In this lecture, I'll go through the basic requirements of an HTML form, and explain how to "wire it
up" using JS event handlers.
