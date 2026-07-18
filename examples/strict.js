// "use strict";

function createMistake() {
  accidentalGlobal = "Oops!"; // Forgot 'let', 'const', or 'var'
}
createMistake();
console.log(accidentalGlobal); // Prints "Oops!"
