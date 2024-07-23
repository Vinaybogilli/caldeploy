document.getElementById('theme-switch').addEventListener('change', function() {
    document.body.classList.toggle('dark-theme');
});

const operationElement = document.getElementById('operation');
const resultElement = document.getElementById('result');

let currentInput = '';
let previousInput = '';
let operator = null;

const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', () => {
        const value = button.getAttribute('data-value');

        if (!isNaN(value) || value === '.') {
            currentInput += value;
            resultElement.textContent = currentInput;
        } else if (value === 'C') {
            currentInput = '';
            previousInput = '';
            operator = null;
            operationElement.textContent = '';
            resultElement.textContent = '';
        } else if (value === '+/-') {
            currentInput = (parseFloat(currentInput) * -1).toString();
            resultElement.textContent = currentInput;
        } else if (value === '%') {
            currentInput = (parseFloat(currentInput) / 100).toString();
            resultElement.textContent = currentInput;
        } else if (value === '=') {
            if (operator && previousInput !== '') {
                currentInput = evaluate(previousInput, currentInput, operator);
                resultElement.textContent = currentInput;
                operationElement.textContent = '';
                previousInput = '';
                operator = null;
            }
        } else {
            if (currentInput === '') return;

            if (operator) {
                previousInput = evaluate(previousInput, currentInput, operator);
                resultElement.textContent = previousInput;
            } else {
                previousInput = currentInput;
            }

            operator = value;
            operationElement.textContent = `${previousInput} ${operator}`;
            currentInput = '';
        }
    });
});

function evaluate(a, b, operator) {
    a = parseFloat(a);
    b = parseFloat(b);
    let result;

    switch (operator) {
        case '+':
            result = a + b;
            break;
        case '-':
            result = a - b;
            break;
        case '×':
            result = a * b;
            break;
        case '÷':
            result = a / b;
            break;
        default:
            result = '';
    }

    return operator === '÷' ? result.toFixed(4) : result.toString();
}
