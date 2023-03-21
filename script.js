let runningtotal = 0;
let buffer = "0";
let previousoperator;

const screen = document.querySelector('.screen');

function buttonClick(value) {
    if (isNaN(value)) {
        handleSymbol(value);
    } else {
        handleNumber(value);
    }
    screen.innerText = buffer;
}

function handleSymbol(symbol) {
    switch (symbol) {
        case 'C':
            buffer = '0';
            runningtotal = 0;
            break;
        case '=':
            if (previousoperator === null) {
                return;
            }
            flushOperators(parseInt(buffer));
            previousoperator = null;
            buffer = runningtotal;
            runningtotal = 0;
            break;
        case '←':
            if (buffer.length === 1) {
                buffer = '0';

            } else {
                buffer = buffer.substring(0, buffer.length - 1);
            }
            break;
        case '+':
        case '−':
        case '×':
        case '÷':
            handleMath(symbol);
            break;

    }
}

function handleMath(symbol) {
    if (buffer == '0') {
        return;
    }


    const intBuffer = parseInt(buffer);

    if (runningtotal === 0) { runningtotal = intBuffer; } else {
        flushOperators(intBuffer);
    }
    previousoperator = symbol;
    buffer = '0';
}

function flushOperators(intBuffer) {
    if (previousoperator == '+') {
        runningtotal += intBuffer;
    } else if (previousoperator === '−') {
        runningtotal -= intBuffer;
    } else if (previousoperator === '×') {
        runningtotal *= intBuffer;
    } else if (previousoperator === '÷') {
        runningtotal /= intBuffer;
    }
}

function handleNumber(numberString) {
    if (buffer == '0') {
        buffer = numberString;
    } else {
        buffer += numberString;
    }
}

function init() {
    document.querySelector('.calc-buttons').
    addEventListener('click', function(event) {
        buttonClick(event.target.innerText);
    })
}
init();