function roundToPrecision(value, precision = 10) {
    return Math.round(value * Math.pow(10, precision)) / Math.pow(10, precision);
}

var firstNumber = null;
var secondNumber = null;
var operation = null;
var result = null;
var memory = null;

const inputField = document.querySelector('.calculator_input');
const numberButtons = document.querySelectorAll('.calculator_button.number');
const specialButtons = document.querySelectorAll('.calculator_button.special');

numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        const currentValue = inputField.value;
        const clickedValue = button.textContent;

        if (currentValue === '0') {
            if (clickedValue !== '0' && clickedValue !== '00') {
                inputField.value = clickedValue;
            }
        } else if (currentValue === 'Infinity' || 
                   currentValue == 'NaN') {
            // Do Nothing
        } else if (inputField.value.length < 15) {
            if (button.textContent === '00' && inputField.value.length === 14) {
                inputField.value += '0';
            } else {
                inputField.value += button.textContent;
            }
        }
    });
});

specialButtons.forEach(button => {
    button.addEventListener('click', () => {
        const clickedValue = button.textContent;

        switch (clickedValue) {
            case 'C':
                firstNumber = null;
                secondNumber = null;
                operation = null;
                result = null;
                inputField.value = '0';
                break;
            case 'DEL': 
                if (inputField.value !== '0' &&
                    inputField.value !== 'Infinity' &&
                    inputField.value !== 'NaN'
                ) {
                    inputField.value = inputField.value.slice(0, -1) || '0';

                    if (inputField.value === '-') {
                        inputField.value = '0';
                    }
                }
                break;
            case '+':
            case '-':
            case '×':
            case '%':
            case '/':
                if (operation === null) {
                    firstNumber = parseFloat(inputField.value);
                    inputField.value = '';
                }
                operation = clickedValue;
                break;
            case '=':
                if (firstNumber !== null && 
                    operation !== null &&
                    inputField.value !== ''
                ) {
                    secondNumber = parseFloat(inputField.value);
                    
                    switch (operation) {
                        case '/':
                            result = firstNumber / secondNumber;
                            break;
                        case '×':
                            result = firstNumber * secondNumber;
                            break;
                        case '%': 
                            result = firstNumber % secondNumber;
                            break;
                        case '+':
                            result = firstNumber + secondNumber;
                            break;
                        case '-':
                            result = firstNumber - secondNumber;
                            break;
                    }

                    result = roundToPrecision(result);
                    inputField.value = result;

                    console.log(`${firstNumber} ${operation} ${secondNumber} = ${result}`);

                    firstNumber = result;
                    secondNumber = null;
                    operation = null;
                }
                break;
            case '.':
                if (!inputField.value.includes('.') &&
                    inputField.value !== 'Infinity' &&
                    inputField.value !== 'NaN') {
                    inputField.value += '.';
                }
                break;
            case '+/-': 
                if (inputField.value !== '0' &&
                    inputField.value !== 'NaN'
                ) {
                    if (inputField.value.startsWith('-')) {
                        inputField.value = inputField.value.slice(1);
                    } else {
                        inputField.value = '-' + inputField.value;
                    }
                }
                break;
            case 'MS':
                if (inputField.value !== 'Infinity' &&
                    inputField.value !== 'NaN'
                ) {
                    memory = parseFloat(inputField.value);
                }
                break;
            case 'MR':
                if (memory !== null) {
                    inputField.value = memory;
                } else {
                    inputField.value = '0';
                }
                break;
            case 'MC':
                memory = null;
                break;
            case 'R':
                inputField.value = firstNumber || 0;
                break;
            default:
                console.error(`Unhandled special button: ${clickedValue}`);
        }
    })
});