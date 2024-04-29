function setTimerToCheckImage() {
    const $timerSpan = document.querySelector('#timer > span');
    let counter = 5;
    return new Promise((resolve) => {
        const timer = setInterval(() => {
            if (counter === 0) {
                clearInterval(timer);
                setTimeout(() => resolve(), 0);
            }
            $timerSpan.textContent = counter--;
        }, 1000);
    });
}

async function main() {
    await setTimerToCheckImage();
}
main();
