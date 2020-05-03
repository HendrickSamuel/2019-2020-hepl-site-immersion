//import('/js/lib/jquery-3.4.1')

export var PROFESSEURS = {
    select: function (callBack,failCallBack) {
        actionprofs('', '','SELECT',callBack,failCallBack);
    },

    ajouter: function(id,nom, CallBack, failCallBack){
        actionprofs(id,nom,"INSERT", CallBack, failCallBack);
    },

    modifier: function(id,nom,CallBack,failCallBack){
        actionprofs(id,nom,'UPDATE',CallBack,failCallBack);
    },

    supprimer: function (id,nom, CallBack, failCallBack) {
        actionprofs(id,nom,"DELETE", CallBack, failCallBack);
    }
}

function actionprofs(id, nom, action, CallBack, failCallBack)
{

    $.ajax("/php/requetes/requetesProfesseurs.php", {
        type: "POST",
        data: {
            Nom: nom,
            ID: id,
            action: action
        },
        dataType: "json",
        success: function (data) {
            if(CallBack != null)
                CallBack(data);
        },
        error: function () {
            console.log("request failed");
            if(failCallBack != null)
                failCallBack("request failed");
        }
    })
}

export var COURS = {
    select: function (callBack,failCallBack) {
        actioncours('','','SELECT',callBack,failCallBack);
    },

    ajouter: function (intitule,callBack,failCallBack) {
        actioncours('',intitule,'INSERT',callBack,failCallBack);
    },

    modifier: function (id,intitule,callBack,failCallBack) {
        actioncours(id,intitule,'UPDATE',callBack,failCallBack);
    },

    supprimer: function (id,intitule,callBack,failCallBack) {
        actioncours(id,intitule,'DELETE',callBack,failCallBack);
    }
}

function actioncours(id, intitule, action, CallBack, failCallBack)
{

    $.ajax("/php/requetes/requetesCours.php", {
        type: "POST",
        data: {
            Intitule: intitule,
            ID: id,
            action: action
        },
        dataType: "json",
        success: function (data) {
            if(CallBack != null)
                CallBack(data);
        },
        error: function () {
            console.log("request failed");
            if(failCallBack != null)
                failCallBack("request failed");
        }
    })
}

export var IMMERSION = {
    select: function (callBack,failCallBack) {
        actionimmersion('', '', '', '','', '', '', '', '' ,'SELECT',callBack,failCallBack);
    },

    ajouter: function(idCours, idProfesseur, date, plageHoraire,places, heureDebut, heureFin, bloc, type , CallBack, failCallBack){
        actionimmersion(idCours, idProfesseur, date, plageHoraire,places, heureDebut, heureFin, bloc, type ,"INSERT", CallBack, failCallBack)
    },

    supprimer: function (idCours, idProfesseur, date, plageHoraire, CallBack, failCallBack) {
        actionimmersion(idCours, idProfesseur, date, plageHoraire,0, 0, 0, 0, 0 ,"DELETE", CallBack, failCallBack)
    }
}

function actionimmersion(idCours, idProfesseur, date, plageHoraire,places, heureDebut, heureFin, bloc, type ,action, CallBack, failCallBack)
{

    $.ajax("/php/requetes/requetesImmersion.php", {
        type: "POST",
        data: {
            IDCours: idCours,
            IDProfesseur: idProfesseur,
            Date: date,
            PlageHoraire: plageHoraire,
            Places: places,
            HeureDebut: heureDebut,
            HeureFin: heureFin,
            Bloc: bloc,
            Type: type,
            Action: action,
        },
        dataType: "json",
        success: function (data) {
            if(CallBack != null)
                CallBack(data);
        },
        error: function () {
            console.log("request failed");
            if(failCallBack != null)
                failCallBack("request failed");
        }
    })
}


