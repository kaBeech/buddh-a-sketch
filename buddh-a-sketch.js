

function createEtchPadDisplay(int) {
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
    parentNode.appendChild(div);
    div.classList.add('cell');
    div.style.width = `${480/int}px`;
    div.addEventListener('mouseenter', simpleEtch);
}

function simpleEtch() {
    this.classList.add('active');
}

function skEtch() {
    let cellStyle = window.getComputedStyle(this);
    let cellRGB = cellStyle.backgroundColor.slice(4, -1);
    cellRGB = cellRGB.split(",");
    let cellHSL = RGBToHSL(...cellRGB);
    console.log(cellHSL);
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

createEtchPadDisplay(16);