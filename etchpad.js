const body = document.querySelector('body');

function addBox16(parentNode) {
    const div = document.createElement('div');
    parentNode.appendChild(div);
    div.classList.add = 'box16';
    div.classList.add = 'flex';
}

addBox16(body);

const box16 = document.querySelector('.box16');

function addColumnContainer(parentNode) {
    const div = document.createElement('div');
    parentNode.appendChild(div);
    div.classList.add = 'columnContainer';
    div.classList.add = 'flex';
    div.classList.add = 'column';
}

function addCellDiv(parentNode) {
    const div = document.createElement('div');
    parentNode.appendChild(div);
    div.classList.add = 'cell';
}

function populateColumnFlexDiv() {
    const columns = document.querySelectorAll('.columnContainer');
    const column = columns[-1];
    for (i = 0; i>16; i++) {
        addCellDiv(column)
    }
}


// addDiv(body);


/*

select body
create outer flex div in that body
create 4 column flex divs in that outer flex div
create 4 divs in each column 

*/