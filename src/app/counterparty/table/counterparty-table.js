import html from "./counterparty-table.template.html";
import './counterparty-table.css'
import {counterparties} from "../../app";
import {createCell, createRow} from "./counterparty-table-utils";

const htmlTemplates = document.createElement('div');
htmlTemplates.innerHTML = html;

const table = htmlTemplates.querySelector('table');
const tbody = document.createElement('tbody');
const rowTemplate = htmlTemplates.querySelector('template[id = "counterparty-table-row"]');
const cellTemplate = htmlTemplates.querySelector('template[id = "counterparty-table-cell"]');

for (const counterparty of counterparties) {
    const row = createRow(rowTemplate);
    row.appendChild(createCell(cellTemplate, counterparty.name));
    row.appendChild(createCell(cellTemplate, counterparty.inn));
    row.appendChild(createCell(cellTemplate, counterparty.kpp));
    row.appendChild(createCell(cellTemplate, counterparty.address));
    row.appendChild(createCell(cellTemplate, 'Удалить'));
    tbody.appendChild(row);
}

const counterpartyTableContainer = document.getElementById('counterparty-table-container');
table.appendChild(tbody);
counterpartyTableContainer.appendChild(table);
