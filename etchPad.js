

function createEtchPadDisplay(int) {
    const body = document.querySelector('body');
    body.classList.add('flex');
    createEtchGrid(body);
    populateEtchGrid(int);
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
        createCell(column);
    }
}

function createCell(parentNode) {
    const div = document.createElement('div');
    parentNode.appendChild(div);
    div.classList.add('cell');
    div.addEventListener('mouseenter', activateCell);
}

function activateCell() {
    this.classList.add('active')
}

createEtchPadDisplay(16);


// function activateCell() {
//     if -
// }