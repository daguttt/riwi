import { API_URL } from '../constants';

export async function deleteFlight({ flightId }) {
    if (!flightId) throw new Error('No flightId provided');
    console.log(`Deleting flight with id: '${flightId}'`);
    // try {
    //     const response = await fetch(`$${API_URL}/flights/${flightId}`, {
    //         method: 'DELETE',
    //     });
    // } catch (err) {
    //     console.error('Error occurred in deleteFlight() service');
    //     throw err;
    // }
}
