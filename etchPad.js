function createEtchPadDisplay() {
    const body = document.querySelector('body');
    createBox16(body);
    populateBox16();
}

function createBox16(parentNode) {
    const div = document.createElement('div');
    parentNode.appendChild(div);
    div.classList.add('box16');
    div.classList.add('flex');
}

function populateBox16() {
    const box16 = document.querySelector('.box16');
    for (let i = 0; i<16; i++) {
        createColumnContainer(box16);
        populateColumnContainer();
    }
}

function createColumnContainer(parentNode) {
    const div = document.createElement('div');
    parentNode.appendChild(div);
    div.classList.add('columnContainer');
    div.classList.add('flex');
    div.classList.add('column');
}

function populateColumnContainer() {
    const columns = document.querySelectorAll('.columnContainer');
    const column = columns[columns.length - 1];
    for (let i = 0; i<16; i++) {
        createCell(column);
    }
}

function createCell(parentNode) {
    const div = document.createElement('div');
    parentNode.appendChild(div);
    div.classList.add('cell');
}


createEtchPadDisplay();

// addDiv(body);


/*

select body
create outer flex div in that body
create 4 column flex divs in that outer flex div
create 4 divs in each column 

*/