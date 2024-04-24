// -*********************************************************-
// Use cases
// -*********************************************************-

function askForGrades() {
    const promptMessage =
        'Calculadora de Estadísticas de Calificaciones\n\n' +
        'Ingresa las notas de los estudiantes separadas por comas:';
    // const mockedGradesInput = '20, 30, 45, 50.5, 100, 80, 95, 15';
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

function calculateAverage(gradeList) {
    const gradesTotal = gradeList.reduce((total, grade) => total + grade);
    return (gradesTotal / gradeList.length).toFixed(2);
}

function countPassingGrades(gradeList) {
    return gradeList.filter((grade) => grade >= 70).length;
}

function countFailingGrades(gradeList) {
    return gradeList.filter((grade) => grade < 70).length;
}

const ORDERS = Object.freeze({
    ASC: 'asc',
    DESC: 'desc',
});

function orderGrades(gradeList, order) {
    switch (order) {
        case ORDERS.DESC: {
            return gradeList.sort((gradeA, gradeB) =>
                gradeA > gradeB ? -1 : 1
            );
        }
    }
}

function main() {
    const gradeList = askForGrades();
    if (!gradeList) return;

    const average = calculateAverage(gradeList);
    const maxGrade = Math.max(...gradeList);
    const minGrade = Math.min(...gradeList);
    const passingGrades = countPassingGrades(gradeList);
    const failingGrades = countFailingGrades(gradeList);
    const descendingGradeList = orderGrades(gradeList, ORDERS.DESC);

    const statisticsMessages = [
        `El promedio de las calificaciones es: ${average}`,
        `La calificación máxima es: ${maxGrade}`,
        `La calificación minima es: ${minGrade}`,
        `Número de Aprobados es: ${passingGrades}`,
        `Número de Reprobados es: ${failingGrades}`,
        `Calificaciones Ordenadas de Mayor a Menor: ${descendingGradeList.join(
            ', '
        )}`,
    ];
    const formattedStatisticsMessage = statisticsMessages.join('\n');
    alert(formattedStatisticsMessage);
}

main();
