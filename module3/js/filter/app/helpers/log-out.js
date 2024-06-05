import { navigateTo } from '../Router';

export function logOut() {
    // TODO: Replace magic strings by constants
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigateTo('/login');
}
