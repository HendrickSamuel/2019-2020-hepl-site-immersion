export var COURS_DISPO = {
    selectAll: (callBack, failCallBack) =>{
        actionCoursDispo("SELECTALL", callBack, failCallBack);
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

export var ELEVE_IMMERSION = {
    insertEleve:(data, callBack, failCallBack) =>{
        actionEleveImmersion("INSERT_ELEVE", data, callBack, failCallBack)
    },
    insertHoraire:(data, callBack, failCallBack) =>{
        actionEleveImmersion("INSERT_HORAIRE", data, callBack, failCallBack)
    }
}

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
