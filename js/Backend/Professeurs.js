import {actionprofs} from '/js/ajax/requetesajax';
//import * as requetes from '/js/ajax/requetesajax';

document.addEventListener('DOMContentLoaded', function () {

    let selectedID = 0;

    actionprofs('','',"SELECT",initProfesseurs);


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
            }
        }
    }

    function createTeacherTr(data){
        let td;
        let action;
        let tr = document.createElement("tr");
        tr.id = data.ID;

        td = document.createElement("td")
        td.innerText = data.ID;
        tr.appendChild(td);

        td = document.createElement("td")
        td.innerText = data.Nom;
        tr.appendChild(td);

        td = document.createElement("td")
        action = document.createElement("button");
        action.innerText = "modifier";
        action.addEventListener('click',modifier);
        let iconedit = document.createElement("ion-icon");
        iconedit.name = "create-outline";
        action.appendChild(iconedit);
        action.classList.add("btn","btn-outline-info","btn-sm","my-1");
        td.appendChild(action);
        tr.appendChild(td);

        td = document.createElement("td")
        action = document.createElement("button");
        action.innerText = "supprimer";
        action.addEventListener('click',supprimer);

        let icondel = document.createElement("ion-icon");
        icondel.name = "trash-outline";
        action.appendChild(icondel);
        action.classList.add("btn","btn-outline-danger","btn-sm","my-1");
        td.appendChild(action);
        tr.appendChild(td);

        document.getElementById("tablebody").appendChild(tr);
    }

    function modifier()
    {
        let par = this.closest("tr");
        selectedID = par.id;
        //alert("modification de " + par.id);
        let input = document.getElementById('updateinputnom').value = document.getElementById(selectedID).children[1].innerHTML;
        $('#updateModal').modal('show');
    }

    document.getElementById('updateForm').addEventListener('submit', function(e){
        e.preventDefault();
        let input = document.getElementById('updateinputnom');
        actionprofs(input.value,selectedID,'UPDATE',console.log);
        document.getElementById(selectedID).children[1].innerHTML = input.value;
        $('#updateModal').modal('hide');
        input.value = '';

    })


    function supprimer() {
        let par = this.closest("tr");
        //alert("delete de " + par.id);
        selectedID = par.id;
        $('#deleteModal').modal('show');
    }

    document.getElementById('deletebutton').addEventListener('click', function(){
        //alert("delete");
        if(selectedID != 0)
        {
            actionprofs('',selectedID,'DELETE');
            document.getElementById(selectedID).remove();
            $('#deleteModal').modal('hide');
            selectedID = 0;
        }
    });

    document.getElementById('addButton').addEventListener('click',function () {
        $('#addModal').modal('show');
        //actionprofs('Samuel','',"INSERT", callbackteacher);
    })

    document.getElementById('addForm').addEventListener('submit', function(e){
        e.preventDefault();
        let input = document.getElementById('addinputnom');
        actionprofs(input.value,'','INSERT',callbackteacher);
        $('#addModal').modal('hide');
        input.value = '';

    })

    function callbackteacher(data)
    {
        console.log(data);
        createTeacherTr(data.returnval[0]);
    }
});