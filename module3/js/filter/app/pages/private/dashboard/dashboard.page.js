import { getFlights } from '../../../services/get-flights.service';

import globalStyles from '../../../styles/global.css';
import styles from './dashboard.css';

export function DashboardPage() {
    const html = /*html*/ `
        <div class="${globalStyles.wrapper} ${styles.dashboardWrapper}">
            <main>
                <h2>Todos los vuelos</h2>
                <div id="flights-wrapper"></div>
            </main>
            <aside>
                <h2>Reservas</h2>
                <div id="bookings-wrapper"></div>
            </aside>
        </div>
  `;
    const logic = async () => {
        // -*********************-
        // Render fetched flights
        const $flightsWrapper = document.getElementById('flights-wrapper');
        console.log({ $flightsWrapper });
        const $flightsFragment = document.createDocumentFragment();
        const flights = await getFlights();
        console.log({ flights });
        flights.forEach((flight) => {
            const $cardFlight = document.createElement('article');
            // TODO: add styles to the card
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
                <div class="btns-wrapper"></div>
            `;
            $flightsFragment.appendChild($cardFlight);
        });
        $flightsWrapper.appendChild($flightsFragment);
        // -*********************-
    };
    return { html, logic };
}
