const title = "Julian's trip";
document.title = title;
document.querySelector('h1').textContent = title;

// -*******************************************************************************-
// Exercise

const destiny = prompt('Enter the destiny you want to go');
const DESTINY_DAILY_COST = 500;

let canTravel = false;
while (!canTravel) {
    let daysToTravel = Number(
        prompt(`How many days are you planning to spend in ${destiny}?`)
    );
    let budget = Number(prompt('Enter your budget for this trip'));

    const tripTotalCost = daysToTravel * DESTINY_DAILY_COST;
    canTravel = tripTotalCost <= budget;
    if (!canTravel)
        alert(
            'You should either reconsider the number of days to travel or your budget for the trip'
        );
    else {
        alert('Have a nice trip!');
        break;
    }
}
