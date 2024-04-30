// -*********************************************************-
// Utils
// -*********************************************************-

// -*********************************************************-
// Use cases
// -*********************************************************-


function main() {
    console.log(
        "Intentando llamar a 'funcionDeclarada' antes de su declaración:"
    );
    try {
        console.log(funcionDeclarada());
    } catch (error) {
        console.log('Error:', error.message);
    }

    console.log(
        "Intentando llamar a 'funcionExpresada' antes de su declaración:"
    );
    try {
        console.log(funcionExpresada());
    } catch (error) {
        console.log('Error:', error.message);
    }

    // Declaración de una función declarada
    function funcionDeclarada() {
        return 'Función declarada ha sido llamada.';
    }

    // Declaración de una función expresada
    const funcionExpresada = function () {
        return 'Función expresada ha sido llamada.';
    };

    console.log("Llamando a 'funcionDeclarada' después de su declaración:");
    console.log(funcionDeclarada());

    console.log("Llamando a 'funcionExpresada' después de su declaración:");
    console.log(funcionExpresada());
}
main();
