const $counter = document.getElementById('counter');
const $counterIncrementBtn = document.getElementById('counter-increment');

const createCounter = function (initialValue) {
    return function (valueToIncrease) {
        return (initialValue += valueToIncrease);
    };
};

function main() {
    const initialValue = parseInt($counter.textContent);
    const counter = createCounter(initialValue);
    $counterIncrementBtn.addEventListener('click', () => {
        $counter.textContent = counter(1);
    });
}
main();
