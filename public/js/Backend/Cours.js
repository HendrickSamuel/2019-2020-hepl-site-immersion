import {COURS} from '../ajax/requetesajax';
import * as toast from '../toaster/toaster';
import * as tables from '../tables/createTables';
import {Spinner} from '../spinner.js'

document.addEventListener('DOMContentLoaded', function () {
    let spin = new Spinner();

    let selectedID = 0;

    /* ------------------ recupération des colonnes à remplir -------------------- */
    let champs = [];
    let entete = document.getElementById('entete');
    for(let i = 0; i < entete.children.length; i++)
    {
        let valeur = entete.children[i].getAttribute("data-champ");
        if(valeur != 'none')
            champs.push(valeur);
    }

    /* ---------------- REQUETE ajax pour init table --------------------*/
    spin.Show();
    COURS.select(initCours,toast.toastrerreur);

    function initCours(val)
    {
        if(val.result == true)
        {
            if(val.action == "SELECT")
            {
                for(let i = 0; i < val.returnval.length; i++ )
                {
                    CreateGestionCourse(val.returnval[i]);
                }
                $("#CourseTable").tablesorter({ sortList: [[0,0]] });
                spin.Hide();
            }
        }
        else
        {
            spin.Hide();
            toast.toastrerreur(val.message);
        }
    }

    function CreateGestionCourse(data)
    {
        let action;
        let td;

        let tr = tables.CreateTr(data,champs);

        td = document.createElement("td")
        action = document.createElement("button");
        action.innerText = "modifier";
        action.addEventListener('click',AfficherModifier);
        let iconedit = document.createElement("ion-icon");
        iconedit.name = "create-outline";
        action.appendChild(iconedit);
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

        document.getElementById('tablebody').appendChild(tr);
    }

    //affiche le modal de modification
    function AfficherModifier()
    {
        let par = this.closest("tr");
        selectedID = par.id;
        let input = document.getElementById('updateinputnom').value = document.getElementById(selectedID).children[1].innerHTML;
        $('#updateModal').modal('show');
    }

    //click sur validation de mofification
    document.getElementById('updateForm').addEventListener('submit', function(e){
        e.preventDefault();
        spin.Show();
        let input = document.getElementById('updateinputnom');
        COURS.modifier(selectedID,input.value,callbackupdate,toast.toastrerreur);
        $('#updateModal').modal('hide');
    })

    // retour de la mise a jour
    function callbackupdate(data) {
        spin.Hide();

        if(data.result == true)
        {
            let input = document.getElementById('updateinputnom');
            document.getElementById(selectedID).children[1].innerHTML = input.value; //todo: plutot prendre la valeur de retour
            toast.toastrsucces(input.value + " modifié");
            input.value = '';
        }
        else
        {
            toast.toastrerreur(data.message);
        }
    }

    //affiche le modal supression
    function AfficherSupprimer() {
        let par = this.closest("tr");
        let index = champs.findIndex((element) => element === 'Intitule');
        selectedID = par.id;
        document.querySelector('#deleteModal').querySelector('.data-delete').innerHTML=par.children[index].textContent;
        $('#deleteModal').modal('show');
    }

    //action de supression
    document.getElementById('deletebutton').addEventListener('click', function(){
        if(selectedID != 0)
        {
            COURS.supprimer(selectedID,'',callbackdelete,toast.toastrerreur); //todo: mettre l'intitule pour double verification ?
            $('#deleteModal').modal('hide');
        }
    });

    function callbackdelete(data)
    {
        let item = document.getElementById(selectedID);
        toast.toastrsucces(item.children[1].textContent + " a été supprimé");
        item.remove();
        selectedID = 0;
    }

    //montrer le modal ajout
    document.getElementById('addButton').addEventListener('click',function () {
        $('#addModal').modal('show');
    })

    //action ajout
    document.getElementById('addForm').addEventListener('submit', function(e){
        e.preventDefault();
        let input = document.getElementById('addinputnom');
        COURS.ajouter(input.value,callbackajout, toast.toastrerreur);
        $('#addModal').modal('hide');
        input.value = '';
    })

    function callbackajout(data)
    {
        console.log(data);
        if(data.result == true)
        {
            CreateGestionCourse(data.returnval[0]);
            toast.toastrsucces("ajout: " + data.returnval[0].Intitule + " réussi");
        }
        else
        {
            toast.toastrerreur(data.message);
        }
    }
});