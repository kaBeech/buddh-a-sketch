// Used for naming each cell of the etchGrid
var cellIDTick = 0;

// How fast the 'paint' evaporates. 1000 makes it get evaporate 
// one unit per second. 500 makes one unit per half second.
var evaporationRate = 750;

var rainbowHue = Math.floor(Math.random() * 360);
var currentStyle = "classic";

// Monochrome keeps all painted cells on the screen the same
// hue. When set to heterochrome, cells will retain the hue
// they were originally painted with.
var colorStyle = "monochrome";

rainbowInterval = setInterval(shiftRainbow, 250);
setInterval(updateNeonBlackButton, 250);
setInterval(updateMonochromeButton, 250);
setInterval(updateHeterochromeButton, 250);


function shiftRainbow() {
    if (rainbowHue < 360) {
        rainbowHue += 1;        
    } else if (rainbowHue === 360) {
        rainbowHue = 1;
    }
}

function updateNeonBlackButton() {
    const neonBlackButton = document.querySelector('.neonBlackButton');
    neonBlackButton.style.color = `hsl(${rainbowHue}, 100%, 50%)`;
}

function updateMonochromeButton() {
    if (currentStyle === 'neonBlack' && colorStyle === "monochrome") {
    const colorButton = document.querySelector('#colorButton');
    colorButton.style.backgroundColor = `hsl(${rainbowHue}, 100%, 50%)`;
    }
}

function updateHeterochromeButton() {
    if (currentStyle === 'neonBlack' && colorStyle === "heterochrome") {
    const colorButtonUL = document.querySelector('#colorButtonUL');
    const colorButtonUR = document.querySelector('#colorButtonUR');
    const colorButtonLR = document.querySelector('#colorButtonLR');
    const colorButtonLL = document.querySelector('#colorButtonLL');
    colorButtonUL.style.backgroundColor = `hsl(${rainbowHue}, 90%, 47%)`;
    colorButtonUR.style.backgroundColor = `hsl(${rainbowHue + 330}, 90%, 47%)`;
    colorButtonLR.style.backgroundColor = `hsl(${rainbowHue + 300}, 90%, 47%)`;
    colorButtonLL.style.backgroundColor = `hsl(${rainbowHue + 270}, 90%, 47%)`;
    }
}

function toggleColorStyle() {
    if (currentStyle === "classic") {
        alert("Try using this button on the Neon Black board");
    } else if (colorStyle === "monochrome") {
        colorStyle = "heterochrome";
    } else if (colorStyle === "heterochrome") {
        colorStyle = "monochrome";
    }
    colorButton();
}

function colorButton() {
    const colorButton = document.querySelector('#colorButton');
    const colorButtonUL = document.querySelector('#colorButtonUL');
    const colorButtonUR = document.querySelector('#colorButtonUR');
    const colorButtonLR = document.querySelector('#colorButtonLR');
    const colorButtonLL = document.querySelector('#colorButtonLL');
    if (currentStyle === 'classic') {
        colorButton.classList.add('borderBlack');
        colorButton.classList.remove('borderGrey');
        colorButton.style.backgroundColor = "hsl(120, 0%, 70%)";
        colorButtonUL.style.backgroundColor = "transparent";
        colorButtonUR.style.backgroundColor = "transparent";
        colorButtonLR.style.backgroundColor = "transparent";
        colorButtonLL.style.backgroundColor = "transparent";
    } else if (currentStyle === 'neonBlack' && colorStyle === "monochrome") {
        colorButton.classList.add('borderGrey');
        colorButton.classList.remove('borderBlack');
        colorButtonUL.style.backgroundColor = "transparent";
        colorButtonUR.style.backgroundColor = "transparent";
        colorButtonLR.style.backgroundColor = "transparent";
        colorButtonLL.style.backgroundColor = "transparent";
    } else if (currentStyle === 'neonBlack' && colorStyle === "heterochrome") {
        colorButton.classList.add('borderGrey');
        colorButton.classList.remove('borderBlack');
        colorButton.style.backgroundColor = "hsl(120, 0%, 0%)";
    }     
}

function createNewBoard(style) {
    let userInt = prompt("How many cells per side?", "16");
    if (+userInt % 1 === 0 && +userInt > 0 && userInt <= 100) {
        createBoard(+userInt, style);
    } else if (userInt !== null) {
        alert("Please enter a whole number between 1 and 100");
    }
}

function createBoard(int, style) {
    cellIDTick = 0;
    if (int < 16) {
        evaporationRate = Math.round(int * 46.875);
    } else {
        evaporationRate = Math.round(int * int / 16 * 46.875);
    }
    console.log(evaporationRate);
    currentStyle = style;
    const body = document.querySelector('body');
    if (currentStyle === 'classic') {
        body.classList.add('dkIshGrey');
        body.classList.remove('dkGrey');
    } else if (currentStyle === 'neonBlack') {
        body.classList.add('dkGrey');
        body.classList.remove('dkIshGrey');
    }
    clearBoard();
    createEtchGrid(body);
    populateEtchGrid(int);
    colorButton();
}

function clearBoard() {

    const etchGrid = document.querySelector('.etchGrid');
    while (etchGrid.hasChildNodes()) {
        const etchColumns = etchGrid.firstChild;
        const cells = etchColumns.childNodes;
        cells.forEach( function(target) {
            clearInterval(target.evapInterval)
        });
        etchGrid.removeChild(etchGrid.firstChild);
    }
}

function createEtchGrid(parentNode) {
    const etchGrid = document.querySelector('.etchGrid');
    if (currentStyle === 'classic') {
        etchGrid.classList.add('borderBlack');
        etchGrid.classList.remove('borderGrey');
    } else if (currentStyle === 'neonBlack') {
        etchGrid.classList.add('borderGrey');
        etchGrid.classList.remove('borderBlack');
    }
}

function populateEtchGrid(int) {
    const etchGrid = document.querySelector('.etchGrid');
    for (let i = 0; i<int; i++) {
        createEtchColumns(etchGrid);
        populateEtchColumns(int);
    }
}

function createEtchColumns(parentNode) {
    const div = document.createElement('div');
    div.classList.add('etchColumns');
    div.classList.add('flex');
    div.classList.add('column');
    parentNode.appendChild(div);
}

function populateEtchColumns(int) {
    const columns = document.querySelectorAll('.etchColumns');
    const column = columns[columns.length - 1];
    for (let i = 0; i<int; i++) {
        createCell(column, int);
    }
}

function createCell(parentNode, int) {
    const div = document.createElement('div');
    const cellID = "ID" + ++cellIDTick;
    div.setAttribute('id', cellID)
    div.classList.add('cell');
    if (currentStyle === 'classic') {
        div.style.backgroundColor = "hsl(120, 0%, 70%)";
    } else if (currentStyle === 'neonBlack') {
        div.style.backgroundColor = "hsl(120, 100%, 0%)";
    }
    div.style.width = `${480/int}px`;
    div.addEventListener('mouseenter', function() {skEtch(cellID);});
    parentNode.appendChild(div);
}

function skEtch(targetID) {
    targetID = "#" + targetID;
    const target = document.querySelector(targetID);
    let cellStyle = window.getComputedStyle(target);
    let cellRGB = cellStyle.backgroundColor.slice(4, -1);
    cellRGB = cellRGB.split(",");
    let cellHSL = convertRGBtoHSL(...cellRGB);
    target.hue = cellHSL[0];
    target.saturation = cellHSL[1];
    target.lightness = cellHSL[2];
    if (currentStyle === "classic" && target.lightness > 0) {
        target.lightness -= 10;
    } else if (currentStyle === "neonBlack" && target.lightness < 100) {
        target.hue = rainbowHue;
        target.saturation = 100;
        if (target.lightness === 0) {
            target.lightness += 20;
        } else {
            target.lightness += 10;
        }
    };
    cellHSL = `hsl(${target.hue}, ${target.saturation}%, ${target.lightness}%)`;
    target.style.backgroundColor = cellHSL;
    if (currentStyle === "classic" && target.lightness === 60) {
        target.evapInterval = setInterval(evaporate, evaporationRate, targetID);
    } else if (currentStyle === "neonBlack" && target.lightness === 20) {
        target.evapInterval = setInterval(evaporate, evaporationRate, targetID);
    }
}

function convertRGBtoHSL(R, G, B) {
    R /= 255;
    G /= 255;
    B /= 255;
    let colorMin = Math.min(R, G, B);
    let colorMax = Math.max(R, G, B);
    let delta = colorMax - colorMin;
    let H = 0;
    let S = 0;
    let L = 0;
    if (delta == 0) {
    H = 0;
    } else if (colorMax == R) {
    H = ((G - B) / delta) % 6;
    } else if (colorMax == G) {
    H = (B - R) / delta + 2;
    } else {
    H = (R - G) / delta + 4;
    H = Math.round(H * 60)
    };
    L = (colorMax + colorMin) / 2;
    S = delta == 0 ? 0 : delta / (1 - Math.abs(2 * L - 1));
    S = +(S * 100).toFixed(0);
    L = +(L * 100).toFixed(0);
    return [H, S, L];
}


function evaporate(targetID) {
    const target = document.querySelector(targetID);
    let cellStyle = window.getComputedStyle(target);
    let cellRGB = cellStyle.backgroundColor.slice(4, -1);
    cellRGB = cellRGB.split(",");
    let cellHSL = convertRGBtoHSL(...cellRGB);
    target.lightness = cellHSL[2];
    if (currentStyle === "classic" && target.lightness < 70) {
        target.lightness += 1;
        cellHSL = `hsl(${cellHSL[0]}, 0%, ${target.lightness}%)`;
        target.style.backgroundColor = cellHSL;
    } else if (currentStyle === "neonBlack" && target.lightness > 0) {
        target.lightness -= 1;
        if (colorStyle === "monochrome") {
            cellHSL = `hsl(${rainbowHue}, 100%, ${target.lightness}%)`;
        } else if (colorStyle === "heterochrome") {
            cellHSL = `hsl(${target.hue}, 100%, ${target.lightness}%)`;
        }
        target.style.backgroundColor = cellHSL;
    } else {
        clearInterval(target.evapInterval);
    }
}

createBoard(16, currentStyle);