var IDTick = 0;
var rainbowHue = Math.floor(Math.random() * 360);
var currentStyle = "classic";
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
    if (colorStyle === "monochrome") {
        colorStyle = "heterochrome"
    } else if (colorStyle === "heterochrome") {
        colorStyle = "monochrome"
    }
    colorButton();
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
    IDTick = 0;
    currentStyle = style;
    const body = document.querySelector('body');
    if (currentStyle === 'classic') {
        body.classList.add('dkIshGrey');
        body.classList.remove('dkGrey');
    } else if (currentStyle === 'neonBlack') {
        body.classList.add('dkGrey');
        body.classList.remove('dkIshGrey');
    }
    const etchGrid = document.querySelector('.etchGrid');
    while (etchGrid.hasChildNodes()) {
        etchGrid.removeChild(etchGrid.firstChild);
    }
    createEtchGrid(body);
    populateEtchGrid(int);
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
        createColumnContainer(etchGrid);
        populateColumnContainer(int);
    }
}

function createColumnContainer(parentNode) {
    const div = document.createElement('div');
    parentNode.appendChild(div);
    div.classList.add('columnContainer');
    div.classList.add('flex');
    div.classList.add('column');
}

function populateColumnContainer(int) {
    const columns = document.querySelectorAll('.columnContainer');
    const column = columns[columns.length - 1];
    for (let i = 0; i<int; i++) {
        createCell(column, int);
    }
}

function createCell(parentNode, int) {
    const div = document.createElement('div');
    const cellID = "ID" + ++IDTick;
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
    targetID2 = "#" + targetID;
    const target = document.querySelector(targetID2);
    let cellStyle = window.getComputedStyle(target);
    let cellRGB = cellStyle.backgroundColor.slice(4, -1);
    cellRGB = cellRGB.split(",");
    let cellHSL = RGBToHSL(...cellRGB);
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
        target.evapInterval = setInterval(evaporate, 750, targetID);
    } else if (currentStyle === "neonBlack" && target.lightness === 20) {
        target.evapInterval = setInterval(evaporate, 750, targetID);
    }
}

function RGBToHSL(R, G, B) {
    R /= 255;
    G /= 255;
    B /= 255;
    let cMin = Math.min(R, G, B);
    let cMax = Math.max(R, G, B);
    let delta = cMax - cMin;
    let H = 0;
    let S = 0;
    let L = 0;
    if (delta == 0) {
    H = 0;
    } else if (cMax == R) {
    H = ((G - B) / delta) % 6;
    } else if (cMax == G) {
    H = (B - R) / delta + 2;
    } else {
    H = (R - G) / delta + 4;
    H = Math.round(H * 60)
    };
    L = (cMax + cMin) / 2;
    S = delta == 0 ? 0 : delta / (1 - Math.abs(2 * L - 1));
    S = +(S * 100).toFixed(0);
    L = +(L * 100).toFixed(0);
    return [H, S, L];
}


function evaporate(targetID) {
    targetID = "#" + targetID;
    const target = document.querySelector(targetID);
    let cellStyle = window.getComputedStyle(target);
    let cellRGB = cellStyle.backgroundColor.slice(4, -1);
    cellRGB = cellRGB.split(",");
    let cellHSL = RGBToHSL(...cellRGB);
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