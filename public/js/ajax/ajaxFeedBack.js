export function getFeedBack(CallBack, failCallBack)
{
    $.ajax("/php/requetes/GetFeedBack.php", {
        type: "POST",
        data: {
            action: 'GET'
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