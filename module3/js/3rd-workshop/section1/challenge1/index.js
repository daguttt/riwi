/* USERNAME AND EMAIL GENERATOR */
const mockedUsers = {
    dangut: 'dangut@myDomain.com',
    dangut1: 'dangut1@myDomain.com',
    sebtun: 'sebtun@myDomain.com',
    dangut2: 'dangut2@myDomain.com',
    sebtun1: 'sebtun1@myDomain.com',
};
const users = {};
const BASE_DOMAIN = 'myDomain.com';

// -*********************************************************-
// Use cases
// -*********************************************************-
function genUsername(name, lastname) {
    return name.slice(0, 3) + lastname.slice(0, 3);
}

function getTimesUsernameIsRepeated(usernameToCheck) {
    const usernameList = Object.keys(users);
    const repeatedUsernameList = usernameList.filter((username) =>
        username.startsWith(usernameToCheck)
    );
    return repeatedUsernameList.length;
}

function renderUsers() {
    const $usernamesTBody = document.getElementById('usernames-tbody');
    // const usersEntryList = Object.entries(mockedUsers);
    const usersEntryList = Object.entries(users);
    if (!usersEntryList.length)
        return ($usernamesTBody.parentElement.outerHTML =
            '<p><i>No usernames and emails generated</i></p>');

    const $userRowTemplate = document.getElementById('user-row').content;
    usersEntryList.forEach(([username, email]) => {
        const $clonedUserRow = $userRowTemplate.cloneNode(true);
        $clonedUserRow.querySelector('[data-cell="username"]').innerText =
            username;
        $clonedUserRow.querySelector('[data-cell="email"]').innerText = email;
        $usernamesTBody.appendChild($clonedUserRow);
    });
}

function main() {
    let wantToGenAnotherUser = true;
    while (wantToGenAnotherUser) {
        const fullName = prompt('Ingresa tu nombre completo');

        if (!fullName) {
            alert('Skipping username and email generation...');
            break;
        }

        const [name, lastname] = fullName
            .split(' ')
            .map((word) => word.toLocaleLowerCase());
        const baseUsername = genUsername(name, lastname);

        const timesUsernameIsRepeated =
            getTimesUsernameIsRepeated(baseUsername);

        const username = `${baseUsername}${
            timesUsernameIsRepeated > 0 ? timesUsernameIsRepeated : ''
        }`;
        const email = `${username}@${BASE_DOMAIN}`;
        alert(
            `Tu nombre de usuario es: ${username}\n` + `Tu correo es: ${email}`
        );
        const user = {
            [username]: email,
        };
        Object.assign(users, user);

        wantToGenAnotherUser = confirm('¿Quieres generar otro usuario?');
    }
    renderUsers();
}
main();
