// global definations

var MainDiv = document.getElementById("mainDiv");

var locationX = 0;
var locationY = 0;

let width = 0;
let height = 0;

// array definations
const arrayRows = 4;
const arrayColumns = 5;
var i, j;
var index = 0;

var PuzzleArray = [];
var tempArray = [];

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
        }
        // otherwise write the number on piece
        else {
            PuzzlePiece.textContent = line;
            PuzzlePiece.onclick = function () { myFunction(line) }
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

function myFunction(index) {
    console.log(index);
}
