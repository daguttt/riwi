import { API_URL } from '../constants';

export async function bookFlight(bookFlightDto) {
    // console.log(JSON.stringify(bookFlightDto));
    // return bookFlightDto;
    try {
        const response = await fetch(`${API_URL}/bookings`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(bookFlightDto),
        });
        const booking = await response.json();
        return booking;
    } catch (err) {
        console.error('Error occurred in bookFlight() service');
        throw err;
    }
}
