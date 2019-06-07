function buyDrink(id) {
    $.ajax(`drinks/${id}/sell`)
        .done(() => {
            alert("Ost õnnestus")
            var stock = $(`#${id}_drinkStock`);

            stock.text = parseInt(stock.text) - 1
        })
        .fail(() => {
            alert("Ei ole hetkel võimalik osta")
        });
}

function addFillPack(id) {
    $.ajax(`drinks/${id}/fill`)
        .done(() => {
            alert("Täitmine õnnestus")
            var stock = $(`#${id}_drinkStock`);
            var fill = $(`#${id}_drinkFill`);

            stock.text = parseInt(stock.text) - parseInt(fill.text);
        })
        .fail(() => {
            alert("Ei ole hetkel võimalik osta")
        });
}