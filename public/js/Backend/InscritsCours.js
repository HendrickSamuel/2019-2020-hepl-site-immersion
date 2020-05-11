import {INSCRITS} from '../ajax/requetesajax';
import * as toast from '../toaster/toaster';
import {Eleve} from "./VueEleve";
import * as tables from '../tables/createTables';

document.addEventListener('DOMContentLoaded', function () {
    INSCRITS.selectAll(callback,console.log);

    let eleves = [];
    let tableau = {};

    /*
    let jour = document.querySelector("#templateTable");

    let clone = document.importNode(template.content, true);
    let jourclone = document.importNode(jour.content, true);

    clone.querySelector(".card-content").appendChild(jourclone);
    document.querySelector("#a").appendChild(clone);*/

    function callback(data) {
        if(data.result == true)
        {
            console.log(data);
            let entrees = data.returnval;

            for(let [key, e] of Object.entries(entrees))
            {
                if(!(e.Etudiant in tableau))
                {
                    tableau[e.Etudiant] = {};
                }

                if(!(e.Date in tableau[e.Etudiant]))
                {
                    tableau[e.Etudiant][e.Date] = [];
                }
                tableau[e.Etudiant][e.Date].push(e);
            }
            console.log(tableau);

            for(let [key, eleve] of Object.entries(tableau))
            {
                /*console.log(eleve);
                let el = new Eleve(eleve);
                el.Render();
                eleves.push(el);
                console.log(el);*/
            }
        }
        else
        {
            toast.toastrerreur(data.message[2]);
        }

    }




});