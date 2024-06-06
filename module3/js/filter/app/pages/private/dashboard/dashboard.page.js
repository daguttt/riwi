import { USER_ROLES } from '../../../constants';
import { bookFlight } from '../../../services/book-flight.service';
import { deleteFlight } from '../../../services/deleteFlight.service';
import { getBookingsByUserId } from '../../../services/get-bookings.service';
import { getFlights } from '../../../services/get-flights.service';

import globalStyles from '../../../styles/global.css';
import styles from './dashboard.css';

export function DashboardPage() {
    const userAsString = localStorage.getItem('user');
    if (!userAsString) throw new Error('No user in localStorage');
    const user = JSON.parse(userAsString);

    const html = /*html*/ `
        <div class="${globalStyles.wrapper} ${styles.dashboardWrapper}">
            <main>
                <header>
                    <h2>Todos los vuelos</h2>
                    ${
                        user.roleId === USER_ROLES.ADMIN
                            ? /*html*/ `
                                <button id="add-btn">Añadir vuelo</button>
                            `
                            : ''
                    }
                </header>
                <div id="flights-wrapper"></div>
            </main>
            ${
                user.roleId === USER_ROLES.VISITOR
                    ? /*html*/ `
                        <aside>
                            <h2>Reservas</h2>
                            <div id="bookings-wrapper"></div>
                        </aside>
                        `
                    : ''
            }
        </div>
  `;
    const logic = async () => {
        // -*********************-
        // Render fetched flights
        const flights = await getFlights();
        const userBookings = await getBookingsByUserId({
            userId: user.id,
        });
        renderFlights({ flights, userRole: user.roleId });
        if (user.roleId === USER_ROLES.VISITOR) {
            // Add listener to book flights
            document.addEventListener('click', async (event) => {
                if (!event.target.matches('.bookBtn')) return;
                // console.log({ $target: event.target });

                const $button = event.target;
                const flightId = $button.dataset.flightId;
                const userId = user.id;
                const bookingDate = JSON.stringify(new Date()).replaceAll(
                    '"',
                    '',
                );

                const bookFlightDto = {
                    userId,
                    flightId,
                    bookingDate,
                };
                await bookFlight(bookFlightDto);
                alert(`Reserva del vuelo realizada.`);

                // Re render bookings
                const userBookings = await getBookingsByUserId({ userId });
                renderBookings({ bookings });
            });
            renderBookings({ bookings: userBookings });
        }
        if (user.roleId === USER_ROLES.ADMIN) {
            // Add listener to add a flight
            const $addButton = document.getElementById('add-btn');
            if (!$addButton) throw new Error('Add button not rendered');
            $addButton.addEventListener('click', async () => {
                console.log('Adding a flight');
            });
            // Add listener to edit flights
            document.addEventListener('click', async (event) => {
                if (!event.target.matches('.editBtn')) return;
            });
            // Add listener to delete flights
            document.addEventListener('click', async (event) => {
                if (!event.target.matches('.deleteBtn')) return;
                const $button = event.target;
                const flightId = $button.dataset.flightId;

                const isSureToDelete = window.confirm(
                    `Estas seguro de eliminar el vuelo con id '${flightId}'`,
                );
                if (!isSureToDelete) return;

                await deleteFlight({ flightId });
            });
        }
        // -*********************-
    };
    return { html, logic };
}

function renderFlights({ flights, userRole }) {
    const $flightsWrapper = document.getElementById('flights-wrapper');
    if (!flights.length) {
        $flightsWrapper.innerHTML = /*html*/ `
            <p>
                No hay viajes disponibles aún
            </p>
        `;
        return;
    }

    const $flightsFragment = document.createDocumentFragment();
    flights.forEach((flight) => {
        const $cardFlight = document.createElement('article');
        $cardFlight.classList.add(styles.cardFlight);
        $cardFlight.innerHTML = /*html*/ `
            <div class="info">
                <div class="origin-and-destination">
                    <div class="origin">
                        <p><strong>${flight.origin}</strong></p>
                        <p><small>${new Date(flight.departure).toLocaleDateString()}</small></p>
                    </div>
                    <p>-></p>
                    <div class="destination">
                        <p><strong>${flight.destination}</strong></p>
                        <p><small>${new Date(flight.arrival).toLocaleDateString()}</small></p>
                    </div>
                </div>
                <div class="number-and-seats">
                    <p>Numbero de vuelo #${flight.number}</p>
                    <p>Capacidad: ${flight.capacity}</p>
                </div>
            </div>
            <div id="btns-wrapper-${flight.id}"></div>
            `;
        $flightsFragment.appendChild($cardFlight);

        // Add buttons depending on user role
        const $buttonsWrapper = $flightsFragment.getElementById(
            `btns-wrapper-${flight.id}`,
        );
        switch (userRole) {
            case USER_ROLES.ADMIN: {
                $buttonsWrapper.innerHTML = /*html*/ `
                    <button class="editBtn" data-flight-id="${flight.id}">Editar</button>
                    <button class="deleteBtn" data-flight-id="${flight.id}">Eliminar</button>
                `;
                break;
            }
            default: {
                $buttonsWrapper.innerHTML = /*html*/ `
                    <button class="bookBtn" data-flight-id="${flight.id}">Reservar</button>
                `;
                break;
            }
        }
    });
    $flightsWrapper.appendChild($flightsFragment);
}

function renderBookings({ bookings }) {
    const $bookingsWrapper = document.getElementById('bookings-wrapper');

    if (!bookings.length) {
        $bookingsWrapper.innerHTML = /*html*/ `
            <p>
                Aun no tienes reservas. Toca en el boton
                "Reservar" de alguno de los vuelos
            </p>
        `;
        return;
    }

    const $bookingsFragment = document.createDocumentFragment();
    bookings.forEach((booking) => {
        const $bookingCard = document.createElement('article');
        $bookingCard.classList.add('bookingCard');
        $bookingCard.innerHTML = /*html*/ `
            <div class="info">
                <div class="origin-and-destination">
                    <div class="origin">
                        <p><strong>${booking.flight.origin}</strong></p>
                        <p><small>${new Date(booking.flight.departure).toLocaleDateString()}</small></p>
                    </div>
                    <p>-></p>
                    <div class="destination">
                        <p><strong>${booking.flight.destination}</strong></p>
                        <p><small>${new Date(booking.flight.arrival).toLocaleDateString()}</small></p>
                    </div>
                </div>
                <div class="numberAndBookingDate">
                    <p>Numbero de vuelo #${booking.flight.number}</p>
                    <p>Fecha reserva: ${new Date(booking.bookingDate).toLocaleString()}</p>
                </div>
            </div>
        `;
        $bookingsFragment.appendChild($bookingCard);
    });

    $bookingsWrapper.appendChild($bookingsFragment);
}
