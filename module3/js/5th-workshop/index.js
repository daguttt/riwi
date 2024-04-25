const amountFormatter = new Intl.NumberFormat('es-CO', {
    currency: 'COP',
    style: 'currency',
});
let budget = 2_500_000;

// -*********************************************************-
// Utils
// -*********************************************************-
function askForNumber(promptMessage) {
    while (true) {
        const input = Number(prompt(promptMessage));
        if (!Number.isNaN(input)) return input;
        alert('El valor ingresado no es número');
    }
}

function showMessage(message) {
    document.body.innerHTML += `<p>${message}</p>`;
}

let timesShowedBudget = 0;
function showCurrentBudget(currentBudget) {
    showMessage(
        `${++timesShowedBudget}. Presupuesto: ${amountFormatter.format(
            budget
        )}\n`
    );
}

// -*********************************************************-
// Use cases
// -*********************************************************-
// -*********************-
// Case 1
const optionsToBuy = [
    {
        title: 'Comprar un almohabana con gaseosa.',
        price: 15_000,
        message: 'Te caerá mal porque llevas mucho tiempo en el stand.',
    },
    {
        title: 'Comprar un subway con gaseosa.',
        price: 23_000,
        message: 'Quedarás llenito y bien',
    },
    {
        title: 'No comprar nada.',
        price: 0,
        message: 'Te tocará comprar algo en Medellín',
    },
];

function askForOptionToBuy() {
    const optionsFormattedMessage = optionsToBuy
        .map((option, index) => `${index + 1}. ${option.title}`)
        .join('\n');

    while (true) {
        const option = askForNumber(
            '¿Qué deseas comprar para tu viaje?:\n' + optionsFormattedMessage
        );
        const isValidOption =
            option && option > 0 && option <= optionsToBuy.length;
        if (isValidOption) return option;
        alert('Opción inválida. Intenta de nuevo');
    }
}

function case1() {
    const option = askForOptionToBuy();
    const optionIndex = option - 1;

    switch (option) {
        case 1:
            budget -= 15_000;
        case 2:
            budget -= 23_000;
    }
    showMessage(optionsToBuy[optionIndex].title);
    showMessage(optionsToBuy[optionIndex].message);
    showCurrentBudget(budget);
}

// -*********************-
// Case 2

function case2() {
    const suitcaseSizes = {
        height: 60,
        length: 40,
        width: 20,
    };
    const maxSuitcaseSizes = {
        height: 55,
        length: 40,
        width: 20,
    };
}

function main() {
    case1();
}
main();
