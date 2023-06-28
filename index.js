let keypads = document.querySelectorAll('button');
let display = document.querySelector('#display');

keypads.forEach(element => {
    element.classList.add('box');
});

console.log(display)
display.textContent = '0';