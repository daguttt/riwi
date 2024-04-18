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

function askForSouvernirsToBuy(souvenirList) {
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

const mockedSouvenirList = [
    {
        name: 'Lápiz',
        cost: 15,
        availability: false,
    },
    {
        name: 'Camiseta',
        cost: 150,
        availability: true,
    },
    {
        name: 'Vaso',
        cost: 50,
        availability: true,
    },
];

// const souvenirList = askForSouvenirs();
const availableSouvenirList = mockedSouvenirList.filter(
    (souvenir) => souvenir.availability
);

askForSouvernirsToBuy(mockedSouvenirList);
