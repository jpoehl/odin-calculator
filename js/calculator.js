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