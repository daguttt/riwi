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

    const hasCorrectLength = userPassword.length >= 8;
    console.log('Length', hasCorrectLength);

    const splitPassword = userPassword.split('');
    const hasANumber = splitPassword.some(isNumber);
    console.log('Number', hasANumber);

    const hasALetter = splitPassword.some(isAlpha);
    console.log('Letter', hasALetter);

    const hasSpecialChar = splitPassword.some(isSpecialChar);
    console.log('Special Char', hasSpecialChar);

    const isValid =
        hasCorrectLength && hasANumber && hasALetter && hasSpecialChar;

    showMessage({ isValid });
}
main();
