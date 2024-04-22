// -*********************************************************-
// Utils
// -*********************************************************-
function isNumber(char) {
    return !Number.isNaN(Number(char));
}

function isSpecialChar(char) {
    const specialChars = `! @ # $ % ^ & * ( ) + = _ - { } [ ] : ; " ' ? < > , . | / \ ~ \``;
    const specialCharsList = specialChars.split(' ');
    return specialCharsList.includes(char);
}

function isAlpha(char) {
    const charCode = char.charCodeAt(0);
    const upperLimitUppercase = 'Z'.charCodeAt(0);
    const lowerLimitUppercase = 'A'.charCodeAt(0);
    const lowerLimitLowercase = 'a'.charCodeAt(0);
    const upperLimitLowercase = 'z'.charCodeAt(0);

    const isLowerCaseChar =
        charCode >= lowerLimitLowercase && charCode <= upperLimitLowercase;

    const isUpperCaseChar =
        charCode >= lowerLimitUppercase && charCode <= upperLimitUppercase;

    return isLowerCaseChar || isUpperCaseChar || char === ' ';
}

// -*********************************************************-
// Use cases
// -*********************************************************-

function showMessage({ isValid }) {
    isValid
        ? (document.body.innerHTML +=
              '<h2 style="color: green">Secure password!</h2>')
        : (document.body.innerHTML +=
              '<h2 style="color: red">Insecure password!</h2>');
}

function main() {
    const userPassword = prompt('Enter a password to validate');
    if (!userPassword) return showMessage({ isValid: false });

    let isValid = false;

    isValid = userPassword.length >= 8;
    console.log('Length', isValid);

    const splitPassword = userPassword.split('');
    isValid = splitPassword.some(isNumber);
    console.log('Number', isValid);

    isValid = splitPassword.some(isAlpha);
    console.log('Letter', isValid);

    isValid = splitPassword.some(isSpecialChar);
    console.log('Special Char', isValid);

    isValid = showMessage({ isValid });
}
main();
