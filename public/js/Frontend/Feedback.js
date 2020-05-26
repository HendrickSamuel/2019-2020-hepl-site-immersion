/*

*/

import {
    QUESTIONS
} from '/js/ajax/requeteAjaxFrontend';

import * as questions from './ClassQuestion';

document.addEventListener('DOMContentLoaded', () => {
    let zoneQuestion =  document.querySelector('#zone-question');
    $(zoneQuestion).hide();
    let idEleve;
    let emailValide = false;
    const masqueEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    let questionsFeedback = [];
    let btnConfimerMail = document.querySelector('#btn-confirmer');
    let formulaireQuestion = document.querySelector('#form-question');
    let formulaireEmail = document.querySelector('#form-email');
    let inputMail = formulaireEmail.querySelector('#email');
    
    let zoneEleve = document.querySelector('#zone-info-eleve');


    inputMail.addEventListener('change', () => {MailValide(inputMail)});
    formulaireEmail.addEventListener('submit', (e) => { 
        e.preventDefault();
        if(emailValide){
            QUESTIONS.selectIdEleve(inputMail.value, DemandeIdEleveRequeteOK, DemandeIdEleveRequeteKO);
        }
    });
    function DemandeIdEleveRequeteOK(data) {
        alert("Dans DemandeIdEleveRequeteOK");
        console.log(data);
        let reponse = (Object)(JSON.parse(JSON.stringify(data)));
        if(reponse['valid'] == true){
            idEleve = reponse['idEtudiant'];
            QUESTIONS.selectAll(DemandeQuestionRequeteOK, DemandeQuestionRequeteKO);
            $(zoneEleve).hide();
            $(zoneQuestion).show();
        }        
    }
    function DemandeIdEleveRequeteKO(data) {
        alert("Dans DemandeIdEleveRequeteKO");
        let reponse = (Object)(JSON.parse(JSON.stringify(data)));
        console.log(reponse);
    }

    
    function DemandeQuestionRequeteOK(data) {
        let reponse = (Object)(JSON.parse(JSON.stringify(data)));
        console.log("Questions recues :")
        console.log(reponse);
        if(reponse['valid'] == true){
            for(let i = 0; i < reponse['data'].length; i++){
                questionsFeedback.push(new questions.Question(
                    reponse['data'][i].ID,
                    reponse['data'][i].Question));
            }
            let zoneQuestion = formulaireQuestion.querySelector('#les-questions');
            questionsFeedback.forEach(question => {
                question.InitContenuHTML();
                question.Affiche();
                zoneQuestion.appendChild(question.GetHTML());
            });

            formulaireQuestion.addEventListener('submit', (e) => { 
                e.preventDefault();
                QUESTIONS.insertReponse(idEleve, CreationReponseAInserer(questionsFeedback), InsertReponseRequeteOK, InsertReponseRequeteKO);
            });
        }else{
            $(zoneEleve).show();
            $(zoneQuestion).hide();
        }

    }
    function DemandeQuestionRequeteKO(data) {
        alert("Dans DemandeQuestionRequeteKO ")
        console.log(data);
    }
    function InsertReponseRequeteOK(data){
        alert("Dans InsertReponseRequeteOK");
        console.log(data);
    }
    function InsertReponseRequeteKO(data){
        alert("Dans InsertReponseRequeteKO");
        console.log(data);
    }
    function CreationReponseAInserer(questionsFeedback){
        let data = new Array();
        for(let i = 0; i < questionsFeedback.length; i++){
            let obj = {};
            obj.question = questionsFeedback[i].id;
            obj.ressenti = questionsFeedback[i].ressentiReponseValeur;
            data.push(obj);
        }
        console.log(data);
        return data;
    }
    function MailValide(inputMail){
        let value = inputMail.value;
        if(masqueEmail.test(value) === true){
            console.log(`Mail correct : ${value} Test = ${masqueEmail.test(value)}`);
            inputMail.classList.add('border-success');
            inputMail.classList.remove('border-danger');
            emailValide = true;
        }
        else{
            console.log(`Mail incorrect : ${value} Test = ${masqueEmail.test(value)}`);
            inputMail.classList.add('border-danger');
            inputMail.classList.remove('border-success');
            emailValide = false;
        }
    }
});