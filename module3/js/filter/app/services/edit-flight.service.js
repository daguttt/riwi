import { API_URL } from '../constants';

export async function editFlight({ flightId, editFlightDto }) {
    // console.log(JSON.stringify(editFlightDto));
    // return editFlightDto;
    try {
        const response = await fetch(`${API_URL}/flights/${flightId}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editFlightDto),
        });
        const flight = await response.json();
        return flight;
    } catch (err) {
        console.error('Error occurred in editFlight() service');
        throw err;
    }
}
