import {PROFESSEURS} from '../ajax/requetesajax';
import * as toast from '../toaster/toaster';
import * as tables from '../tables/createTables';

document.addEventListener('DOMContentLoaded', function () {
    let champs = [];
    let entete = document.getElementById('entete');
    for(let i = 0; i < entete.children.length; i++)
    {
        let valeur = entete.children[i].getAttribute("data-champ");
        if(valeur != 'none')
            champs.push(valeur);
    }
    let selectedID = 0;

    PROFESSEURS.select(initProfesseurs,toast.toastrerreur);

    function initProfesseurs(val)
    {
        console.log(val);
        if(val.result == true)
        {
            if(val.action == "SELECT")
            {
                for(let i = 0; i < val.returnval.length; i++ )
                {
                    createTeacherTr(val.returnval[i]);
                }
                $("#TeacherTable").tablesorter({ sortList: [[0,0]] });
            }
        }
    }

    function createTeacherTr(data){
        let td;
        let action;
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

        document.getElementById("tablebody").appendChild(tr);
    }

    //afficher modal
    function AfficherModifier()
    {
        let par = this.closest("tr");
        selectedID = par.id;
        //alert("modification de " + par.id);
        let input = document.getElementById('updateinputnom').value = document.getElementById(selectedID).children[1].innerHTML;
        $('#updateModal').modal('show');
    }

    //action modifier
    document.getElementById('updateForm').addEventListener('submit', function(e){
        e.preventDefault();
        let input = document.getElementById('updateinputnom');
        PROFESSEURS.modifier(selectedID,input.value,callbackupdate,toast.toastrerreur);
        $('#updateModal').modal('hide');
    })

    function callbackupdate(data) {
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


    function AfficherSupprimer() {
        let par = this.closest("tr");
        let index = champs.findIndex((element) => element === 'Nom');
        selectedID = par.id;
        document.querySelector('#deleteModal').querySelector('.data-delete').innerHTML=par.children[index].textContent;
        $('#deleteModal').modal('show');
    }

    document.getElementById('deletebutton').addEventListener('click', function(){
        //alert("delete");
        if(selectedID != 0)
        {
            PROFESSEURS.supprimer(selectedID,'',callbackteacherdelete,toast.toastrerreur);
            $('#deleteModal').modal('hide');
            selectedID = 0;
        }
    });

    function callbackteacherdelete(data)
    {
        if(data.result == true)
        {
            document.getElementById(data.returnval[0].ID).remove();
            toast.toastrsucces("supression: " + data.returnval[0].Nom + " réussi");
        }
        else
        {
            toast.toastrerreur(data.message);
        }
    }

    document.getElementById('addButton').addEventListener('click',function () {
        $('#addModal').modal('show');
    })

    document.getElementById('addForm').addEventListener('submit', function(e){
        e.preventDefault();
        let input = document.getElementById('addinputnom');
        PROFESSEURS.ajouter(input.value,callbackteacheradd,toast.toastrerreur);
        $('#addModal').modal('hide');
        input.value = '';

    })

    function callbackteacheradd(data)
    {
        console.log(data);
        if(data.result == true)
        {
            createTeacherTr(data.returnval[0]);
            toast.toastrsucces("ajout: " + data.returnval[0].Nom + " réussi");
        }
        else
        {
            toast.toastrerreur(data.message);
        }
    }
});