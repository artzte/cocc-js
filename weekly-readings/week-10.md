# Week 10 Reading Summary: Events and the DOM

**Source**: MDN Student-Directed Readings (Introduction to Events, Event Reference, input event)

---

### 1. The DOM Event Model
Events are signals fired by the browser when actions occur (e.g., clicks, keypresses, window resizing). Event listeners/handlers are functions registered to listen for and respond to these signals.

#### Event Propagation (Flow)
When an event occurs on an element nested inside other elements, it propagates through three phases:
1. **Capturing Phase**: The event travels down the DOM tree from the root (`window`, `document`) to the target element.
2. **Target Phase**: The event triggers on the actual target element that initiated the action.
3. **Bubbling Phase**: The event travels back up the DOM tree from the target element to the root.
* **Default Behavior**: By default, event listeners trigger during the **bubbling** phase.

---

### 2. Managing Event Listeners
* **`addEventListener(type, listener, options)`**:
  Registers an event handler on a target.
  * **Options Object**:
    * `capture`: A boolean. If `true`, forces the listener to trigger during the **capturing** phase instead of bubbling.
    * `once`: A boolean. If `true`, automatically removes the event listener after it runs once.
    * `passive`: A boolean. If `true`, guarantees that the handler will not call `preventDefault()`, allowing the browser to optimize rendering (crucial for smooth touch/scroll events).
* **`removeEventListener(type, listener, options)`**:
  Removes a registered listener.
  * *Important*: To successfully unsubscribe, you must pass references to the **exact same** event type, callback function, and `capture` option used in `addEventListener`. Anonymous functions cannot be easily removed this way.

---

### 3. The Event Object (`evt` / `e`)
When an event fires, the browser automatically passes an `Event` object to the handler:
* **`target`**: A reference to the element that **originated** the event (e.g., the specific button clicked).
* **`currentTarget`**: A reference to the element that is **currently handling** the event (the element where the event listener is attached).
* **`preventDefault()`**: Cancels the browser's default action associated with the event (e.g., preventing a form submit from reloading the page, or a link from navigating).
* **`stopPropagation()`**: Prevents the event from traveling further up or down the DOM tree (halts capturing/bubbling).

---

### 4. Event Delegation
* **Concept**: Instead of attaching individual listeners to dozens of child elements (e.g., every `<li>` in a list), you attach a **single listener to their parent container** (e.g., the `<ul>`).
* **Implementation**: The parent's handler uses `evt.target` to identify which child was clicked.
* **Benefits**:
  1. **Memory Efficiency**: Keeps the number of active event listeners low.
  2. **Dynamic Elements**: Automatically handles events for child elements that are added to the DOM dynamically *after* the initial page load.

---

### 5. Forms and Input Handling
* **`submit` event**: Fired on the `<form>` when submitted. Handlers typically use `evt.preventDefault()` to stop the browser's default page refresh and handle data submission asynchronously (e.g., via `fetch`).
* **`input` event**: Fires synchronously whenever the value of an `<input>`, `<textarea>`, or `<select>` element changes. Ideal for real-time validation or search filtering.
* **`change` event**: Fires when the control loses focus after its value changes, or when check state/selections change.
* **Reading Form Data**:
  * Individual fields: accessed via `inputElement.value`.
  * Bulk forms: managed cleanly using `new FormData(formElement)`.
