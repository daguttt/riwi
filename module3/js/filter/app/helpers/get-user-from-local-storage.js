export function getUserFromLocalStorage() {
    const userAsString = localStorage.getItem('user');
    if (!userAsString) throw new Error('No user in localStorage');
    const user = JSON.parse(userAsString);
    return user;
}
