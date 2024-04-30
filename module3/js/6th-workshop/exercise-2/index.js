// -*********************************************************-
// Utils
// -*********************************************************-
function askForNumber(promptMessage, options = {}) {
    while (true) {
        const rawInput = prompt(promptMessage);
        if (options?.allowedNullish && !rawInput) return rawInput;
        const castedInput = parseInt(rawInput);
        if (!Number.isNaN(castedInput)) return castedInput;
        alert('El valor ingresado no es número');
    }
}

const askForAnIndexFrom = function ({
    optionsArray,
    promptMessage,
    invalidMessage = 'Opción inválida. Intenta de nuevo',
}) {
    const formattedListString = optionsArray
        .map((element, index) => `${index + 1}. ${element}`)
        .join('\n');

    while (true) {
        const option = askForNumber(`${promptMessage}\n` + formattedListString);
        const isValidOption =
            option && option > 0 && option <= optionsArray.length;
        if (isValidOption) return option - 1;
        alert(invalidMessage);
    }
};

// -*********************************************************-
// Use cases
// -*********************************************************-

function setTimerToCheckImage() {
    const $timerSpan = document.querySelector('#timer > span');
    let counter = 3;
    return new Promise((resolve) => {
        const timer = setInterval(() => {
            if (counter === 0) {
                clearInterval(timer);
                setTimeout(() => resolve(), 0);
            }
            $timerSpan.textContent = counter--;
        }, 1000);
    });
}

const guessLogA = function () {
    const userGuessLogA = askForAnIndexFrom({
        promptMessage: '¿Qué imprimirá `console.log("Valor de a:", a);`?',
        optionsArray: [
            'Dará ReferenceError',
            'Valor de a: undefined',
            'Valor de a: 1',
        ],
    });
    switch (userGuessLogA) {
        case 0: {
            alert(
                'Incorrecto. La variable a al estar declarada con var, JavaScript hace hoisting de ella inicializandola a undefined.'
            );
            return 0;
        }
        case 1: {
            alert(
                '¡Correcto! JavaScript hace hoisting de ella inicializandola a undefined.'
            );
            return 1;
        }
        case 2: {
            alert(
                'Incorrecto. En ese momento de ejecución del programa aún no se ha inicializado la variable `a`.'
            );
            return 0;
        }
    }
};

const guessLogB = function () {
    const userGuessLogB = askForAnIndexFrom({
        promptMessage: '¿Qué imprimirá `console.log("Valor de b:", b);`?',
        optionsArray: [
            'Valor de b: undefined',
            'Valor de b: 1',
            'Dará ReferenceError',
        ],
    });
    switch (userGuessLogB) {
        case 0: {
            alert(
                'Incorrecto. Ese sería el comportamiento en el caso de que la variable estuviese declarada con `var`.'
            );
            return 0;
        }
        case 1: {
            alert(
                'Incorrecto. En ese momento de ejecución del programa aún no se ha inicializado la variable a. Y al estar declarada con `let` provoca un ReferenceError.'
            );
            return 0;
        }
        case 2: {
            alert(
                '¡Correcto! JavaScript hace hoisting de b pero la deja como non-initilized lo que provoca un error si intentamos acceder a ella antes de su inicialización.'
            );
            return 1;
        }
    }
};

const guessLogC = function () {
    const userGuessLogC = askForAnIndexFrom({
        promptMessage:
            'Si corregimos el error de la línea anterior. ¿Qué imprimirá `console.log("Valor de c:", c);`?',
        optionsArray: [
            'Dará ReferenceError',
            'Valor de c: 1',
            'Valor de c: undefined',
        ],
    });
    switch (userGuessLogC) {
        case 0: {
            alert(
                '¡Correcto! JavaScript hace hoisting de c pero la deja como non-initilized lo que provoca un error si intentamos acceder a ella antes de su inicialización.'
            );
            return 1;
        }
        case 1: {
            alert(
                'Incorrecto. En ese momento de ejecución del programa aún no se ha inicializado la variable a. Y al estar declarada con `const` provoca un ReferenceError.'
            );
            return 0;
        }
        case 2: {
            alert(
                'Incorrecto. Ese sería el comportamiento en el caso de que la variable estuviese declarada con var.'
            );
            return 0;
        }
    }
};

const guessLogDeclaredFunction = function () {
    const userGuessLogDeclaredFunction = askForAnIndexFrom({
        promptMessage:
            'Si corregimos el error del `console.log()` anterior. ¿Qué imprimirá `console.log("Resultado de funcionDeclarada:", funcionDeclarada());`?',
        optionsArray: [
            'Dara ReferenceError',
            'Resultado de funcionDeclarada: Función declarada ha sido llamada',
            'Resultado de funcionDeclarada: undefined',
        ],
    });
    switch (userGuessLogDeclaredFunction) {
        case 0: {
            alert(
                'Incorrecto. La funciones declaradas son elevadas junto con su definición al principio del ámbito en el que fueron declaradas'
            );
            return 0;
        }
        case 1: {
            alert(
                '¡Correcto! JavaScript hace hoisting de la función declarada guardando toda su definición en memoría lo que nos permite acceder a ella antes de su definición.'
            );
            return 1;
        }
        case 2: {
            alert(
                'Incorrecto. Ese sería el comportamiento en el caso de que la función fuese expresada y usando `var` para su declaración.'
            );
            return 0;
        }
    }
};

const guessLogExpressedFunction = function () {
    const userGuessLogExpressedFunction = askForAnIndexFrom({
        promptMessage:
            '¿Qué imprimirá `console.log("Resultado de funcionExpresada:", funcionExpresada());`?',
        optionsArray: [
            'Resultado de funcionExpresada: Función expresada ha sido llamada',
            'Dara TypeError',
            'Dara ReferenceError',
        ],
    });
    switch (userGuessLogExpressedFunction) {
        case 0: {
            alert(
                'Incorrecto. La funciones expresadas son variables que guardan la referencia a una función. Significa que su hoisting estará dado dependiendo de la keyword que se use para su declaración. En el caso de usar `const` nos dará ReferenceError ya que no podemos acceder a ella antes de su inicialización.'
            );
            return 0;
        }
        case 1: {
            alert(
                'Incorrecto. Ese sería el comportamiento en el caso de que la función fuese expresada y usando `var` y como undefined no es una función JavaScript levanta un TypeError.'
            );
            return 0;
        }
        case 2: {
            alert(
                '¡Correcto! JavaScript hace hoisting de las función expresadas dependiendo de la keyword usada para hacer la expresión de la función. En el caso de usar `const` nos dará ReferenceError ya que no podemos acceder a ella antes de su inicialización.'
            );
            return 1;
        }
    }
};

async function main() {
    await setTimerToCheckImage();
    const guessesCount =
        guessLogA() +
        guessLogB() +
        guessLogC() +
        guessLogDeclaredFunction() +
        guessLogExpressedFunction();
    document.querySelector('main').innerHTML += `
        <p>Acertaste ${guessesCount}/5 preguntas</p>
    `;
}
main();
