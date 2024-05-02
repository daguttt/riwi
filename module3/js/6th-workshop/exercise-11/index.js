// Ruta del archivo data.json
const url = './data.json'; // Cambiar por la ruta correcta
// const mockedBooking1 = {
//     id: 1,
//     roomNumber: 104,
//     startingDate: new Date('2024-05-09T13:00:00'),
//     endingDate: new Date('2024-05-13T16:00:00'),
//     hostFullname: 'Daniel Gutiérrez Muñoz',
//     guestCount: 3,
// };
// const mockedBooking2 = {
//     id: 2,
//     roomNumber: 108,
//     startingDate: new Date('2024-05-09T13:00:00'),
//     endingDate: new Date('2024-05-13T16:00:00'),
//     hostFullname: 'Daniel Gutiérrez Muñoz',
//     guestCount: 3,
// };
// const mockedBooking3 = {
//     id: 3,
//     roomNumber: 106,
//     startingDate: new Date('2024-05-09T13:00:00'),
//     endingDate: new Date('2024-05-13T16:00:00'),
//     hostFullname: 'Daniel Gutiérrez Muñoz',
//     guestCount: 3,
// };
// const mockedBooking4 = {
//     id: 4,
//     roomNumber: 102,
//     startingDate: new Date('2024-05-09T13:00:00'),
//     endingDate: new Date('2024-05-13T16:00:00'),
//     hostFullname: 'Daniel Gutiérrez',
//     guestCount: 2,
// };

const bookings = [];
// const bookings = [
//     mockedBooking1,
//     mockedBooking2,
//     mockedBooking3,
//     mockedBooking4,
// ];

// -*********************************************************-
// Utils
// -*********************************************************-
function askForNumber(promptMessage, options = {}) {
    while (true) {
        const rawInput = prompt(promptMessage);
        if (options?.allowedNullish && !rawInput) return rawInput;
        const castedInput = parseInt(rawInput);
        if (!Number.isNaN(castedInput)) return castedInput;
        alert('El valor ingresado no es número');
    }
}

function askForAnIndexFrom({
    optionsArray,
    promptMessage,
    invalidMessage = 'Opción inválida. Intenta de nuevo',
}) {
    const formattedListString = optionsArray
        .map((element, index) => `${index + 1}. ${element}`)
        .join('\n');

    while (true) {
        const option = askForNumber(`${promptMessage}\n` + formattedListString);
        const isValidOption =
            option && option > 0 && option <= optionsArray.length;
        if (isValidOption) return option - 1;
        alert(invalidMessage);
    }
}

function askForDate({ promptMessage, timeString }) {
    const dateFormat = 'YYYY-MM-DD';
    while (true) {
        const dateInput =
            prompt(`${promptMessage} Formato: ${dateFormat}`) + timeString;
        const isValidDate = !Number.isNaN(Date.parse(dateInput));
        if (isValidDate) return new Date(dateInput);
        alert(
            `La fecha ingresada no cumple con el formato: ${dateFormat}. Inténtalo de nuevo.`
        );
    }
}

function idGenerator(initialId) {
    return function () {
        return initialId++;
    };
}
const generateId = idGenerator(1);

// -*********************************************************-
// Use cases
// -*********************************************************-

function askForBookingDates() {
    const startingDate = askForDate({
        promptMessage: 'Ingresa la fecha de INICIO de la reserva.',
        timeString: 'T13:00:00',
    });
    let endingDate;
    while (true) {
        endingDate = askForDate({
            promptMessage:
                `La fecha de Inicio es: ${startingDate.toLocaleDateString(
                    'es-CO'
                )}\n` + 'Ingresa la fecha de FIN de la reserva.',
            timeString: 'T16:00:00',
        });
        if (endingDate > startingDate) break;
        alert('Fecha de FIN inválida. Debe ser mayor a la fecha de inicio.');
    }
    return { startingDate, endingDate };
}

function createBooking(roomNumber, roomNumber, guestCount) {
    const hostFullname = prompt(
        'Ingresa tu nombre completo para crear la reserva'
    );
    const { startingDate, endingDate } = askForBookingDates();
    // const mockedBooking = {
    //     id: 1,
    //     roomNumber: 104,
    //     startingDate: new Date('2024-05-09'),
    //     endingDate: new Date('2024-05-13'),
    //     hostFullname: 'Daniel Gutiérrez Muñoz',
    //     guestCount: 3,
    // };
    bookings.push({
        id: generateId(),
        roomNumber,
        startingDate,
        endingDate,
        hostFullname,
        guestCount,
    });
    alert(
        `¡Reserva para habitación '${roomNumber}' a nombre de '${hostFullname}' creada con exito!`
    );
}

function askForRoomToBook(rooms, roomTypes) {
    // 1. Prompt the number of guests
    const guestCount = askForNumber(
        'Ingresa la cantidad de huespedes que desean hospedarse'
    );
    // 2. Extract room types matching the number of guests
    const roomTypesMatchingGuestsNumber = roomTypes.filter(
        (roomType) => roomType.capacity >= guestCount
    );

    // 3. Extract available rooms  based on availability and number of guests
    const availableRooms = rooms.filter((room) => {
        const hasAllowedCapacity = roomTypesMatchingGuestsNumber.some(
            (roomType) => roomType.id === room.roomTypeId
        );
        return hasAllowedCapacity && room.availability;
    });

    if (!availableRooms.length) {
        alert(
            'No habitaciones disponibles para esa cantidad de huespedes en el momento.'
        );
        return { room: null, guestCount };
    }

    // 4. Prompt user to select the room he wants to book
    const chosenRoomIndex = askForAnIndexFrom({
        promptMessage:
            'Ingrese el numero de la lista habitaciones que quiere reservar: ',
        optionsArray: availableRooms.map((room) => {
            return `Habitación ${room.number} (${
                roomTypes.find((roomType) => roomType.id === room.roomTypeId)
                    .name
            })`;
        }),
    });

    return { room: rooms[chosenRoomIndex], guestCount };
}

function bookRoom(rooms, roomTypes) {
    const { room, guestCount } = askForRoomToBook(rooms, roomTypes);
    if (!room) return;
    createBooking(room.number, room.number, guestCount);
    room.availability = true;
}

async function checkRoomAvailability(rooms) {
    let roomToCheck, roomNumber;
    while (true) {
        roomNumber = askForNumber(
            'Ingresa el número de la habitación para verificar su disponibilidad'
        );
        roomToCheck = rooms.find((room) => room.number === roomNumber);
        if (roomToCheck) break;
        alert('Numero de habitación inválido. Intenta de nuevo');
    }

    let isAvailable = false;
    console.log('Checking room availability...');
    try {
        await new Promise((resolve, reject) => {
            setTimeout(() => {
                roomToCheck.availability ? resolve() : reject();
            }, 1500);
        });
        isAvailable = true;
    } catch (error) {
        isAvailable = false;
    }

    alert(
        `La habítación ${roomNumber} ${
            !isAvailable ? 'no' : ''
        } se encuentra disponible`
    );
}

function showBookingsByHost(rooms, roomTypes) {
    const hostFullname = prompt('Ingresa el nombre del huesped');
    const hostBookings = bookings.filter(
        (booking) => booking.hostFullname === hostFullname
    );

    if (!hostBookings.length)
        return alert(
            `El huesped ${hostFullname} no tiene reservas a su nombre en el momento`
        );

    console.log({ hostBookings });

    const bookedRooms = rooms.filter((room) => {
        const isRoomBooked = hostBookings.some(
            (booking) => booking.roomNumber === room.number
        );
        return isRoomBooked;
    });

    console.log({ bookedRooms });

    alert(
        'Revisa la consola para ver las reservas del huesped... Presiona ENTER'
    );

    console.log('RESERVAS');
    bookedRooms.forEach((room, index) => {
        const roomType = roomTypes.find(
            (roomType) => room.roomTypeId === roomType.id
        );
        const correspondingBooking = hostBookings.find(
            (booking) => booking.roomNumber === room.number
        );
        console.log(
            `Habitación ${room.number} (${roomType.name}) reservada a nombre de '${hostFullname}'\n` +
                `Desde '${correspondingBooking.startingDate.toLocaleDateString(
                    'es-CO'
                )}' hasta '${correspondingBooking.endingDate.toLocaleDateString(
                    'es-CO'
                )}'`
        );
        const isNotLastRoom = bookedRooms.length - 1 !== index;
        if (isNotLastRoom) console.log('-*********************-');
    });
}

function askForBookingIndex() {
    const hostFullname = prompt('Ingresa el nombre del huesped');
    const hostBookings = bookings.filter(
        (booking) => booking.hostFullname === hostFullname
    );

    if (!hostBookings.length) {
        alert(
            `El huesped ${hostFullname} no tiene reservas a su nombre en el momento`
        );
        return null;
    }

    const bookingIndex = askForAnIndexFrom({
        promptMessage: 'Ingresa el numero de la reserva a cancelar.',
        optionsArray: bookings.map(
            (booking) =>
                `Reserva: Habitación ${
                    booking.roomNumber
                }. Desde '${booking.startingDate.toLocaleDateString(
                    'es-CO'
                )}' hasta '${booking.endingDate.toLocaleDateString('es-CO')}'`
        ),
    });

    return bookingIndex;
}

function cancelBooking(rooms) {
    // Change room availability
    const bookingIndex = askForBookingIndex();
    if (bookingIndex === null) return;
    const booking = bookings[bookingIndex];

    for (const room of rooms) {
        if (room.number === booking.roomNumber) {
            room.availability = true;
            break;
        }
    }

    bookings.splice(bookingIndex, 1);
    alert(
        `¡Reserva de la habitación '${booking.roomNumber}' cancelada con exito!`
    );
}

function editBooking() {
    const bookingIndex = askForBookingIndex();
    console.log({ bookingIndex });
    if (bookingIndex === null) return;
    const booking = bookings[bookingIndex];

    const { startingDate, endingDate } = askForBookingDates();
    booking.startingDate = startingDate;
    booking.endingDate = endingDate;
    alert(
        `¡Reserva de la habitación '${booking.roomNumber}' modificada con exito!\n` +
            `Nuevas fechas: Desde ${booking.startingDate.toLocaleDateString(
                'es-CO'
            )} hasta ${booking.endingDate.toLocaleDateString('es-CO')}`
    );
}

async function showMenu(rooms, roomTypes) {
    let isMenuOpened = true;
    while (isMenuOpened) {
        const option = askForAnIndexFrom({
            promptMessage: 'Bienvenido al sistema de reservas de Hotel',
            optionsArray: [
                'Reservar habitación.',
                'Verificar disponibilidad de habitación.',
                'Ver reservas actuales por cliente.',
                'Cancelar reserva.',
                'Editar reserva',
                'Salir',
            ],
        });
        switch (option) {
            // Reservar habítación
            case 0: {
                bookRoom(rooms, roomTypes);
                break;
            }
            // "Verificar disponibilidad de habitación."
            case 1: {
                await checkRoomAvailability(rooms);
                break;
            }
            // "Ver reservas del cliente."
            case 2: {
                showBookingsByHost(rooms, roomTypes);
                break;
            }
            // "Cancelar reserva."
            case 3: {
                cancelBooking(rooms);
                break;
            }
            // "Editar reserva"
            case 4: {
                editBooking();
                break;
            }
            default: {
                isMenuOpened = false;
                break;
            }
        }
    }
}

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
        }, 1000);
    });
}

function main() {
    // Llamar a la función para cargar y mostrar el contenido de data.json
    cargarYMostrarData()
        .then(({ rooms, roomTypes }) => {
            rooms.find(
                (room) => room.number === mockedBooking1.roomNumber
            ).availability = false;
            rooms.find(
                (room) => room.number === mockedBooking2.roomNumber
            ).availability = false;
            rooms.find(
                (room) => room.number === mockedBooking3.roomNumber
            ).availability = false;
            rooms.find(
                (room) => room.number === mockedBooking4.roomNumber
            ).availability = false;
            showMenu(rooms, roomTypes);
        })
        .catch((error) => {
            console.error('Error al manejar la promesa:', error);
        });
}

main();
