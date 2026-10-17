## Week 5 Quiz: Lexical Scope

### Instructions

Answer each of the following five questions in a short essay response. Focus on explaining the
concepts in your own words, and feel free to include examples or personal observations to illustrate
your reasoning.

---

### Question 1: Compiled or Interpreted?

Many people describe JavaScript as an "interpreted" language that runs one line at a time.
[Scope & Closures (2nd Edition), Chapter 1: What's the Scope?](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch1.md)
argues that JavaScript is processed in two phases: compilation first, then execution. Describe at
least two pieces of evidence for the two-phase model, and explain why the compile phase matters for
understanding scope.

---

### Question 2: Targets and Sources

Every variable reference in a program plays one of two roles: a **target** (receiving a value) or a
**source** (supplying a value). Look at this code:

```javascript
function addTip(bill, percent) {
  const tip = bill * (percent / 100)
  return bill + tip
}

const total = addTip(40, 20)
console.log(total)
```

Identify at least four references in this code and label each one as a target or a source. Then
explain why the difference matters when the engine can't find a variable.

---

### Question 3: Scope Buckets

Using the "marbles and buckets" (or "bubbles") metaphor from
[Scope & Closures (2nd Edition), Chapter 2: Illustrating Lexical Scope](https://github.com/getify/You-Dont-Know-JS/blob/2nd-ed/scope-closures/ch2.md),
describe how JavaScript decides which scope a variable belongs to. Then write or describe a small
example with at least **three** nested scopes, and list which variables live in each one.

---

### Question 4: Looking Up a Variable

When code inside a nested function refers to a variable, how does the engine find it? Describe the
lookup process step by step, including what happens when the same name exists in more than one
scope, and what happens when the name isn't found anywhere. Why can an outer function never read a
variable declared inside an inner function?

---

### Question 5: Accidental Globals

The line `count = 0` (with no `let`, `const`, or `var`) behaves differently depending on whether the
code runs in strict mode. Explain what happens in each case and why. Then connect this to the Week 5
Global Mess example: what kinds of bugs happen when two pieces of code share the global scope, and
how do ES modules help prevent them?
