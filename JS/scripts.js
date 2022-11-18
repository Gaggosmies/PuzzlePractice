// global definations
var MainDiv = document.getElementById("mainDiv");

var locationX = 0;
var locationY = 0;

let width = 0;
let height = 0;

var moveUpID;
var moveDownID;
var moveRightID;
var moveLeftID;

var zeroIndexX;
var zeroIndexY;

// array definations
const arrayRows = 4;
const arrayColumns = 5;
var i, j;
var index = 0;

var PuzzleArray = [];
var tempArray = [];

const shuffleArray = array => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

// initialize the array
for (i = 0; i < arrayRows; i++) {
    for (j = 0; j < arrayColumns; j++) {
        tempArray.push(index);
        index++;
    }
    // add the 1 dimensional array in PuzzleArray
    PuzzleArray.push(tempArray);
    // clear the temp array
    tempArray = [];
}


// iterating over the items
PuzzleArray.forEach((row) => {
    row.forEach((line) => {
        // create new puzzle piece
        var PuzzlePiece = document.createElement("div");

        // if the index is 0, no value shown 
        if (line === 0) {
            PuzzlePiece.style.background = "#FFF";
            PuzzlePiece.style.border = "2px solid white";
        }
        // otherwise write the number on piece
        else {
            PuzzlePiece.textContent = line;
            PuzzlePiece.id = line;
            PuzzlePiece.onclick = function () { pieceClick(line) }
        }

        // set styles and append
        PuzzlePiece.style.left = locationX + 'px';
        PuzzlePiece.style.top = locationY + 'px';
        PuzzlePiece.classList.add("piece");
        MainDiv.append(PuzzlePiece);

        // get their size
        width = PuzzlePiece.offsetWidth;
        height = PuzzlePiece.offsetHeight;

        // Adde to location
        locationX += width;
    });
    // reset x every row
    locationX = 0;
    // move to the next row
    locationY += height;
});

function pieceClick(index) {
    findMovablePieces();

    var movingPiece = document.getElementById(index);
    var moveToPx;

    if (index == moveLeftID) {
        moveToPx = movingPiece.style.left.replace("px", "");
        moveToPx += width;
        movingPiece.style.left = moveToPx + "px";
    }
    if (index == moveRightID) {
        moveToPx = movingPiece.style.left.replace("px", "");
        moveToPx -= width;
        movingPiece.style.left = moveToPx + "px";
    }
    if (index == moveUpID) {
        moveToPx = movingPiece.style.left.replace("px", "");
        moveToPx += height;
        movingPiece.style.top = moveToPx + "px";
    }
    if (index == moveDownID) {
        moveToPx = movingPiece.style.left.replace("px", "");
        moveToPx -= height;
        movingPiece.style.top = moveToPx + "px";
    }
}

function findMovablePieces() {
    for (let i = 0; i < arrayRows; i++) {
        if (PuzzleArray[i].includes(0)) {
            zeroIndexX = PuzzleArray[i].indexOf(0);
            zeroIndexY = i;
        }
    }

    console.log("zeroIndexX: " + zeroIndexX);
    console.log("zeroIndexY: " + zeroIndexY);

    // if far left
    if (zeroIndexX == 0) {
        moveLeftID = 0; // disable button left
    }
    else {
        moveLeftID = zeroIndexX - 1;
    }

    // if far right
    if (zeroIndexX == arrayColumns) {
        moveRightID = 0; // disable button right
    }
    else {
        moveRightID = zeroIndexX + 1;
    }

    // if far top
    if (zeroIndexY == 0) {
        moveUpID = 0; // disable button top
    }
    else {
        moveUpID = zeroIndexY - 1;
    }

    // if far low
    if (zeroIndexY == arrayRows) {
        moveDownID = 0; // disable button below
    }
    else {
        moveDownID = zeroIndexY + 1;
    }

    console.log("moveLeftID: " + moveLeftID);
    console.log("moveRightID: " + moveRightID);
    console.log("moveUpID: " + moveUpID);
    console.log("moveDownID: " + moveDownID);
}

// run find movable pieces once in start
findMovablePieces();
