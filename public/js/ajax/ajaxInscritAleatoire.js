export function setHoraire(data, CallBack, failCallBack)
{
    $.ajax("/php/requetes/requetesHoraireForce", {
        type: "POST",
        data: {
            Data: data,
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