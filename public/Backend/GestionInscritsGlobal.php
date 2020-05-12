<!doctype html>
<html lang="fr">
<head>
    <script type="module" src="https://unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.esm.js"></script>
    <script type="module" src="/js/Backend/InscritsCours.js"></script>
    <?php
    require(__DIR__ . "/../php/inc/head.php");
    ?>
    <link rel="stylesheet" href="/css/dashboard.css">

    <title>Inpres Immersion</title>
</head>
<body>
<?php require(__DIR__ . "/../php/inc/BackendNav.php") ?>
<div>

    <div class="pagecontent">
        <div class="card col-md-11 centre">
            <div class="card-body liste">
                <h5 class="card-title">Liste des inscrits</h5>



            </div>
        </div>
    </div>
</div>
</body>

<template id="templateTable">
    <table class="table" style="display: inline">
        <thead>
        <th colspan="4" class="data-date"> Jour 1</th>
        </thead>
        <tbody class="data-tbody">

        </tbody>
    </table>
</template>

<template id="templateEleve">
    <div class="card" style="width: 100%;">
        <div class="card-body">
            <h5 class="card-title data-entete">Albert Einstein</h5>
            <div class="card-content data-horaires">

            </div>
            <div class="card-footer">
                <a href="#" class="card-link">Supprimer</a>
                <a href="#" class="card-link">QQCH</a>
            </div>
        </div>
    </div>
</template>

</html>
