import html from "./counterparty-card-modal.html";
import './counterparty-card-modal.css'
import {Modal} from "flowbite";

export default class CounterpartyCardModal {

    #confirmed = false;

    constructor() {
        const rootCounterpartyCardModal = document.getElementById('counterparty-card-modal');
        rootCounterpartyCardModal.innerHTML = html;
        this.instance = new Modal(rootCounterpartyCardModal, {backdrop: 'dynamic'},
            {id: 'counterparty-card-modal', override: true});
        const createCounterpartyButton = document.getElementById('create-counterparty-button');
        createCounterpartyButton.addEventListener('click', () => {
            this.instance.show();
        });
        const saveButton = rootCounterpartyCardModal.querySelector('button[class="regular-button"]');
        saveButton.addEventListener('click', (event) => {
            this.#confirmed = true;
            this.instance.hide();
        });
        const cancelButton = rootCounterpartyCardModal.querySelector('button[class="cancel-button"]');
        cancelButton.addEventListener('click', (event) => {
            this.#confirmed = false;
            this.instance.hide();
        });
    }
}
