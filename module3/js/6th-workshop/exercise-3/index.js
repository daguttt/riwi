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

const createCounter = function (initialCounter) {
    return function (numToIncrease) {
        return (initialCounter += numToIncrease);
    };
};

function main() {
    const addFive = createCounter(5);
    console.log(addFive(3));

    const addEight = createCounter(8);
    console.group('8');
    console.log(addEight(3));
    console.log(addEight(3));
    console.log(addEight(3));
    console.groupEnd();

    const addTwo = createCounter(2);
    console.log(addTwo(3));
}
main();
