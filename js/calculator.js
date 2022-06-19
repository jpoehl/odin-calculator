// Get buttons
const btnNumbers = document.querySelectorAll('[data-digit]');
const btnOperators = document.querySelectorAll('[data-operator]');
const btnEqual = document.getElementById("equal");
const btnDecimal = document.getElementById("decimal");
const btnCancel = document.getElementById("cancel");
const btnClearAll = document.getElementById("clearall");

// Get output fields
const operandPrev = document.getElementById("operandPrev");
const operandCurr = document.getElementById("operandCurrent")

// Add event listeners
/// Number buttons, if clicked, should append a number to the current operand and update the display
btnNumbers.forEach(btn => {
    btn.addEventListener("click", () => {// Wrap in a function
        calculator.append(btn.innerText);
        calculator.updateDisplay()
    })
})

// Mathematical functions
function add(x, y) {
    return x + y;
}

function subtract(x, y) {
    return x - y;
}

function multiply(x, y) {
    return x * y;
}

function divide(x, y) {
    if (y === 0) {
        return undefined;
    } else {
        return x / y;
    }
}

// Operating function
function operate(a, b, o) {
    let result;

    switch (o) {
        case '+':
            result = add(a, b);
            break;
        case '-':
            result = subtract(a, b);
            break;
        case '/':
            result = divide(a, b);
            break;
        case '*':
            result = multiply(a, b);
            break;
    }

    return result;
}

// Format for display
/// Obtain the number of decimal places (https://stackoverflow.com/questions/9539513/is-there-a-reliable-way-in-javascript-to-obtain-the-number-of-decimal-places-of)
function decimalPlaces(n) {
    function hasFraction(n) {
        return Math.abs(Math.round(n) - n) > 1e-10;
    }

    let count = 0;
    // multiply by increasing powers of 10 until the fractional part is ~ 0
    while (hasFraction(n * (10 ** count)) && isFinite(10 ** count))
        count++;
    return count;
}

function display(x, decimals = 10) {
    if (decimalPlaces(x) > decimals) {
        return x.toPrecision(decimals);
    } else {
        return x.toString();
    }
}

// Venture into OOP: create a calculator class (https://www.section.io/engineering-education/building-a-calculator-a-javascript-project-for-beginners/)
class Calculator {
    constructor(operandPrev, operandCurr) {
        this.operandPrev = operandPrev;
        this.operandCurr = operandCurr;
        this.clearall();
    }

    // Method to clear all inputs
    clearall() {
        this.operandPrev = "";
        this.operandCurr = "";
        this.operation = undefined;
    }

    // Method to append a number
    append(num) {
        // Check if number already contains a decimal point
        if (num === "." && this.operandCurr.includes(".")) return;

        // Append number
        this.operandCurr = this.operandCurr.toString() + num.toString();
    }
}

// Create a calculator item
const calculator = new Calculator(operandPrev, operandCurr);