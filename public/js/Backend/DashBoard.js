import * as tables from '../tables/createTables'
import {IMMERSION} from "../ajax/requetesajax";
import * as toast from '../toaster/toaster'
import {actionconfig} from "../ajax/requetesconfig";
import {Spinner} from '../spinner.js'

document.addEventListener('DOMContentLoaded', function () {
    let spin = new Spinner();
    //spin.Show();

    actionconfig('', 'GET', initDash, toast.toastrerreur);

    function initDash(data) {
        console.log(data);
        document.querySelector('#horaire-debut').textContent = data.datedebut;
        document.querySelector('#horaire-fin').textContent = data.datefin;

        if(data.force === true)
            document.querySelector('#ouverture').textContent = 'ouvertes';
        else
            document.querySelector('#ouverture').textContent = 'fermées';

    }

    document.getElementById('enableForce').addEventListener('click', function () {
        if(this.checked === true)
            document.querySelector('#ouverture').textContent = 'ouvertes';
        else
            document.querySelector('#ouverture').textContent = 'fermées';
    })


});
