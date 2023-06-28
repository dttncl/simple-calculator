let keypads = document.querySelectorAll('button');
let display = document.querySelector('#display');

keypads.forEach(element => {
    element.classList.add('box');
});

let num1 = 0;
let num2 = 0;
let op;
let counter = 0;
let dotCount = 0;

let OPERATOR = {
    add : '+',
    sub : '-',
    mul : '*',
    div : '/'
}

let numBuilder = '';

// function to build number
buildNumber();
function buildNumber() {
    keypads.forEach (key => {
        key.addEventListener('click', () => { 

            // numbers
            if (Number(key.value) >= 0 && Number(key.value) <= 9) {
                numBuilder += key.value;
                display.textContent = numBuilder;

            // decimal
            } else if (key.value === '.' && dotCount === 0) {

                if (counter === 0) {
                    numBuilder = Number(numBuilder) + num1;
                }
                
                numBuilder += key.value;
                display.textContent = numBuilder;
                dotCount = 1;
            
            // operations
            } else if (OPERATOR.hasOwnProperty(key.value)) {
                getOperator(key,numBuilder);
                numBuilder = '';
            
            // equal
            } else if (key.value === 'equal' && counter > 0) {
                getOperator(key,numBuilder);

                
            // reset
            } else if (key.value === 'ac') {
                numBuilder = '';
                num1 = 0;
                num2 = 0;
                op = '';
                counter = 0;
                dotCount = 0;
                display.textContent = num1;
            
            // sign
            } else if (key.value === 'sign') {
                numBuilder = Number(numBuilder)*-1;
                display.textContent = numBuilder;
            
            // delete
            } else if (key.value === 'del') {
                numBuilder = numBuilder.slice(0,numBuilder.length-1);
                display.textContent = (numBuilder.length <= 0) ? 0 : numBuilder;
            }
        })
    })
}

// function to get operator
function getOperator(key,numBuilder) {
    if (counter === 0) {
        op = OPERATOR[key.value];
        num1 = Number(numBuilder);
        counter = 1;
    } else {
        num1 = solve(num1);
        op = OPERATOR[key.value];
        num2 = 0;
        counter = 0;
    }
}

// function to solve numbers
function solve(num1) {
    num2 = Number(numBuilder);
    numBuilder = '';
    switch(op) {
        case '+':
            res = sum(num1,num2);
            break;
        case '-':
            res = subtract(num1,num2);
            break;
        case '*':
            res = multiply(num1,num2);
            break;
        case '/':
            res = divide(num1,num2);
            break;
    }

    display.textContent = res;
    return res;
}

// functions for operators
function sum(num1,num2) {
    return num1 + num2;
}

function subtract(num1,num2) {
    return num1 - num2;
}

function multiply(num1,num2) {
    return num1 * num2;
}

function divide(num1,num2) {
    return (num2 === 0) ? 'rick roll' : num1 / num2;
}