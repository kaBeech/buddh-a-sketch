var IDTick = 0;
var rainbowHue = 120;
var currentStyle = "classic";

rainbowInterval = setInterval(shiftRainbow, 250);

function shiftRainbow() {
    if (rainbowHue < 360) {
        rainbowHue += 1;        
    } else if (rainbowHue === 360) {
        rainbowHue = 1;
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
}

function createNewBoard() {
    let userInt = prompt("How many cells per side?", "16");
    if (+userInt % 1 === 0 && +userInt > 0 && userInt <= 100) {
        createBoard(+userInt, "classic");
    } else {
        alert("Please enter a whole number between 1 and 100")
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
    div.addEventListener('mouseenter', function() {evaporateAtInterval(cellID);});
    parentNode.appendChild(div);
}

// function simpleEtch() {
//     this.style.backgroundColor = "hsl(120, 100%, 0%)";
// }

function skEtch(targetID) {
    targetID2 = "#" + targetID;
    const target = document.querySelector(targetID2);
    let cellStyle = window.getComputedStyle(target);
    let cellRGB = cellStyle.backgroundColor.slice(4, -1);
    cellRGB = cellRGB.split(",");
    let cellHSL = RGBToHSL(...cellRGB);
    let cellH = cellHSL[0];
    let cellS = cellHSL[1];
    let cellL = cellHSL[2];
    if (currentStyle === "classic" && cellL > 0) {
        cellL -= 10;
    } else if (currentStyle === "neonBlack" && cellL < 100) {
        cellH = rainbowHue;
        cellL += 10;
    };
    if (currentStyle === "neonBlack" && cellL == 10) {
        cellH = rainbowHue;
        cellS = 100;
    }
    cellHSL = `hsl(${cellH}, ${cellS}%, ${cellL}%)`;
    // console.log(cellHSL);
    target.style.backgroundColor = cellHSL;
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

function evaporateAtInterval(targetID) {
    targetID2 = "#" + targetID;
    // console.log("targetID: " + targetID2);
    const target = document.querySelector(targetID2);
    let cellStyle = window.getComputedStyle(target);
    let cellRGB = cellStyle.backgroundColor.slice(4, -1);
    cellRGB = cellRGB.split(",");
    let cellHSL = RGBToHSL(...cellRGB);
    let cellL = cellHSL[2];
    let newlyWet = false;
    if (currentStyle === "classic" && cellL === 60) {
        newlyWet = true;
    } else if (currentStyle === "neonBlack" && cellL === 10) {
        newlyWet = true;
    }
    if (newlyWet) {
    evapInterval = setInterval(evaporate, 750, targetID);
    }
}

function evaporate(targetID) {
    targetID = "#" + targetID;
    // console.log("targetID: " + targetID);
    const target = document.querySelector(targetID);
    let cellStyle = window.getComputedStyle(target);
    let cellRGB = cellStyle.backgroundColor.slice(4, -1);
    cellRGB = cellRGB.split(",");
    let cellHSL = RGBToHSL(...cellRGB);
    let cellL = cellHSL[2];
    if (currentStyle === "classic" && cellL < 70) {
        cellL += 1;
        cellHSL = `hsl(${cellHSL[0]}, 0%, ${cellL}%)`;
        target.style.backgroundColor = cellHSL;
        // console.log(cellL);
        // console.log(cellHSL);
    } else if (currentStyle === "neonBlack" && cellL > 0) {
        cellL -= 1;
        cellHSL = `hsl(${rainbowHue}, 100%, ${cellL}%)`;
        target.style.backgroundColor = cellHSL;
    } else {
        // clearInterval(evapInterval);
    }
} 

createBoard(16, "classic");