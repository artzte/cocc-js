// ====================================================================
// CIS 133JS — Week 5: The Global Mess
//
// WARNING: this script is broken ON PURPOSE. Do not copy its patterns.
//
// Two developers each added a widget to the same page. Each widget
// worked fine on its own. Together, they break each other.
//
// This file is loaded as a classic (non-module) script, in sloppy
// (non-strict) mode, so every top-level declaration lands in the
// global scope. That's the environment where these bugs thrive.
// ====================================================================

// --------------------------------------------------------------------
// Developer A: Tip splitter
// --------------------------------------------------------------------
var input
var result
var total = 0
var count = 0

function readNumber(id) {
  input = document.getElementById(id)
  return Number(input.value)
}

function calculate() {
  total = readNumber('bill')
  var tipPercent = readNumber('tip')
  count = readNumber('people')

  total = total + (total * tipPercent) / 100
  result = '$' + (total / count).toFixed(2) + ' per person'
  show()
}

function show() {
  document.getElementById('tip-result').textContent = result
}

document.getElementById('split-btn').addEventListener('click', calculate)

// --------------------------------------------------------------------
// Developer B: Word counter (added a month later)
// --------------------------------------------------------------------
function calculate() {
  input = document.getElementById('words')
  words = input.value.trim().split(/\s+/)
  count = 0
  longest = ''

  for (i = 0; i < words.length; i++) {
    if (words[i] !== '') {
      count++
    }
    if (words[i].length > longest.length) {
      longest = words[i]
    }
  }

  result = count + ' words; longest word: "' + longest + '"'
  show()
}

function show() {
  document.getElementById('word-result').textContent = result
}

document.getElementById('count-btn').addEventListener('click', calculate)
