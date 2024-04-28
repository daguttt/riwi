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

// const products = [];
const products = [mockedProduct1, mockedProduct2, mockedProduct3];
const blacklistedProducts = [];
const amountFormatter = new Intl.NumberFormat('es-US', {
    style: 'currency',
    currency: 'USD',
});

// -*********************************************************-
// Utils
// -*********************************************************-
function askForNumber(promptMessage, options = {}) {
    while (true) {
        const rawInput = prompt(promptMessage);
        if (options?.allowedNullish && !rawInput) return rawInput;
        const castedInput = parseInt(rawInput);
        if (!Number.isNaN(castedInput)) return castedInput;
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
    let shouldBeBlacklisted = false;
    const descriptionWords = product.description.split(' ');
    const sanitizedWords = descriptionWords.map((word) => {
        if (blackListedWords.includes(word)) {
            shouldBeBlacklisted = true;
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
        shouldBeBlacklisted,
        sanitizedProduct,
    };
};

// let idForProducts = 1;
let idForProducts = products.length + 1;
const generateIdForProduct = function () {
    return idForProducts++;
};

const addProductToBlacklist = function (productToBlacklist) {
    const blacklistedProduct = blacklistedProducts.find(
        (product) => product.id === productToBlacklist.id
    );
    const isAlreadyBlacklisted = blacklistedProduct !== undefined;
    if (!isAlreadyBlacklisted)
        return blacklistedProducts.push(productToBlacklist);

    Object.assign(blacklistedProduct, productToBlacklist);
};

const addProduct = function () {
    const product = askForProduct();
    product.id = generateIdForProduct();

    const { shouldBeBlacklisted, sanitizedProduct } = sanitizeProduct(product);
    if (shouldBeBlacklisted) addProductToBlacklist(product);
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

const askForProductIndexById = function (promptMessage) {
    while (true) {
        const productId = askForNumber(promptMessage);
        const productIndex = products.findIndex(
            (product) => product.id === productId
        );
        if (productIndex > -1) return productIndex;
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
    if (!products.length) return;
    const productIndex = askForProductIndexById(
        'Ingresa el ID del producto que deseas DUPLICAR'
    );
    const productToDuplicate = products[productIndex];
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

const updateProduct = function () {
    listProducts(products);
    if (!products.length) return;
    const productIndex = askForProductIndexById(
        'Ingresa el ID del producto que deseas ACTUALIZAR'
    );
    const productToUpdate = products[productIndex];

    const newName = prompt(
        `El nombre del producto es: ${productToUpdate.name}\n` +
            'Ingresa el NUEVO nombre del producto o presiona ENTER para dejarlo tal cuál.'
    );
    const newPrice = askForNumber(
        `El precio del producto es: ${amountFormatter.format(
            productToUpdate.price
        )}\n` +
            'Ingresa el NUEVO precio del producto o presiona ENTER para dejarlo tal cuál.',
        {
            allowedNullish: true,
        }
    );
    const newQuantity = askForNumber(
        `La cantidad del producto es: ${productToUpdate.quantity}\n` +
            'Ingresa la NUEVA cantidad del producto o presiona ENTER para dejarla tal cuál.',
        {
            allowedNullish: true,
        }
    );
    const newDescription = prompt(
        `La descripción del producto es: ${productToUpdate.description}\n` +
            'Ingresa la NUEVA descripción del producto o presiona ENTER para dejarla tal cuál.'
    );

    const updatedProduct = {
        ...productToUpdate,
        name: newName || productToUpdate.name,
        price: newPrice || productToUpdate.price,
        quantity: newQuantity || productToUpdate.quantity,
        description: newDescription || productToUpdate.description,
    };

    const { shouldBeBlacklisted, sanitizedProduct } =
        sanitizeProduct(updatedProduct);
    if (shouldBeBlacklisted) addProductToBlacklist(updatedProduct);

    Object.assign(productToUpdate, sanitizedProduct);

    alert('¡Producto actualizado con exito!');
};

const deleteProduct = function () {
    listProducts(products);
    if (!products.length) return;
    const productIndex = askForProductIndexById(
        'Ingresa el ID del producto que deseas ELIMINAR'
    );
    // Delete from `products`
    const { id: productId } = products[productIndex];
    products.splice(productIndex, 1);
    alert('¡Producto eliminado satisfactoriamente!');

    // Delete from `blacklistedProducts` (if needed)
    const blacklistedProductIndex = blacklistedProducts.findIndex(
        (bProduct) => bProduct.id === productId
    );
    if (blacklistedProductIndex > -1)
        blacklistedProducts.splice(blacklistedProductIndex, 1);
};

const increaseProductQuantity = function () {
    listProducts(products);
    if (!products.length) return;
    const productIndex = askForProductIndexById(
        'Ingresa el ID del producto del cuál se compró mercancía'
    );
    const productToUpdate = products[productIndex];
    let quantityToIncrease;
    while (true) {
        quantityToIncrease = askForNumber(
            `La cantidad del producto es: ${productToUpdate.quantity}\n` +
                `Ingresa la cantidad que se compró de '${productToUpdate.name}' (min: 1)`
        );
        if (quantityToIncrease > 1) break;
        alert('La cantidad minima para añadir es 1');
    }
    productToUpdate.quantity += quantityToIncrease;
    alert(`¡Cantidad de '${productToUpdate.name}' incrementada correctamente!`);
};

const checkProductQuantity = function (product) {
    return product.quantity > 0;
};

const checkProductAvailability = function () {
    const productIndex = askForProductIndexById(
        'Ingresa el ID del producto del que deseas conocer su disponibilidad.'
    );
    const productToCheck = products[productIndex];
    const isProductAvailable = checkProductQuantity(productToCheck);
    if (!isProductAvailable) return alert('Producto agotado');
    alert(
        `La cantidad de '${productToCheck.name} disponible es: ${productToCheck.quantity}`
    );
};

const sellProduct = function () {
    listProducts(products);
    if (!products.length) return;
    const productIndex = askForProductIndexById(
        'Ingresa el ID del producto que se va a COMPRAR'
    );
    const productToSell = products[productIndex];
    const isProductAvailable = checkProductQuantity(productToSell);
    if (!isProductAvailable)
        return alert(
            `No hay existencias disponibles de '${productToSell.name}'`
        );

    const MINIMUM_QUANTITY_TO_SELL = 1;
    let quantityToSell;
    while (true) {
        quantityToSell =
            askForNumber(
                `La cantidad del producto es: ${productToSell.quantity}\n` +
                    `Ingresa la cantidad que se va a vender de '${productToSell.name}' o presiona ENTER (por defecto: ${MINIMUM_QUANTITY_TO_SELL})`,
                {
                    allowedNullish: true,
                }
            ) || MINIMUM_QUANTITY_TO_SELL;
        const canBuyProduct =
            quantityToSell > 0 && quantityToSell <= productToSell.quantity;
        if (canBuyProduct) break;
        alert(
            `Cantidad mínima: ${MINIMUM_QUANTITY_TO_SELL} -> Cantidad máxima: ${productToSell.quantity}. Inténtalo de nuevo.`
        );
    }

    productToSell.quantity -= quantityToSell;
    alert(
        '¡Compra realizada con éxito!\n' +
            `Nuevo disponible de '${productToSell.name}': ${productToSell.quantity}`
    );
};

const getInventoryTotalPrice = function () {
    if (!products.length) return 0;
    return products.reduce((total, product) => product.price + total, 0);
};

const showInventoryTotalPrice = function () {
    if (!products.length)
        return alert(
            `No hay productos en el inventario aún. Total: ${amountFormatter.format(
                0
            )}`
        );

    const inventoryTotalPrice = getInventoryTotalPrice();
    alert(
        `El valor total de todo el inventario es: ${amountFormatter.format(
            inventoryTotalPrice
        )}`
    );
};

const generateGeneralReport = function () {
    if (!products.length)
        return alert(`No hay productos en el inventario aún.`);

    alert('Revisa la consola para ver el reporte general del inventario...');
    const totalProducts = products.length;
    const inventoryTotalPrice = getInventoryTotalPrice();
    const biggestPrice = Math.max(...products.map((product) => product.price));
    const lowestPrice = Math.min(...products.map((product) => product.price));
    const totalMostExpensiveProducts = products.filter(
        (product) => product.price === biggestPrice
    ).length;
    const totalCheapestProducts = products.filter(
        (product) => product.price === lowestPrice
    ).length;

    const quantities = products.map((product) => product.quantity);
    const biggestQuantityOfProducts = Math.max(...quantities);
    const lowestQuantityOfProducts = Math.min(...quantities);
    const totalMostAvailableProducts = products.filter(
        (product) => product.quantity === biggestQuantityOfProducts
    ).length;
    const totalLeastAvailableProducts = products.filter(
        (product) => product.quantity === lowestQuantityOfProducts
    ).length;
    const totalBlaclistedProducts = blacklistedProducts.length;
    const reportLinesMsg = [
        `La cantidad de productos es: ${totalProducts}`,
        `Valor total del inventario: ${amountFormatter.format(
            inventoryTotalPrice
        )}`,
        `Cantidad de productos más caros: ${totalMostExpensiveProducts} (Precio: ${amountFormatter.format(
            biggestPrice
        )})`,
        `Cantidad de productos más baratos: ${totalCheapestProducts} (Precio: ${amountFormatter.format(
            lowestPrice
        )})`,
        `Cantidad de productos con mayor cantidad: ${totalMostAvailableProducts} (Cantidad: ${biggestQuantityOfProducts})`,
        `Cantidad de productos con menor cantidad: ${totalLeastAvailableProducts} (Cantidad: ${lowestQuantityOfProducts})`,
        `Cantidad de productos con malas palabras en la descripción: ${totalBlaclistedProducts}`,
    ].join('\n');
    console.log(reportLinesMsg);
};

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
        featureFn: increaseProductQuantity,
    },
    { title: 'Eliminar un producto.', featureFn: deleteProduct },
    {
        title: 'Verificar existencia de un producto.',
        featureFn: checkProductAvailability,
    },
    { title: 'Vender un producto.', featureFn: sellProduct },
    {
        title: 'Ver valor total del inventario',
        featureFn: showInventoryTotalPrice,
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
