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

const logs = [
    {
        message: 'console.log("Inicio del script")',
        correctOrder: 'Primero',
        guessedOrder: null,
    },
    {
        message: 'console.log("Primer setTimeout")',
        correctOrder: 'Cuarto',
        guessedOrder: null,
    },
    {
        message: 'console.log("Segundo setTimeout")',
        correctOrder: 'Quinto',
        guessedOrder: null,
    },
    {
        message: 'console.log("Promesa resuelta")',
        correctOrder: 'Tercero',
        guessedOrder: null,
    },
    {
        message: 'console.log("Fin del script")',
        correctOrder: 'Segundo',
        guessedOrder: null,
    },
];

async function main() {
    await setTimerToCheckImage();
    let logOrders = logs
        .map((l) => l.correctOrder)
        .sort((a, b) => (a < b ? -1 : 1));
    console.log({ logOrders });

    // const guessesCount =
    logs.forEach((log) => {
        const orderIndex =
            logOrders.length === 1
                ? 0
                : askForAnIndexFrom({
                      optionsArray: logOrders,
                      promptMessage: `¿En que orden se va a ejecutar '${log.message}'?`,
                  });
        const chosenOrder = logOrders[orderIndex];
        logOrders.splice(orderIndex, 1);
        log.guessedOrder = chosenOrder;
        return log;
    });

    const correctGuessesCount = logs.filter(
        (log) => log.correctOrder === log.guessedOrder
    ).length;

    document.querySelector('main').innerHTML += `
        <p>Acertaste ${correctGuessesCount}/${logs.length} Pasos</p>
    `;
}
main();
