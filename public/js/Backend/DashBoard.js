import * as tables from '../tables/createTables'
import {IMMERSION} from "../ajax/requetesajax";
import * as toast from '../toaster/toaster'
import {actionconfig} from "../ajax/requetesconfig";
import {Spinner} from '../spinner.js'
import {setHoraire} from "../ajax/ajaxInscritAleatoire";

document.addEventListener('DOMContentLoaded', function () {
    let spin = new Spinner();
    //spin.Show();
    let params = null;

    //#region EventsListeners
    document.getElementById('DateFin').addEventListener('input', function (e) {
        let reg = /[0-9]{2}-[0-9]{2}-[0-9]{4}/
        verifFormatDate(reg, e);
    })

    document.getElementById('DateDebut').addEventListener('input', function (e) {
        let reg = /[0-9]{2}-[0-9]{2}-[0-9]{4}/
        verifFormatDate(reg, e);
    })

    document.getElementById('btnValid').addEventListener('click', function () {
        actionconfig(params, 'SET', initDash, toast.toastrerreur);
        HighligthButton(false);
    })
    //#endregion

    actionconfig('', 'GET', initDash, toast.toastrerreur);

    function initDash(data) {
        params = data;

        console.log(data);
        document.querySelector('#horaire-debut').textContent = data.datedebut;
        document.querySelector('#horaire-fin').textContent = data.datefin;

        document.querySelector('#DateDebut').value = data.datedebut;
        document.querySelector('#DateFin').value = data.datefin;

        if(data.force === true)
        {
            document.querySelector('#ouverture').textContent = 'Ouvertes forcée';
            let checkbox = document.getElementById('enableForce');
            checkbox.checked = true;
        }
        else
        {
            if(data.periodeInscription === true)
                document.querySelector('#ouverture').textContent = 'Ouvertes';
            else
                document.querySelector('#ouverture').textContent = 'Fermées';
        }
    }

    function HighligthButton(state)
    {
        let btn = document.getElementById('btnValid');
        if(state === true)
        {
            btn.classList.add('btn-warning');
        }
        else
        {
            btn.classList.remove('btn-warning');
        }
    }

    document.getElementById('enableForce').addEventListener('click', function () {
        HighligthButton(true);
        if(this.checked === true)
        {
            params.force = true;
            document.querySelector('#ouverture').textContent = 'ouverture forcée';
        }
        else
        {
            params.force = false;

            if(params.ouvertureNaturelle == true)
            {
                document.querySelector('#ouverture').textContent = 'Ouvertes';
            }
            else
            {
                document.querySelector('#ouverture').textContent = 'Fermées';
            }
        }

    })

    function verifFormatDate(reg, e) {
        let texte = e.target.value;

        if(reg.test(texte) === true){
            HighligthButton(true);

            e.target.classList.add('border-success');
            e.target.classList.remove('border-danger');
            switch (e.target.name) {
                case 'datedebut': params.datedebut = texte;
                    break;
                case 'datefin': params.datefin = texte;
                    break;
            }
        }
        else{
            e.target.classList.add('border-danger');
            e.target.classList.remove('border-success');
        }

    }
});
