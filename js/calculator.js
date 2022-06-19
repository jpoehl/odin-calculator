// Get buttons
const btnNumbers = document.querySelectorAll('[data-digit]');
const btnOperators = document.querySelectorAll('[data-operator]');
const btnEqual = document.getElementById("equal");
const btnCancel = document.getElementById("cancel");
const btnClearAll = document.getElementById("clearall");

// Get output fields
const operandPrevText = document.getElementById("operandPrev");
const operandCurrText = document.getElementById("operandCurrent");

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
    constructor(operandPrevText, operandCurrText) {
        this.operandPrevText = operandPrevText;
        this.operandCurrText = operandCurrText;
        this.clearall();
    }

    // Method to clear all inputs
    clearall() {
        this.operandPrev = "";
        this.operandCurr = "";
        this.operation = undefined;
    }

    // Method to cancel last action
    cancel() {
        this.operandCurr = this.operandCurr.toString().slice(0, -1);
    }

    // Method to append a number
    append(num) {
        if (num === '.' && this.operandCurr.includes('.')) return;
        
        // Append number
        this.operandCurr = this.operandCurr.toString() + num.toString();
    }

    // Choose an operation
    operate(operation) {
        if (this.operandCurr === "") return;
        if (this.operandPrev !== "") {
            this.compute();
        }

        this.operation = operation;
        this.operandPrev = this.operandCurr;
        this.operandCurr = "";

    }

    // Computation function
    compute() {
        let result;
        const a = parseFloat(this.operandPrev);
        const b = parseFloat(this.operandCurr);

        switch (this.operation) {
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
            default:
                return;
        }

        this.operandCurr = result;
        this.operandPrev = "";
        this.operation = undefined;
    }

    // Update display
    updateDisplay() {
        this.operandCurrText.textContent = display(this.operandCurr);

        if (this.operation != null) {
            this.operandPrevText.textContent = `${display(this.operandPrev)} ${this.operation}`;
        } else {
            this.operandPrevText.textContent = "";
        }
    }

}

// Create a calculator item
const calculator = new Calculator(operandPrevText, operandCurrText);

// Add event listeners
/// Number buttons, if clicked, should append a number to the current operand and update the display
for (const btn of btnNumbers) {
    btn.addEventListener("click", (e) => {// Wrap in a function
        calculator.append(e.target.textContent);
        calculator.updateDisplay();
    });
}

/// Operator buttons, if clicked, should select an operation
for (const btn of btnOperators) {
    btn.addEventListener("click", (e) => {// Wrap in a function
        calculator.operate(e.target.textContent);
        calculator.updateDisplay();
    });
}

/// Equals button: Return result
btnEqual.addEventListener("click", () => {
    calculator.compute();
    calculator.updateDisplay();
})

/// Clear all button
btnClearAll.addEventListener("click", () => {
    calculator.clearall();
    calculator.updateDisplay();
})

/// Cancel button
btnCancel.addEventListener("click", () => {
    calculator.cancel();
    calculator.updateDisplay();
})