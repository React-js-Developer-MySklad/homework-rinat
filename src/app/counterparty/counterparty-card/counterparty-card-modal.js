import html from "./counterparty-card-modal.html";
import './counterparty-card-modal.css'
import {Modal} from "flowbite";
import Counterparty from "../../domain/counterparty";
import sequence from "../../infrastructure/sequence";

export default class CounterpartyCardModal {

    #saved = false;
    #counterparties;
    #html;
    #id;
    #nameField;
    #innField;
    #kppField;
    #addressField;
    #fieldRegularClasses = [
        'counterparty-card-modal-form-input',
        'focus:ring-primary-600', 'focus:border-primary-600',
        'dark:focus:ring-primary-500', 'dark:focus:border-primary-500'
    ];
    #fieldErrorClasses = [
        'counterparty-card-modal-form-input-error', 'focus:ring-red-500', 'focus:border-red-500'
    ];

    constructor(counterparties, id = null) {
        this.#counterparties = counterparties;
        this.#id = id;
        this.#html = document.getElementById('counterparty-card-modal');
        this.#html.innerHTML = html;
        this.instance = new Modal(this.#html, {backdrop: 'dynamic'},
            {id: 'counterparty-card-modal', override: true});
        this.#nameField = this.#applyRegular(this.#html.querySelector('input[name="name"]'));
        this.#nameField.addEventListener('blur', (event) => {
            this.#validateName();
        });
        this.#innField = this.#applyRegular(this.#html.querySelector('input[name="inn"]'));
        this.#innField.addEventListener('blur', (event) => {
            this.#validateInn();
        });
        this.#kppField = this.#applyRegular(this.#html.querySelector('input[name="kpp"]'));
        this.#kppField.addEventListener('blur', (event) => {
            this.#validateKpp();
        });
        this.#addressField = this.#applyRegular(this.#html.querySelector('textarea[name="address"]'));
        this.#addressField.addEventListener('blur', (event) => {
            this.#validateAddress();
        });
        if (!this.#isNewCounterparty()) {
            const currentCounterparty = this.#counterparties.get(this.#id);
            this.#nameField.value = currentCounterparty.name;
            this.#innField.value = currentCounterparty.inn;
            this.#kppField.value = currentCounterparty.kpp;
            this.#addressField.value = currentCounterparty.address;
        }
        this.#initSaveButton(counterparties);
        this.#initCancelButton();
    }

    #initSaveButton() {
        const saveButton = this.#html.querySelector('button[class="regular-button"]');
        saveButton.addEventListener('click', (event) => {
            if (!this.#isDataValid()) {
                this.#validateData();
                return;
            }
            if (this.#isNewCounterparty()) {
                const nextId = sequence.getCurrentAndIncrement();
                this.#counterparties.set(nextId, new Counterparty(nextId, this.#nameField.value, this.#innField.value,
                    this.#kppField.value, this.#addressField.value));
            } else {
                const currentCounterparty = this.#counterparties.get(this.#id);
                currentCounterparty.name = this.#nameField.value;
                currentCounterparty.inn = this.#innField.value;
                currentCounterparty.kpp = this.#kppField.value;
                currentCounterparty.address = this.#addressField.value;
            }
            this.#saved = true;
            this.instance.hide();
        });
    }

    #initCancelButton() {
        const cancelButton = this.#html.querySelector('button[class="cancel-button"]');
        cancelButton.addEventListener('click', (event) => {
            this.#saved = false;
            this.instance.hide();
        });
    }

    #isNewCounterparty() {
        return this.#id === null;
    }

    #isDataValid() {
        return this.#isNameValid()
            && this.#isInnValid()
            && this.#isKppValid()
            && this.#isAddressValid();
    }

    #isNameValid() {
        return /.+/.test(this.#nameField.value);
    }

    #isInnValid() {
        return /^\d{11}$/.test(this.#innField.value);
    }

    #isKppValid() {
        return /^\d{7}$/.test(this.#kppField.value);
    }

    #isAddressValid() {
        return /.+/.test(this.#addressField.value);
    }

    #validateData() {
        this.#validateName();
        this.#validateInn();
        this.#validateKpp();
        this.#validateAddress();
    }

    #validateName() {
        if (this.#isNameValid()) {
            this.#nameField = this.#applyRegular(this.#nameField);
        } else {
            this.#nameField = this.#applyError(this.#nameField, 'Наименование контрагента не должно быть пустым');
        }
    }

    #validateInn() {
        if (this.#isInnValid()) {
            this.#innField = this.#applyRegular(this.#innField);
        } else {
            this.#innField = this.#applyError(this.#innField, 'ИНН должен содержать 11 цифр');
        }
    }

    #validateKpp() {
        if (this.#isKppValid()) {
            this.#kppField = this.#applyRegular(this.#kppField);
        } else {
            this.#kppField = this.#applyError(this.#kppField, 'КПП должен содержать 7 цифр');
        }
    }

    #validateAddress() {
        if (this.#isAddressValid()) {
            this.#addressField = this.#applyRegular(this.#addressField);
        } else {
            this.#addressField = this.#applyError(this.#addressField, 'Адрес контрагента не должен быть пустым');
        }
    }

    #applyRegular(field) {
        this.#fieldErrorClasses
            .forEach((value) => field.classList.remove(value));
        this.#fieldRegularClasses
            .forEach((value) => field.classList.add(value));
        const nextSibling = field.nextSibling;
        if (nextSibling) {
            field.parentElement.removeChild(nextSibling);
        }
        return field;
    }

    #applyError(field, message) {
        this.#fieldRegularClasses
            .forEach((value) => field.classList.remove(value));
        this.#fieldErrorClasses
            .forEach((value) => field.classList.add(value));
        const nextSibling = field.nextSibling;
        if (nextSibling) {
            field.parentElement.removeChild(nextSibling);
        }
        this.#applyErrorMessage(field, message);
        return field;
    }

    #applyErrorMessage(field, message) {
        field.insertAdjacentHTML('afterend',
            `<p class="mt-2 text-sm text-red-600 dark:text-red-500">${message}</p>`);
    }

    get isSaved() {
        return this.#saved;
    }
}
