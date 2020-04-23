document.addEventListener('DOMContentLoaded', function () {
    $.ajax("/php/requetes/coursDisponibles.php", {
        type: "GET",
        dataType: "json",
        success: function (data) {
            let res = document.getElementById("result");
            for(let info in data)
            {
                console.log(data[info]);
                //let para = document.createElement("p");
                //para.innerText = data
            }
        }
    })

})