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
                let tr = document.createElement("tr");

                let intitule = document.createElement("td");
                intitule.innerText = data[i].Intitule;
                tr.appendChild(intitule);

                let professeur = document.createElement("td");
                professeur.innerText = data[i].Professeur;
                tr.appendChild(professeur);

                let date = document.createElement("td");
                date.innerText = data[i].Date;
                tr.appendChild(date);

                let hdebut = document.createElement("td");
                hdebut.innerText = data[i].HeureDebut;
                tr.appendChild(hdebut);

                let hfin = document.createElement("td");
                hfin.innerText = data[i].HeureFin;
                tr.appendChild(hfin);

                let pdispos = document.createElement("td");
                pdispos.innerText = data[i].PlacesTotal;
                tr.appendChild(pdispos);

                let ptotales = document.createElement("td");
                ptotales.innerText = data[i].PlacesDisponibles;
                tr.appendChild(ptotales);

                horaires.appendChild(tr);



            }
        }
    })

});
