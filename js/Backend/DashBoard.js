import * as tables from '/js/tables/createTables'

document.addEventListener('DOMContentLoaded', function () {

    $.ajax("/php/requetes/coursDisponibles.php", {
        type: "GET",
        dataType: "json",
        success: function (data) {
            console.log(data);
            $("#horairesCorps").empty();
            let horaires = document.getElementById("horairesCorps");
            for(let i = 0; i < data.length; i++)
            {
                let tr = tables.CreateCoursDisponibleTr(data[i]);
                horaires.appendChild(tr);
            }
        }
    })

});
