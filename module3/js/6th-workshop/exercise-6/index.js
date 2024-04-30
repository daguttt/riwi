console.log('Mensaje 1: Inmediatamente.');
setTimeout(() => {
    console.log('Mensaje 2: Con timeout de 0 segundos.');
}, 0);

setTimeout(() => {
    console.log('Mensaje 2: Con timeout de 0 segundos.');
}, 1000);
