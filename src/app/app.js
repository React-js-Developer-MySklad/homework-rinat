import html from "./app.html";
import './app.css'

const rootElement = document.getElementById('root');
rootElement.innerHTML = html;

class Counterparty {
    constructor(id, name, inn, kpp, address) {
        this.id = id;
        this.name = name;
        this.inn = inn;
        this.kpp = kpp;
        this.address = address;
    }
}

const counterparties = [
    new Counterparty(1, "ООО \"Рога и Копыта\"", 11111111111, 111111111, "улица Пушкина, дом Колотушкина"),
    new Counterparty(2, "ООО \"Зеленоглазое такси\"", 22222222222, 222222222, "улица академика Королёва, 12"),
    new Counterparty(3, "АО \"ГУМ\"", 33333333333, 333333333, "Красная площадь, дом 1"),
];

export {counterparties}
