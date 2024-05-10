function Person(name, email, password) {
    this.name = name;
    this.email = email;
    this.password = password;
}
Person.prototype.authenticate = function (password) {
    return this.password === password;
};

function Client(name, email, password, address, phone) {
    Person.call(this, name, email, password);
    this.address = address;
    this.phone = phone;
}
Client.prototype = Object.create(Person.prototype);
Client.prototype.constructor = Client;
Client.prototype.makeOrder = function () {
    console.log('Realizando pedido');
};
Client.prototype.showOrderHistory = function () {
    console.log('Mostrando historial de pedidos');
};

function DeliveryPerson(name, email, password, vehicle, availability) {
    Person.call(this, name, email, password);
    this.vehicle = vehicle;
    this.availability = availability;
    this.location = { longitude: 0, latitude: 0 };
}
DeliveryPerson.prototype = Object.create(Person.prototype);
DeliveryPerson.prototype.constructor = DeliveryPerson;
DeliveryPerson.prototype.acceptDelivery = function () {
    this.updateAvailability(false);
    console.log('Aceptando pedido');
};
DeliveryPerson.prototype.updateLocation = function (longitude, latitude) {
    console.log(`Actualizando ubicación a ${longitude}, ${latitude}`);
    this.location = { longitude, latitude };
};
DeliveryPerson.prototype.completeDelivery = function () {
    this.updateAvailability(true);
    console.log('Entregando pedido');
};
DeliveryPerson.prototype.updateAvailability = function (availability) {
    this.availability = availability;
};

function Plate(name, price, ingredients) {
    this.name = name;
    this.price = price;
    this.ingredients = ingredients;
}
Plate.prototype.getInfo = function () {
    return `${this.name} - ${this.price} - ${this.ingredients}`;
};

function Restaurant(name, address, menuQr) {
    this.name = name;
    this.address = address;
    this.menuQr = menuQr;
    this.menu = new Menu();
}
Restaurant.prototype.addPlate = function (plate) {
    this.menu.addPlate(plate);
};
Restaurant.prototype.removePlate = function (plate) {
    this.menu.removePlate(plate);
};
Restaurant.prototype.updatePlate = function (previousPlate, newPlate) {
    this.menu.updatePlate(previousPlate, newPlate);
};

function Menu() {
    this.plates = [];
}
Menu.prototype.addPlate = function (plate) {
    this.plates.push(plate);
};
Menu.prototype.removePlate = function (plate) {
    const plateIndexToRemove = this.plates.indexOf(plate);
    if (plateIndexToRemove > -1) {
        this.plates.splice(plateIndexToRemove, 1);
    }
};
Menu.prototype.updatePlate = function (previousPlate, newPlate) {
    const previousPlateIndex = this.plates.indexOf(previousPlate);
    if (previousPlateIndex > -1) {
        this.plates[previousPlateIndex] = newPlate;
    }
};

function PhysicalMenu() {
    Menu.call(this);
}
PhysicalMenu.prototype = Object.create(Menu.prototype);
PhysicalMenu.prototype.constructor = PhysicalMenu;
PhysicalMenu.prototype.print = function () {
    this.plates.forEach((plate) => console.log(plate.getInfo()));
};

function QRMenu() {
    Menu.call(this);
}
QRMenu.prototype = Object.create(Menu.prototype);
QRMenu.prototype.constructor = QRMenu;
QRMenu.prototype.generateQRCode = function () {
    console.log('Generando QR');
};

function Order(client, restaurant, details, state) {
    this.client = client;
    this.restaurant = restaurant;
    this.details = details;
    this.state = state;
}
Order.prototype.updateState = function (newState) {
    this.state = newState;
};
Order.prototype.computeTotal = function () {
    let total = 0;
    this.details.forEach((detail) => {
        total += detail.quantity * detail.plate.price;
    });
    return total;
};
