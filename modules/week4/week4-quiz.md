## Week 4 Quiz: Arrays, Loops, and Iteration

### Instructions

Answer each of the following five questions in a short essay response. Focus on explaining the
concepts in your own words, and feel free to include examples or personal observations to illustrate
your reasoning.

---

### Question 1: Array Mutation vs. Non-Mutating (Copying) Operations

JavaScript provides several built-in methods for modifying or extracting data from arrays. Some
methods mutate the array in place (such as `push()`, `pop()`, and `splice()`), while other
operations create and return a new array or shallow copy (such as `slice()` or the array spread
operator `[...arr]`). Explain the difference between these two approaches with a code example, and
discuss why modern software development often favors non-mutating operations when managing
application state.

---

### Question 2: Choosing the Right Looping Mechanism

JavaScript gives developers multiple ways to repeat operations over collections: traditional
counting `for` loops, condition-driven `while` loops, modern `for...of` loops, and the `.forEach()`
array method. Compare `for...of` with both a classic counting `for` loop and `.forEach()`. When
would you choose `for...of` over the others, and how do control-flow keywords like `break` and
`continue` behave differently between them?

---

### Question 3: The Iterator Protocol Under the Hood

In ES6, JavaScript formalized the Iterator Protocol. Explain what an **iterable** is and what an
**iterator** is. Specifically, describe what happens behind the scenes when a construct like
`for...of` or the spread operator (`...`) consumes an array. Why can `for...of` iterate over arrays,
strings, and Maps, but causes a `TypeError` if you attempt to use it directly on a plain JavaScript
object (`{ a: 1, b: 2 }`)?

---

### Question 4: Declarative Data Transformation with Higher-Order Methods

Higher-order array methods such as `.map()`, `.filter()`, and `.reduce()` accept callback functions
to process data collections without manual loop indices. Explain how `.map()` and `.filter()` work,
including what each method returns. How does chaining these methods together (e.g.,
`arr.filter(...).map(...)`) compare to writing a nested or multi-step traditional `for` loop?

---

### Question 5: Organizing Code at Scale (Classes, Modules, and Closures)

As applications grow beyond simple scripts, managing variable scope and state becomes essential.
Pick one of **ES6 Classes**, **ES Modules**, and **Functional Closures**, explain how it packages
data and behavior, and handles encapsulation (keeping private data private). Why did you pick this
one to write about?
