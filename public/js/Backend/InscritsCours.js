import {INSCRITS} from '../ajax/requetesajax';
import * as toast from '../toaster/toaster';
//import {Eleve} from "./VueEleve";
import * as Eleves from './ClassEleve';
import * as tables from '../tables/createTables';

document.addEventListener('DOMContentLoaded', function () {
    INSCRITS.selectAll(callback,console.log);

    let eleves = {};
    let tableau = {};
    let divs = [];

    initAlphabet();

    document.getElementById('InputNom').addEventListener('input', function (e) {
        let texte = e.target.value;
        let reg = /^[a-zA-Z]{1}$/;
        if(texte.length === 0)
        {
            ShowAllNotEmpty();
        }
        else
        {
            if(reg.test(texte) === true){
                e.target.classList.add('border-success');
                e.target.classList.remove('border-danger');
                ShowLetter(texte.toUpperCase());
            }
            else{
                e.target.classList.add('border-danger');
                e.target.classList.remove('border-success');
                ShowAllNotEmpty();
            }
        }

    })

    function ShowLetter(lettre)
    {
        for(let i in divs)
        {
            if(divs[i].id === 'lettre'+lettre)
                $(divs[i]).show();
            else
                $(divs[i]).hide();

        }
    }

    function ShowAllNotEmpty()
    {
        for(let i in divs)
        {
            if(divs[i].children.length > 1)
                $(divs[i]).show();
        }
    }

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
                let el = new Eleves.Eleve(key, eleve, deleteEleve, showConfirm, Canceldelete);
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
    
    function showConfirm() {
        let obj = this.closest('.card');
        let eleve = eleves[obj.id];
        eleve.ShowDelete();
    }
    
    function Canceldelete() {
        let obj = this.closest('.card');
        let eleve = eleves[obj.id];
        eleve.CancelDelete();
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
            p.classList.add('display-4', 'underline');
            div.id = 'lettre'+lettre;
            divs.push(div);
            p.style.display = "inline";
            document.querySelector('.liste').appendChild(div);
        }
    }

});