

const list = document.querySelector('ul');
const input = document.querySelector('input');

const numbers = "1234567890";
const operators = "+-/*";
const parenthesis = "()";
const other = ".=";
let dec = false;

// Building infix expression 
let expression = '';
let valStack = []; // Hold operands 
let newVal = []; // Hold value 
let currAnswer = false; // Will hold previous answer

const buttons = document.querySelectorAll('.button');

document.addEventListener("keydown", (event) => { 
    input.focus();
});

//Handling keyboard events 
input.addEventListener("keydown", (event) => { 
    if ((numbers.includes(event.key)) || 
        (operators.includes(event.key)) || 
        (other.includes(event.key)) || 
        (event.key == "Backspace") || 
        (event.key == "Enter")) {
        console.log("Input: " + event.key);  

        //Handling "Clear Last"
        if (event.key == "Backspace") {
            console.log("Running backspace");
            newVal = [];
            valStack.pop();
            expression = valStack.join('');
            input.value = expression;
            return;
        } 

        //Adding text to display 
        if (!(event.key == "Enter")) {
            if ((event.key == ".") && (newVal.length === 0)) expression = "0";
            if (operators.includes(event.key) && (newVal.length === 0)) return;
            if ((event.key == ".") && dec) return;
            expression += event.key;
            input.value = expression;
        }

        //Handling decimal
        if (event.key == ".") {
            addDecimal();
            return;
        }

        //Handling numbers
        if (numbers.includes(event.key)) {
            newNumber(event.key);
            return;
        }

        /*
        //Handling parenthesis
        if (parenthesis.includes(event.key)) {
            newParenthesis(event.key);
            return;
        }
        */

        //Handling operators
        if (operators.includes(event.key)) {
            newOperator(event.key);
            return;
        }

        //When entering = it will push the last value into valStack
        if (valStack.length === 0 && newVal.length === 0) {
            return;
        }
        newVal.push(event.key);
        valStack.push(parseFloat(newVal.join('')));
        console.log("Starting infix to postfix conversion: (Infix) " + valStack);

        //Convert to postfix 
        let output = infixToPostfix(valStack);
        console.log("Operating on postfix expression: (Postfix) " + output);

        //Calc postfix 
        expression = operate(output);
        console.log("Calculated: " + expression);
        currAnswer = parseFloat(expression.toFixed(3));
        input.value = (parseFloat(expression.toFixed(3)) == "Infinity") ? "Yea right" : parseFloat(expression.toFixed(3)); // No dividing by 0   
        console.log(" <----- DONE -----> ");
        valStack = [];
        valStack.push(currAnswer);
        newVal = false; 
        return;
    }
});

buttons.forEach(button => {
    button.addEventListener("mousedown", function () {
        button.classList.remove("noTouch");
        button.classList.add("touch");

    });
});

buttons.forEach(button => {
    button.addEventListener("mouseup", function () {
        button.classList.remove("touch");
        button.classList.add("noTouch");
    });
});

//Handling OSD buttons 
buttons.forEach(button => {
    button.addEventListener("click", function () {
        console.log("Input: " + button.textContent);  

        
        //Handling "Clear All"
        if (button.textContent == "AC") {
            clearAll();
            return;
        }

        //Handling "Clear Last"
        if (button.textContent == "C") {
            clear();
            return;
        } 

        //Adding text to display 
        if (!(button.textContent == "=")) {
            if ((button.textContent == ".") && (newVal.length === 0)) expression = "0";
            if (operators.includes(button.textContent) && (newVal.length === 0)) return;
            if ((button.textContent == ".") && dec) return;
            expression += button.textContent;
            input.value = expression;
        }

        //Handling decimal
        if (button.textContent == ".") {
            addDecimal();
            return;
        }

        //Handling numbers
        if (numbers.includes(button.textContent)) {
            newNumber(button.textContent);
            return;
        }

        /*
        //Handling parenthesis
        if (parenthesis.includes(button.textContent)) {
            newParenthesis(button.textContent);
            return;
        }
        */

        //Handling operators
        if (operators.includes(button.textContent)) {
            newOperator(button.textContent);
            return;
        }

        //When entering = it will push the last value into valStack
        if (valStack.length === 0 && newVal.length === 0) {
            return;
        }
        newVal.push(button.textContent);
        valStack.push(parseFloat(newVal.join('')));
        console.log("Starting infix to postfix conversion: (Infix) " + valStack);

        //Convert to postfix 
        let output = infixToPostfix(valStack);
        console.log("Operating on postfix expression: (Postfix) " + output);

        //Calc postfix 
        expression = operate(output);
        console.log("Calculated: " + expression);
        currAnswer = parseFloat(expression.toFixed(3));
        input.value = (parseFloat(expression.toFixed(3)) == "Infinity") ? "Yea right" : parseFloat(expression.toFixed(3)); // No dividing by 0
        console.log(" <----- DONE -----> ");
        valStack = [];
        if (currAnswer != "Infinity") valStack.push(currAnswer);
        newVal = false; 
        return;
    });
});


//Function for Clear All
function clearAll() {
    if (valStack) {
        valStack = [];
        newVal = [];
        dec = false;
        input.value = '';
        expression = '';
        console.log("Clearing All - valStack = " + valStack);
        return;
    }
    return;
}

//Function for Clear
function clear() {
    if (newVal) {
        expression = expression.slice(0, 0-newVal.length);
        input.value = expression;
        newVal = [];
        dec = false;
        console.log("Clearing newVal - newVal = " + newVal);
        return;
    }
    return;
}

//Function for DECIMAL input 
function addDecimal () {
    if (newVal == []) newVal.push("0");
    newVal.push(".");
    console.log("Value is a decimal");
    dec = true;
    return;
}

//Function for NUMBER input 
function newNumber (number) {
    if (currAnswer) {
        valStack = [];
        currAnswer = false;
        newVal = [number];
        expression = number;
        input.value = expression;
        return;
    }
    newVal.push(number);
    return;
}

//FUNCTION for PARENTHESIS input 
function newParenthesis(parens) {
    if (newVal == []) {
        valStack.push(parens);
    } else {
        if (newVal.includes('.')) {
            valStack.push(parseFloat(newVal.join('')));
        } else {
            valStack.push(parseInt(newVal.join('')));
        }
        valStack.push(parens);
        console.log("Added " + newVal + " to " + valStack);
        newVal = [];
        dec = false;
        return;
    } 
}

//Function for OPERATOR input 
function newOperator(operator) {
    currAnswer = false;
    if (valStack == []) {
        input.value = '';
        return;
    }
        
    if (newVal) {
        valStack.push(parseFloat(newVal.join('')));
        console.log("there is a newVal");
    }
    valStack.push(operator);
    console.log("Added " + newVal + " to " + valStack);
    newVal = [];
    dec = false;
    return;
}

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