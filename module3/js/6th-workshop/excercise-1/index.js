function showCodeImageToUser() {
    const $timerSpan = document.querySelector('#timer > span');
    let counter = 5;
    return new Promise((resolve) => {
        const timer = setInterval(() => {
            if (counter < 1) {
                clearInterval(timer);
                resolve();
            }
            $timerSpan.textContent = counter--;
        }, 1000);
    });
}

function askQuestionsAboutGlobalVar() {
    const baseMessage = '¿Se puede acceder a `globalVariable` después de la';
    let canAccessVar = confirm(`${baseMessage} linea 11 dentro del if?`);
    alert(
        `${
            canAccessVar ? 'Correcto' : 'Incorrecto'
        }, ya que al ser una variable global puede ser accedida desde cualquier scope anidado`
    );

    canAccessVar = confirm(`${baseMessage} linea 14 dentro de la función?`);
    alert(
        `${
            canAccessVar ? 'Correcto' : 'Incorrecto'
        }, ya que al ser una variable global puede ser accedida desde cualquier scope anidado`
    );

    canAccessVar = confirm(`${baseMessage} linea 18?`);
    alert(
        `${
            canAccessVar ? 'Correcto' : 'Incorrecto'
        }, ya que al ser una variable global puede ser accedida desde cualquier scope`
    );
}

function askQuestionsAboutFunctionVar() {
    const baseMessage = '¿Se puede acceder a `functionVariable` después de la';
    let canAccessVar = confirm(`${baseMessage} linea 11 dentro del if?`);
    alert(
        `${
            canAccessVar ? 'Correcto' : 'Incorrecto'
        }, ya que al ser una variable declarada con var al nivel de función puede ser accedida desde cualquier scope anidado dentro de esta función`
    );

    canAccessVar = confirm(`${baseMessage} linea 14 dentro de la función`);
    alert(
        `${
            canAccessVar ? 'Correcto' : 'Incorrecto'
        }, ya que estaría en el mismo scope en que fue declarada`
    );

    canAccessVar = confirm(`${baseMessage} linea 18`);
    alert(
        `${
            canAccessVar ? 'Incorrect' : 'Correcto'
        }, ya que estaría fuera del scope de función en el que fue declarada`
    );
}

function askQuestionsAboutBlockVar() {
    const baseMessage = '¿Se puede acceder a `blockVariable`';
    let canAccessVar = confirm(
        `${baseMessage} antes de linea 10 con un console.log()?`
    );
    alert(
        `${
            canAccessVar ? 'Incorrecto' : 'Correcto'
        }, ya que no podemos acceder a una variable declarada con 'let' antes de su inicialización`
    );

    canAccessVar = confirm(`${baseMessage} en la linea 13?`);
    alert(
        `${
            canAccessVar ? 'Incorrecto' : 'Correcto'
        }, ya que estaría fuera del scope en el que está declarada. Si estuviese declarada con var funcionaría ya que var tiene scope de función`
    );

    canAccessVar = confirm(`${baseMessage} linea 18?`);
    alert(
        `${
            canAccessVar ? 'Incorrecto' : 'Correcto'
        }, ya que estaría fuera del scope en el que está declarada. Tampoco funcionaría si estuviera declarada con var funcionaría ya que esa linea está fuera del scope de la función testScope()`
    );
}

async function main() {
    await showCodeImageToUser();
    const thinksCodeWorkSuccessfully = confirm(
        '¿El código de la imagén funciona?'
    );
    alert(
        `${
            thinksCodeWorkSuccessfully ? 'Correcto' : 'Incorrecto'
        }, ya que cada variable está siendo accedida después de su declaración e inicialización. En este caso no importa la keyword usada para declarar la variable`
    );
    alert('Ahora las siguientes preguntas...');
    askQuestionsAboutGlobalVar();
    askQuestionsAboutFunctionVar();
    askQuestionsAboutBlockVar();
}
main();
