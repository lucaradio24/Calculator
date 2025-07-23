
let num1 = ''
let num2 = ''
let operator = ''
let resultDisplayed = false;
const display = document.getElementById('display')
display.textContent = '0';

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

function handleNumber(digit){
        if (resultDisplayed) {
            num1 = num2 = operator = '';
            resultDisplayed = false;
        }
        
        if (digit === '.' && display.textContent.includes('.')){
            return
        }

        if (operator === ''){
            num1 += digit;
            display.textContent = num1;
        } else {
            display.textContent = '';
            num2 += digit;
            display.textContent = num2;
        }
    }


const numberButtons = document.querySelectorAll('.number')
numberButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        handleNumber(btn.textContent)
})
})

function handleOperator(op){
    if (resultDisplayed){
        resultDisplayed = false
    }
    
    if (!num2){
            operator = op;
            return
        }
        
        if (num1 && operator && num2){
            const result = operate(operator, parseFloat(num1), parseFloat(num2))
            num1 = result.toString();
            num2 = '';
            display.textContent = num1;
        }
        operator = op;
}

const operatorButtons = document.querySelectorAll('.operator')
operatorButtons.forEach(btn => {
    btn.addEventListener ('click', () => {
        handleOperator(btn.textContent)
    })
})
    
function handleEqual (){
    if (!num1 || !operator || !num2){
        return
    } 
    let a = parseFloat(num1);
    let b = parseFloat(num2);
    const result = operate(operator, a, b);
    if ( typeof result === 'string' ){
        display.textContent = result
        num1 = num2 = operator = '';
        
    } else {
        const rounded = Number(result.toFixed(2));
        display.textContent = rounded
        num1 = result.toString();
        num2 = '';
        operator = '';
    }

    resultDisplayed = true
}

const equalButton = document.querySelector('#equal')
equalButton.addEventListener ('click', () => {
    handleEqual()
} )

function handleClear (){
    num1 = '';
    num2 = '';
    operator = '';
    display.textContent = '0';
}

const clearButton = document.querySelector('#clear')
clearButton.addEventListener('click', () => {
    handleClear()
})

function handleBackspace (){
if (operator === ''){
        num1 = num1.slice(0, -1);
        display.textContent = num1 === '' ? '0' : num1;
    } else {
        num2 = num2.slice(0, -1);
        display.textContent = num2 === '' ? '0' : num2;
    }
}

const backspaceButton = document.querySelector('#backspace')
backspaceButton.addEventListener('click', () => {
    handleBackspace()
})

document.addEventListener('keydown', e =>{
    const key = e.key
    

    if (key === 'Enter') {
    e.preventDefault()
    handleEqual()
    };

    if (/[0-9.]/.test(key)){
        handleNumber(key)
    }

    if (['+', '-', '*', '/'].includes(key)){
        e.preventDefault()
        const opSymbol = key === '*'
        ? 'X'
        : key === '/'
        ? '÷'
        : key;

        handleOperator(opSymbol)
        return
    } 
    if (e.key === 'Escape'){
    handleClear()
    }
    if (e.key === 'Backspace'){
        handleBackspace()
    }
})