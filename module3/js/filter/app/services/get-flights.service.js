import { API_URL } from '../constants';

export async function getFlights() {
    try {
        const response = await fetch(`${API_URL}/flights`);
        const flights = await response.json();
        return flights;
    } catch (err) {
        console.error('Error occurred in getFlights() service');
        throw err;
    }
}

export async function getFlightById({ flightId }) {
    try {
        const response = await fetch(`${API_URL}/flights/${flightId}`);
        const flight = await response.json();
        return flight;
    } catch (err) {
        console.error('Error occurred in getFlights() service');
        throw err;
    }
}
