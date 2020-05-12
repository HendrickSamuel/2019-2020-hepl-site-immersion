import {ELEVES} from '../ajax/requetesajax';

export function Eleve(id, jours) {
    this.clone = document.importNode(document.querySelector("#templateEleve").content, true); // clonage du template dans le HTML
    this.corps = this.clone.querySelector('.card');
    this.id = id;
    this.corps.id = 'eleve'+this.id; // faire autre part ?

    this.lettre = 'X';

    this.entete = this.corps.querySelector('.data-entete');

    this.tables = this.corps.querySelector('.data-horaires');

    this.Render = function () {
        let section = document.querySelector("#lettre"+this.lettre);
        $(section).show();
        section.appendChild(this.corps);
    }

    this.initData = function (data) {
        this.entete.innerHTML = data.returnval[0].Nom + ' ' + data.returnval[0].Prenom;
        this.lettre = (data.returnval[0].Nom.charAt(0)).toUpperCase();

        this.Render();
        console.log(this.lettre);
    }

    this.getInfo = function(obj){
        console.log('ID: ' + obj.id);
        $.ajax("/php/requetes/requetesEleves.php", {
            type: "POST",
            data: {
                ID: obj.id,
                action: 'SELECTID'
            },
            dataType: "json",
            success: function (data) {
                obj.initData(data);
                console.log('ok');
            },
            error: function () {
                console.log("request failed");
            }
        })
    }

    this.getInfo(this); //appel a la fonction

    this.addHoraire = function (date, journee) {
        let infos = ['PlageHoraire','Nom','Intitule','type','Local'];
        console.log(journee);
        journee.sort(function(a, b) {
            return a.PlageHoraire - b.PlageHoraire;
        });

        let jourtemplate = document.querySelector("#templateTable");
        let jour = document.importNode(jourtemplate.content, true);

        jour.querySelector(".data-date").innerHTML = date;
        let table = jour.querySelector(".data-tbody");

        for (let [key, value] of Object.entries(journee)) {
            let tr = document.createElement("tr");

            for(let info of infos)
            {
                let td = document.createElement('td');
                td.innerHTML = value[info];
                tr.appendChild(td);
            }
            table.appendChild(tr);
        }

        this.tables.appendChild(jour);
    }



    for (let [key, value] of Object.entries(jours)) {
       this.addHoraire(key, value);
    }


}