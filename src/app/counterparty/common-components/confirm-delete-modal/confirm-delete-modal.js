import confirmDeleteModalHtml from './confirm-delete-modal.html';
import './confirm-delete-modal.css';
import {Modal} from 'flowbite';

export default class ConfirmDeleteModal {

    #confirmed = false;

    constructor() {
        const rootConfirmDeleteModal = document.getElementById('confirm-delete-modal');
        rootConfirmDeleteModal.innerHTML = confirmDeleteModalHtml;
        this.instance = new Modal(rootConfirmDeleteModal, {backdrop: 'dynamic'},
            {id: 'confirm-delete-modal', override: true});
        const confirmDeleteButton = rootConfirmDeleteModal.querySelector('button[class="danger-button"]');
        confirmDeleteButton.addEventListener('click', (event) => {
            this.#confirmed = true;
            this.instance.hide();
        });
        const cancelButton = rootConfirmDeleteModal.querySelector('button[class="cancel-button"]');
        cancelButton.addEventListener('click', (event) => {
            this.#confirmed = false;
            this.instance.hide();
        });
    }

    isConfirmed() {
        return this.#confirmed;
    }
}
