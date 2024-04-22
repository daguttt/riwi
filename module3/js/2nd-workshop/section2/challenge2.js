// -*********************************************************-
// Utils
// -*********************************************************-
function changePageTitle() {
    return new Promise((resolve) => {
        const title = 'Calculadora de Presupuesto';
        document.title = title;
        document.querySelector('h1').textContent = title;
        resolve();
    });
}

async function main() {
    await changePageTitle();
}

main();
