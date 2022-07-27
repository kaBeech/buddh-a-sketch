const body = document.querySelector('body');

function addDiv(parentNode) {
    const div = document.createElement('div');
    parentNode.appendChild(div);
}

addDiv(body);
addDiv(body);


/*

select body
create outer flex div in that body
create 4 column flex divs in that outer flex div
create 4 divs in each column 

*/