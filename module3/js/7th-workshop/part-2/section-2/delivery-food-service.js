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

function Restaurant(name, address, menu) {
    this.name = name;
    this.address = address;
    this.menu = menu;
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
    return this.details.reduce((total, detail) => {
        return total + detail.quantity * detail.plate.price;
    }, 0);
};

function OrderDetail(plate, quantity) {
    this.plate = plate;
    this.quantity = quantity;
}

const client = new Client(
    'Daniel',
    'dagutmu667@gmail.com',
    'password',
    'Calle 123',
    '123456789'
);
const deliveryPerson = new DeliveryPerson(
    'Pedro',
    'pedro@gmail',
    'password',
    'Moto',
    true
);
const plate = new Plate('Platillo 1', 100, ['ingrediente 1', 'ingrediente 2']);
const restaurant = new Restaurant(
    'Restaurante 1',
    'Calle 123',
    new PhysicalMenu()
);

restaurant.addPlate(plate);

const order = new Order(
    client,
    restaurant,
    [new OrderDetail(plate, 2)],
    'En preparación'
);
console.log(`El total de la orden es: ${order.computeTotal()}`);
