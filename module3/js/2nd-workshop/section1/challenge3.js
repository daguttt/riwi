// -*********************************************************-
// Utils
// -*********************************************************-
function askForCheckedAmount(promptMessage) {
    while (true) {
        const input = Number(prompt(promptMessage));
        if (!Number.isNaN(input) && input > 0) return input;
        alert('Invalid input value. Try again.');
    }
}

// -*********************************************************-
// Use cases
// -*********************************************************-

function getBudget({ estimatedTotalToSpend }) {
    while (true) {
        const budget = askForCheckedAmount('Enter your budget');
        if (estimatedTotalToSpend < budget) return budget;
        alert('You need more money for your trip.');
    }
}

function askForDesirableItems() {
    const desirableItems = [];
    let wantToAddMoreItems = true;
    while (wantToAddMoreItems) {
        const itemName = prompt(
            'Enter the name of the item you would like to buy'
        );
        const itemPrice = prompt(`How much is that ${itemName}?`);
        desirableItems.push({ name: itemName, price: itemPrice });
        wantToAddMoreItems = confirm('¿Quieres añadir otro suvenir?');
    }
    return desirableItems;
}

function main() {
    const expenses = {
        lodging: askForCheckedAmount('How much does your lodging cost?'),
        transport: askForCheckedAmount('How much will your transport cost?'),
        food: askForCheckedAmount('What is your budget for food?'),
    };
    const expensesTotal = Object.values(expenses).reduce(
        (total, expenseValue) => total + expenseValue
    );
    const budget = getBudget({ estimatedTotalToSpend: expensesTotal });

    const emergencyBudget = askForCheckedAmount(
        'How much are you planning to save for emergencies?'
    );
    let remainingBudget = budget - expensesTotal;
    if (remainingBudget < emergencyBudget)
        return alert('Avoid buying additional items to exceed your budget');

    const desirableItems = askForDesirableItems();
    const cheapestItem = getCheapestItem();
    // if (cheapestItem.price > remainingBudget)
}

main();
