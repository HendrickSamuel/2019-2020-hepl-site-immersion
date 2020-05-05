import {actionconfig} from "../ajax/requetesconfig";
import * as toast from '../toaster/toaster';
import {IMMERSION} from '../ajax/requetesajax';
import * as validation from '../formvalidation/regexValidator';

$(document).ready(function(){
   let plages = [];
   actionconfig('','GET',function (data) {
      plages = data['plages'];
   }, toast.toastrerreur)

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
      let test = document.getElementById("id_form").elements;

      console.log(test);
      let data = {};

      for(let i = 0; i < test.length; i++)
         if(test[i].type == 'checkbox')
            data[test[i].id] = test[i].checked? 1:0; // (test[i].id,test[i].value);
         else
            data[test[i].id] = test[i].value; // (test[i].id,test[i].value);

      console.log(data);

      //todo: determiner places

      IMMERSION.ajouter(data['inputvisible'] ,data['inputcours'],data['inputprofesseur'],data['inputjour'],
          data['inputplage'],10,data['inputdebut'],data['inputfin'],data['inputbloc'],data['types'],data['inputgroupe'],data['inputlocal'],
          data['inputgestion'] ,data['inputindus'] ,data['inputreseaux'] ,console.log,console.log);

   })

});