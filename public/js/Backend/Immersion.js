import {IMMERSION} from '../ajax/requetesajax';
import * as toast from '../toaster/toaster';
import * as tables from '../tables/createTables';

document.addEventListener('DOMContentLoaded', function () {
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
        let tr = tables.CreateTr(data,champs);
        document.getElementById("tablebody").appendChild(tr);
    }

});