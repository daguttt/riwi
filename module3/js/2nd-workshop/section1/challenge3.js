// -*********************************************************-
// Utils
// -*********************************************************-
const amountFormatter = new Intl.NumberFormat('es-US', {
    style: 'currency',
    currency: 'USD',
    currencyDisplay: 'narrowSymbol',
});

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

function askForBudget({ estimatedTotalToSpend }) {
    while (true) {
        const budget = askForCheckedAmount(
            `El total de tus gastos para el viaje es: ${amountFormatter.format(
                estimatedTotalToSpend
            )}\n` + 'Ingresa tu presupuesto'
        );
        if (estimatedTotalToSpend <= budget) return budget;
        alert('Necesitas más dinero para este viaje.');
    }
}

function getEmerencyBudget({ remainingBudget }) {
    while (true) {
        const emergencyBudget = askForCheckedAmount(
            `¿Cuánto planeas guardar para emergencias? (Restante ${amountFormatter.format(
                remainingBudget
            )})`
        );

        if (emergencyBudget <= remainingBudget) return emergencyBudget;
        alert(
            `${emergencyBudget} supera el dinero restante que tienes. Ingresa un valor diferente para emergencias`
        );
    }
}

function askForDesirableItems() {
    const desirableItems = [];
    let wantToAddMoreItems = true;
    while (wantToAddMoreItems) {
        const itemName = prompt(
            'Ingresa el nombre del articulo que te gustaría comprar'
        );
        const itemPrice = prompt(`¿Que costo tiene (${itemName})?`);
        desirableItems.push({ name: itemName, price: itemPrice });
        wantToAddMoreItems = confirm('¿Quieres añadir otro articulo?');
    }
    return desirableItems;
}

function getCheapestItem(itemList) {
    return itemList.reduce((cheapestItem, currItem) => {
        return currItem.price < cheapestItem.price ? currItem : cheapestItem;
    }, itemList[0]);
}

function main() {
    const expenses = {
        lodging: askForCheckedAmount('¿Cuánto cuesta tu alojamiento?'),
        transport: askForCheckedAmount('Ingresa el coste de tu transporte'),
        food: askForCheckedAmount('¿Cuál es tu presupuesto de alimentación?'),
    };
    const expensesTotal = Object.values(expenses).reduce(
        (total, expenseValue) => total + expenseValue
    );
    const budget = askForBudget({ estimatedTotalToSpend: expensesTotal });

    let remainingBudget = budget - expensesTotal;

    if (remainingBudget === 0)
        return alert(
            'No tienes dinero restante para emergencias o para comprar articulos adicionales'
        );

    const emergencyBudget = getEmerencyBudget({ remainingBudget });
    remainingBudget -= emergencyBudget;

    if (remainingBudget === 0)
        return alert(
            'No tienes dinero restante para comprar articulos adicionales'
        );

    alert(
        `Tu presupuesto restante para comprar articulos es: ${
            '$' + remainingBudget
        }`
    );

    const mockepDesirableItems = [
        {
            name: 'Caramelos',
            price: 55,
        },
        {
            name: 'Zapatillas',
            price: 90,
        },
        {
            name: 'Camiseta',
            price: 60,
        },
    ];
    // const desirableItems = askForDesirableItems();
    const cheapestItem = getCheapestItem(mockepDesirableItems);
    if (cheapestItem.price <= remainingBudget)
        alert(
            `¡Genial! Puedes comprar '${cheapestItem.name}' por un valor de '${cheapestItem.price}' sin comprometer tu presupuesto.`
        );
    else
        alert(
            `No tienes suficiente plata para comprar el articulo más barato añadido (${cheapestItem.name})\n` +
                `Dinero restante: ${amountFormatter.format(remainingBudget)}. ${
                    cheapestItem.name
                } cuesta ${amountFormatter.format(cheapestItem.price)}`
        );
}

main();
