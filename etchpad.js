const body = document.querySelector('body');

function addBox16(parentNode) {
    const div = document.createElement('div');
    parentNode.appendChild(div);
    div.classList.add = 'box16';
    div.classList.add = 'flex';
}

addBox16(body);

function addColumnFlexDiv(parentNode) {
    const box16 = document.querySelector('.box16');
    const div = document.createElement('div');
    parentNode.appendChild(div);
    div.classList.add = 'columnFlexDiv';
    div.classList.add = 'flex';
    div.classList.add = 'column';
}


// addDiv(body);


/*

select body
create outer flex div in that body
create 4 column flex divs in that outer flex div
create 4 divs in each column 

*/