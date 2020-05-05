<!doctype html>
<html lang="fr">
<head>

    <?php
    require(__DIR__ . "/../php/inc/head.php");
    ?>
    <script type="module" src="/js/Backend/playground.js"></script>
    <link rel="stylesheet" href="/css/dashboard.css">

    <title>Inpres Immersion</title>
</head>
<body>
<?php require(__DIR__ . "/../php/inc/BackendNav.php") ?>
<div class="page">
    <form id="id_form">

        <label for="inputcours">cours</label>
        <input type="number" id="inputcours">

        <label for="inputprofesseur">professeur</label>
        <input type="number" id="inputprofesseur">

        <label for="types">type de cours</label>
        <select id="types" name="typecours">
            <option value="labo">laboratoire</option>
            <option value="theorie">théorie</option>
            <option value="tfe">TFE</option>
        </select>

        <label for="inputjour">jour du cours</label>
        <input type="date" id="inputjour" data-regex="heure">

        <label for="inputdebut">heure debut</label>
        <input type="text" id="inputdebut" data-regex="heure">

        <label for="inputfin">heure fin</label>
        <input type="text" id="inputfin">

        <label for="inputplage">plage horaire</label>
        <input type="number" id="inputplage">

        <label for="inputlocal">local</label>
        <input type="text" id="inputlocal">

        <label for="inputbloc">bloc</label>
        <input type="number" id="inputbloc">

        <lable>Finalités</lable>
        <div>
            <label for="inputgestion">gestion: </label>
            <input type="checkbox" id="inputgestion">

            <label for="inputindus">indus: </label>
            <input type="checkbox" id="inputindus">

            <label for="inputreseaux">reseaux: </label>
            <input type="checkbox" id="inputreseaux">
        </div>

        <label for="inputgroupe">groupe</label>
        <input type="text" id="inputgroupe">

        <label for="inputvisible">visible: </label>
        <input type="checkbox" id="inputvisible" checked>

        <input type="submit">


    </form>
</div>
</body>
</html>
