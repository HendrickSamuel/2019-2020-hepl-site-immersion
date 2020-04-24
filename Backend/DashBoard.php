<!doctype html>
<html lang="fr">
<head>

    <?php
        require(__DIR__."/../php/inc/head.php");
    ?>
    <script src="/js/Backend/tests.js"></script>
    <link rel="stylesheet" href="/css/dashboard.css">

    <title>Inpres Immersion</title>
</head>
<body>
    <?php require(__DIR__."/../php/inc/BackendNav.php") ?>
    <div class="page">
        <div class="sidebar ">
            <h4 class="centre-text">Quick clicks</h4>

            <div class="card">
                <div class="card-body">
                    Autoriser les inscriptions
                    <br>
                    <label class="switch">
                        <input type="checkbox">
                        <span></span>
                    </label>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    Autre parametre
                    <br>
                    <label class="switch">
                        <input type="checkbox">
                        <span></span>
                    </label>
                </div>
            </div>

        </div>

        <div class="pagecontent">
            <div class="card col-md-10 centre">
                <div class="card-body">
                    <h5 class="card-title">OverView</h5>
                    <table id="horaires">
                        <thead>
                            <tr>
                                <th>Cours</th>
                                <th>Professeur</th>
                                <th>Date</th>
                                <th>HeureDebut</th>
                                <th>HeureFin</th>
                                <th>Nombre Disponibles</th>
                                <th>Places totales</th>
                            </tr>
                        </thead>
                        <tbody id="horairesCorps">

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</body>
</html>
