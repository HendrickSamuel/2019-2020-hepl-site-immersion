<<<<<<< HEAD
=======
import * as jours from '../Frontend/ClassJour';
import * as plages from '../Frontend/ClassPlage';
import * as cartes from '../Frontend/ClassCarteCours';

>>>>>>> BranchBeneV2
export var COURS_DISPO = {
    selectAll: (callBack, failCallBack) =>{
        actionCoursDispo("SELECTALL", callBack, failCallBack);
    },
<<<<<<< HEAD

}
=======
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
    selectIdEleve: (emailEleveInscrit, callBack, failCallBack) =>{
        actionEleveInscrit("GETIDFROMEMAIL", emailEleveInscrit, callBack, failCallBack);
    },
    selectAll: (callBack, failCallBack) =>{
        actionFeedbackQuestion("SELECTALL", callBack, failCallBack);
    },
    insertReponse:(idEleve, reponses, callBack, failCallBack) =>{
        actionFeedbackReponse("INSERT", idEleve, reponses, callBack, failCallBack)
    },
}

>>>>>>> BranchBeneV2
function actionCoursDispo(action, callBack, failCallBack){
    $.ajax("/php/requetes/requetesCoursDispo.php", {
        method: "POST",
        data:{
            action: action
        },
        dataType: "JSON",
        async: true
    })
<<<<<<< HEAD
    .done((response) => {
        if(callBack != null)
            callBack(response.data);
=======
    .done((reponse) => {
        if(callBack != null)
            callBack(reponse.data);
>>>>>>> BranchBeneV2
    })
    .fail((error) => {
        failCallBack(error);
    })
    .always(() => {
        console.log(`Requête ajax |CoursDispo| effectuée : ${action}`);
    })
};

<<<<<<< HEAD
export var ELEVE_IMMERSION = {
    insertEleve:(data, callBack, failCallBack) =>{
        actionEleveImmersion("INSERT_ELEVE", data, callBack, failCallBack)
    },
    insertHoraire:(data, callBack, failCallBack) =>{
        actionEleveImmersion("INSERT_HORAIRE", data, callBack, failCallBack)
    }
}

=======
>>>>>>> BranchBeneV2
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
<<<<<<< HEAD
    .done((response) => {
        if(callBack != null)
            callBack(response);
=======
    .done((reponse) => {
        if(callBack != null)
            callBack(reponse);
>>>>>>> BranchBeneV2
    })
    .fail((error) => {
        failCallBack(error);
    })
    .always(() => {
        console.log(`Requête ajax |EleveImmersion| effectuée : ${action}`);
    })    
};
<<<<<<< HEAD
=======

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
    .done((reponse) => {
        if(callBack != null)
            callBack(reponse);
    })
    .fail((error) => {
        if(failCallBack != null)
            failCallBack(error);
    })
    .always(() => {
        console.log(`Requête ajax |Eleve Horaire| effectuée : ${action}`);
    })   
};

function actionFeedbackQuestion(action, callBack, failCallBack){
    $.ajax("/php/requetes/requetesFeedBackQuestion.php", {
        method: "POST",
        data:{
            action: action
        },
        dataType: "JSON",
        async: true,
    })
    .done((reponse) => {
        if(callBack != null)
            callBack(reponse);
    })
    .fail((error) => {
        if(failCallBack != null)
            failCallBack(error);
    })
    .always(() => {
        console.log(`Requête ajax |Feedback Question| effectuée : ${action}`);
    })   
};
function actionFeedbackReponse(action, idEtudiant, reponses, callBack, failCallBack){
    $.ajax("/php/requetes/requetesFeedBackAjout.php", {
        method: "POST",
        data:{
            action: action,
            idEtudiant: idEtudiant,
            Data: reponses
        },
        dataType: "JSON",
        async: true,
    })
    .done((reponse) => {
        if(callBack != null)
            callBack(reponse);
    })
    .fail((error) => {
        if(failCallBack != null)
            failCallBack(error);
    })
    .always(() => {
        console.log(`Requête ajax |Feedback Reponse| effectuée : ${action}`);
    })   
};

function actionEleveInscrit(action, email, callBack, failCallBack) {
    $.ajax("/php/requetes/requetesFeedBackAjout.php", {
        method: "POST",
        data:{
            action: action,
            Data: email
        },
        dataType: "JSON",
        async: true,
    })
    .done((reponse) => {
        if(callBack != null)
            callBack(reponse);
    })
    .fail((error) => {
        if(failCallBack != null)
            failCallBack(error);
    })
    .always(() => {
        console.log(`Requête ajax |EleveInscrit| effectuée : ${action}`);
    })      
}
>>>>>>> BranchBeneV2
