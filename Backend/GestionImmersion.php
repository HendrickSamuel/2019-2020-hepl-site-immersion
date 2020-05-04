<!doctype html>
<html lang="fr">
<head>
    <script type="module" src="https://unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.esm.js"></script>
    <script type="module" src="/js/Backend/Immersion.js"></script>
    <?php
    require(__DIR__."/../php/inc/head.php");
    ?>
    <link rel="stylesheet" href="/css/dashboard.css">

    <title>Inpres Immersion</title>
</head>
<body>
<?php require(__DIR__."/../php/inc/BackendNav.php") ?>
<div class="page">

    <div class="pagecontent">
        <div class="card col-md-10 centre">
            <div class="card-body">
                <h5 class="card-title">Liste des cours Immersion</h5>
                <table class="tg" id="CourseTable">
                    <thead>
                    <tr>
                        <th>Cours</th>
                        <th>Professeur</th>
                        <th>Date</th>
                        <th>Plage Horaire</th>
                        <th>Heure Debut</th>
                        <th>Heure Fin</th>
                        <th>Places Disponibles</th>
                        <th>Places Totales</th>
                        <th colspan="2">Action</th>
                    </tr>
                    </thead>
                    <tbody id="tablebody">

                    </tbody>
                </table>
                <button class="btn btn-success centre m-2" id="addButton">Ajouter</button>
            </div>
        </div>
    </div>
</div>
</body>
</html>
