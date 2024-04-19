const BUDGET = 500;

function getValidatedInput(promptMessage, validateInputFn) {
    while (true) {
        const input = prompt(promptMessage);
        const { isInputValid, validatedInput, invalidInputMessage } =
            validateInputFn(input);
        if (isInputValid) return validatedInput;

        alert(invalidInputMessage);
    }
}

function askForSouvenirs() {
    const souvenirList = [];
    while (true) {
        const souvenirName = prompt('Ingresa el nombre del suvenir a comprar');
        const souvenirCost = getValidatedInput(
            'Ingresa el costo del suvenir',
            (input) => {
                const castedInput = Number(input);
                return {
                    validatedInput: castedInput,
                    isInputValid: !isNaN(castedInput) && input > 0,
                    invalidInputMessage:
                        'El costo ingresado es invalido. Inténtalo de nuevo.',
                };
            }
        );

        const souvenirAvailability = confirm(
            '¿El suvenir está disponible para comprar?'
        );

        const souvenir = {
            name: souvenirName,
            cost: souvenirCost,
            availability: souvenirAvailability,
        };

        souvenirList.push(souvenir);

        const wantToAddMoreSouvenirs = confirm('¿Quieres añadir otro suvenir?');
        if (!wantToAddMoreSouvenirs) break;
    }
    return souvenirList;
}

function formatSouvenirList(souvenirList) {
    return souvenirList.map((souvenir, index) => {
        return `${index}. Nombre: ${souvenir.name}. Costo: ${souvenir.cost}`;
    });
}

function askAndShowForSouvernirsToBuy(souvenirList) {
    console.log('SUVENIRS DISPONIBLES');
    const formattedSouvenirListToShow = formatSouvenirList(souvenirList);
    const souvenirIndexesToBuyString = prompt(`
${formattedSouvenirListToShow.join('\n')}

Ingresa el numero de los suvenires que quieres comprar separados por comma ( , ):`);

    const souvenirIndexesToBuy = souvenirIndexesToBuyString
        .replace(' ', '')
        .split(',')
        .map((souvenirIndex) => Number(souvenirIndex));

    const souvenirListToBuy = souvenirList.filter((souvenir, index) =>
        souvenirIndexesToBuy.includes(index)
    );
    return souvenirListToBuy;
}

function canBuySouvenirs(souvenirListToBuy) {
    const souvenirsToBuyTotal = souvenirListToBuy.reduce((total, souvenir) => {
        return total + souvenir.cost;
    }, 0);
    return souvenirsToBuyTotal <= BUDGET;
}

const mockedSouvenirList = [
    {
        name: 'Lápiz',
        cost: 450,
        availability: true,
    },
    {
        name: 'Camiseta',
        cost: 150,
        availability: false,
    },
    {
        name: 'Vaso',
        cost: 55,
        availability: true,
    },
];

function main() {
    // const availableSouvenirList = mockedSouvenirList.filter(
    //     (souvenir) => souvenir.availability
    // );

    const souvenirList = askForSouvenirs();
    const availableSouvenirList = souvenirList.filter(
        (souvenir) => souvenir.availability
    );
    while (true) {
        const souvenirsToBuy = askAndShowForSouvernirsToBuy(
            availableSouvenirList
        );
        if (canBuySouvenirs(souvenirsToBuy)) {
            alert('Puedes comprar los suvenirs!');
            break;
        }
        alert('No te alcanza el presupuesto para comprar esos productos');
    }
}
main();
