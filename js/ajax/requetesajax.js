//import('/js/lib/jquery-3.4.1')

    export function actionprofs(nom, id, action, callbackfunction)
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
                if(callbackfunction != null)
                    callbackfunction(data);
            },
            error: function () {
                console.log("request failed");
                if(callbackfunction != null)
                    callbackfunction(null);
            }
        })
    }


