const createRow = (rowTemplate) => {
    return rowTemplate.content.children[0].cloneNode(true);
};

const createCell = (cellTemplate, value) => {
    const node = cellTemplate.content.children[0].cloneNode(true);
    node.innerHTML = value;
    return node;
};

export {createRow, createCell};
