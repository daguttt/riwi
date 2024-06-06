import { API_URL } from '../constants';
import { HttpError } from '../helpers/fetch-api';

export async function deleteFlight({ flightId }) {
    if (!flightId) throw new Error('No flightId provided');
    // console.log(`Deleting flight with id: '${flightId}'`);
    try {
        const response = await fetch(`${API_URL}/flights/${flightId}`, {
            method: 'DELETE',
        });

        if (!response.ok) {
            throw new HttpError(
                `${response.status}: ${response.statusText}`,
                response,
            );
        }

        const deletedFlight = await response.json();
        return deletedFlight;
    } catch (err) {
        console.error('Error occurred in deleteFlight() service');
        throw err;
    }
}
