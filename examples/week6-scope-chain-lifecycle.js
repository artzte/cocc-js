// ====================================================================
// CIS 133JS — Week 6: Scope Chain, Global Scope, and Variable Lifecycle
// Shadowing, the global object, hoisting, TDZ, and loops
// ====================================================================

// --------------------------------------------------------------------
// Setup for Chrome DevTools Snippets:
// 1. Open Google Chrome to a blank tab (about:blank).
// 2. Open DevTools (F12 or Ctrl+Shift+I / Cmd+Option+I).
// 3. Switch to the "Sources" tab.
// 4. In the left panel, click "Snippets" (or press Ctrl+Shift+P / Cmd+Shift+P
//    and type "Create snippet").
// 5. Name the snippet "week6-scope-chain-lifecycle.js".
// 6. Paste this code into the editor.
// 7. Press Ctrl+S (Cmd+S) to save, and Ctrl+Enter (Cmd+Enter) to run.
//
// Snippets run as classic scripts in sloppy mode, so top-level `var`
// declarations here really do land on the global object (`window`).
// --------------------------------------------------------------------

function header(title) {
  console.log(
    `\n%c=== ${title} ===`,
    'color: #10b981; font-weight: bold; font-size: 13px;',
  )
}

// A real global variable for demos 1 and 2.
var studentName = 'Suzy'

// --------------------------------------------------------------------
// DEMO 1: Shadowing
// --------------------------------------------------------------------
function shadowingDemo() {
  header('1. Shadowing')

  function printStudent(studentName) {
    // The parameter `studentName` SHADOWS the global `studentName`.
    // Lookup stops at the first match, which is this function's scope.
    studentName = studentName.toUpperCase()
    console.log('inside printStudent:', studentName)
  }

  printStudent('Frank') // FRANK
  console.log('global studentName is untouched:', studentName) // Suzy
}

// --------------------------------------------------------------------
// DEMO 2: The Global Object (window / globalThis)
// --------------------------------------------------------------------
function globalObjectDemo() {
  header('2. The Global Object')

  // Global `var` and function declarations become properties of the
  // global object.
  console.log('window.studentName:', window.studentName) // Suzy
  console.log('typeof window.shadowingDemo:', typeof window.shadowingDemo) // function

  // `globalThis` is the same object, in every JS environment.
  console.log('globalThis === window:', globalThis === window) // true

  function lookAround() {
    const studentName = 'Frank' // shadows the global
    console.log('local studentName:', studentName) // Frank
    // The "global unshadowing trick": works only for var/function globals.
    console.log('window.studentName:', window.studentName) // Suzy
  }
  lookAround()

  // Copying is not accessing: this copies the VALUE, not the variable.
  const copied = window.studentName
  console.log('copied value:', copied)

  // DOM elements with an `id` also show up as globals. Surprise!
  const box = document.createElement('div')
  box.id = 'scoreboardBox'
  document.body.append(box)
  console.log(
    'window.scoreboardBox is the element:',
    window.scoreboardBox === box,
  ) // true
  box.remove()
  console.log('after removing it:', typeof window.scoreboardBox) // undefined
}

// --------------------------------------------------------------------
// DEMO 3: Function Name Scope
// --------------------------------------------------------------------
function functionNameScopeDemo() {
  header('3. Function Name Scope')

  // A named function expression: `ask` is the VARIABLE in this scope;
  // `ofTheTeacher` is a name that exists only INSIDE the function.
  const ask = function ofTheTeacher() {
    'use strict'
    console.log('inside, typeof ofTheTeacher:', typeof ofTheTeacher) // function
    try {
      ofTheTeacher = 42 // read-only inside the function
    } catch (err) {
      console.log('assigning to it:', err.name, '-', err.message)
    }
  }

  ask()
  console.log('outside, typeof ofTheTeacher:', typeof ofTheTeacher) // undefined
}

// --------------------------------------------------------------------
// DEMO 4: Hoisting
// --------------------------------------------------------------------
function hoistingDemo() {
  header('4. Hoisting')

  // Function DECLARATIONS are hoisted and initialized with the function.
  console.log('calling before declaration:', greet('Ada'))

  // `var` is hoisted and initialized to undefined.
  console.log('var before assignment:', teacher) // undefined
  var teacher = 'Kyle'
  console.log('var after assignment:', teacher) // Kyle

  // A function EXPRESSION assigned to a var: the var is hoisted (as
  // undefined), but the function isn't there yet.
  try {
    farewell('Ada')
  } catch (err) {
    console.log(
      'calling a var function expression early:',
      err.name,
      '-',
      err.message,
    )
  }
  var farewell = function (name) {
    return `Goodbye, ${name}`
  }

  function greet(name) {
    return `Hello, ${name}`
  }
}

// --------------------------------------------------------------------
// DEMO 5: The Temporal Dead Zone (TDZ)
// --------------------------------------------------------------------
function tdzDemo() {
  header('5. Temporal Dead Zone')

  // `let` and `const` are hoisted too, but NOT initialized. From the start
  // of the scope until the declaration line runs, they're in the TDZ.
  try {
    console.log(points)
  } catch (err) {
    console.log('reading too early:', err.name, '-', err.message)
  }
  let points = 10
  console.log('after declaration:', points)

  // TDZ is about TIME, not position. This function is written below
  // `bonus`'s declaration... but we CALL it before that line runs.
  function readBonus() {
    return bonus
  }
  try {
    readBonus()
  } catch (err) {
    console.log('calling readBonus() too early:', err.name, '-', err.message)
  }
  const bonus = 5
  console.log('calling readBonus() after:', readBonus()) // 5

  // The fix is simple: declare let/const at the top of their scope.
}

// --------------------------------------------------------------------
// DEMO 6: Re-declaration and const
// --------------------------------------------------------------------
function redeclarationDemo() {
  header('6. Re-declaration and const')

  var round = 1
  var round // a harmless no-op: `round` already exists in this scope
  console.log('round after re-declaring with var:', round) // 1

  // let round = 2   // would be a SyntaxError (see the .md file to try it)

  const roster = ['Ada', 'Grace']
  roster.push('Alan') // allowed: const blocks re-ASSIGNMENT, not mutation
  console.log('const array can still change:', roster)
  try {
    roster = []
  } catch (err) {
    console.log('re-assigning a const:', err.name, '-', err.message)
  }
}

// --------------------------------------------------------------------
// DEMO 7: Loops — one variable, or one per iteration?
// --------------------------------------------------------------------
function loopsDemo() {
  header('7. var vs. let in Loops')

  const varFns = []
  for (var i = 0; i < 3; i++) {
    varFns.push(() => i)
  }
  // ONE `i` for the whole function, and it's 3 by the time we look.
  console.log(
    'var loop:',
    varFns.map((fn) => fn()),
  ) // [3, 3, 3]

  const letFns = []
  for (let j = 0; j < 3; j++) {
    letFns.push(() => j)
  }
  // A NEW `j` for every iteration.
  console.log(
    'let loop:',
    letFns.map((fn) => fn()),
  ) // [0, 1, 2]

  console.log('i leaked out of its loop:', i) // 3
  console.log('typeof j outside its loop:', typeof j) // undefined
}

// --------------------------------------------------------------------
// DEMO 8: Debug Challenge
// --------------------------------------------------------------------
// This function is supposed to print:
//
//   Welcome back, Ada! You have 3 new messages.
//
// Instead, it prints something else. Find BOTH bugs (one is hoisting,
// one is shadowing) and fix them so that it prints the line above.
// Your fix should still print "no new messages" when messageCount is 0.
function debugChallenge() {
  header('8. Debug Challenge')

  showWelcome()

  var userName = 'Ada'
  var messageCount = 3

  function showWelcome() {
    if (messageCount === 0) {
      var messageCount = 'no'
    }
    console.log(
      `Welcome back, ${userName}! You have ${messageCount} new messages.`,
    )
  }
}

// --------------------------------------------------------------------
// Run all demos
// --------------------------------------------------------------------
shadowingDemo()
globalObjectDemo()
functionNameScopeDemo()
hoistingDemo()
tdzDemo()
redeclarationDemo()
loopsDemo()
debugChallenge()
