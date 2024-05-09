function Person(name, lastname, age, profession, hobbies) {
    this.name = name;
    this.lastname = lastname;
    this.age = age;
    this.profession = profession;
    this.hobbies = hobbies;
}

Person.prototype.greet = function () {
    return `Hola, soy ${this.name} ${this.lastname} y tengo ${this.age} años.`;
};

function Student(name, lastname, age, average, courses) {
    Person.call(this, name, lastname, age, 'estudiante', [
        'sing',
        'code',
        'swim',
    ]);
    this.average = average;
    this.courses = courses;
}

Student.prototype = Object.create(Person.prototype);
Student.prototype.constructor = Student;
Student.prototype.doTest = function () {
    console.log(`Soy ${this.name} y estoy presentando un examen`);
};
Student.prototype.greet = function () {
    return `${Person.prototype.greet.call(this)} Y soy un ${this.profession}.`;
};

const student = new Student('Daniel', 'Gutiérrez', 20, 4.6, [
    'JS Course',
    'Angular Course',
]);

console.log(student.greet());
