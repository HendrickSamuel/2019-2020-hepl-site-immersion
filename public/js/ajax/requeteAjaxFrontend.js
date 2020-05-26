import * as jours from '../Frontend/ClassJour';
import * as plages from '../Frontend/ClassPlage';
import * as cartes from '../Frontend/ClassCarteCours';

export var COURS_DISPO = {
    selectAll: (callBack, failCallBack) =>{
        actionCoursDispo("SELECTALL", callBack, failCallBack);
    },
}

export var ELEVE_IMMERSION = {
    insertEleve:(data, callBack, failCallBack) =>{
        actionEleveImmersion("INSERT_ELEVE", data, callBack, failCallBack)
    },
    insertHoraire:(id, data, callBack, failCallBack) =>{
        actionHoraire("INSERT_HORAIRE", id, data, callBack, failCallBack)
    },
    insertEleveHoraire : (dataEleve, dataCours, callBack, failCallBack) => {
        actionEleveHoraire("INSERT_ELEVE_HORAIRE", dataEleve, dataCours, callBack, failCallBack)
    }
}

export var QUESTIONS = {
    selectAll: (emailEleveInscrit, callBack, failCallBack) =>{
        actionFeedbackQuestion("SELECTALL", emailEleveInscrit, callBack, failCallBack);
    },
    insertReponse:(idEleve, reponses, callBack, failCallBack) =>{
        actionFeedbackReponse("INSERT_REPONSE", idEleve, reponses, callBack, failCallBack)
    },
}

function actionCoursDispo(action, callBack, failCallBack){
    $.ajax("/php/requetes/requetesCoursDispo.php", {
        method: "POST",
        data:{
            action: action
        },
        dataType: "JSON",
        async: true
    })
    .done((response) => {
        if(callBack != null)
            callBack(response.data);
    })
    .fail((error) => {
        failCallBack(error);
    })
    .always(() => {
        console.log(`Requête ajax |CoursDispo| effectuée : ${action}`);
    })
};

function actionEleveImmersion(action, data, callBack, failCallBack){
    $.ajax("/php/requetes/requetesEleveImmersion.php", {
        method: "POST",
        data:{
            action: action,
            donneeEleve: data
        },
        dataType: "JSON",
        async: true
    })
    .done((response) => {
        if(callBack != null)
            callBack(response);
    })
    .fail((error) => {
        failCallBack(error);
    })
    .always(() => {
        console.log(`Requête ajax |EleveImmersion| effectuée : ${action}`);
    })    
};

function actionEleveHoraire(action, dataEleve, dataCours, callBack, failCallBack){
    $.ajax("/php/requetes/requetesEleveHoraire.php", {
        method: "POST",
        data:{
            action: action,
            dataEleve: dataEleve, 
            horaire: dataCours
        },
        dataType: "JSON",
        async: true,
    })
    .done((response) => {
        if(callBack != null)
            callBack(response);
    })
    .fail((error) => {
        if(failCallBack != null)
            failCallBack(error);
    })
    .always(() => {
        console.log(`Requête ajax |Eleve Horaire| effectuée : ${action}`);
    })   
};


function actionFeedbackQuestion(action, emailEleveInscrit, callBack, failCallBack){
    $.ajax("/php/requetes/requetesFeedBackQuestion.php", {
        method: "POST",
        data:{
            action: action,
            mail: emailEleveInscrit
        },
        dataType: "JSON",
        async: true,
    })
    .done((response) => {
        if(callBack != null)
            callBack(response);
    })
    .fail((error) => {
        if(failCallBack != null)
            failCallBack(error);
    })
    .always(() => {
        console.log(`Requête ajax |Feedback Question| effectuée : ${action}`);
    })   
};
function actionFeedbackReponse(action, idEleve, reponses, callBack, failCallBack){
    $.ajax("/php/requetes/requetesFeedBackReponse.php", {
        method: "POST",
        data:{
            action: action,
            idEleve: idEleve,
            responses: data
        },
        dataType: "JSON",
        async: true,
    })
    .done((response) => {
        if(callBack != null)
            callBack(response);
    })
    .fail((error) => {
        if(failCallBack != null)
            failCallBack(error);
    })
    .always(() => {
        console.log(`Requête ajax |Feedback Reponse| effectuée : ${action}`);
    })   
};
