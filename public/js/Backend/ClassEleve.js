import * as toast from './../toaster/toaster';

export class Eleve {
    constructor(id, jours, deleteCallBack) {
        this.id = id;
        this.horaire = jours;

        this.clone = document.importNode(document.querySelector("#templateEleve").content, true); // clonage du template dans le HTML
        this.corps = this.clone.querySelector('.card');
        this.corps.id = 'eleve'+this.id; // retrouver dans le html

        this.lettre = 'X';
        this.entete = this.corps.querySelector('.data-entete');
        this.tables = this.corps.querySelector('.data-horaires');
        this.btndelete = this.corps.querySelector('.data-delete');

        this.deleteCallBack = deleteCallBack;

        this.GetContentByID(); // remplire le contenu
        //this.Render(); -- fait quand les infos de base sont chargées

        for (let [key, value] of Object.entries(this.horaire)) {
            this.AddDay(key, value);
        }

        this.AddEventListeners();
    }

    AddEventListeners()
    {
        this.btndelete.addEventListener('click', this.deleteCallBack)
    }

    Render(){
        let section = document.querySelector("#lettre"+this.lettre);
        $(section).show();
        section.appendChild(this.corps);
    }

    GetContentByID() {
        let obj = this;
        $.ajax("/php/requetes/requetesEleves.php", {
            type: "POST",
            data: {
                ID: obj.id,
                action: 'SELECTID'
            },
            dataType: "json",
            success: function (data) {
                obj.SetContent(data);
            },
            error: function () {
                console.log("request failed");
            }
        })
    }

    SetContent(data)
    {
        console.log(data);
        if(data.result == true)
        {
            let donnees = data.returnval[0];
            this.entete.innerHTML = donnees.Nom + " " + donnees.Prenom;
            this.lettre = (donnees.Nom.charAt(0)).toUpperCase();

            let lien = this.corps.querySelector(".data-attestationEtudiant");
            lien.href = '/Backend/Export/ExportPdf.php?etudiant=' + this.id;

            this.Render();
        }
        else
        {
            this.entete.innerHTML = 'Erreur: ' + data.message;
        }
    }

    AddDay(date, journee){
        let infos = ['PlageHoraire','Nom','Intitule','type','Local'];
        journee.sort(function(a, b) {
            return a.PlageHoraire - b.PlageHoraire;
        });

        let jourtemplate = document.querySelector("#templateTable");
        let jour = document.importNode(jourtemplate.content, true);

        let lien = jour.querySelector(".data-attestationjour");
        lien.href = '/Backend/Export/ExportPdf.php?date=' + date + '&etudiant=' + this.id;

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

    Delete(){
        let obj = this;
        $.ajax("/php/requetes/requetesEleves.php", {
            type: "POST",
            data: {
                ID: obj.id,
                action: 'DELETE'
            },
            dataType: "json",
            success: function (data) {
                    obj.DeleteCallBack(data);
            },
            error: function () {
                alert('request failed');
            }
        })
    }

    DeleteCallBack(data){
        console.log(data);
        if(data.result == true)
        {
            this.corps.remove();
        }
        else
        {
            toast.toastrerreur('supression impossible');
        }
    }


}