// -*********************************************************-
// Utils
// -*********************************************************-
function askForNumber(promptMessage) {
    while (true) {
        const input = Number(prompt(promptMessage));
        if (!Number.isNaN(input)) return input;
        alert('El valor ingresado no es número');
    }
}

// -*********************************************************-
// Use cases
// -*********************************************************-

function main() {
    let menuOpened = true;
    let id = 0;
    while (menuOpened) {
        const optionMessageLines = [
            'Agregar un producto.',
            'Duplicar un producto.',
            'Ver productos en el inventario.',
            'Buscar productos (Nombre o Precio).',
            'Actualizar un producto.',
            'Actualizar cantidad un producto. (Compra de inventario)',
            'Eliminar un producto.',
            'Verificar existencia de un producto.',
            'Vender un producto.',
            'Ver valor total del inventario',
            'Salir.',
        ];
        const option = prompt(
            'Bienvenido a tu sistema de gestión de inventario:\n' +
                optionMessageLines
                    .map((line, index) => `${index + 1}. ${line}`)
                    .join('\n')
        );
        const lastLineIndex = optionMessageLines.length - 1;
        switch (option) {
            case lastLineIndex: {
                menuOpened = false;
                break;
            }
            case '1': {
                break;
            }
            case '2': {
                break;
            }
            case '3': {
                break;
            }
            case '4': {
                break;
            }
            case '5': {
                break;
            }
        }
    }
}

main();
