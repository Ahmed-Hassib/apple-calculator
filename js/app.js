// get the screen
let screenResult = document.getElementById("calc-result");
// get all calculator buttons
let buttons = document.getElementsByTagName("button");
// initial total result
const initialRes = 0;

// put the initial total result
screenResult.textContent = initialRes;

// add event to all buttons
for (const button of buttons) {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    // clear screen when click AC button
    if (button.dataset.val == "clear") {
      clear();
    }

    // check the button value
    if (!isNaN(parseInt(button.dataset.val))) {
      /**
       * check the screen value if "zero" or not
       * if "zero" replace zero with the pressed button value
       * if not "zero" append the pressed button value
       */
      if (screenResult.textContent == "0") {
        screenResult.textContent = button.dataset.val;
      } else {
        /**
         * get font-size of screen result
         * and check the screen result value
         * if the length of screen > 5 reduce the font-size
         */
        const fSize = screenFontsize(screenResult);
        if (screenResult.textContent.length >= 4 && fSize >= 30) {
          screenResult.style.fontSize = `${fSize - 5}px`;
        } else if ((screenResult.textContent.length <= 4) & (fSize < 80)) {
          screenResult.style.fontSize = `${fSize + 5}px`;
        }
        screenResult.textContent += button.dataset.val;
      }
    }
  });
}

// get screen font size
function screenFontsize(screen) {
  var style = window
    .getComputedStyle(screenResult, null)
    .getPropertyValue("font-size");
  return parseFloat(style);
}
// clear screen
function clear() {
  screenResult.textContent = initialRes;
}

// function to add numbers
function add() {}
