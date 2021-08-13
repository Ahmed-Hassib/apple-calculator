// get the screen
let screenResult = document.getElementById("calc-result");
// get all calculator buttons
let buttons = document.getElementsByTagName("button");
// initial total result
const initialRes = 0;
// initial num
let initialNum = 0;
// the final result
let result = 0;
// boolean for dot
let isDot = false;
// boolean for minus
let isMinus = false;
// boolean for operation
let isOperate = false;

// put the initial total result
screenResult.textContent = initialRes;

// add event to all buttons
for (const button of buttons) {
  // add event to every button
  button.addEventListener("click", (event) => {
    event.preventDefault();
    // button value
    const btnValue = button.dataset.val;
    // remove all active class
    removeActive();
    // track the screen size
    trackScreen();
    // check the button value is a number or not
    if (!isNaN(parseInt(btnValue))) {
      if (isOperate) {
        appendNumber(btnValue);
      } else {
        appendNumber(btnValue);
      }
    } else {
      button.classList.add("active");
      // check the operation that user enter
      switch (btnValue) {
        // clear the screen
        case "clear":
          clear();
          break;

        // append the dot
        case "dot":
          if (!isDot) {
            screenResult.textContent += ".";
            isDot = true;
          } else {
            isDot = false;
          }
          break;

        // add a minus
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

        // get the result of division by 100
        case "%":
          screenResult.textContent = persentage(
            parseFloat(screenResult.textContent)
          );
          break;

        // get the result of the division operation
        case "/":
          isOperate = true;
          break;

        // get the result of the multiplecation operation
        case "x":
          isOperate = true;
          break;

        // get the result of the subtraction operation
        case "-":
          isOperate = true;
          break;

        // get the result of the summision operation
        case "+":
          isOperate = true;
          initialNum = parseFloat(screenResult.textContent);
          break;

        // show the operation operation
        case "=":
          result = add(parseFloat(screenResult.textContent), initialNum);
          console.log(initialNum, parseFloat(screenResult.textContent), result);
          screenResult.textContent = result;
          break;

        // default case
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

// track the screen font size
function trackScreen() {
  // get screen font-size
  let fSize = screenProp(screenResult);
  if (screenResult.textContent.length <= 12) {
    // if length of screen value >= 4 digits and font-size >= 30 reduce font size
    // else if length of screen value < 4 digits and font-size < 80 increase font size
    if (screenResult.textContent.length >= 4 && fSize >= 30) {
      screenResult.style.fontSize = `${fSize - 5}px`;
    } else if (screenResult.textContent.length < 4 && fSize < 80) {
      screenResult.style.fontSize = `${fSize + 5}px`;
    }
  } else {
    alert("cannot add more digits");
  }
}

// append numbers to screen
function appendNumber(btnVal) {
  // check the screen value
  if (screenResult.textContent == "0") {
    screenResult.textContent = btnVal;
  } else {
    if (isOperate) {
      screenResult.textContent = btnVal;
      isOperate = false;
    } else {
      screenResult.textContent += btnVal;
    }
  }
}

// clear screen
function clear() {
  result = 0;
  initialNum = 0;
  isDot = false;
  isMinus = false;
  isOperate = false;
  screenResult.style.fontSize = "5rem";
  screenResult.textContent = initialRes;
  removeActive();
}

// function for persentage
function persentage(num) {
  return num / 100.0;
}

// add function
function add(num1, num2) {
  let addRes = parseFloat(num1) + parseFloat(num2);
  return addRes;
}
