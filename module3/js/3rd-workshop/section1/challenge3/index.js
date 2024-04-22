// -*********************************************************-
// Use cases
// -*********************************************************-

function showMessage({ isValid }) {
    isValid
        ? (document.body.innerHTML +=
              '<h2 style="color: green">Valid email!</h2>')
        : (document.body.innerHTML +=
              '<h2 style="color: red">Invalid email!</h2>');
}

function main() {
    const emailToCheck = prompt('Enter an email to check');

    const hasNotWhitespaces =
        emailToCheck.split('').some((char) => char === ' ') === false;

    const hasOneAtChar = emailToCheck.includes('@');

    if (!hasOneAtChar) return showMessage({ isValid: false });

    const hasJustOneAtChar = emailToCheck.split('@').length === 2;
    console.log('Just one @', hasJustOneAtChar);

    const [, domain] = emailToCheck.split('@');
    console.log(domain);

    const hasValidTopLevelDomain =
        !domain.startsWith('.') &&
        domain.split('').some((char) => char === '.');

    const isValid =
        hasNotWhitespaces && hasJustOneAtChar && hasValidTopLevelDomain;

    showMessage({ isValid });
}
main();
