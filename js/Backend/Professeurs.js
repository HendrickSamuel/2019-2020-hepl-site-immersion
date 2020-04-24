document.addEventListener('DOMContentLoaded', function () {
    import("/js/Backend/js");

    test.ajouterpersonne();

    $.ajax("/php/requetes/requetesProfesseurs.php", {
        type: "POST",
        data: {
            Nom: "Kevin maitre",
            ID: 2,
            action: "UPDATE"
        },
        dataType: "json",
        success: function (data) {
            alert("1");
            console.log(data);
        },
        fail: function () {
            alert("2");
            console.log("failed");
        },
    })
});