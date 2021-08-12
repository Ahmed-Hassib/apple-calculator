// get the screen
let screenResult = document.getElementById("calc-result");
// get all calculator buttons
let buttons = document.getElementsByTagName("button");
// initial total result
const initialRes = 0;
// the final result
let result = 0;
// boolean for dot
let isDot = false;
// boolean for minus
let isMinus = false;
// put the initial total result
screenResult.textContent = initialRes;

// add event to all buttons
for (const button of buttons) {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    removeActive();

    // check the button value
    if (!isNaN(parseInt(button.dataset.val))) {
      /**
       * check the screen value if "zero" or not
       * if "zero" replace zero with the pressed button value
       * if not "zero" append the pressed button value
       */
      if (screenResult.textContent == "0") {
        screenResult.textContent = button.dataset.val;
      } else if (screenResult.textContent.length <= 12) {
        /**
         * get font-size of screen result
         * and check the screen result value
         * if the length of screen > 5 reduce the font-size
         */
        let fSize = screenProp(screenResult);

        if (screenResult.textContent.length >= 4 && fSize >= 30) {
          screenResult.style.fontSize = `${fSize - 5}px`;
        } else if (screenResult.textContent.length <= 4 && fSize < 80) {
          screenResult.style.fontSize = `${fSize + 5}px`;
        }
        screenResult.textContent += button.dataset.val;
      } else {
        alert("cannot add more digits");
      }
    } else {
      switch (button.dataset.val) {
        case "clear":
          clear();
          break;

        case "dot":
          if (!isDot) {
            screenResult.textContent += ".";
            isDot = true;
          }
          break;

        case "minus":
          if (isMinus) {
            screenResult.textContent = `${screenResult.textContent.replace(
              "-",
              ""
            )}`;
            isMinus = false;
          } else {
            screenResult.textContent = `-${screenResult.textContent}`;
            isMinus = true;
          }
          break;

        case "%":
          screenResult.textContent = persentage(
            parseFloat(screenResult.textContent)
          );
          break;

        default:
          break;
      }
    }
  });
}

// remove active class from buttons
function removeActive() {
  for (const button of buttons) {
    button.classList.remove("active");
  }
}
// get screen font size
function screenProp(screen) {
  var fontSize = window
    .getComputedStyle(screen, null)
    .getPropertyValue("font-size");

  return parseFloat(fontSize);
}
// clear screen
function clear() {
  screenResult.style.fontSize = "5rem";
  screenResult.textContent = initialRes;
  removeActive();
  isDot = false;
}

// function to add numbers
function add() {}

// function for persentage
function persentage(num) {
  return num / 100.0;
}
