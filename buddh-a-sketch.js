var IDTick = 0;

var rainbowHue = 120;

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
    const body = document.querySelector('body');
    body.classList.add('flex', 'column');
    if (style === 'classic') {
        body.classList.add('ltGrey');
        body.classList.remove('dkGrey');
    } else if (style === 'rainbow') {
        body.classList.add('dkGrey');
        body.classList.remove('ltGrey');
    }
    while (body.hasChildNodes()) {
        body.removeChild(body.firstChild);
    }
    createButton(body);
    createEtchGrid(body, style);
    populateEtchGrid(int, style);
}

function createButton(parentNode) {
    const button = document.createElement('button');
    parentNode.appendChild(button);
    button.classList.add('button');
    button.addEventListener('click', createNewBoard);
    button.textContent = "Draw New Pad";
}

function createNewBoard() {
    let userInt = prompt("How many cells per side?", "16");
    if (+userInt % 1 === 0 && +userInt > 0 && userInt <= 100) {
        createBoard(+userInt, "classic");
    } else {
        alert("Please enter a whole number between 1 and 100")
    }
}

function createEtchGrid(parentNode, style) {
    const div = document.createElement('div');
    parentNode.appendChild(div);
    div.classList.add('etchGrid');
    div.classList.add('flex');
    if (style === 'classic') {
        div.classList.add('borderBlack');
        div.classList.remove('borderGrey');
    } else if (style === 'rainbow') {
        div.classList.add('borderGrey');
        div.classList.remove('borderBlack');
    }
}

function populateEtchGrid(int, style) {
    const etchGrid = document.querySelector('.etchGrid');
    for (let i = 0; i<int; i++) {
        createColumnContainer(etchGrid);
        populateColumnContainer(int, style);
    }
}

function createColumnContainer(parentNode) {
    const div = document.createElement('div');
    parentNode.appendChild(div);
    div.classList.add('columnContainer');
    div.classList.add('flex');
    div.classList.add('column');
}

function populateColumnContainer(int, style) {
    const columns = document.querySelectorAll('.columnContainer');
    const column = columns[columns.length - 1];
    for (let i = 0; i<int; i++) {
        createCell(column, int, style);
    }
}

function createCell(parentNode, int, style) {
    const div = document.createElement('div');
    const cellID = "ID" + ++IDTick;
    div.setAttribute('id', cellID)
    div.classList.add('cell');
    if (style === 'classic') {
        div.classList.add('grey');
        div.classList.remove('black');
    } else if (style === 'rainbow') {
        div.classList.add('black');
        div.classList.remove('grey');
    }
    div.style.width = `${480/int}px`;
    div.addEventListener('mouseenter', function() {skEtch(cellID, style);});
    div.addEventListener('mouseenter', function() {evaporateAtInterval(cellID, style);});
    parentNode.appendChild(div);
}

// function simpleEtch() {
//     this.style.backgroundColor = "hsl(120, 100%, 0%)";
// }

function skEtch(targetID, style) {
    targetID2 = "#" + targetID;
    const target = document.querySelector(targetID2);
    let cellStyle = window.getComputedStyle(target);
    let cellRGB = cellStyle.backgroundColor.slice(4, -1);
    cellRGB = cellRGB.split(",");
    let cellHSL = RGBToHSL(...cellRGB);
    let cellH = cellHSL[0];
    let cellS = cellHSL[1];
    let cellL = cellHSL[2];
    if (style === "classic" && cellL > 0) {
        cellL -= 10;
    } else if (style === "rainbow" && cellL < 100) {
        cellH = rainbowHue;
        cellL += 10;
    };
    if (style === "rainbow" && cellL == 10) {
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

function evaporateAtInterval(targetID, style) {
    targetID2 = "#" + targetID;
    // console.log("targetID: " + targetID2);
    const target = document.querySelector(targetID2);
    let cellStyle = window.getComputedStyle(target);
    let cellRGB = cellStyle.backgroundColor.slice(4, -1);
    cellRGB = cellRGB.split(",");
    let cellHSL = RGBToHSL(...cellRGB);
    let cellL = cellHSL[2];
    let newlyWet = false;
    if (style === "classic" && cellL === 60) {
        newlyWet = true;
    } else if (style === "rainbow" && cellL === 10) {
        newlyWet = true;
    }
    if (newlyWet) {
    evapInterval = setInterval(evaporate, 750, targetID, style);
    }
}

function evaporate(targetID, style) {
    targetID = "#" + targetID;
    // console.log("targetID: " + targetID);
    const target = document.querySelector(targetID);
    let cellStyle = window.getComputedStyle(target);
    let cellRGB = cellStyle.backgroundColor.slice(4, -1);
    cellRGB = cellRGB.split(",");
    let cellHSL = RGBToHSL(...cellRGB);
    let cellL = cellHSL[2];
    if (style === "classic" && cellL < 70) {
        cellL += 1;
        cellHSL = `hsl(${cellHSL[0]}, 0%, ${cellL}%)`;
        target.style.backgroundColor = cellHSL;
        // console.log(cellL);
        // console.log(cellHSL);
    } else if (style === "rainbow" && cellL > 0) {
        cellL -= 1;
        cellHSL = `hsl(${rainbowHue}, 100%, ${cellL}%)`;
        target.style.backgroundColor = cellHSL;
    } else {
        // clearInterval(evapInterval);
    }
} 

createBoard(16, "classic");