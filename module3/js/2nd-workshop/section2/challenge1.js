// -*********************************************************-
// Constants
// -*********************************************************-
const WEATHERS = Object.freeze({
    SUNNY: 'Soleado',
    CLOUDY: 'Nublado',
    RAINY: 'Lluvioso',
});
const weatherOptionList = Object.values(WEATHERS);

// -*********************************************************-
// Utils
// -*********************************************************-
function changePageTitle() {
    return new Promise((resolve) => {
        const title = 'La Evaluación de Julian';
        document.title = title;
        document.querySelector('h1').textContent = title;
        resolve();
    });
}

function askForANumber(promptMessage) {
    while (true) {
        const input = Number(prompt(promptMessage));
        if (!Number.isNaN(input)) return input;
        alert('El valor ingresado no es número');
    }
}

// -*********************************************************-
// Use cases
// -*********************************************************-

function askForWeather() {
    const separation = '\n';
    const formattedOptions = weatherOptionList.map(
        (o, index) => `${index}. ${o}.`
    );
    while (true) {
        const weatherOption = askForANumber(
            `Elige el clima actual:${separation}` +
                formattedOptions.join(separation)
        );
        console.log({ weatherOption });
        if (weatherOption in weatherOptionList)
            return weatherOptionList[weatherOption];
        alert(
            'La opción que ingresaste es inválida o no está disponible en la lista.'
        );
    }
}

async function main() {
    await changePageTitle();
    const hasEnergy = confirm('¿Tienes energía el día de hoy?');
    const hasPendingWork = confirm('¿Tienes trabajo pendiente?');
    if (!hasEnergy && !hasPendingWork) {
        return console.log('¡Tómate el día libre!');
    }

    if (hasEnergy && hasPendingWork) {
        return console.log('Aprovecha para adelantar trabajo');
    } else if (!hasEnergy && hasPendingWork) {
        return console.log('Tómate una siesta y después adelanta trabajo.');
    }

    const weather = askForWeather();
    console.log({ weather });
    if (weather === WEATHERS.RAINY && hasEnergy) {
        console.log('Puedes jugar videojuegos con tus amigos.');
    } else if (weather === WEATHERS.CLOUDY && hasEnergy) {
        console.log('¡Aprovecha el día y tu energía para salir a correr!');
    } else if (weather === WEATHERS.SUNNY && hasEnergy) {
        console.log('¡Aprovecha el día y tu energía para ir a nadar!');
    }
}

main();
