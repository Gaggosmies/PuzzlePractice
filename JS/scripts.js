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

const moveUp = 0;
const moveDown = 1;
const moveRight = 2;
const moveLeft = 3;

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
        moveToPx = parseInt(movingPiece.style.left.replace("px", ""));
        moveToPx += parseInt(width);
        movingPiece.style.left = moveToPx + "px";
    }
    if (index == moveRightID) {
        moveToPx = parseInt(movingPiece.style.left.replace("px", ""));
        moveToPx -= parseInt(width);
        movingPiece.style.left = moveToPx + "px";
    }
    if (index == moveUpID) {
        moveToPx = parseInt(movingPiece.style.top.replace("px", ""));
        moveToPx += parseInt(height);
        movingPiece.style.top = moveToPx + "px";
    }
    if (index == moveDownID) {
        moveToPx = parseInt(movingPiece.style.top.replace("px", ""));
        moveToPx -= parseInt(height);
        movingPiece.style.top = moveToPx + "px";
    }

    updateZeroPlacement(index);
}

function findMovablePieces() {
    // Find the 0
    for (let i = 0; i < arrayRows; i++) {
        if (PuzzleArray[i].includes(0)) {
            zeroIndexX = PuzzleArray[i].indexOf(0);
            zeroIndexY = i;
        }
    }

    // find all the pieces around the 0

    // if far left
    if (zeroIndexX == 0) {
        moveLeftID = 0; // disable button left
    }
    else {
        moveLeftID = PuzzleArray[zeroIndexY][zeroIndexX - 1];
    }

    // if far right
    if (zeroIndexX > arrayColumns) {
        moveRightID = 0; // disable button right
    }
    else {
        moveRightID = PuzzleArray[zeroIndexY][zeroIndexX + 1];
    }

    // if far top
    if (zeroIndexY == 0) {
        moveUpID = 0; // disable button top
    }
    else {
        moveUpID = PuzzleArray[zeroIndexY - 1][zeroIndexX];
    }

    // if far low
    if (zeroIndexY == arrayRows - 1) {
        moveDownID = 0; // disable button below
    }
    else {
        moveDownID = PuzzleArray[zeroIndexY + 1][zeroIndexX];
    }
}

// run find movable pieces once in start
findMovablePieces();

function updateZeroPlacement(index) {
    let functionality;

    // if check which functionality should be used
    if (index == moveUpID) { functionality = moveDown };
    if (index == moveDownID) { functionality = moveUp };
    if (index == moveLeftID) { functionality = moveRight };
    if (index == moveRightID) { functionality = moveLeft };

    if (typeof functionality === 'undefined'){
        return;
    }

    // find the location
    for (let i = 0; i < arrayRows; i++) {
        if (PuzzleArray[i].includes(index)) {
            var changedIndex = PuzzleArray[i].indexOf(index);
            var changedValue = PuzzleArray[i][changedIndex]

            switch (functionality) {
                case moveRight:
                    PuzzleArray[i][changedIndex + 1] = changedValue;
                    PuzzleArray[i][changedIndex] = 0;
                    break;
                case moveLeft:
                    PuzzleArray[i][changedIndex - 1] = changedValue;
                    PuzzleArray[i][changedIndex] = 0;
                    break;
                case moveDown:
                    PuzzleArray[i + 1][changedIndex] = changedValue;
                    PuzzleArray[i][changedIndex] = 0;
                    break;
                case moveUp:
                    PuzzleArray[i - 1][changedIndex] = changedValue;
                    PuzzleArray[i][changedIndex] = 0;
                    break;
            } // switch end

            // do this only once
            break;
        } // if end 
    } // for end 
}
