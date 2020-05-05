import {INSCRITS} from '../ajax/requetesajax';
import * as toast from '../toaster/toaster';
import * as tables from '../tables/createTables';

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