export default class CounterpartyCell {

    newTextCell(value = '') {
        const newCell = this.#newEmptyCell();
        newCell.textContent = value;
        return newCell;
    }

    newObjectCell(object) {
        const newCell = this.#newEmptyCell();
        newCell.appendChild(object);
        return newCell;
    }

    #newEmptyCell() {
        const newCell = document.createElement('td');
        newCell.classList.add('counterparty-table-cell');
        return newCell;
    }
}
