import { API_URL } from '../constants';

export async function createFlight(createFlightDto) {
    // console.log(JSON.stringify(createFlightDto));
    // return createFlightDto;
    try {
        const response = await fetch(`${API_URL}/flights`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(createFlightDto),
        });
        const flight = await response.json();
        return flight;
    } catch (err) {
        console.error('Error occurred in createFlight() service');
        throw err;
    }
}
