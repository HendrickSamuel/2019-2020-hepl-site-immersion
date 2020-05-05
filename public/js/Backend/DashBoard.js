import * as tables from '../tables/createTables'
import {IMMERSION} from "../ajax/requetesajax";
import * as toast from '../toaster/toaster'

document.addEventListener('DOMContentLoaded', function () {

    let champs = [];
    let entete = document.getElementById('entete');
    for(let i = 0; i < entete.children.length; i++)
    {
        let valeur = entete.children[i].getAttribute("data-champ");
        if(valeur != 'none')
            champs.push(valeur);
    }

    IMMERSION.select(function (data) {
        $("#horairesCorps").empty();
        let horaires = document.getElementById("horairesCorps");
        for(let i = 0; i < data.returnval.length; i++)
        {
            let tr = tables.CreateTr(data.returnval[i],champs);
            horaires.appendChild(tr);
        }
    },toast.toastrerreur)
});
