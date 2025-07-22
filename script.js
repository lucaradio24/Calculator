
let num1 = ''
let num2 = ''
let operator = ''
const display = document.getElementById('display')

function add (a, b) {
    return a + b
}

function subtract (a, b) {
    return a - b
}

function multiply (a, b) {
    return a * b
}

function divide (a, b) {
    return a / b
}

function operate (operator, a, b) {
    switch (operator){
        case "+":
            return add (a, b);
        case "-":
            return subtract (a, b);
        case "X":
            return multiply(a, b);
        case "÷":
            if (b === 0){
                return "Dividing by 0? You sure?"
            }
            return divide(a,b)
        default:
            return "Please enter a valid operator"
    }
}

const numberButtons = document.querySelectorAll('.number')
numberButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const digit = btn.textContent
        if (operator === ''){
            num1 += digit;
            display.textContent = num1;
        } else {
            display.textContent = '';
            num2 += digit;
            display.textContent = num2;
        }
    })
})

const operatorButtons = document.querySelectorAll('.operator')
operatorButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        if (num1 && operator && num2){
            const result = operate(operator, parseFloat(num1), parseFloat(num2))
            num1 = result.toString();
            num2 = '';
            display.textContent = num1;
        }
        operator = btn.textContent;
        
    })
})

const equalButton = document.querySelector('#equal')
equalButton.addEventListener ('click', () => {
    if (!num1 || !operator || !num2){
        return
    } 
    let a = parseFloat(num1);
    let b = parseFloat(num2);
    const result = operate(operator, a, b);
    if ( typeof result === 'string' ){
        display.textContent = result
        num1 = '';
        num2 = '';
        operator = '';
        
    } else {
    display.textContent = result
    num1 = result.toString();
    num2 = '';
    operator = '';
    }
} )

const clearButton = document.querySelector('#clear')
clearButton.addEventListener('click', () => {
    num1 = '';
    num2 = '';
    operator = '';
    display.textContent = '';
})