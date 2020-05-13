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
      let test = document.getElementById("id_form").elements;

      let data = {};

      for(let i = 0; i < test.length; i++)
         if(test[i].type == 'checkbox')
            data[test[i].id] = test[i].checked? 1:0; // (test[i].id,test[i].value);
         else
            data[test[i].id] = test[i].value; // (test[i].id,test[i].value);

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