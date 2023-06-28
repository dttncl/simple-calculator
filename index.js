let keypads = document.querySelectorAll('button');
let display = document.querySelector('#display');

let numbers = document.querySelectorAll('.number');
let operators = document.querySelectorAll('.operator');

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
            // check if value is a valid number
            if (Number(key.value) >= 0 && Number(key.value) <= 9) {
                numBuilder += key.value;
            } else if (key.value === '.' && dotCount === 0) {
                numBuilder += key.value;
                dotCount = 1;
            } else if (OPERATOR.hasOwnProperty(key.value)) {
                getOperator(key,numBuilder);
                numBuilder = '';
            } else if (key.value === 'equal' && counter > 0) {
                let res;
                num2 = Number(numBuilder);
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
            }
        })
    })

    

}

// function to save operator
function getOperator(key,numBuilder) {
    op = OPERATOR[key.value];

    if (counter === 0) {
        num1 = Number(numBuilder);
        counter = 1;
    } else {
        num2 = Number(numBuilder);
    }
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
    return num1 / num2;
}