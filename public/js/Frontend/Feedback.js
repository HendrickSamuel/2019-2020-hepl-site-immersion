/*

*/

import {
    QUESTIONS
} from '/js/ajax/requeteAjaxFrontend';
import * as toast from '/js/toaster/toaster'
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

    let inputPrecedent = document.getElementById('InputGetEmail');
    if(inputPrecedent != null)
        PreCharge(inputPrecedent.value);

    function PreCharge(email)
    {
        toast.toastrwarning('Nous avons détecté votre compte, vous allez pouvoir completer le formulaire !');
        QUESTIONS.selectIdEleve(email, DemandeIdEleveRequeteOK, DemandeIdEleveRequeteKO);
    }

    inputMail.addEventListener('change', () => {MailValide(inputMail)});
    formulaireEmail.addEventListener('submit', (e) => { 
        e.preventDefault();
        if(emailValide){
            let hash = md5(inputMail.value);
            QUESTIONS.selectIdEleve(hash, DemandeIdEleveRequeteOK, DemandeIdEleveRequeteKO);
        }
    });
    function DemandeIdEleveRequeteOK(data) {
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
        console.log(data);
    }
    function InsertReponseRequeteOK(data){
        console.log(data);
    }
    function InsertReponseRequeteKO(data){
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