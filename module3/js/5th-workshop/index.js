const amountFormatter = new Intl.NumberFormat('es-US', {
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
function showCurrentBudget() {
    showMessage(
        `${++timesShowedBudget}. Presupuesto: <span class="blue">
            ${amountFormatter.format(budget)}
        </span>\n`
    );
}

function getRandomNumber(minNum, maxNum) {
    const difference = maxNum - minNum;
    return Math.floor(Math.random() * (difference + 1) + minNum);
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
            break;
        case 2:
            budget -= 23_000;
            break;
    }
    const optionToBuy = optionsToBuy[optionIndex];
    const priceMessage = optionToBuy.price
        ? `Vale: <span class="red">${amountFormatter.format(
              optionToBuy.price
          )}</span>`
        : '';

    showMessage(`${optionToBuy.title} ${priceMessage}`);
    showMessage(optionToBuy.message);
    showCurrentBudget();
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
    const reductionFactorHeight =
        maxSuitcaseSizes.height / suitcaseSizes.height;
    const reductionFactorLength =
        maxSuitcaseSizes.length / suitcaseSizes.length;
    const reductionFactorWidth = maxSuitcaseSizes.width / suitcaseSizes.width;
    const minReductionFactor = Math.min(
        reductionFactorHeight,
        reductionFactorLength,
        reductionFactorWidth
    );

    Object.assign(suitcaseSizes, {
        height: Number((suitcaseSizes.height * minReductionFactor).toFixed(2)),
        length: Number((suitcaseSizes.length * minReductionFactor).toFixed(2)),
        width: Number((suitcaseSizes.width * minReductionFactor).toFixed(2)),
    });
    showMessage(
        'Las nuevas medidas de la maleta son<br>' +
            `Alto: ${suitcaseSizes.height}<br>` +
            `Largo: ${suitcaseSizes.length}<br>` +
            `Ancho: ${suitcaseSizes.width}<br>`
    );
}

// -*********************-
// Case 3
function case3() {
    const WIFI_COST_HOURLY = 50_000;
    const airportPasswordInBinary = '01110010_01101001_01110111_01101001';
    const numbersAsDecimals = airportPasswordInBinary
        .split('_')
        .map((binaryNumber) => parseInt(binaryNumber, 2));
    const airportPassword = numbersAsDecimals.reduce(
        (password, number) => password + String.fromCharCode(number),
        ''
    );

    budget -= WIFI_COST_HOURLY;
    showMessage(
        `La contraseña desencriptada es: <code>${airportPassword}</code>. La hora vale: <span class="red">
            ${amountFormatter.format(WIFI_COST_HOURLY)}
        </span>`
    );
    showCurrentBudget();
}

// -*********************-
// Case 4
function case4() {
    const rawMessage = 'Taxi me puede llevar al hotel mariposas amarillas';
    const formattedMessage = rawMessage.replace(/[aeiou]/g, 'i');
    showMessage(
        'Puedes decir el siguiente mensaje para pedir el taxi:<br>' +
            `<i>"${formattedMessage}"</i>`
    );
}

// -*********************-
// Case 5
const ROCK_PAPER_SCISSORS = Object.freeze({
    PAPER: 'Paper',
    SCISSORS: 'Scissors',
    ROCK: 'Rock',
});

function computeRoundRockPaperScissors() {
    const randomNumber = Math.random();
    if (randomNumber > 2 / 3) return ROCK_PAPER_SCISSORS.PAPER;
    if (randomNumber > 1 / 3 && randomNumber < 2 / 3)
        return ROCK_PAPER_SCISSORS.ROCK;
    if (randomNumber < 1 / 3) return ROCK_PAPER_SCISSORS.SCISSORS;
}

function case5() {
    const TAXI_DRIVE_CHARGE = 300_000;
    const taxiDriverChoice = computeRoundRockPaperScissors();
    const userChoice = computeRoundRockPaperScissors();
    showMessage(
        'Jugando Piedra, Papel o Tijeras...<br>' +
            `Hildebrando: ${userChoice}<br>` +
            `Taxista: ${taxiDriverChoice}`
    );
    if (taxiDriverChoice === userChoice)
        return showMessage('Es un empate. No pasa nada');

    const isTaxiDriveWinner =
        (taxiDriverChoice === ROCK_PAPER_SCISSORS.PAPER &&
            userChoice === ROCK_PAPER_SCISSORS.ROCK) ||
        (taxiDriverChoice === ROCK_PAPER_SCISSORS.ROCK &&
            userChoice === ROCK_PAPER_SCISSORS.SCISSORS) ||
        (taxiDriverChoice === ROCK_PAPER_SCISSORS.SCISSORS &&
            userChoice == ROCK_PAPER_SCISSORS.PAPER);
    if (isTaxiDriveWinner) {
        budget -= TAXI_DRIVE_CHARGE;
        showMessage(
            `<span class="red">El taxista gana. Cobra ${amountFormatter.format(
                TAXI_DRIVE_CHARGE
            )}</span>`
        );
        showCurrentBudget();
    } else
        showMessage(
            '<span class="green">Hildebrando gana. No paga nada</span>'
        );
}

// -*********************-
// Case 6
const CLOTHING_COLORS = Object.freeze({
    YELLOW: 'amarilla',
    GREEN: 'verde',
    RED: 'roja',
    BLUE: 'azul',
});
function computeRandomClothingColor() {
    const clothingColorList = Object.values(CLOTHING_COLORS);
    const randomIndex = getRandomNumber(0, clothingColorList.length - 1);
    return clothingColorList[randomIndex];
}

function case6() {
    const days = 'Día '
        .repeat(4)
        .split(' ')
        .map((day, i) => `${day} ${i + 1}`);

    let isDead = false;
    let daysAlive = 1;

    for (const day of days) {
        showMessage(day);
        const randomColor = computeRandomClothingColor();
        switch (randomColor) {
            case CLOTHING_COLORS.YELLOW: {
                showMessage('Día de piscina');
                const wantsToGetInThePool = confirm(
                    '¿Quieres entrar a la piscina?'
                );
                if (wantsToGetInThePool) {
                    isDead = true;
                    showMessage('<i>"Demasiado cloro!!"</i>');
                }
                showMessage('Pasando al siguiente día...');
                daysAlive++;
                break;
            }
            case CLOTHING_COLORS.GREEN: {
                showMessage('Día de caminata');
                const wantsToCompleteHike = confirm(
                    '¿Harás la caminata completa?'
                );

                wantsToCompleteHike
                    ? showMessage(
                          'Iras a una hermosa cascada y te tomaras fotos'
                      )
                    : showMessage(
                          'Llegarás hasta cierto punto, después te perderás.'
                      );
                break;
            }
            case CLOTHING_COLORS.RED: {
                showMessage('Día de caminata');
                showMessage(
                    'Jueas voleibol, nadas en el mar, montas moto y la pasas genial'
                );
            }
        }
    }
}

function main() {
    case1();
    case2();
    case3();
    case4();
    case5();
    case6();
}
main();
