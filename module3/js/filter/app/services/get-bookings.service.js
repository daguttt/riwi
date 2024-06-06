import { API_URL } from '../constants';

export async function getBookingsByUserId({ userId }) {
    try {
        const response = await fetch(
            `${API_URL}/bookings?userId=${userId}&_embed=flight`,
        );
        const bookings = await response.json();
        return bookings;
    } catch (err) {
        console.error('Error occurred in getBookingsByUserId() service');
        throw err;
    }
}
