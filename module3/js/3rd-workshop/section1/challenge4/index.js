const dateFormatter = Intl.DateTimeFormat('en-US');

const mockedEventList = [
    {
        id: 1, // Identificador único
        name: 'Evento 1', // Nombre del Evento
        date: new Date('2021-12-31'), // Fecha del Evento
        description: 'Descripción del Evento 1', // Descripción del Evento
    },
    {
        id: 2, // Identificador único
        name: 'Evento 2', // Nombre del Evento
        date: new Date('2024-05-11'), // Fecha del Evento
        description: 'Descripción del Evento 2', // Descripción del Evento
    },
    {
        id: 3, // Identificador único
        name: 'Evento 2', // Nombre del Evento
        date: new Date('2021-12-31'), // Fecha del Evento
        description: 'Descripción del Evento 2', // Descripción del Evento
    },
];
const eventList = [];

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

// -*********************************************************-
// Use cases
// -*********************************************************-
function listEvents(eventList) {
    eventList.forEach((event, index) => {
        console.log(
            `${index + 1}. ${event.name} | ${dateFormatter.format(
                event.date
            )} | ${event.description}`
        );
    });
    console.log();
}

function main() {
    let menuOpened = true;
    let id = 0;
    while (menuOpened) {
        const option = prompt(
            'Bienvenido a tu sistema de gestión de eventos:\n' +
                '1. Crear un evento.\n' +
                '2. Ver eventos almacenados.\n' +
                '3. Buscar eventos por nombre.\n' +
                '4. Actualizar evento.\n' +
                '5. Eliminar un evento.\n' +
                '6. Salir\n'
        );
        switch (option) {
            case '6': {
                menuOpened = false;
                break;
            }
            case '1': {
                const name = prompt('Introduce el nombre del evento');
                const date = prompt(
                    'Introduce la fecha del evento (formato YYYY-MM-DD)'
                );
                const description = prompt(
                    'Introduce la descripción del evento'
                );
                mockedEventList.push({
                    id: ++id,
                    name,
                    date: new Date(date),
                    description,
                });
                break;
            }
            case '2': {
                if (!mockedEventList.length) {
                    alert('No hay eventos agregados');
                    break;
                }
                listEvents(mockedEventList);
                break;
            }
            case '3': {
                const eventNameToSearch = prompt(
                    'Introduce el nombre que quieres buscar'
                );
                const filteredEventList = mockedEventList.filter(
                    (event) => event.name === eventNameToSearch
                );
                if (!filteredEventList.length) {
                    alert(
                        `No se encontró ningún evento con el nombre '${eventNameToSearch}'`
                    );
                    break;
                }
                listEvents(filteredEventList);
                break;
            }
            case '4': {
                listEvents(mockedEventList);
                const eventIndex = askForNumber(
                    'Introduce el NÚMERO del evento para actualizar'
                );
                const event = mockedEventList[eventIndex - 1];
                if (!event) {
                    alert(`No existe un evento con el número: ${eventIndex}`);
                    console.log('So, to each, their own xdxd');
                }

                const newName = prompt(
                    `El nombre actual del evento es: ${event.name}\n` +
                        'Ingresa el nuevo nombre o presiona ENTER para dejarlo igual.'
                );
                const newDate = prompt(
                    `La fecha actual del evento es: ${dateFormatter.format(
                        event.date
                    )}\n` +
                        'Ingresa la nueva fecha del evento (formato YYYY-MM-DD) o presiona ENTER para dejarla igual.'
                );
                const newDescription = prompt(
                    `La descripcion actual del evento es: ${event.description}\n` +
                        'Ingresa la nueva descripcion del evento o presiona ENTER para dejarlo igual.'
                );
                Object.assign(event, {
                    name: newName.trim(),
                    date: new Date(newDate),
                    description: newDescription,
                });
                break;
            }
            case '5': {
                listEvents(mockedEventList);
                const eventIndex = askForNumber(
                    'Introduce el NÚMERO del evento a eliminar'
                );
                const event = mockedEventList[eventIndex - 1];
                if (!event) {
                    alert(`No existe un evento con el número: ${eventIndex}`);
                    console.log('So, to each, their own xdxd');
                    break;
                }
                mockedEventList.splice(eventIndex - 1, 1);
                alert('¡Evento eliminado satisfactoriamente!');
                break;
            }
        }
    }
}

main();
// The best party in the world
