import {IMMERSION} from '/js/ajax/requetesajax';
import * as toast from '/js/toaster/toaster';

document.addEventListener('DOMContentLoaded', function () {
    IMMERSION.ajouter(2,1,'2000/01/01',1,10,'08h30','10h30',1,'labo',callback,console.log);
    //IMMERSION.supprimer(2,1,'2000/01/01',1,console.log,console.log);
    IMMERSION.select(callback,console.log);

    function callback(data) {
        if(data.result == true)
        {
            console.log(data);
            //toast.toastrsucces(data);
        }
        else
        {
            toast.toastrerreur(data.message[2]);
        }
    }
});