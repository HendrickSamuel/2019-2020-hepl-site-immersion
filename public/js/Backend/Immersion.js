import {COURS, IMMERSION} from '../ajax/requetesajax';
import * as toast from '../toaster/toaster';
import * as tables from '../tables/createTables';

document.addEventListener('DOMContentLoaded', function () {
    let selectedID= -1;

    let champs = [];

    let entete = document.getElementById('entete');
    for(let i = 0; i < entete.children.length; i++)
    {
        let valeur = entete.children[i].getAttribute("data-champ");
        if(valeur != 'none')
            champs.push(valeur);
    }

    //IMMERSION.ajouter(2,1,'2000/01/01',1,10,'08h30','10h30',1,'labo',callback,console.log);

    IMMERSION.select(callback,console.log);

    function callback(data) {
        if(data.result == true)
        {
            console.log(data);
            for (let i = 0; i < data.returnval.length; i++)
                CreateGestionImmers(data.returnval[i]);
        }
        else
        {
            toast.toastrerreur(data.message[2]);
        }
    }

    function CreateGestionImmers(data)
    {
        let td;
        let action;
        let tr = tables.CreateTr(data,champs);

        td = document.createElement("td");
        action = document.createElement("input");
        action.type = "checkbox";
        action.addEventListener('change', ModificationVisibilité)
        if(data.visible == true)
            action.checked = true;
        else
            action.checked = false;
        // add event listener
        td.appendChild(action);
        tr.appendChild(td);

        td = document.createElement("td")
        action = document.createElement("button");
        action.innerText = "rediriger éleves";
        action.addEventListener('click',AfficherRediriger);
        let iconredir = document.createElement("ion-icon");
        iconredir.name = "arrow-redo-outline";
        action.appendChild(iconredir);
        action.classList.add("btn","btn-outline-info","btn-sm","my-1");
        td.appendChild(action);
        tr.appendChild(td);

        td = document.createElement("td")
        action = document.createElement("button");
        action.innerText = "supprimer";
        action.addEventListener('click',AfficherSupprimer);

        let icondel = document.createElement("ion-icon");
        icondel.name = "trash-outline";
        action.appendChild(icondel);
        action.classList.add("btn","btn-outline-danger","btn-sm","my-1");
        td.appendChild(action);
        tr.appendChild(td);

        document.getElementById("tablebody").appendChild(tr);
    }
    
    function ModificationVisibilité() {
        if(this.checked)
        {
            console.log("check");
        }
        else
        {
            console.log("uncheck");
        }
    }

    function AfficherSupprimer() {
        let par = this.closest("tr");
        selectedID = par.id;
        //todo: mettre le nom et prevenir du nombre de cours qui vont etres supprimes ?
        $('#deleteModal').modal('show');
    }

    document.getElementById('deletebutton').addEventListener('click', function(){
        if(selectedID != -1)
        {
            IMMERSION.supprimer(selectedID,callbackdelete,toast.toastrerreur);
            //COURS.supprimer(selectedID,'',callbackdelete,toast.toastrerreur); //todo: mettre l'intitule pour double verification ?
            $('#deleteModal').modal('hide');
        }
    });

    function callbackdelete(data)
    {
        console.log(data);
        if(data.result == true){
            let item = document.getElementById(selectedID);
            toast.toastrsucces(item.children[1].textContent + " a été supprimé");
            item.remove();
            selectedID = -1;
        }
        else
            toast.toastrerreur(data.message);
    }

    function AfficherRediriger()
    {

    }

});