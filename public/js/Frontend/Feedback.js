/*

*/

import {
    QUESTIONS
} from '/js/ajax/requeteAjaxFrontend';

import * as questions from './ClassQuestion';

document.addEventListener('DOMContentLoaded', () => {
    let idEleve;
    let mailEleve = 'benkama@hotmail.be';
    let questionsFeedback = [];
    let btnConfimer = document.querySelector('#btn-confirmer');
    let formulaireQuestion = document.querySelector('#form-question');

    QUESTIONS.selectAll(mailEleve, DemandeQuestionRequeteOK, DemandeQuestionRequeteKO);

    function DemandeQuestionRequeteOK(data) {
        let reponse = (Object)(JSON.parse(JSON.stringify(data)));
        console.log("Questions recues :")
        console.log(reponse);

        for(let i = 0; i < reponse['data'].length; i++){
            questionsFeedback.push(new questions.Question(
                reponse['data'][i].ID,
                reponse['data'][i].Question));
        }

        questionsFeedback.forEach(question => {
            question.InitContenuHTML();
            question.Affiche();
        });

    }
    function DemandeQuestionRequeteKO(data) {
        alert("Dans DemandeQuestionRequeteKO ")
        console.log(data);
    }
    function CreationReponseAInserer(joursImmersion){
        let data = new Array();
        for(let i = 0; i < questionsFeedback.length; i++){
            let obj = {};
            obj.question = questionsFeedback[i].titre;
            obj.ressenti = questionsFeedback[i].ressentiReponseValeur;
            data.push(obj);
        }
        console.log(data);
        return data;
    }
});