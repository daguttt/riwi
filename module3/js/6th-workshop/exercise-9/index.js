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

// -*********************************************************-
// Use cases
// -*********************************************************-

function main() {
    const delay = askForNumber(
        '¿Cuánto tiempo quieres que se demore para mostrar los posts?'
    );
    console.log(`Esperando ${delay} segundos para mostrar los posts...`);
    setTimeout(() => {
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then((res) => {
                if (res.ok) return res.json();
                throw new Error('Error en la petición de los datos');
            })
            .then((posts) => console.log('Posts: ', posts))
            .catch((err) => console.error(err));
    }, delay * 1000);
}
main();
