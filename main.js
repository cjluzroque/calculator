


const button = document.querySelector('#create');
const list = document.querySelector('ul');
const input = document.querySelector('input');
const current = document.querySelector('#current');

const numbers = "1234567890";
const operators = "+-/*";

let valStack = []; // Hold operands 
let newVal = []; // Hold value 
let stack = []; 
let output = [12, 34, 56, 78, 90, '+', '+','+','+'];
console.log(operate());

const calc = document.querySelector('.calc');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener("click", function () {
        console.log(button.textContent);
        if (numbers.includes(button.textContent)) {
            newVal.push(button.textContent);
            console.log(newVal);
            return;
        } 
        if (operators.includes(button.textContent)) {
            valStack.push(parseInt(newVal.join('')));
            valStack.push(button.textContent);
            newVal = [];
            console.log(valStack);
            return;
        }
        if (button.textContent == "AC") {
            valStack = [];
            newVal = [];
            console.log(valStack);
            return;
        }
        if (button.textContent == "C") {
            newVal = [];
            console.log(valStack);
            console.log(newVal);
            return;
        }
        //When entering = it will push the last value into valStack
        newVal.push(button.textContent);
        valStack.push(parseInt(newVal.join('')));
        console.log("Turn into postfix: " + valStack);

        //Convert to postfix 
        valStack.forEach(item => {
            if (Number.isInteger(item)) {
                output.push(item);
            } else {
              while ((stack != []) && (precedence(item) <= precedence(stack[-1]))) {
                output.push(stack.pop());
              } 
              stack.push(item);
            }
        });
        let items = stack.length;
        for (i = 0; i < items; i++) output.push(stack.pop());
        console.log(stack);
        console.log(output);

        //Calc postfix 
        console.log(operate());
        valStack = []; 
        newVal = []; 
        return;
    });
});


//Calculate postfix
function operate() {
    let answer = []; 
    output.forEach(item => { 
        // If the scanned character is an operand, push it to the stack.
        if (Number.isInteger(item)) {
            answer.push(item);
            console.log(answer);
            return;
        }
        //  If the scanned character is an operator, pop two
        // elements from stack apply the operator
        let val1 = answer.pop();
        let val2 = answer.pop();
        switch(item) {
            case '+':
                answer.push(val2 + val1);
                break;
            case '-':
                answer.push(val2 - val1);
                break;
            case '/':
                answer.push(val2 / val1);
                break;
            case '*':
                answer.push(val2 * val1);
                break;
        }
    });
    console.log("Answer: " + answer.slice('').pop());
    return(answer.pop());
}

// Precedence 
function precedence(operator) {
    if((operator == "+") || (operator == "-")) return 11;
    if((operator == "*") || (operator == "/")) return 12;
}