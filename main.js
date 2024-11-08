

const list = document.querySelector('ul');
const input = document.querySelector('input');

const numbers = "1234567890";
const operators = "+-/*";
let dec = false;

// Building infix expression 
let done = false;
let expression = '';
let valStack = []; // Hold operands 
let newVal = []; // Hold value 

const calc = document.querySelector('.calc');
const buttons = document.querySelectorAll('button');


buttons.forEach(button => {
    button.addEventListener("click", function () {
        console.log("Input: " + button.textContent);        

        //Adding text to display 
        if (done == true) {
            expression = '';
            input.value = expression;
            done = false;
        }
        expression += button.textContent;
        input.value = expression;


        if (button.textContent == ".") {
            if (dec) return;
            newVal.push(button.textContent);
            console.log("Value is a decimal");
            dec = true;
            return;
        }
        if (numbers.includes(button.textContent)) {
            newVal.push(button.textContent);
            return;
        } 
        if (operators.includes(button.textContent)) {
            if (newVal.includes('.')) {
                valStack.push(parseFloat(newVal.join('')));
            } else {
                valStack.push(parseInt(newVal.join('')));
            }
            valStack.push(button.textContent);
            console.log("Added " + newVal + " to " + valStack);
            newVal = [];
            dec = false;
            return;
        }
        if (button.textContent == "AC") {
            valStack = [];
            newVal = [];
            dec = false;
            input.value = '';
            console.log("Clearing All - valStack = " + valStack);
            return;
        }
        if (button.textContent == "C") {
            newVal = [];
            dec = false;
            console.log("Clearing newVal - newVal = " + newVal);
            return;
        }
        //When entering = it will push the last value into valStack
        newVal.push(button.textContent);
        valStack.push(parseFloat(newVal.join('')));
        console.log("Starting infix to postfix conversion: (Infix) " + valStack);

        //Convert to postfix 
        let output = infixToPostfix(valStack);
        console.log("Operating on postfix expression: (Postfix) " + output);

        //Calc postfix 
        expression = operate(output);
        console.log("Calculated: " + expression);
        input.value = parseFloat(expression.toFixed(3));   
        done = true;
        console.log(" <----- DONE -----> ");
        valStack = []; 
        newVal = []; 
        return;
    });
});


//Convert infix to postix 
function infixToPostfix(s) {
    let st = [];
    let result = [];

    s.forEach(c => {
        // If the scanned character is an operand, add it to the output string.
        if (!isNaN(c)) {
            result.push(c);
        }

        // If the scanned character is an ‘(‘, push it to the stack.
        else if (c === '(')
            st.push('(');

        // If the scanned character is an ‘)’, pop and add to the output string from the stack until an ‘(‘ is encountered.
        else if (c === ')') {
            while (st[st.length - 1] !== '(') {
                result.push(st.pop());
            }
            st.pop();
        }

        // If an operator is scanned
        else {
            while (st.length && (precedence(c) < precedence(st[st.length - 1]) ||
                                precedence(c) === precedence(st[st.length - 1]))) {
                result.push(st.pop());
            }
            st.push(c);
        }
    });

    // Pop all the remaining elements from the stack
    while (st.length) {
        result.push(st.pop());
    }
    input.value = result;
    console.log("Success");
    return(result);
}

//Calculate postfix
function operate(infix) {
    let answer = []; 
    infix.forEach(item => { 
        // If the scanned character is an operand, push it to the stack.
        if (!isNaN(item)) {
            answer.push(item);
            return;
        }
        //  If the scanned character is an operator, pop two elements from stack apply the operator
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
    console.log("Success");
    return(answer.pop());
}

// Precedence 
function precedence(operator) {
    if((operator == "+") || (operator == "-")) return 11;
    if((operator == "*") || (operator == "/")) return 12;
}

function isFloat(n) {
    return n === +n && n !== (n|0);
}

function isInteger(n) {
    return n === +n && n === (n|0);
}