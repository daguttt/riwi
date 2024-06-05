import { API_URL } from '../../constants';

export async function register(registerDto) {
    // console.log(JSON.stringify(registerDto));
    // return registerDto;
    try {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(registerDto),
        });
        const newUser = await response.json();
        return newUser;
    } catch (err) {
        console.error('Error occurred in register() service');
        throw err;
    }
}
