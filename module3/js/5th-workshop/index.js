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

function showCurrentBudget() {
    return `Presupuesto: ${amountFormatter.format(budget)}\n`;
}
// -*********************************************************-
// Use cases
// -*********************************************************-
function case1() {
    const optionMessageLines = [
        'Comprar un almohabana.',
        'Comprar un subway con gaseosa.',
        'No comprar nada.',
    ];
    const option = askForNumber(
        '¿Qué deseas comprar para tu viaje?:\n' +
            optionMessageLines
                .map((line, index) => `${index + 1}. ${line}`)
                .join('\n')
    );
    const lastLineIndex = optionMessageLines.length - 1;
    if (option === lastLineIndex) {
        console.log(
            showCurrentBudget() +
                'Te tocará comprar algo cuando llegues a medellín'
        );
    } else if (option === 1) {
        budget -= 15_000;
        console.log(
            showCurrentBudget() +
                'Te caera mal porque llevas mucho tiempo en el stand'
        );
    } else if (option === 2) {
        budget -= 23_000;
        console.log(showCurrentBudget() + 'Quedarás llenito y bien');
    }
    console.log(showCurrentBudget());
}

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
