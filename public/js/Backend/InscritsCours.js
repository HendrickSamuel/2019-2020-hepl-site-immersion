import {INSCRITS} from '../ajax/requetesajax';
import * as toast from '../toaster/toaster';
//import {Eleve} from "./VueEleve";
import * as test from './ClassEleve';
import * as tables from '../tables/createTables';

document.addEventListener('DOMContentLoaded', function () {
    INSCRITS.selectAll(callback,console.log);

    let eleves = {};
    let tableau = {};

    initAlphabet();

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

            for(let [key, eleve] of Object.entries(tableau))
            {
                let el = new test.Eleve(key, eleve, deleteEleve);
                if(!('eleve'+key in eleves))
                    eleves['eleve'+key] = el;
                else
                    alert('doublon eleve');
            }
        }
        else
        {
            toast.toastrerreur(data.message[2]);
        }

    }
    
    function deleteEleve() {
        let obj = this.closest('.card');
        let eleve = eleves[obj.id];
        eleve.Delete();
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