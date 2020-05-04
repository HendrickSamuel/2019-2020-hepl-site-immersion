import {INSCRITS} from '/js/ajax/requetesajax';
import * as toast from '/js/toaster/toaster';
import * as tables from '/js/tables/createTables';

document.addEventListener('DOMContentLoaded', function () {
    INSCRITS.select(callback,console.log);

    function callback(data) {
        if(data.result == true)
        {
            console.log(data);
        }
        else
        {
            toast.toastrerreur(data.message[2]);
        }
    }
});