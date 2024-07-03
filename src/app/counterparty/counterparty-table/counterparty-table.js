import tableHtml from './counterparty-table.template.html';
import deleteButtonHtml from '../common-components/counterparty-delete-button/counterparty-delete-button.template.html';
import './counterparty-table.css'
import CounterpartyRow from "../common-components/counterparty-row/counterparty-row";
import CounterpartyCell from "../common-components/counterparty-cell/counterparty-cell";
import ConfirmDeleteModal from "../common-components/confirm-delete-modal/confirm-delete-modal";
import {counterparties, pubSub} from "../../app";
import CounterpartyCardModal from "../counterparty-card/counterparty-card-modal";

export default class CounterpartyTable {

    #table;
    #tbody;
    #rowTemplate = new CounterpartyRow();
    #cellTemplate = new CounterpartyCell();
    #confirmDeleteModal = new ConfirmDeleteModal();
    #deleteButtonTemplate;
    #counterparties;

    constructor(counterparties) {
        this.#initTableTemplate();
        this.#initDeleteButtonTemplate();
        this.#tbody = document.createElement('tbody');
        this.#counterparties = counterparties;
    }

    render() {
        for (const counterparty of this.#counterparties.values()) {
            const row = this.#rowTemplate.newRow(
                this.#cellTemplate.newTextCell(counterparty.name),
                this.#cellTemplate.newTextCell(counterparty.inn),
                this.#cellTemplate.newTextCell(counterparty.kpp),
                this.#cellTemplate.newTextCell(counterparty.address),
                this.#cellTemplate.newObjectCell(this.#cloneDeleteButton(counterparty.id))
            );
            row.addEventListener('dblclick', (event) => {
                const modal = new CounterpartyCardModal(counterparties, counterparty.id);
                modal.instance.show();
                modal.instance.updateOnHide(() => {
                    if (modal.isSaved) {
                        pubSub.publish('render');
                    }
                })
            });
            this.#tbody.appendChild(row);
        }
        this.#table.appendChild(this.#tbody);
        return this.#table;
    }

    #initTableTemplate() {
        const container = document.createElement('div');
        container.innerHTML = tableHtml;
        this.#table = container.querySelector('table');
    }

    #initDeleteButtonTemplate() {
        const container = document.createElement('div');
        container.innerHTML = deleteButtonHtml;
        this.#deleteButtonTemplate = container.querySelector('button');
    }

    #cloneDeleteButton(counterpartyId) {
        const newDeleteButton = this.#deleteButtonTemplate.cloneNode(true);
        newDeleteButton.addEventListener('click', (event) => {
            this.#confirmDeleteModal.instance.show();
            this.#confirmDeleteModal.instance.updateOnHide(() => {
                if (this.#confirmDeleteModal.isConfirmed()) {
                    this.#counterparties.delete(counterpartyId);
                    pubSub.publish('render');
                }
            });
        });
        return newDeleteButton;
    }
}
