<!doctype html>
<html lang="fr">
<head>
    <?php
        require(__DIR__ . "/../php/inc/head.php");
    ?>
    <script type="module" src="/js/Backend/DashBoard.js"></script>
    <link rel="stylesheet" href="/css/dashboard.css">

    <title>Inpres Immersion</title>
</head>
<body>
    <?php require(__DIR__ . "/../php/inc/BackendNav.php") ?>
    <div class="page">
        <div class="sidebar ">
            <h4 class="centre-text">Quick clicks</h4>

            <div class="card">
                <div class="card-body">
                    Autoriser les inscriptions
                    <br>
                    <label class="switch">
                        <input type="checkbox" id="enableForce">
                        <span></span>
                    </label>
                </div>
            </div>
        </div>

        <div class="pagecontent">
            <div class="my-3 p-3 bg-white rounded box-shadow">
                <h6 class="border-bottom border-gray pb-2 mb-0">Informations</h6>
                <div class="media text-muted pt-3">
                    <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                        <strong class="d-block text-gray-dark">Dates inscriptions</strong>
                        <strong>début:</strong> <text id="horaire-debut"></text> <strong class="ml-4">fin :</strong><text id="horaire-fin"></text>
                    </p>
                </div>
                <div class="media text-muted pt-3">
                    <p class="media-body pb-3 mb-0 small lh-125 border-bottom border-gray">
                        <strong class="d-block text-gray-dark">Inscriptions</strong>
                        <text id="ouverture"></text>
                    </p>
                </div>
                <small class="d-block text-right mt-3">
                    <a href="#">All updates</a>
                </small>
            </div>
        </div>
    </div>
</body>
</html>
