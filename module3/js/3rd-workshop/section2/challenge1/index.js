// -*********************************************************-
// Utils
// -*********************************************************-

// -*********************************************************-
// Use cases
// -*********************************************************-
function askForGrades() {
    const promptMessage =
        'Calculadora de Promedio de Calificaciones\n\n' +
        'Ingresa tus notas separadas por comas:';
    const mockedGradesInput = '2, 3.5, 4, 5, 1, 1.5';
    while (true) {
        const gradesInput = prompt(promptMessage);
        if (gradesInput)
            return gradesInput.replace(' ', '').split(',').map(Number);

        if (gradesInput === null) {
            alert('Calculadora cerrada');
            return null;
        }
        if (gradesInput === '')
            alert('Notas no ingresadas. Inténtalo de nuevo');
    }
}

function main() {
    const gradeList = askForGrades();
    if (!gradeList) return;
    const gradesTotal = gradeList.reduce((total, grade) => total + grade);
    const average = (gradesTotal / gradeList.length).toFixed(2);
    alert(`El promedio de tus calificaciones es: ${average}`);
}
main();
