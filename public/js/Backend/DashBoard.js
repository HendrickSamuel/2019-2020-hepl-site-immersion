import * as tables from '../tables/createTables'
import {IMMERSION} from "../ajax/requetesajax";
import * as toast from '../toaster/toaster'
import {actionconfig} from "../ajax/requetesconfig";
import {Spinner} from '../spinner.js'

document.addEventListener('DOMContentLoaded', function () {
    let spin = new Spinner();
    //spin.Show();
    let params = {};

    actionconfig('', 'GET', initDash, toast.toastrerreur);

    function initDash(data) {
        params = data;

        console.log(data);
        document.querySelector('#horaire-debut').textContent = data.datedebut;
        document.querySelector('#horaire-fin').textContent = data.datefin;

        if(data.force === true)
        {
            document.querySelector('#ouverture').textContent = 'ouverture forcée';
            let checkbox = document.getElementById('enableForce');
            checkbox.checked = true;
        }
        else
        {
            document.querySelector('#ouverture').textContent = '';
        }
    }

    document.getElementById('enableForce').addEventListener('click', function () {
        if(this.checked === true)
            document.querySelector('#ouverture').textContent = 'ouverture forcée';
        else
            if(params.ouvertureNaturelle == true)
                document.querySelector('#ouverture').textContent = 'Ouvertes';
            else
                document.querySelector('#ouverture').textContent = 'Fermées';

    })


});
