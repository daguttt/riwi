// -*********************************************************-
// Constants
// -*********************************************************-
const WEATHERS = Object.freeze({
    SUNNY: 'Soleado',
    RAINY: 'Lluvioso',
});
const weatherOptionList = Object.values(WEATHERS);

// -*********************************************************-
// Utils
// -*********************************************************-
function changePageTitle() {
    return new Promise((resolve) => {
        const title = 'Decisiones de Última Hora';
        document.title = title;
        document.querySelector('h1').textContent = title;
        resolve();
    });
}

function askForNumber(promptMessage) {
    while (true) {
        const input = Number(prompt(promptMessage));
        if (!Number.isNaN(input)) return input;
        alert('El valor ingresado no es número');
    }
}

// -*********************************************************-
// Use cases
// -*********************************************************-
function askForWeatherForecast() {
    const separation = '\n';
    const formattedOptions = weatherOptionList.map(
        (o, index) => `${index}. ${o}.`
    );
    while (true) {
        const weatherOption = askForNumber(
            `¿Cuál es el pronóstico del climea?:${separation}` +
                formattedOptions.join(separation)
        );
        if (weatherOption in weatherOptionList)
            return weatherOptionList[weatherOption];
        alert(
            'La opción que ingresaste es inválida o no está disponible en la lista.'
        );
    }
}

async function main() {
    await changePageTitle();
    const weatherForecast = askForWeatherForecast();
    const hasAvailableSpaceInBag = confirm(
        '¿Tienes espacio disponible en la maleta?'
    );

    if (!hasAvailableSpaceInBag) {
        return alert('No puedes llevar más articulos');
    }

    const bagWeigthLimit = askForNumber(
        '¿Cuál es el limite de peso permito para la maleta?'
    );

    if (bagWeigthLimit > 20) {
        alert('Puedes llevar la cámara y un paraguas en caso de que llueva.');
    } else if (bagWeigthLimit > 15 && bagWeigthLimit <= 20) {
        if (weatherForecast === WEATHERS.SUNNY)
            alert('Podrías llevar una cámara.');
        else alert('Considera llevar un paraguas');
    } else {
        if (weatherForecast === WEATHERS.SUNNY)
            alert(
                'Asegurate de llevar todo lo necesario para protegete del sol'
            );
        else alert('Prioriza ropa para ocaciones de lluvia.');
    }
}

main();
