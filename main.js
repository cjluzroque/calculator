


const button = document.querySelector('#create');
const list = document.querySelector('ul');
const input = document.querySelector('input');
const current = document.querySelector('#current');

const numbers = "1234567890";
const operators = "+-/*=";

let valStack = []; // Hold operands 
let newVal = []; // Hold value 
let calcStack = []; // Hold operators 

const calc = document.querySelector('.calc');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener("click", function () {
        console.log(button.textContent);

        if (numbers.includes(button.textContent)) {
            newVal.push(button.textContent);

            input.textContent = input.textContent + '' + button.textContent;
        }
        if (operators.includes(button.textContent)) {
            let operand = newVal.join('');
            valStack.push(operand);
            newVal = [];
            if (button.textContent == "=") {
                console.log("I made it");
                let answer = valStack.reduce((a, b) => operate(a, b));
                console.log(answer);
                valStack = [];
                newVal = [];
                calcStack = [];
                return;
            }
            calcStack.push(button.textContent);
            console.log(valStack);
            console.log(calcStack);
        }
        if (button.textContent == "AC") {
            valStack = [];
            newVal = [];
            calcStack = [];
            console.log(valStack);
            console.log(calcStack);
        }
        if (button.textContent == "C") {
            newVal = [];
            console.log(valStack);
            console.log(calcStack);
        }
    });
});

function operate(answer, current) {
    let a = parseInt(answer);
    let b = parseInt(current);
    let currOperator = calcStack.pop();
    if (currOperator == "+") return add(a, b);
    if (currOperator == "-") return subtract(a, b);
    if (currOperator == "/") return divide(a, b);
    if (currOperator == "*") return multiply(a, b);
}


// Addition function
function add(a, b) {
    console.log(a + ' + ' + b + ' = ' + (a+b))
	return(a + b);
};

// Subtraction function
function subtract(a, b) {
    console.log(a + ' - ' + b + ' = ' + (a-b))
	return(a - b);
};

// Multiplication function
function multiply(a, b) {
    console.log(a + ' * ' + b + ' = ' + (a*b))
	return(a * b);
};

// Division function
function divide(a, b) {
    console.log(a + ' / ' + b + ' = ' + (a/b))
	return(a / b);
};

// Sum of Array 
function addAll(a) {
	return(a.reduce((a, b) => { add(a, b) }, 0));
};

// Multiply an Array 
function multiplyAll(a) {
  return(a.reduce((a, b) => { multiply(a, b) }, 1));
};

// Exponent 
function power(a, b) {
  return Math.pow(a, b);
};

// Factorial
function fact(a) {
	let answer = 1;
  for (i = 0; i < a; i++) {
    answer *= i+1;
  }
  return answer;
};