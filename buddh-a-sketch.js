

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
    let cellHSL = cellStyle.backgroundColor.slice(4, -1);
    console.log(cellHSL);
}

function getHSL(cellStyle) {
    console.log(cellStyle.backgroundColor);
}

createEtchPadDisplay(16);