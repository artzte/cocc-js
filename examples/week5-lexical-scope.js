// ====================================================================
// CIS 133JS — Week 5: Lexical Scope Demos
// Two-phase processing, targets vs. sources, nested scopes, lookup
// ====================================================================

// --------------------------------------------------------------------
// Setup for Chrome DevTools Snippets:
// 1. Open Google Chrome to a blank tab (about:blank).
// 2. Open DevTools (F12 or Ctrl+Shift+I / Cmd+Option+I).
// 3. Switch to the "Sources" tab.
// 4. In the left panel, click "Snippets" (or press Ctrl+Shift+P / Cmd+Shift+P
//    and type "Create snippet").
// 5. Name the snippet "week5-lexical-scope.js".
// 6. Paste this code into the editor.
// 7. Press Ctrl+S (Cmd+S) to save, and Ctrl+Enter (Cmd+Enter) to run.
//
// Demo 5 adds a small panel of buttons to the page. Click them and
// watch the console.
// --------------------------------------------------------------------

function header(title) {
  console.log(
    `\n%c=== ${title} ===`,
    'color: #10b981; font-weight: bold; font-size: 13px;',
  )
}

// --------------------------------------------------------------------
// DEMO 1: Compile First, Then Execute
// --------------------------------------------------------------------
function twoPhasesDemo() {
  header('1. Compile First, Then Execute')

  // The engine reads (parses) the WHOLE function body before running
  // any of it. It already knows `greeting` belongs to this scope, even
  // though the declaration comes later. That's why this line throws a
  // ReferenceError (TDZ) instead of quietly using some outer `greeting`.
  try {
    console.log(greeting)
  } catch (err) {
    console.log('Caught before declaration:', err.name, '-', err.message)
  }

  let greeting = 'Hello, scope!'
  console.log('After declaration:', greeting)

  // To see a syntax error stop a whole program before ANY of it runs,
  // try the separate two-line snippet in week5-lexical-scope.md.
}

// --------------------------------------------------------------------
// DEMO 2: Targets and Sources
// --------------------------------------------------------------------
function targetsAndSourcesDemo() {
  header('2. Targets (receive a value) vs. Sources (supply a value)')

  var students = [
    // `students` is a TARGET: it receives the array
    { id: 14, name: 'Kyle' },
    { id: 73, name: 'Suzy' },
  ]

  // `getStudentName` is a TARGET too: a function declaration assigns
  // the function to the name when the scope starts.
  function getStudentName(studentID) {
    // `studentID` is a TARGET: it receives the argument value.
    for (let student of students) {
      // `student` is a TARGET (gets each value); `students` is a SOURCE.
      if (student.id == studentID) {
        // `student` and `studentID` are SOURCES here.
        return student.name
      }
    }
  }

  // `getStudentName` is a SOURCE (we read it to call it).
  // `nextStudent` is a TARGET (receives the return value).
  var nextStudent = getStudentName(73)

  // `nextStudent` is a SOURCE (we read it to log it).
  console.log('nextStudent:', nextStudent) // Suzy
}

// --------------------------------------------------------------------
// DEMO 3: Nested Scopes (Marbles in Colored Buckets)
// --------------------------------------------------------------------
// RED bucket (global scope): `scopeBucketsDemo`
function scopeBucketsDemo() {
  header('3. Nested Scopes: RED > BLUE > GREEN')

  // BLUE bucket (scopeBucketsDemo's scope): `course`, `teach`
  const course = 'CIS 133JS'

  function teach(topic) {
    // GREEN bucket (teach's scope): `topic`, `week`
    const week = 5

    // `topic` and `week` are found in GREEN.
    // `course` is not in GREEN, so the engine looks outward to BLUE.
    console.log(`${course}, week ${week}: ${topic}`)
  }

  teach('lexical scope')

  // From BLUE we cannot see into GREEN. Lookups only go outward.
  console.log('typeof week from BLUE:', typeof week) // "undefined"
}

// --------------------------------------------------------------------
// DEMO 4: Lookup Failures (Strict vs. Sloppy Mode)
// --------------------------------------------------------------------
function lookupFailuresDemo() {
  header('4. Lookup Failures')

  // A. Reading an undeclared SOURCE is always a ReferenceError.
  try {
    console.log(notDeclaredAnywhere)
  } catch (err) {
    console.log('Undeclared source:', err.name, '-', err.message)
  }

  // B. Assigning to an undeclared TARGET in sloppy mode quietly creates
  //    an accidental global variable. (Snippets run in sloppy mode.)
  function sloppyAssign() {
    accidentalGlobal = 'oops'
  }
  sloppyAssign()
  console.log(
    'Sloppy mode leaked window.accidentalGlobal:',
    window.accidentalGlobal,
  )
  delete window.accidentalGlobal // clean up so the demo can re-run

  // C. In strict mode, the same mistake throws instead. Strict mode is
  //    on automatically in ES modules, which is what our Vite projects use.
  function strictAssign() {
    'use strict'
    anotherAccidentalGlobal = 'oops'
  }
  try {
    strictAssign()
  } catch (err) {
    console.log('Strict mode:', err.name, '-', err.message)
  }
}

// --------------------------------------------------------------------
// DEMO 5: Nested Event Handlers — Who Can See What?
// --------------------------------------------------------------------
function nestedHandlersDemo() {
  header('5. Nested Event Handlers (click the buttons on the page)')

  // Remove an old panel if this snippet is run more than once.
  document.querySelector('#scope-panel')?.remove()

  // Scope A (nestedHandlersDemo): `panel`, `clickCount`, `addButton`
  const panel = document.createElement('div')
  panel.id = 'scope-panel'
  panel.style.cssText =
    'font: 16px system-ui; padding: 1rem; border: 2px solid #10b981;'
  panel.innerHTML = '<p>Week 5 scope panel</p>'
  document.body.append(panel)

  let clickCount = 0

  function addButton(label) {
    // Scope B (addButton): `label`, `button`
    const button = document.createElement('button')
    button.textContent = label
    panel.append(button)

    button.addEventListener('click', function onClick(event) {
      // Scope C (onClick): `event`, `message`
      clickCount++ // found in scope A, two levels out
      const message = `"${label}" clicked; total clicks: ${clickCount}`
      console.log(message)

      // Each button got its OWN scope B when addButton ran, so each
      // handler remembers its own `label` and `button`. But there is only
      // ONE scope A, so every handler shares the same `clickCount`.
      // (A function that keeps using its outer scope after that scope
      // has finished running is a closure. That's week 7.)
      console.log('  this handler sees:', { label, clickCount, message })
      console.log(
        '  scope A cannot see `message` or `label`; they live further in.',
      )
    })
  }

  addButton('Red')
  addButton('Blue')
  addButton('Green')

  console.log('Panel added. typeof label from scope A:', typeof label) // "undefined"
}

// --------------------------------------------------------------------
// Run all demos
// --------------------------------------------------------------------
twoPhasesDemo()
targetsAndSourcesDemo()
scopeBucketsDemo()
lookupFailuresDemo()
nestedHandlersDemo()
