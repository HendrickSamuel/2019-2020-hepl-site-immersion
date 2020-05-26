<!doctype html>
<html lang="fr">
<head>
    <?php
        require(__DIR__ . "/../php/inc/head.php");
    ?>
    <script type="module" src="/js/Backend/DashBoard.js"></script>
    <link rel="stylesheet" href="/css/dashboard.css">
    <link rel="stylesheet" href="/css/Switch.css">

    <title>Inpres Immersion</title>
</head>
<body>
    <?php require(__DIR__ . "/../php/inc/BackendNav.php") ?>
    <div class="page">
        <div class="sidebar ">
            <h4 class="centre-text">Actions</h4>

            <div class="card">
                <div class="card-body">
                    Autoriser les inscriptions
                    <br>
                    <div class="onoffswitch">
                        <input type="checkbox" name="onoffswitch" id="enableForce" class="onoffswitch-checkbox">
                        <label class="onoffswitch-label" for="enableForce">
                            <span class="onoffswitch-inner"></span>
                            <span class="onoffswitch-switch"></span>
                        </label>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <div class="form-row">
                        <div class="input-group mt-3">
                            <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-hourglass-start"></i></span>
                            </div>
                            <input type="text" class="form-control form-control-lg" placeholder="Date de début" id="DateDebut" name="datedebut">
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <div class="form-row">
                        <div class="input-group mt-3">
                            <div class="input-group-prepend">
                            <span class="input-group-text"><i class="fas fa-hourglass-end"></i></span>
                            </div>
                            <input type="text" class="form-control form-control-lg" placeholder="Date de fin" id="DateFin" name="datefin">
                        </div>
                    </div>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    <button class="btn btn-lg" id="btnValid">Valider Changements</button>
                </div>
            </div>
        </div>

        <div class="pagecontent" style="padding: 5%">
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
                    <a href="#">Informations sur le dashboard</a>
                </small>
            </div>
        </div>
    </div>
</body>
</html>
