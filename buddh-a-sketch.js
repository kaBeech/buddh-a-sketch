var IDTick = 0;

function createEtchPadDisplay(int) {
    IDTick = 0;
    const body = document.querySelector('body');
    body.classList.add('flex', 'column');
    while (body.hasChildNodes()) {
        body.removeChild(body.firstChild);
    }
    createButton(body);
    createEtchGrid(body);
    populateEtchGrid(int);
}

function createButton(parentNode) {
    const button = document.createElement('button');
    parentNode.appendChild(button);
    button.classList.add('button');
    button.addEventListener('click', createNewEtchGrid);
    button.textContent = "Draw New Pad";
}

function createNewEtchGrid() {
    let userInt = prompt("How many cells per side?", "16");
    if (+userInt % 1 === 0 && +userInt > 0 && userInt <= 100) {
        createEtchPadDisplay(+userInt);
    } else {
        alert("Please enter a whole number between 1 and 100")
    }
}

function createEtchGrid(parentNode) {
    const div = document.createElement('div');
    parentNode.appendChild(div);
    div.classList.add('etchGrid');
    div.classList.add('flex');
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
    div.style.width = `${480/int}px`;
    div.addEventListener('mouseenter', skEtch);
    // div.addEventListener('mouseenter', setInterval(evaporate(), 250));
    // div.onclick = function() {alert("Test")};
    // div.onclick = function() {alert("Test")};
    // div.onclick = function() {simpleEtch()};
    // div.addEventListener('click', setInterval(evaporate(cellID), 250));
    // div.addEventListener('click', setTargetID);
    // div.addEventListener('click', evaporate);
    // div.onclick = evaporateAtInterval(cellID);
    div.addEventListener('mouseenter', function() {evaporateAtInterval(cellID);});
    // div.addEventListener('click', simpleEtch);
    parentNode.appendChild(div);
}

function evaporateAtInterval(targetID) {
    targetID2 = "#" + targetID;
    console.log("targetID: " + targetID2);
    const target = document.querySelector(targetID2);
    let cellStyle = window.getComputedStyle(target);
    let cellRGB = cellStyle.backgroundColor.slice(4, -1);
    cellRGB = cellRGB.split(",");
    let cellHSL = RGBToHSL(...cellRGB);
    let cellL = cellHSL[2];
    let newlyWet = false;
    if (cellL >= 60) {
        newlyWet = true;
    }
    if (newlyWet) {
    evapInterval = setInterval(evaporate, 500, targetID);
    }
}

function simpleEtch() {
    this.style.backgroundColor = "hsl(120, 100%, 0%)";
}

function skEtch() {
    let cellStyle = window.getComputedStyle(this);
    let cellRGB = cellStyle.backgroundColor.slice(4, -1);
    cellRGB = cellRGB.split(",");
    let cellHSL = RGBToHSL(...cellRGB);
    let cellL = cellHSL[2]
    if (cellL > 0) {
        cellL -= 10;
    }
    cellHSL = `hsl(${cellHSL[0]}, ${cellHSL[1]}%, ${cellL}%)`;
    console.log(cellHSL);
    this.style.backgroundColor = cellHSL;
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
    S = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    S = +(S * 100).toFixed(0);
    L = +(L * 100).toFixed(0);
    return [H, S, L];
}

var globalTargetID = "string";

function setTargetID() {
    globalTargetID =  this.id;
}

function evaporate(targetID) {
    // const targetID = globalTargetID;
    targetID = "#" + targetID;
    console.log("targetID: " + targetID);
    const target = document.querySelector(targetID);
    let cellStyle = window.getComputedStyle(target);
    let cellRGB = cellStyle.backgroundColor.slice(4, -1);
    cellRGB = cellRGB.split(",");
    let cellHSL = RGBToHSL(...cellRGB);
    let cellL = cellHSL[2];
    if (cellL < 70) {
        cellL += 1;
        cellHSL = `hsl(${cellHSL[0]}, ${cellHSL[1]}%, ${cellL}%)`;
        target.style.backgroundColor = cellHSL;
        console.log(cellL);
        console.log(cellHSL);
    } else {
        // clearInterval(evapInterval);
    }
} 

createEtchPadDisplay(16);