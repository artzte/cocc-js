// ====================================================================
// Console Demo: Strings, Numbers, NaN, typeof, scope, const mutability
// ====================================================================

// 1. Open Chrome
// 2. Open DevTools
// 3. Ctrl+Shift+P
// 4. Type "Create snippet"
// 5. Paste this code into the snippet
// 6. Ctrl+S to save it (asterisk next to it should go away)

function stringDemo() {
  const rawInput = '   $49.99 sale price   '
  const clean = rawInput.trim()
  const withoutDollarSign = clean.slice(1)
  const price = parseFloat(withoutDollarSign)

  console.log({ rawInput, clean, withoutDollarSign, price })
  console.log(
    `Item price: $${price.toFixed(2)} (with tax: $${(price * 1.1).toFixed(2)})`,
  )
}

function NaNQuirks() {
  const bad = Number('oops')
  console.log(bad) // NaN
  console.log(typeof bad) // "number"
  console.log(bad === NaN) // false
  console.log(Number.isNaN(bad)) // true
}

function typeofDemo() {
  console.log(typeof 'hello') // "string"
  console.log(typeof 42) // "number"
  console.log(typeof true) // "boolean"
  console.log(typeof undefined) // "undefined"
  console.log(typeof { a: 1 }) // "object"
  console.log(typeof [1, 2, 3]) // "object"  -> Gotcha!
  console.log(Array.isArray([1, 2, 3])) // true       -> Proper check!
  console.log(typeof null) // "object"  -> 30-year-old bug!
}

function scopeAndConstMutabilityDemo() {
  // 1. Block scoping: var leaks, let does not
  if (true) {
    var leakedVar = 'I escaped!'
    let trappedLet = 'I am contained!'
  }
  console.log(leakedVar) // "I escaped!"
  // console.log(trappedLet); // ReferenceError!

  // 2. const: re-assignment vs mutation
  const roster = ['Alice', 'Bob']
  roster.push('Charlie') // OK: Mutating contents
  console.log(roster) // ["Alice", "Bob", "Charlie"]

  try {
    roster = ['Dave'] // ERROR: Re-assignment not allowed!
  } catch (e) {
    console.error(e.message) // "Assignment to constant variable"
  }
}

stringDemo()
NaNQuirks()
typeofDemo()
scopeAndConstMutabilityDemo()
