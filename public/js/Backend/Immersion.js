import {COURS, IMMERSION} from '../ajax/requetesajax';
import * as toast from '../toaster/toaster';
import * as tables from '../tables/createTables';
import {Spinner} from '../spinner.js'

document.addEventListener('DOMContentLoaded', function () {
    let spinner = new Spinner();

    let selectedID= -1;
    let toID = -1;
    let count = 0;

    /* ----------- recuperation des entetes pour les colonnes --------------*/
    let champs = [];

    let entete = document.getElementById('entete');
    for(let i = 0; i < entete.children.length; i++)
    {
        let valeur = entete.children[i].getAttribute("data-champ");
        if(valeur != 'none')
            champs.push(valeur);
    }

    /* -------------- initialisation des la table avec ajax --------------------*/
    spinner.Show();
    IMMERSION.select(callback,console.log);

    function callback(data) {
        if(data.result == true)
        {
            for (let i = 0; i < data.returnval.length; i++)
                CreateGestionImmers(data.returnval[i]);
            spinner.Hide();
        }
        else
        {
            toast.toastrerreur(data.message[2]);
            spinner.Hide();
        }
    }

    function CreateGestionImmers(data)
    {
        console.log(data);
        let td;
        let action;
        let tr = tables.CreateTr(data,champs);

        td = document.createElement("td"); // continuer

        let vis = CreateSwitch(data.IDPrincipal, data.visible);
        td.appendChild(vis);
        tr.appendChild(td);

        td = document.createElement("td")
        action = document.createElement("button");
        action.innerText = "rediriger éleves";
        action.addEventListener('click',AfficherRediriger);
        let iconredir = document.createElement("ion-icon");
        iconredir.name = "arrow-redo-outline";
        action.appendChild(iconredir);
        action.classList.add("btn","btn-outline-info","btn-sm","my-1");
        td.appendChild(action);
        tr.appendChild(td);

        td = document.createElement("td")
        action = document.createElement("button");
        action.innerText = "supprimer";
        action.addEventListener('click',AfficherSupprimer);

        let icondel = document.createElement("ion-icon");
        icondel.name = "trash-outline";
        action.appendChild(icondel);
        action.classList.add("btn","btn-outline-danger","btn-sm","my-1");
        td.appendChild(action);
        tr.appendChild(td);

        document.getElementById("tablebody").appendChild(tr);
    }

    function CreateSwitch(id, visible)
    {
        let div = document.createElement("div");
        div.classList.add('onoffswitch');

        let input = document.createElement("input");
        input.type = "checkbox";
        input.name = "onoffswitch"
        input.id = 'switch'+id;

        input.classList.add('onoffswitch-checkbox');
        input.addEventListener('change', ModificationVisibilité)

        if(visible == true)
            input.checked = true;
        else
            input.checked = false;

        div.appendChild(input);

        let label = document.createElement('label');
        label.classList.add('onoffswitch-label');
        label.htmlFor = 'switch'+id;

        let spanon = document.createElement('span');
        spanon.classList.add('onoffswitch-inner');
        let spanoff = document.createElement('span');
        spanoff.classList.add('onoffswitch-switch');

        label.appendChild(spanon);
        label.appendChild(spanoff);

        div.appendChild(label);

        return div;
    }
    
    function ModificationVisibilité() {
        let par = this.closest("tr");
        let id = par.id;
        if(this.checked)
        {
            console.log("check");
            IMMERSION.setVisibility(id, 1, console.log, alert);
        }
        else
        {
            console.log("uncheck");
            IMMERSION.setVisibility(id, 0, console.log, alert);
        }
    }

    function AfficherSupprimer() {
        let par = this.closest("tr");
        selectedID = par.id;
        //todo: mettre le nom et prevenir du nombre de cours qui vont etres supprimes ?
        $('#deleteModal').modal('show');
    }

    document.getElementById('deletebutton').addEventListener('click', function(){
        if(selectedID != -1)
        {
            spinner.Show();
            IMMERSION.supprimer(selectedID,callbackdelete,toast.toastrerreur);
            //COURS.supprimer(selectedID,'',callbackdelete,toast.toastrerreur); //todo: mettre l'intitule pour double verification ?
            $('#deleteModal').modal('hide');
        }
    });

    function callbackdelete(data)
    {
        spinner.Hide();
        if(data.result == true){
            let item = document.getElementById(selectedID);
            toast.toastrsucces(item.children[1].textContent + " a été supprimé");
            item.remove();
            selectedID = -1;
        }
        else
            toast.toastrerreur(data.message);
    }

    /* -------------- REDIRECTION DES ETUDIANTS ----------------*/

    /* -- ajax pour voir si redirection ? -- */
    function AfficherRediriger()
    {
        let id = this.closest('tr').id;
        selectedID = id;
        spinner.Show();
        IMMERSION.selectSimilaires(id, loadRediriger, toast.toastrerreur);
    }


    /* -- affiche le modal et rempli avec les cours similaires ou empeche -- */
    function loadRediriger(data) {
        spinner.Hide();
        if(data.result == true)
        {
            if(data.returnval.length > 0) {
                $('#redirectModal').modal('show');
                console.log(data);
                let modal = document.querySelector('#redirectModal');
                let input = modal.querySelector('#inputCours');
                $(input).empty();

                for (let dat of data.returnval) {
                    let option = document.createElement('option');
                    option.value = dat.IDPrincipal;
                    option.innerHTML = dat.Nom + " " + dat.Intitule;
                    input.appendChild(option);
                }
            }
            else
            {
                $('#redirectModal').modal('hide');
                toast.toastrwarning('Pas de cours correspondant aux criteres de redirection');
            }
        }
        else
        {
            $('#redirectModal').modal('hide');
            toast.toastrerreur(data.message);
        }
    }

    /* -- validation de la redirection -- */
    document.getElementById('redirectForm').addEventListener('submit', Rediriger);
    function Rediriger(e)
    {
        e.preventDefault();
        spinner.Show();
        let id = selectedID;
        let to = document.querySelector('#inputCours').value;
        toID = to;
        $('#redirectModal').modal('hide');
        IMMERSION.move(selectedID, to, CallBackRedirection, toast.toastrerreur);
    }


    /* -- after redirect -- */
    function CallBackRedirection(data) {
        spinner.Hide();
        if(data.result == true)
        {
            count = data.returnval.length;
            let liste = document.querySelector('#afterRedirectUL');
            $(liste).empty();
            for(let dat of data.returnval)
            {
                let ul = document.createElement('ul');
                ul.innerHTML = dat.Nom + " " + dat.Prenom;
                liste.appendChild(ul);
            }
            $('#afterRedirectModal').modal('show');

            let indexdispo = champs.findIndex((element) => element === 'PlacesDisponibles');
            let compte;

            let ancien = document.getElementById(selectedID);
            compte = ancien.children[indexdispo].innerHTML;
            ancien.children[indexdispo].innerHTML = parseInt(compte) + parseInt(count);

            let nouveau = document.getElementById(toID);
            compte = nouveau.children[indexdispo].innerHTML;
            nouveau.children[indexdispo].innerHTML = parseInt(compte) - parseInt(count);

            selectedID = -1;
            toID = -1;
            count = 0;
        }
    }

    /* ------------------- FIN ------------------------------*/


});