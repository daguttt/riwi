const products = [];
const blacklistedProducts = [];

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
const addProduct = function () {};

const duplicateProduct = function () {};

const listProductsInInventory = function () {};

const searchProducts = function () {};

const updateProduct = function () {};

const updateProductQuantity = function () {};

const removeProduct = function () {};

const checkProductAvailability = function () {};

const sellProduct = function () {};

const getInventoryTotalPrice = function () {};

const generateGeneralReport = function () {};

const inventoryFeatures = [
    {
        title: 'Agregar un producto.',
        featureFn: addProduct,
    },
    {
        title: 'Duplicar un producto.',
        featureFn: duplicateProduct,
    },
    {
        title: 'Ver productos en el inventario.',
        featureFn: listProductsInInventory,
    },
    {
        title: 'Buscar productos (Nombre o Precio).',
        featureFn: searchProducts,
    },
    { title: 'Actualizar un producto.', featureFn: updateProduct },
    {
        title: 'Actualizar cantidad un producto. (Compra de inventario)',
        featureFn: updateProductQuantity,
    },
    { title: 'Eliminar un producto.', featureFn: removeProduct },
    {
        title: 'Verificar existencia de un producto.',
        featureFn: checkProductAvailability,
    },
    { title: 'Vender un producto.', featureFn: sellProduct },
    {
        title: 'Ver valor total del inventario',
        featureFn: getInventoryTotalPrice,
    },
    { title: 'Generar reporte general', featureFn: generateGeneralReport },
    { title: 'Salir.', featureFn: null },
];

function main() {
    let menuOpened = true;
    let id = 0;
    while (menuOpened) {
        const option = prompt(
            'Bienvenido a tu sistema de gestión de inventario:\n' +
                inventoryFeatures
                    .map((option, index) => `${index + 1}. ${option.title}`)
                    .join('\n')
        );

        const featureIndex = option - 1;
        inventoryFeatures[featureIndex].featureFn;
    }
}

main();
