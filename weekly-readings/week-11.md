# Week 11 Reading Summary: Async JavaScript: Promises, Fetch, and Async/Await

**Source**: MDN Student-Directed Readings (Using Promises, async function, Using the Fetch API)

---

### 1. Asynchronous JavaScript and the Event Loop
* **Single-Threaded Engine**: JavaScript has a single call stack and executes only one instruction at a time.
* **Non-Blocking Execution**: Long-running operations (like timers, file operations, or API calls) are offloaded to host environment threads (browser Web APIs or Node.js). 
* **The Event Loop**: Monitors the call stack and message queue. Once the call stack is empty, the event loop pushes completed asynchronous callbacks onto the stack for execution.
* **Callback Hell**: Relying heavily on nested callbacks for sequence management creates hard-to-read, nested code blocks (also known as the "Pyramid of Doom").

---

### 2. Promises
A `Promise` is an object representing the eventual completion or failure of an asynchronous operation.
* **Three Promise States**:
  1. **Pending**: Initial state; the operation is still running.
  2. **Fulfilled**: The operation completed successfully, resolving with a result value.
  3. **Rejected**: The operation failed, rejecting with an error reason.
* **Consuming Promises**:
  * `.then(onFulfilled)`: Chainable handler executed when the promise settles to fulfilled.
  * `.catch(onRejected)`: Handler executed if the promise (or any handler in the preceding chain) rejects.
  * `.finally(onSettled)`: Executes a callback regardless of success or failure. Ideal for teardown actions (e.g., hiding loading spinners).

---

### 3. `async` / `await`
* **Syntactic Sugar**: Built on top of Promises to allow writing asynchronous code that reads like synchronous code.
* **`async` Functions**: Any function prefixed with `async` automatically returns a Promise (wrapping non-promise return values in a resolved promise).
* **`await` Keyword**: Can only be used inside `async` functions. It pauses execution of the function scope until the awaited promise settles, returning its resolved value or throwing its rejected error.

---

### 4. The Fetch API
The standard modern browser API for making network requests.
* **Basic Use**: `fetch(url)` returns a Promise that resolves to a `Response` object.
* **Crucial Fetch Behavior**: 
  * A `fetch()` promise **only rejects on network failures** (e.g., DNS error, loss of connection).
  * It **does not reject** on HTTP error status codes (like 404 Not Found or 500 Internal Server Error). Instead, the response resolves normally, with its `ok` property set to `false` and `status` indicating the code.

---

### 5. Asynchronous Best Practices
* **Always Check `response.ok`**: Never assume a resolved fetch response means success. Always inspect `res.ok` before parsing JSON.
* **Use `try/catch` with `await`**: Wrap await calls in `try/catch` blocks to catch network errors and rejected promises safely.
* **Re-throw Errors in Helpers**: When writing modular API functions, catch errors to log them, but re-throw (`throw err`) so that the calling UI script can handle the failure and present the error state to the user.
* **UI State Management**: Always update the DOM to show:
  1. **Loading State**: (e.g., loading spinner) while the fetch is pending.
  2. **Error State**: (e.g., "Failed to load data") if the request fails.

#### Healthy Async Pattern:
```js
async function loadData(url) {
    try {
        const res = await fetch(url);
        // 1. Check for HTTP errors (e.g., 404, 500)
        if (!res.ok) {
            throw new Error(`HTTP Error: ${res.status}`);
        }
        // 2. Parse and return JSON
        return await res.json();
    } catch (err) {
        // 3. Log and re-throw for the UI handler to catch
        console.error("fetch failed:", err);
        throw err;
    }
}
```
