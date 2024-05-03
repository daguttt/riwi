console.log('Inicio del script');

// Macrotarea: setTimeout
setTimeout(() => {
    console.log('Macrotarea 1 second (setTimeout)');
}, 1000);

setTimeout(() => {
    console.log('Macrotarea 0 seconds (setTimeout)');
}, 0);

// Microtarea: Promesa
Promise.resolve()
    .then(() => {
        setTimeout(() => {
            console.log('Macrotarea (setTimeout) inside Microtarea 1');
            return 'from micro 1';
        }, 0);
    })
    .then((message) => {
        console.log(message);
        console.log('Microtarea 2 (Promesa)');
    });

// Microtarea: Promesa
Promise.resolve()
    .then(() => {
        console.log('Microtarea 3 (Promesa)');
    })
    .then(() => {
        console.log('Microtarea 4 (Promesa)');
    });

console.log('Fin del script');
