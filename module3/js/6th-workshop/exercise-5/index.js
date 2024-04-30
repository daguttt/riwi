// -*********************************************************-
// Utils
// -*********************************************************-

// -*********************************************************-
// Use cases
// -*********************************************************-

const handleAsynchronicity = function (callback, promise) {
    promise.then(callback).catch();
};

function main() {
    const promise = new Promise((resolve) => {
        setTimeout(() => {
            resolve();
        }, 2000);
    });
    handleAsynchronicity(() => {
        console.log('¡Promesa cumplida y callback ejecutado!');
    }, promise);
}
main();
