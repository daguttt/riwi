import { API_URL } from '../constants';

export async function getUsers() {
    try {
        const response = await fetch(`${API_URL}/users`);
        const users = await response.json();
        return users;
    } catch (err) {
        console.error('Error occurred in getUsers() service');
        throw err;
    }
}
