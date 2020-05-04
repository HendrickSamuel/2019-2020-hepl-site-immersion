export function actionconfig(config, action,CallBack, failCallBack)
{

    $.ajax("/php/fichiers/Config.php", {
        type: "POST",
        data: {
            Config: config,
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