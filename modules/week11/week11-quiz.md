## Week 11 Quiz: Promises, `fetch`, and HTTP Status Codes

### Instructions

Answer each of the following five questions in a short essay response. Focus on explaining the
concepts in your own words, and feel free to include examples or personal observations to illustrate
your reasoning.

---

### Question 1: Promise States

As discussed in
[Using Promises](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises), a
Promise is always in one of three states. Describe what each state means.

---

### Question 2: Why `fetch` Doesn't Reject on a 404

As discussed in
[Using the Fetch API](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch), the
Promise returned by `fetch()` fulfills even when the server answers with `404 Not Found`. Why
doesn't it reject, and what should your code check instead?

---

### Question 3: 4xx vs. 5xx Status Codes

Using the
[HTTP response status codes](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status)
reference, explain the difference between a **4xx** status code and a **5xx** status code.

---

### Question 4: What Happens While `await` Waits

As discussed in
[async function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function),
`await` pauses an `async` function until a Promise settles. While one function is paused waiting for
a `fetch`, why doesn't the rest of the page freeze?

---

### Question 5: Empty Results vs. Errors

In this week's Weather Search assignment, a search can come back with no matching places, or it can
fail. Explain why an empty result should be treated differently from an error.
