export var COURS_DISPO = {
    selectAll: (callBack, failCallBack) =>{
        actionCoursDispo("SELECTALL", callBack, failCallBack);
    },
    updatePlaceDispo: (callBack, failCallBack) =>{
        actionCoursDispo("UPDATE_PLACE_DISPO", callBack, failCallBack);
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
        console.log(`Requête ajax effectuée : ${action}`);
    })
};
