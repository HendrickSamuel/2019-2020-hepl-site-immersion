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
<div class=" col-md-10 centre">
    <form id="id_form" class="form-horizontal">

        <div class="form-group">
            <label for="inputprofesseur">professeur</label>
            <select class="form-control" id="inputprofesseur" name="Professeurs">
            </select>
        </div>

        <div class="form-group">
            <label  class="control-label" for="inputcours">cours</label>
            <select class="form-control" id="inputcours" name="Cours">
            </select>
        </div>

        <div class="form-group">
            <h4>Finalités</h4>
            <label for="inputgestion">gestion: </label>
            <input type="checkbox" id="inputgestion">
            <label for="inputindus">indus: </label>
            <input type="checkbox" id="inputindus">
            <label for="inputreseaux">reseaux: </label>
            <input type="checkbox" id="inputreseaux">
        </div>


        <div class="form-group">
            <label for="types">type de cours</label>
            <select class="form-control" id="types" name="typecours">
                <option value="laboratoire">laboratoire</option>
                <option value="theorie">théorie</option>
                <option value="tfe">TFE</option>
            </select>
        </div>

        <div class="form-row">
            <div class="form-group col-md-3">
                <label for="inputjour">jour du cours</label>
                <input class="form-control" type="date" id="inputjour" data-regex="heure">
            </div>
            <div class="form-group col-md-3">
                <label for="inputdebut">heure debut</label>
                <input class="form-control" type="text" id="inputdebut" data-regex="heure">
            </div>
            <div class="form-group col-md-3">
                <label for="inputfin">heure fin</label>
                <input class="form-control" type="text" id="inputfin">
            </div>
            <div class="form-group col-md-3">
                <label for="inputplage">plage horaire</label>
                <input class="form-control" type="number" id="inputplage">
            </div>
        </div>

        <div class="form-row">
            <div class="form-group col-md-3">
                <label for="inputlocal">local</label>
                <input class="form-control" type="text" id="inputlocal">
            </div>

            <div class="form-group col-md-3">
                <label for="inputgroupe">groupe</label>
                <input class="form-control" type="text" id="inputgroupe">
            </div>

            <div class="form-group col-md-3">
                <label for="inputbloc">bloc</label>
                <input class="form-control" type="number" id="inputbloc">
            </div>

        </div>

        <div class="form-group">
            <label for="inputvisible">visible: </label>
            <input type="checkbox" id="inputvisible" checked>
        </div>

        <input class="btn" type="submit">
    </form>
    <a href="/Backend/GestionImmersion.php" class="btn">Liste des horaires</a>
</div>

</body>
</html>
