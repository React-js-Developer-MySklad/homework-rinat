import html from "./app.html";
import './app.css'
import Counterparty from "./domain/counterparty";
import PubSub from './infrastructure/pubsub';
import Sequence from "./infrastructure/sequence";
import CounterpartyTable from "./counterparty/counterparty-table/counterparty-table";
import CounterpartyCardModal from "./counterparty/counterparty-card/counterparty-card-modal";

const pubSub = new PubSub();
const sequence = new Sequence();

document.getElementById('root').innerHTML = html;

const counterparties = new Map();
counterparties.set(sequence.getCurrent(), new Counterparty(sequence.getCurrentAndIncrement(), "ООО \"Рога и Копыта\"", 11111111111, 111111111, "улица Пушкина, дом Колотушкина"));
counterparties.set(sequence.getCurrent(), new Counterparty(sequence.getCurrentAndIncrement(), "ООО \"Зеленоглазое такси\"", 22222222222, 222222222, "улица академика Королёва, 12"));
counterparties.set(sequence.getCurrent(), new Counterparty(sequence.getCurrentAndIncrement(), "АО \"ГУМ\"", 33333333333, 333333333, "Красная площадь, дом 1"));

const counterpartyTableContainer = document.getElementById('counterparty-table-container');
let counterpartiesTable = new CounterpartyTable(counterparties).render();
counterpartyTableContainer.appendChild(counterpartiesTable);

const counterpartyCardModal = new CounterpartyCardModal();
// todo: implement add/edit counterparty

pubSub.subscribe((eventType) => {
    if (eventType === 'render') {
        counterpartyTableContainer.removeChild(counterpartiesTable);
        counterpartiesTable = new CounterpartyTable(counterparties).render();
        counterpartyTableContainer.appendChild(counterpartiesTable);
    }
});

export {counterparties, pubSub};
