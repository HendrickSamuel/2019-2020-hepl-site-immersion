//import('/js/lib/jquery-3.4.1')

export var PROFESSEURS = {
    select: function (callBack,failCallBack) {
        actionprofs('', '','SELECT',callBack,failCallBack);
    },

    ajouter: function(nom, CallBack, failCallBack){
        actionprofs('',nom,"INSERT", CallBack, failCallBack);
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
        actionimmersion('','SELECT',callBack,failCallBack);
    },

    selectSimilaires: function (id, callBack,failCallBack) {
        actionimmersion({ID: id},'SELECTPLACES',callBack,failCallBack);
    },

    move(idfrom, idto, callback, failCallBack)
    {
        actionimmersion({ID: idfrom, IDTo: idto}, 'MOVE', callback, failCallBack);
    },

    ajouter: function(data, CallBack, failCallBack){
        actionimmersion(data ,"INSERT", CallBack, failCallBack);
    },

    supprimer: function (ID, CallBack, failCallBack) {
        actionimmersion({ID: id},"DELETE", CallBack, failCallBack);
    }
}

function actionimmersion(data ,action, CallBack, failCallBack)
{

    $.ajax("/php/requetes/requetesImmersion.php", {
        type: "POST",
        data: {
            Data: data,
            Action: action
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

export var INSCRITS = {

    selectAll: function (callBack,failCallBack) {
        actioninscrits('SELECTALL',callBack,failCallBack);
    },

    select: function (callBack,failCallBack) {
        actioninscrits('SELECT',callBack,failCallBack);
    }
}

function actioninscrits(action, CallBack, failCallBack)
{
    $.ajax("/php/requetes/requetesInscritsCours.php", {
        type: "POST",
        data: {
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

export var ELEVES = {

    select: function (callBack,failCallBack) {
        actioneleves('','SELECT',callBack,failCallBack);
    },

    delete: function (id, callback, failCallBack) {
       alert(callback);
    }
}

function actioneleves(id, action, CallBack, failCallBack)
{

    $.ajax("/php/requetes/requetesEleves.php", {
        type: "POST",
        data: {
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



