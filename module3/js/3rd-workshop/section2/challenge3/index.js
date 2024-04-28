const mockedProduct1 = {
    id: 1,
    name: 'Producto 1',
    price: 100,
    quantity: 10,
    description: 'Descripción del Producto 1',
};
const mockedProduct2 = {
    id: 2,
    name: 'Producto 1 Copy',
    price: 50,
    quantity: 10,
    description: 'Descripción del Producto 1 Copy',
};
const mockedProduct3 = {
    id: 3,
    name: 'Producto 2',
    price: 80,
    quantity: 10,
    description: 'Descripción del Producto 1',
};

const products = [mockedProduct1, mockedProduct2, mockedProduct3];
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

const askForBiggerNumberThan = function (minNumber, promptMessage) {
    while (true) {
        const maxNumber = askForNumber(promptMessage);
        if (maxNumber >= minNumber) return maxNumber;
        alert(`'${maxNumber}' no es mayor o igual a ${minNumber}`);
    }
};

const askForAnIndexFrom = function ({
    targetArray,
    promptMessage,
    invalidMessage = 'Opción inválida. Intenta de nuevo',
}) {
    const formattedListString = targetArray
        .map((element, index) => `${index + 1}. ${element}`)
        .join('\n');

    while (true) {
        const option = askForNumber(`${promptMessage}\n` + formattedListString);
        const isValidOption =
            option && option > 0 && option <= targetArray.length;
        if (isValidOption) return option - 1;
        alert(invalidMessage);
    }
};

// -*********************************************************-
// Use cases
// -*********************************************************-
const askForProduct = function () {
    // const mockedBlacklistedProduct = {
    //     name: 'Producto 1',
    //     price: 100,
    //     quantity: 10,
    //     description: 'Descripción del Producto 1 palabra1',
    // };
    // const mockedProduct = {
    //     name: 'Producto 1',
    //     price: 100,
    //     quantity: 10,
    //     description: 'Descripción del Producto 1',
    // };
    // return mockedProduct;

    const name = prompt('Introduce el Nombre del producto');
    const price = askForNumber('Introduce el Precio del producto');
    const quantity = askForNumber('Introduce la Cantidad del producto');
    const description = prompt('Introduce la Descripción del producto');
    return { name, price, quantity, description };
};

const blackListedWords = [
    'palabra1',
    'palabra2',
    'palabra3',
    'palabra4',
    'palabra5',
];
const sanitizeProduct = function (product) {
    let isSanitized = false;
    const descriptionWords = product.description.split(' ');
    const sanitizedWords = descriptionWords.map((word) => {
        if (blackListedWords.includes(word)) {
            isSanitized = true;
            return '*'.repeat(word.length);
        }
        return word;
    });
    const sanitizedDescription = sanitizedWords.join(' ');
    const sanitizedProduct = {
        ...product,
        description: sanitizedDescription,
    };
    return {
        isSanitized,
        sanitizedProduct,
    };
};

// let idForProducts = 1;
let idForProducts = products.length + 1;
const generateIdForProduct = function () {
    return idForProducts++;
};

const addProduct = function () {
    const product = askForProduct();
    product.id = generateIdForProduct();

    const { isSanitized, sanitizedProduct } = sanitizeProduct(product);
    if (isSanitized) blacklistedProducts.push(product);
    products.push(sanitizedProduct);

    console.log({
        products,
        blacklistedProducts,
    });
};

const listProducts = function (products) {
    if (!products.length)
        return alert('No hay productos en el inventario aún.');

    alert('Revisa la consola para ver los productos... Presiona ENTER');

    console.clear();
    products.forEach((product, index) => {
        console.log(
            `ID: ${product.id} -> ${product.name}\n` +
                `Price: ${product.price} | Cantidad Disponible: ${product.quantity}\n` +
                `Descripción: ${product.description}`
        );
        const isNotLastProduct = index !== products.length - 1;
        if (isNotLastProduct) console.log('-*********************-');
    });
};

const askForProductById = function () {
    while (true) {
        const productId = askForNumber(
            'Ingresa el ID del producto que deseas duplicar'
        );
        const product = products.find((product) => product.id === productId);
        if (product) return product;
        alert('ID inválido. Intentalo de nuevo.');
    }
};

const countProductsByName = function (productNameToCheck) {
    const filteredProducts = products.filter((product) =>
        product.name.startsWith(productNameToCheck)
    );
    return filteredProducts.length;
};

const duplicateProduct = function () {
    listProducts(products);
    if (!products) return;
    const productToDuplicate = askForProductById();
    const productBaseName = productToDuplicate.name.replace(/\sCopy\s*\d*/, '');
    const timesProductIsRepeated = countProductsByName(productBaseName);
    const duplicatedProduct = {
        ...productToDuplicate,
        id: generateIdForProduct(),
        name: `${productBaseName} Copy ${
            timesProductIsRepeated === 1 ? '' : timesProductIsRepeated
        }`,
    };
    products.push(duplicatedProduct);
};

const listProductsInInventory = function () {
    listProducts(products);
};

const productFilters = [
    {
        name: 'name',
        title: 'Por nombre.',
        filterFn: (products, value) =>
            products.filter((product) => product.name.includes(value)),
    },
    {
        name: 'price',
        title: 'Por precio.',
        filterFn: (products, range) =>
            products.filter(
                (product) =>
                    product.price >= range.min && product.price <= range.max
            ),
    },
];
const askForFilterName = function () {
    const productFilterTitleList = productFilters.map((f) => f.title);
    const chosenFilterIndex = askForAnIndexFrom({
        targetArray: productFilterTitleList,
        promptMessage: 'Ingresa el número del filtro que deseas realizar:',
        invalidMessage: 'Filtro inválido. Intenta de nuevo',
    });
    return productFilters[chosenFilterIndex].name;
};

const filterProducts = function (products, filterName, filterValue) {
    const filter = productFilters.find((filter) => filter.name === filterName);
    if (!filter) return products;
    return filter.filterFn(products, filterValue);
};

const searchProducts = function () {
    const filterName = askForFilterName();
    let filterValue;
    if (filterName === 'name') {
        filterValue =
            prompt('Introduce la/s palabra/s por la/s que quieres filrar') ||
            '';
    } else if (filterName === 'price') {
        const minRange = askForNumber('Introduce el precio mínimo');
        const maxRange = askForBiggerNumberThan(
            minRange,
            'Introduce el precio máximo'
        );
        filterValue = {
            min: minRange,
            max: maxRange,
        };
    }

    const filteredProducts = filterProducts(products, filterName, filterValue);
    listProducts(filteredProducts);
};

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
    while (true) {
        const featureTitleArray = inventoryFeatures.map((f) => f.title);
        const featureIndex = askForAnIndexFrom({
            targetArray: featureTitleArray,
            promptMessage: 'Bienvenido a tu sistema de gestión de inventario:',
        });
        const { featureFn } = inventoryFeatures[featureIndex];
        if (featureFn === null) break;
        featureFn();
    }
}

main();
