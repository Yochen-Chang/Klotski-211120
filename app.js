// Nav setting

let introBtn = document.querySelector("#introBtn");
let masking = document.querySelector("#masking");
let gameIntroduction = document.querySelector("#gameIntroduction");
let crossBox = document.querySelector("#crossBox");

"click touchstart".split(" ").forEach((e) => {
  introBtn.addEventListener(e, () => {
    masking.classList.toggle("hidden");
    gameIntroduction.classList.toggle("hidden");
  });
});

"click touchstart".split(" ").forEach((e) => {
  crossBox.addEventListener(e, () => {
    masking.classList.add("hidden");
    gameIntroduction.classList.add("hidden");
  });
  masking.addEventListener(e, () => {
    masking.classList.add("hidden");
    gameIntroduction.classList.add("hidden");
  });
});

// Initial setting --------------------------
let chessboardStart = [
  [0.121, 0.22, 0.22, 0.122],
  [0.121, 0.22, 0.22, 0.122],
  [0.123, 0.21, 0.21, 0.124],
  [0.123, 0.111, 0.112, 0.124],
  [0.113, 0, 0, 0.114],
];
/* Chess type
0 -> no-block,
0.111~0.114 -> 1x1-block,
0.21 -> 2x1-block,
0.121~0.124 -> 1x2-block,
0.22 -> 2x2-block,
*/
let currentChessboard;
if (localStorage.getItem("chessboard") && (localStorage.getItem("chessboard") != -1)) {
  currentChessboard = jsonToChessboard(localStorage.getItem("chessboard"));
} else {
  currentChessboard = chessboardStart;
}
let currentLocation = indexOf2D(currentChessboard, 0.111);
let stepCounter = 0;
if (localStorage.getItem("steps")) {
  stepCounter = Number(localStorage.getItem("steps"));
}
// Get elements from html
let chesses = document.querySelectorAll(".chessBlock");

// Set current location

// Show chesses
printChessboard(currentChessboard);
selecting(currentLocation, currentLocation);

// Control setting ------------------------------
// Control Btns setting
let btnArray = [
  document.querySelector("#rightBtn"),
  document.querySelector("#leftBtn"),
  document.querySelector("#bottomBtn"),
  document.querySelector("#topBtn"),
];
// Chess moving by button
let directionArray = ["right", "left", "bottom", "top"];
for (let i = 0; i < btnArray.length; i++) {
  btnArray[i].addEventListener("click", () => {
    moving(directionArray[i]);
  });
}
// Chess moving by keyboard
window.addEventListener("keydown", (target) => {
  if (target.key == "ArrowRight") {
    target.preventDefault();
    moving("right");
  } else if (target.key == "ArrowLeft") {
    target.preventDefault();
    moving("left");
  } else if (target.key == "ArrowDown") {
    target.preventDefault();
    moving("bottom");
  } else if (target.key == "ArrowUp") {
    target.preventDefault();
    moving("top");
  }
});

// Reset setting
let resetBtn = document.querySelector("#resetBtn");
"click touchstart".split(" ").forEach((e) => {
  resetBtn.addEventListener(e, () => {
    if (confirm("Sure to start a new game?")) {
      localStorage.removeItem("chessboard");
      localStorage.removeItem("steps");
      location.reload();
    } else {
    }
  });
});

// Material setting
let materialBtn = document.querySelector("#materialBtn");
"click touchstart".split(" ").forEach((e) => {
  materialBtn.addEventListener(e, () => {
    materialBtn.children[0].classList.toggle("active");
    chesses.forEach((e) => {
      e.classList.toggle("material");
    });
  });
});

// functions ---------------------------
// Print chessboard
function printChessboard(currentChessboard) {
  let chessY;
  let chessX;
  let chessMoved = document.querySelector("#chessMoved");
  // Let count for css print
  let [count121, count122, count123, count124, count21, count22] = [
    1, 1, 1, 1, 1, 1,
  ];
  // Clear previous type
  clearTypes();
  for (let i = 0; i < chesses.length; i++) {
    // Transform index from 1D to 2D
    [chessY, chessX] = array1Dto2D(i);
    // Detect chess type
    let chessData = currentChessboard[chessY][chessX];
    // Add css type on chesses
    switch (chessData) {
      case 0.111:
        addType(chesses[i], "block1x1");
        setChessStatus(i, "block1x1", chessData);
        break;
      case 0.112:
        addType(chesses[i], "block1x1");
        setChessStatus(i, "block1x1", chessData);
        break;
      case 0.113:
        addType(chesses[i], "block1x1");
        setChessStatus(i, "block1x1", chessData);
        break;
      case 0.114:
        addType(chesses[i], "block1x1");
        setChessStatus(i, "block1x1", chessData);
        break;
      case 0.21:
        if (count21 == 1) {
          addType(chesses[i], "block2x1L");
          setChessStatus(i, "block2x1L", chessData);
          count21 += 1;
        } else {
          addType(chesses[i], "block2x1R");
          setChessStatus(i, "block2x1R", chessData);
          count21 = 1;
        }
        break;
      case 0.121:
        if (count121 == 1) {
          addType(chesses[i], "block1x2T");
          setChessStatus(i, "block1x2T", chessData);
          count121 += 1;
        } else {
          addType(chesses[i], "block1x2B");
          setChessStatus(i, "block1x2B", chessData);
          count121 = 1;
        }
        break;
      case 0.122:
        if (count122 == 1) {
          addType(chesses[i], "block1x2T");
          setChessStatus(i, "block1x2T", chessData);
          count122 += 1;
        } else {
          addType(chesses[i], "block1x2B");
          chesses[i].type = "block1x2B";
          setChessStatus(i, "block1x2B", chessData);
          count122 = 1;
        }
        break;
      case 0.123:
        if (count123 == 1) {
          addType(chesses[i], "block1x2T");
          setChessStatus(i, "block1x2T", chessData);
          count123 += 1;
        } else {
          addType(chesses[i], "block1x2B");
          setChessStatus(i, "block1x2B", chessData);
          count123 = 1;
        }
        break;
      case 0.124:
        if (count124 == 1) {
          addType(chesses[i], "block1x2T");
          setChessStatus(i, "block1x2T", chessData);
          count124 += 1;
        } else {
          addType(chesses[i], "block1x2B");
          setChessStatus(i, "block1x2B", chessData);
          count124 = 1;
        }
        break;
      case 0.22:
        if (count22 == 1) {
          addType(chesses[i], "block2x2TL");
          setChessStatus(i, "block2x2TL", chessData);
          count22 += 1;
        } else if (count22 == 2) {
          addType(chesses[i], "block2x2TR");
          setChessStatus(i, "block2x2TR", chessData);
          count22 += 1;
        } else if (count22 == 3) {
          addType(chesses[i], "block2x2BL");
          setChessStatus(i, "block2x2BL", chessData);
          count22 += 1;
        } else {
          addType(chesses[i], "block2x2BR");
          setChessStatus(i, "block2x2BR", chessData);
          count22 = 1;
        }
        break;
      default:
        chesses[i].type = "empty";
        chesses[i].location = array1Dto2D(i);
    }
  }
  if (stepCounter >= 1) {
    chessMoved.innerHTML = `You have moved ${stepCounter} steps.`;
  }
  localStorage.setItem("chessboard", currentChessboard);
  localStorage.setItem("currentLocation", currentLocation);
}

// Detect the type of block
function detectType(element) {
  // All chess type
  let types =
    "block1x1 block2x1L block2x1R block1x2T block1x2B block2x2TL block2x2TR block2x2BL block2x2BR".split(
      " "
    );
  // Detect chess type
  for (i of types) {
    if (element.classList.contains(i)) {
      return i;
    }
  }
  return "empty";
}

// Set status(type & location) and add click event
function setChessStatus(i, type, chessData) {
  chesses[i].type = type;
  chesses[i].chessData = chessData;
  "click touchstart".split(" ").forEach((e) => {
    chesses[i].addEventListener(e, () => {
      // Unselect the previous chess
      let j = array2Dto1D(currentLocation);
      let prevType = chesses[j].type;
      switch (prevType) {
        case "block1x1":
          addCss(chesses[j], "unselect");
          break;
        case "block2x1L":
          addCss(chesses[j], "unselect");
          addCss(chesses[j + 1], "unselect");
          break;
        case "block2x1R":
          addCss(chesses[j], "unselect");
          addCss(chesses[j - 1], "unselect");
          currentLocation = array1Dto2D([i - 1]);
          break;
        case "block1x2T":
          addCss(chesses[j], "unselect");
          addCss(chesses[j + 4], "unselect");
          break;
        case "block1x2B":
          addCss(chesses[j], "unselect");
          addCss(chesses[j - 4], "unselect");
          currentLocation = array1Dto2D([i - 4]);
          break;
        case "block2x2TL":
          addCss(chesses[j], "unselect");
          addCss(chesses[j + 1], "unselect");
          addCss(chesses[j + 4], "unselect");
          addCss(chesses[j + 5], "unselect");
          break;
        case "block2x2TR":
          addCss(chesses[j - 1], "unselect");
          addCss(chesses[j], "unselect");
          addCss(chesses[j + 3], "unselect");
          addCss(chesses[j + 4], "unselect");
          currentLocation = array1Dto2D([i - 1]);
          break;
        case "block2x2BL":
          addCss(chesses[j - 4], "unselect");
          addCss(chesses[j - 3], "unselect");
          addCss(chesses[j], "unselect");
          addCss(chesses[j + 1], "unselect");
          currentLocation = array1Dto2D([i - 4]);
          break;
        case "block2x2BR":
          addCss(chesses[j - 5], "unselect");
          addCss(chesses[j - 4], "unselect");
          addCss(chesses[j - 1], "unselect");
          addCss(chesses[j], "unselect");
          currentLocation = array1Dto2D([i - 5]);
          break;
      }
      // Show the select chess
      let selectType = chesses[i].type;
      switch (selectType) {
        case "block1x1":
          removeCss(chesses[i], "unselect");
          currentLocation = array1Dto2D([i]);
          break;
        case "block2x1L":
          removeCss(chesses[i], "unselect");
          removeCss(chesses[i + 1], "unselect");
          currentLocation = array1Dto2D([i]);
          break;
        case "block2x1R":
          removeCss(chesses[i], "unselect");
          removeCss(chesses[i - 1], "unselect");
          currentLocation = array1Dto2D([i - 1]);
          break;
        case "block1x2T":
          removeCss(chesses[i], "unselect");
          removeCss(chesses[i + 4], "unselect");
          currentLocation = array1Dto2D([i]);
          break;
        case "block1x2B":
          removeCss(chesses[i], "unselect");
          removeCss(chesses[i - 4], "unselect");
          currentLocation = array1Dto2D([i - 4]);
          break;
        case "block2x2TL":
          removeCss(chesses[i], "unselect");
          removeCss(chesses[i + 1], "unselect");
          removeCss(chesses[i + 4], "unselect");
          removeCss(chesses[i + 5], "unselect");
          currentLocation = array1Dto2D([i]);
          break;
        case "block2x2TR":
          removeCss(chesses[i - 1], "unselect");
          removeCss(chesses[i], "unselect");
          removeCss(chesses[i + 3], "unselect");
          removeCss(chesses[i + 4], "unselect");
          currentLocation = array1Dto2D([i - 1]);
          break;
        case "block2x2BL":
          removeCss(chesses[i - 4], "unselect");
          removeCss(chesses[i - 3], "unselect");
          removeCss(chesses[i], "unselect");
          removeCss(chesses[i + 1], "unselect");
          currentLocation = array1Dto2D([i - 4]);
          break;
        case "block2x2BR":
          removeCss(chesses[i - 5], "unselect");
          removeCss(chesses[i - 4], "unselect");
          removeCss(chesses[i - 1], "unselect");
          removeCss(chesses[i], "unselect");
          currentLocation = array1Dto2D([i - 5]);
          break;
      }
    });
  });
}
// For chess moving, direction: "right", "left", "bottom", "top"
function moving(direction) {
  let i = array2Dto1D(currentLocation);
  let [y, x] = currentLocation;
  // Get moving chess data
  let movingType = chesses[i].type;
  let movingData = chesses[i].chessData;
  // Move by direction
  switch (direction) {
    case "right":
      if (movingType == "block1x1") {
        if (currentChessboard[y][x + 1] == 0) {
          currentChessboard[y][x] = 0;
          currentChessboard[y][x + 1] = movingData;
          selecting([y, x], [y, x + 1]);
          currentLocation = [y, x + 1];
          stepCounter++;
        }
        printChessboard(currentChessboard);
      } else if (movingType == "block2x1L" || movingType == "block2x1R") {
        if (currentChessboard[y][x + 2] == 0) {
          currentChessboard[y][x + 2] = movingData;
          currentChessboard[y][x] = 0;
          selecting([y, x], [y, x + 2]);
          currentLocation = [y, x + 1];
          stepCounter++;
        }
      } else if (movingType == "block1x2T" || movingType == "block1x2B") {
        if (
          (currentChessboard[y][x + 1] == 0) &
          (currentChessboard[y + 1][x + 1] == 0)
        ) {
          currentChessboard[y][x + 1] = movingData;
          currentChessboard[y + 1][x + 1] = movingData;
          currentChessboard[y][x] = 0;
          currentChessboard[y + 1][x] = 0;
          selecting([y, x], [y, x + 1]);
          selecting([y + 1, x], [y + 1, x + 1]);
          currentLocation = [y, x + 1];
          stepCounter++;
        }
      } else if (
        movingType == "block2x2TL" ||
        movingType == "block2x2TR" ||
        movingType == "block2x2BL" ||
        movingType == "block2x2BR"
      ) {
        if (
          (currentChessboard[y][x + 2] == 0) &
          (currentChessboard[y + 1][x + 2] == 0)
        ) {
          currentChessboard[y][x + 2] = movingData;
          currentChessboard[y + 1][x + 2] = movingData;
          currentChessboard[y][x] = 0;
          currentChessboard[y + 1][x] = 0;
          selecting([y, x], [y, x + 2]);
          selecting([y + 1, x], [y + 1, x + 2]);
          currentLocation = [y, x + 1];
          stepCounter++;
        }
      }
      break;
    case "left":
      if (movingType == "block1x1") {
        if (currentChessboard[y][x - 1] == 0) {
          currentChessboard[y][x] = 0;
          currentChessboard[y][x - 1] = movingData;
          selecting([y, x], [y, x - 1]);
          currentLocation = [y, x - 1];
          stepCounter++;
        }
        printChessboard(currentChessboard);
      } else if (movingType == "block2x1L" || movingType == "block2x1R") {
        if (currentChessboard[y][x - 1] == 0) {
          currentChessboard[y][x - 1] = movingData;
          currentChessboard[y][x + 1] = 0;
          selecting([y, x + 1], [y, x - 1]);
          currentLocation = [y, x - 1];
          stepCounter++;
        }
      } else if (movingType == "block1x2T" || movingType == "block1x2B") {
        if (
          (currentChessboard[y][x - 1] == 0) &
          (currentChessboard[y + 1][x - 1] == 0)
        ) {
          currentChessboard[y][x - 1] = movingData;
          currentChessboard[y + 1][x - 1] = movingData;
          currentChessboard[y][x] = 0;
          currentChessboard[y + 1][x] = 0;
          selecting([y, x], [y, x - 1]);
          selecting([y + 1, x], [y + 1, x - 1]);
          currentLocation = [y, x - 1];
          stepCounter++;
        }
      } else if (
        movingType == "block2x2TL" ||
        movingType == "block2x2TR" ||
        movingType == "block2x2BL" ||
        movingType == "block2x2BR"
      ) {
        if (
          (currentChessboard[y][x - 1] == 0) &
          (currentChessboard[y + 1][x - 1] == 0)
        ) {
          currentChessboard[y][x - 1] = movingData;
          currentChessboard[y + 1][x - 1] = movingData;
          currentChessboard[y][x + 1] = 0;
          currentChessboard[y + 1][x + 1] = 0;
          selecting([y, x + 1], [y, x - 1]);
          selecting([y + 1, x + 1], [y + 1, x - 1]);
          currentLocation = [y, x - 1];
          stepCounter++;
        }
      }
      break;
    case "top":
      if (movingType == "block1x1") {
        if (currentChessboard[y - 1][x] == 0) {
          currentChessboard[y - 1][x] = movingData;
          currentChessboard[y][x] = 0;
          selecting([y, x], [y - 1, x]);
          currentLocation = [y - 1, x];
          stepCounter++;
        }
        printChessboard(currentChessboard);
      } else if (movingType == "block2x1L" || movingType == "block2x1R") {
        if (
          (currentChessboard[y - 1][x] == 0) &
          (currentChessboard[y - 1][x + 1] == 0)
        ) {
          currentChessboard[y - 1][x] = movingData;
          currentChessboard[y - 1][x + 1] = movingData;
          currentChessboard[y][x] = 0;
          currentChessboard[y][x + 1] = 0;
          selecting([y, x], [y - 1, x]);
          selecting([y, x + 1], [y - 1, x + 1]);
          currentLocation = [y - 1, x];
          stepCounter++;
        }
      } else if (movingType == "block1x2T" || movingType == "block1x2B") {
        if (currentChessboard[y - 1][x] == 0) {
          currentChessboard[y - 1][x] = movingData;
          currentChessboard[y + 1][x] = 0;
          selecting([y + 1, x], [y - 1, x]);
          currentLocation = [y - 1, x];
          stepCounter++;
        }
      } else if (
        movingType == "block2x2TL" ||
        movingType == "block2x2TR" ||
        movingType == "block2x2BL" ||
        movingType == "block2x2BR"
      ) {
        if (
          (currentChessboard[y - 1][x] == 0) &
          (currentChessboard[y - 1][x + 1] == 0)
        ) {
          currentChessboard[y - 1][x] = movingData;
          currentChessboard[y - 1][x + 1] = movingData;
          currentChessboard[y + 1][x] = 0;
          currentChessboard[y + 1][x + 1] = 0;
          selecting([y + 1, x], [y - 1, x]);
          selecting([y + 1, x + 1], [y - 1, x + 1]);
          currentLocation = [y - 1, x];
          stepCounter++;
        }
      }
      break;
    case "bottom":
      if (movingType == "block1x1") {
        if (currentChessboard[y + 1][x] == 0) {
          currentChessboard[y + 1][x] = movingData;
          currentChessboard[y][x] = 0;
          selecting([y, x], [y + 1, x]);
          currentLocation = [y + 1, x];
          stepCounter++;
        }
        printChessboard(currentChessboard);
      } else if (movingType == "block2x1L" || movingType == "block2x1R") {
        if (
          (currentChessboard[y + 1][x] == 0) &
          (currentChessboard[y + 1][x + 1] == 0)
        ) {
          currentChessboard[y + 1][x] = movingData;
          currentChessboard[y + 1][x + 1] = movingData;
          currentChessboard[y][x] = 0;
          currentChessboard[y][x + 1] = 0;
          selecting([y, x], [y + 1, x]);
          selecting([y, x + 1], [y + 1, x + 1]);
          currentLocation = [y + 1, x];
          stepCounter++;
        }
      } else if (movingType == "block1x2T" || movingType == "block1x2B") {
        if (currentChessboard[y + 2][x] == 0) {
          currentChessboard[y + 2][x] = movingData;
          currentChessboard[y][x] = 0;
          selecting([y, x], [y + 2, x]);
          currentLocation = [y + 1, x];
          stepCounter++;
        }
      } else if (
        movingType == "block2x2TL" ||
        movingType == "block2x2TR" ||
        movingType == "block2x2BL" ||
        movingType == "block2x2BR"
      ) {
        if (
          (currentChessboard[y + 2][x] == 0) &
          (currentChessboard[y + 2][x + 1] == 0)
        ) {
          currentChessboard[y + 2][x] = movingData;
          currentChessboard[y + 2][x + 1] = movingData;
          currentChessboard[y][x] = 0;
          currentChessboard[y][x + 1] = 0;
          selecting([y, x], [y + 2, x]);
          selecting([y, x + 1], [y + 2, x + 1]);
          currentLocation = [y + 1, x];
          stepCounter++;
        }
      }
      break;
  }
  // Record steps
  localStorage.setItem("steps", stepCounter);
  printChessboard(currentChessboard);
  victory(currentChessboard);
}
// For chess selecting
function selecting(unselectLocation, selectLocation) {
  let unselectI = array2Dto1D(unselectLocation);
  let selectI = array2Dto1D(selectLocation);
  chesses[unselectI].classList.add("unselect");
  removeCss(chesses[selectI], "unselect");
}

// For i to [Y, X]
function array1Dto2D(i) {
  // For 4x5 array
  return [Math.floor(i / 4), i % 4];
}
// For [Y, X] to i
function array2Dto1D([i, j]) {
  // For 4x5 array
  return i * 4 + j;
}
// Clear all types of chess
function clearTypes() {
  for (i of chesses) {
    "block1x1 block2x1L block2x1R block1x2T block1x2B block2x2TL block2x2TR block2x2BL block2x2BR"
      .split(" ")
      .forEach((e) => {
        i.classList.remove(e);
        i.children[0].classList.remove(e);
      });
  }
}
// For adding type of chess
function addType(element, type) {
  element.classList.add(type);
  element.children[0].classList.add(type);
}
function addCss(element, type) {
  element.classList.add(type);
}
// For removing unselect of chess
function removeCss(element, type) {
  element.classList.remove(type);
}
// For showing the current chessboard
function logBoard() {
  console.log("----- New cheesboard -----");
  for (i of currentChessboard) {
    console.log(i);
  }
}
// For detecting victory
function victory(currentChessboard) {
  if ((currentChessboard[4][1] == 0.22) & (currentChessboard[4][2] == 0.22)) {
    alert(
      `CONGRATULATIONS!!! You win the game and you use ${stepCounter} steps;`
    );
  }
}
// Turn json to chessboard
function jsonToChessboard(jsonString) {
  let jsonData = jsonString.split(",");
  let k = 0;
  let chessboardArray = [];
  for (let j = 0; j < 5; j++) {
    let jArray = [];
    for (let i = 0; i < 4; i++) {
      jArray.push(Number(jsonData[k]));
      k++;
    }
    chessboardArray.push(jArray);
  }
  return chessboardArray;
}
// Index in 2D-array
function indexOf2D(array, target) {
  for (let i = 0; i < array.length; i++) {
    if (array[i].indexOf(target) > 0) {
      return [i, array[i].indexOf(target)];
    }
  }
  return -1;
}
