


const button = document.querySelector('#create');
const list = document.querySelector('ul');
const input = document.querySelector('input');
const current = document.querySelector('#current');

const numbers = "1234567890";
const operators = "+-/*";

let valStack = []; // Hold operands 
let calcStack = []; // Hold operators 
let operandCount = 0;
let digits = 0;

const calc = document.querySelector('.calc');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener("click", function () {
        console.log(button.textContent);

        if (numbers.includes(button.textContent)) {
            valStack.push(button.textContent);
            digits++;
            console.log(valStack);
            console.log(calcStack);

            input.textContent = input.textContent + '' + button.textContent;
        }
        if (operators.includes(button.textContent)) {
            calcStack.push(button.textContent);
            console.log(valStack);
            let operand = valStack.join('');
            valStack.splice(operandCount, digits);
            digits = 0;
            valStack.push(operand);
            operandCount++;
            console.log(valStack);
            console.log(calcStack);
        }
        if (button.textContent == "AC") {
            valStack = [];
            calcStack = [];
            operandCount = 0;
            digits = 0;
            console.log(valStack);
            console.log(calcStack);
        }
        if (button.textContent == "C") {
            valStack.pop();
            calcStack.pop();
            operandCount--;
            digits = 0;
            console.log(valStack);
            console.log(calcStack);
        }







    });
});



// Addition function
function add(a, b) {
	return(a + b);
};

// Subtraction function
function subtract(a, b) {
	return(a - b);
};

// Multiplication function
function multiply(a, b) {
	return(a * b);
};

// Division function
function divide(a, b) {
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