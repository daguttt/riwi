// Section 1
alert('¡Bienvenido al taller de JavaScript!');

// Section 2
// This is an inline comment

/*
  This is a block comment
*/

const myNumber = 10;
console.log(myNumber);

const myBoolean = true;
console.log(typeof myBoolean);

const myString = 'Daniel';
console.log(myString.length);

const myArray = ['grape', 3, ['banana', 'apple']];
console.log(myArray);

const myObject = {
    name: 'Daniel',
    age: 20,
    profession: 'Coder',
};
console.log(myObject);

// Section 3
const userName = prompt('Please, enter your name');
alert(`Hi there, ${userName}! Welcome!`);

const userLikesJs = confirm('Do you like JavaScript');
console.log(`${userName} ${userLikesJs ? 'likes' : "doesn't like"} JavaScript`);

// Section 4
console.warn('This is just a practice.');
console.error('Something went wrong!');
console.table(
    Array(5)
        .fill(0)
        .map((_, i) => i + 1)
);
