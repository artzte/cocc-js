// ==========================================
// Console Demo: Strings, Numbers, and NaN
// ==========================================

// 1. Strings: trim, slice, template literals
const rawInput = '   $49.99 sale price   '
const clean = rawInput.trim()
const price = parseFloat(clean.slice(1))
console.log(
  `Item price: $${price.toFixed(2)} (with tax: $${(price * 1.1).toFixed(2)})`,
)

// 2. NaN quirks
const bad = Number('oops')
console.log(bad) // NaN
console.log(typeof bad) // "number"
console.log(bad === NaN) // false
console.log(Number.isNaN(bad)) // true

// ==========================================
// Console Demo: Type Inspection
// ==========================================

console.log(typeof 'hello') // "string"
console.log(typeof 42) // "number"
console.log(typeof true) // "boolean"
console.log(typeof undefined) // "undefined"
console.log(typeof { a: 1 }) // "object"
console.log(typeof [1, 2, 3]) // "object"  -> Gotcha!
console.log(Array.isArray([1, 2, 3])) // true       -> Proper check!
console.log(typeof null) // "object"  -> 30-year-old bug!

// ==========================================
// Console Demo: Scope & Const Mutability
// ==========================================

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
