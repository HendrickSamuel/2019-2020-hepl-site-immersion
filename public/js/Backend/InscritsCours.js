import {INSCRITS} from '../ajax/requetesajax';
import * as toast from '../toaster/toaster';
import {Eleve} from "./VueEleve";
import * as tables from '../tables/createTables';

document.addEventListener('DOMContentLoaded', function () {
    INSCRITS.selectAll(callback,console.log);

    let eleves = [];
    let tableau = {};

    initAlphabet();

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
                let el = new Eleve(key,eleve);
                //el.Render();
                eleves.push(el);
                console.log(el);
            }
        }
        else
        {
            toast.toastrerreur(data.message[2]);
        }

    }

    function initAlphabet()
    {
        for (let i = 0; i < 26; i++) {
            let div = document.createElement("div");
            let p = document.createElement("p");
            div.appendChild(p);
            $(div).hide();
            let lettre = (i+10).toString(36)+"";
            lettre = lettre.toUpperCase();
            p.innerHTML = lettre
            div.id = 'lettre'+lettre;
            p.style.display = "inline";
            document.querySelector('.liste').appendChild(div);
        }
    }



});