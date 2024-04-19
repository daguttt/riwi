const desirableItems = [];

// -*********************************************************-
// Utils
// -*********************************************************-

function getValidatedInput(promptMessage, validateInputFn) {
    while (true) {
        const input = prompt(promptMessage);
        const validityObject = {
            validatedInput,
            isInputValid,
            invalidInputMessage,
        };
        const { validatedInput, isInputValid, invalidInputMessage } =
            validateInputFn(input, validityObject);
        if (isInputValid) return validatedInput;

        alert(invalidInputMessage);
    }
}

// -*********************************************************-
// Use cases
// -*********************************************************-

function askForDesirableItems() {}

function main() {
    const budget = getValidatedInput('');
}

main();
