// -*********************************************************-
// Utils
// -*********************************************************-
const amountFormatter = new Intl.NumberFormat('es-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
});

function changePageTitle() {
    return new Promise((resolve) => {
        const title = 'Calculadora de Presupuesto';
        document.title = title;
        document.querySelector('h1').textContent = title;
        resolve();
    });
}

function askForCheckedAmount(promptMessage) {
    while (true) {
        const input = Number(prompt(promptMessage));
        if (!Number.isNaN(input) && input > 0) return input;
        alert('Valor ingresado inválido. Intenta de nuevo.');
    }
}

// -*********************************************************-
// Use cases
// -*********************************************************-

function askForDailyMinSavings({ dailyBudget }) {
    while (true) {
        const dailyMinSavings = askForCheckedAmount(
            `Tu presupuesto diario es: ${dailyBudget}\n` +
                'Ingresa cuánto quieres ahorrar'
        );
        if (dailyMinSavings <= dailyBudget) return dailyMinSavings;
        alert(
            `No puedes ahorrar más de tu presupesto diario. Presupuesto diario: ${amountFormatter.format(
                dailyBudget
            )}`
        );
    }
}

async function main() {
    await changePageTitle();
    const dailyBudget = askForCheckedAmount('¿Cuál es tu presupuesto diario?');
    const dailyMinSavings = askForDailyMinSavings({ dailyBudget });

    let remainingBudget = dailyBudget - dailyMinSavings;

    const eatingOutsideCost = askForCheckedAmount(
        '¿Cuanto te cuesta comer afuera?'
    );
    const buyingBooksCost = askForCheckedAmount(
        '¿Cuanto te cuesta comprar libros?'
    );

    const prefersBuyingBooks = confirm('¿Prefieres comprar libros?');

    let canBuyBooks;
    let canEatOutside;
    if (prefersBuyingBooks) {
        canBuyBooks = buyingBooksCost <= remainingBudget;
        remainingBudget -= buyingBooksCost;
        canEatOutside = eatingOutsideCost <= remainingBudget;
    } else {
        canEatOutside = eatingOutsideCost <= remainingBudget;
        remainingBudget -= eatingOutsideCost;
        canBuyBooks = buyingBooksCost <= remainingBudget;
    }

    if (canEatOutside && canBuyBooks) {
        console.log(
            'Puedes comprar libros y comer afuera sin afectar tus ahorros'
        );
    } else if (canEatOutside) {
        console.log('Puedes comer afuera sin afectar tus ahorros');
    } else if (canBuyBooks) {
        console.log('Puedes comprar libros sin afectar tus ahorros');
    } else {
        console.log(
            'No te puedes permitir gastar en ninguna actividad en el momento'
        );
    }
}

main();
