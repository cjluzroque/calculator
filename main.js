

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

// Building postfix expression 
let output = []; // This will be the postfix expression 

const calc = document.querySelector('.calc');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener("click", function () { 
        if (done == true) {
            expression = '';
            input.value = expression;
            console.log(input.value);
            done = false;
        }
    });
});

buttons.forEach(button => {
    button.addEventListener("click", function () {
        console.log(button.textContent);
        console.log(done);
        

        //Adding text to display 
        expression += button.textContent;
        input.value = expression;


        if (button.textContent == ".") {
            if (dec) return;
            newVal.push(button.textContent);
            console.log(newVal);
            dec = true;
            return;
        }
        if (numbers.includes(button.textContent)) {
            newVal.push(button.textContent);
            console.log(newVal);
            return;
        } 
        if (operators.includes(button.textContent)) {
            if (newVal.includes('.')) {
                valStack.push(parseFloat(newVal.join('')));
            } else {
                valStack.push(parseInt(newVal.join('')));
            }
            valStack.push(button.textContent);
            newVal = [];
            console.log(valStack);
            dec = false;
            return;
        }
        if (button.textContent == "AC") {
            valStack = [];
            newVal = [];
            console.log(valStack);
            dec = false;
            input.value = '';
            return;
        }
        if (button.textContent == "C") {
            newVal = [];
            console.log(valStack);
            console.log(newVal);
            dec = false;
            return;
        }
        //When entering = it will push the last value into valStack
        newVal.push(button.textContent);
        valStack.push(parseFloat(newVal.join('')));
        console.log("Turn into postfix: " + valStack);

        //Convert to postfix 
        output = infixToPostfix(valStack);

        //Calc postfix 
        expression = operate();
        input.value = expression;
        done = true;
        console.log(done);
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
        // If the scanned character is
        // an operand, add it to the output string.
        if (!isNaN(c)) {
            result.push(c);
        }

        // If the scanned character is 
        // an ‘(‘, push it to the stack.
        else if (c === '(')
            st.push('(');

        // If the scanned character is an ‘)’,
        // pop and add to the output string from the stack
        // until an ‘(‘ is encountered.
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

    console.log("Infix: " + s + " Postfix: " + result);
    input.value = result;
    return(result);
}

//Calculate postfix
function operate() {
    let answer = []; 
    output.forEach(item => { 
        // If the scanned character is an operand, push it to the stack.
        if (!isNaN(item)) {
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
                answer.push((val2 + val1).toFixed(2));
                break;
            case '-':
                answer.push((val2 - val1).toFixed(2));
                break;
            case '/':
                answer.push((val2 / val1).toFixed(2));
                break;
            case '*':
                answer.push((val2 * val1).toFixed(2));
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