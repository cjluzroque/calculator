


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