export default class CounterpartyCell {

    newTextCell(value = '') {
        const newCell = this.#createEmptyCell();
        newCell.textContent = value;
        return newCell;
    }

    newObjectCell(object) {
        const newCell = this.#createEmptyCell();
        newCell.appendChild(object);
        return newCell;
    }

    #createEmptyCell() {
        const newCell = document.createElement('td');
        newCell.classList.add('counterparty-table-cell');
        return newCell;
    }
}
