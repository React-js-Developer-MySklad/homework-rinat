export default class CounterpartyRow {
    newRow(...cells) {
        const newRow = document.createElement('tr');
        newRow.classList.add('counterparty-table-row');
        newRow.style.cursor = 'pointer';
        cells.forEach(cell => {
            newRow.appendChild(cell);
        });
        return newRow;
    }
}
