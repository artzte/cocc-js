# Console Demo: Function Forms and Comparisons

## Setup

1. Open Chrome
2. Open DevTools
3. Ctrl+Shift+P
4. Type "Create snippet"
5. Paste the code below into the snippet
6. Ctrl+S to save it (asterisk next to it should go away)

```js
function functionFormsDemo() {
  function greetDeclaration(name) {
    return `Hello, ${name}!`
  }

  const greetExpression = function (name) {
    return `Hello, ${name}!`
  }

  const greetArrow = (name) => `Hello, ${name}!`

  console.log(greetDeclaration('Ada'))
  console.log(greetExpression('Ada'))
  console.log(greetArrow('Ada'))

  // Hoisting difference:
  console.log(hoisted('Grace')) // Works! Function declarations hoist fully.
  function hoisted(name) {
    return `Hi, ${name}`
  }
}

function parametersAndReturnsDemo() {
  function makeGreeting(name = 'friend', punctuation = '!') {
    return `Hello, ${name}${punctuation}`
  }

  console.log(makeGreeting()) // "Hello, friend!"
  console.log(makeGreeting('Sam')) // "Hello, Sam!"
  console.log(makeGreeting('Sam', '?')) // "Hello, Sam?"

  function minMax(numbers) {
    return { min: Math.min(...numbers), max: Math.max(...numbers) }
  }

  const { min, max } = minMax([4, 9, 1, 7])
  console.log(min, max) // 1 9
}

function strictVsLooseEqualityDemo() {
  console.log(1 === 1) // true
  console.log(1 === '1') // false — different types
  console.log(1 == '1') // true  — coerced to numbers first

  console.log(null == undefined) // true  — special-cased
  console.log(null === undefined) // false — different types

  console.log([1, 2, 3] === [1, 2, 3]) // false — different array references
  const a = [1, 2, 3]
  const b = a
  console.log(a === b) // true — same reference

  console.log(NaN === NaN) // false — NaN never equals itself
  console.log(Number.isNaN(NaN)) // true — the correct way to check
}

function truthyFalsyDemo() {
  if ('') console.log('truthy')
  else console.log('falsy') // "" is falsy

  if ('0')
    console.log('truthy') // "0" (a string) is truthy!
  else console.log('falsy')

  if ([])
    console.log('truthy') // empty array is truthy!
  else console.log('falsy')

  const age = 20
  const status = age >= 18 ? 'adult' : 'minor'
  console.log(status) // "adult"
}

function usernameValidatorDemo() {
  function hasMinLength(username) {
    return username.length >= 4
  }

  function hasNoSpaces(username) {
    return !username.includes(' ')
  }

  function startsWithLetter(username) {
    return /^[a-zA-Z]/.test(username)
  }

  const candidates = ['ab', 'bad user', 'artzte', '7leading']

  candidates.forEach((username) => {
    console.log(username, {
      hasMinLength: hasMinLength(username),
      hasNoSpaces: hasNoSpaces(username),
      startsWithLetter: startsWithLetter(username),
    })
  })
}

function header(label) {
  console.log(`\n\n***** ${label}`)
}

header('functionFormsDemo()')
functionFormsDemo()

header('parametersAndReturnsDemo()')
parametersAndReturnsDemo()

header('strictVsLooseEqualityDemo()')
strictVsLooseEqualityDemo()

header('truthyFalsyDemo()')
truthyFalsyDemo()

header('usernameValidatorDemo()')
usernameValidatorDemo()
```

## What to Watch For

- `functionFormsDemo` — all three forms print the same greeting, but only the function declaration
  (`hoisted`) can be called before its definition line.
- `strictVsLooseEqualityDemo` — `1 == '1'` coerces to `true`, while `1 === '1'` stays `false`;
  objects and arrays always compare by reference, never by contents.
- `truthyFalsyDemo` — `"0"` (a string) and `[]` (an empty array) are both truthy, which surprises
  most people coming from other languages.
- `usernameValidatorDemo` — a preview of this week's assignment: small, single-purpose rule
  functions that each return `true`/`false` for one validation check.
