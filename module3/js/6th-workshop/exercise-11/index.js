// Ruta del archivo data.json
const url = './data.json'; // Cambiar por la ruta correcta
const mockedBooking = {
    id: 1,
    roomId: 104,
    startingDate: new Date('2024-05-09'),
    endingDate: new Date('2024-05-13'),
    guestFullname: 'Daniel Gutiérrez Muñoz',
    guestCount: 3,
};

// -*********************************************************-
// Utils
// -*********************************************************-
function promptNumber(promptMessage, options = {}) {
    while (true) {
        const rawInput = prompt(promptMessage);
        if (options?.allowedNullish && !rawInput) return rawInput;
        const castedInput = parseInt(rawInput);
        if (!Number.isNaN(castedInput)) return castedInput;
        alert('El valor ingresado no es número');
    }
}


const promptIndexFrom = function ({
    optionsArray,
    promptMessage,
    invalidMessage = 'Opción inválida. Intenta de nuevo',
}) {
    const formattedListString = optionsArray
        .map((element, index) => `${index + 1}. ${element}`)
        .join('\n');

    while (true) {
        const option = promptNumber(`${promptMessage}\n` + formattedListString);
        const isValidOption =
            option && option > 0 && option <= optionsArray.length;
        if (isValidOption) return option - 1;
        alert(invalidMessage);
    }
};

// Función para cargar y mostrar el contenido de data.json
function cargarYMostrarData() {
    // Retorna una nueva promesa que se resuelve después del setTimeout
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            // Realiza la solicitud fetch dentro del setTimeout
            fetch(url)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Error al cargar los datos.');
                    }
                    return response.json();
                })
                .then((data) => {
                    console.log('Habitaciones:', data.rooms);
                    console.log('Tipos de Habitaciones:', data.roomTypes);
                    resolve(data); // Resuelve la promesa con los datos cargados
                })
                .catch((error) => {
                    console.error(error);
                    reject(error); // Rechaza la promesa si hay un error
                });
        }, 3000);
    });
}

// Llamar a la función para cargar y mostrar el contenido de data.json
cargarYMostrarData()
    .then(({ rooms, roomTypes }) => {
        // Mostrar el contenido de las habitaciones después de cargar los datos
        // 1. Prompt the number of guests
        const guestsNumber = promptIndexFrom({
            promptMessage: 'Ingresa la cantidad de huespedes que desean hospedarse',
            optionsArray: Array()
        })
        // 2. Extract room types matching the number of guests
        // 3. Extract rooms availables based on availability and number of guests
        const room
        // 4. Prompt user to select the room he wants to book
        const chosenRoomIndex = prompt(
            'Ingrese el numero de habitacion a reservar: ' +
                rooms
                    .map((room, index) => {
                        return `\n${index}. Room Number: ${room.number} (${
                            roomTypes.find(
                                (type) => type.id === room.roomTypeId
                            ).name
                        })`;
                    })
                    .join(', ')
        );
        // ... Continuar con la lógica de la app
    })
    .catch((error) => {
        console.error('Error al manejar la promesa:', error);
    });
