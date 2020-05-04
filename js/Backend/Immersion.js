import {IMMERSION} from '/js/ajax/requetesajax';
import * as toast from '/js/toaster/toaster';
import * as tables from '/js/tables/createTables';

document.addEventListener('DOMContentLoaded', function () {
    //IMMERSION.ajouter(2,1,'2000/01/01',1,10,'08h30','10h30',1,'labo',callback,console.log);

    //IMMERSION.supprimer(2,1,'2000/01/01',1,console.log,console.log);
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
        let tr = tables.CreateCoursDisponibleTr(data);

        let td = document.createElement("td");
        td.innerText = data.PlageHoraire;

        tr.insertBefore(td,tr.children[3]);

        document.getElementById("tablebody").appendChild(tr);
    }
});