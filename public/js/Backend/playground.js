import {actionconfig} from "../ajax/requetesconfig";
import * as toast from '../toaster/toaster';
import {IMMERSION, COURS, PROFESSEURS} from '../ajax/requetesajax';
import * as validation from '../formvalidation/regexValidator';

$(document).ready(function(){
   let plages = [];
   let options = [];

   actionconfig('','GET',function (data) {
      plages = data['plages'];
      options = data;
   }, toast.toastrerreur)

   COURS.select(InitCours, toast.toastrerreur);
   function InitCours(data)
   {
      console.log(data);
      if(data.result == true)
      {
         let select = document.querySelector("#inputcours")
         for(let cours of data.returnval)
         {
            let option = document.createElement('option');
            option.value = cours.ID;
            option.innerHTML = cours.Intitule;
            select.appendChild(option);
         }
      }
      else
         toast.toastrerreur(data["message"]);
   }

   PROFESSEURS.select(InitProfs, toast.toastrerreur);
   function InitProfs(data)
   {
      console.log(data);
      if(data.result == true)
      {
         let select = document.querySelector("#inputprofesseur")
         for(let cours of data.returnval)
         {
            let option = document.createElement('option');
            option.value = cours.ID;
            option.innerHTML = cours.Nom;
            select.appendChild(option);
         }
      }
      else
         toast.toastrerreur(data["message"]);
   }

   $("#inputdebut").on("focusout",function () {
      let result = validation.verifregex(this.value,this.getAttribute('data-regex'));
      if(result === true)
      {
         validation.switchclass(this,'regex-ok','regex-nok');
         let temp = this.value.split('h');
         let heure = parseInt(temp[0]);
         for(let i = 0; i < plages.length; i++)
         {
            if(heure >= plages[i] && heure < plages[i+1])
               document.getElementById('inputplage').value = (i+1).toString();
         }

         if(heure < plages[0] || heure > plages[plages.length])
            document.getElementById('inputplage').value = "0";
      }
      else
      {
         validation.switchclass(this,'regex-nok','regex-ok');
      }
   });

   $("#inputfin").on("focusout",function () {
      let result = validation.verifregex(this.value,this.getAttribute('data-regex'));
      if(result === true)
      {
         validation.switchclass(this,'regex-ok','regex-nok');
      }
      else
      {
         validation.switchclass(this,'regex-nok','regex-ok');
      }
   });

   actionconfig('','GET',console.log,console.log);

   $("#id_form").on("submit", function(e){
      e.preventDefault();
      console.log('click');
      let elems = document.getElementById("id_form").elements;

      let data = {};

      for(let i = 0; i < elems.length; i++)
         if(elems[i].type == 'checkbox')
            data[elems[i].id] = elems[i].checked? 1:0; // (elems[i].id,elems[i].value);
         else
            data[elems[i].id] = elems[i].value; // (elems[i].id,elems[i].value);

      data['places'] = options[data['types']];

      IMMERSION.ajouter(data ,EncodageOK,toast.toastrerreur);

   })

   function EncodageOK(data)
   {
      if(data.result == true)
      {
         toast.toastrsucces("le cours a bien été ajouté, prochain cours en preparation");
         window.setTimeout(function() {
            location.href = "/Backend/playground.php";
         }, 2000);
      }
      else
      {
         toast.toastrerreur(data.message);
      }
   }

});