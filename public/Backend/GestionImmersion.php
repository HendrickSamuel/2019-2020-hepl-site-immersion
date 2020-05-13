<!doctype html>
<html lang="fr">
<head>
    <script type="module" src="https://unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.esm.js"></script>
    <script type="module" src="/js/Backend/Immersion.js"></script>

    <?php
    require(__DIR__ . "/../php/inc/head.php");
    ?>

    <link rel="stylesheet" href="/css/dashboard.css">
    <link rel="stylesheet" href="/css/Switch.css">

    <title>Inpres Immersion</title>
</head>
<body>
<?php require(__DIR__ . "/../php/inc/BackendNav.php") ?>
<div class="card col-md-12 centre">
    <div class="card-body">
        <h5 class="card-title">Liste des cours Immersion</h5>
        <table class="table table-hover table-bordered" id="CourseTable">
            <thead class="thead-light">
            <tr id="entete" class="centre-text">
                <th data-champ="IDPrincipal">ID</th>
                <th data-champ="Intitule">Cours</th>
                <th data-champ="Nom">Professeur</th>
                <th data-champ="Date">Date</th>
                <th data-champ="PlageHoraire">Plage Horaire</th>
                <th data-champ="HeureDebut">Heure Debut</th>
                <th data-champ="HeureFin">Heure Fin</th>
                <th data-champ="PlacesDisponibles">Places Disponibles</th>
                <th data-champ="PlacesTotal">Places Totales</th>
                <th data-champ="Local">Local</th>
                <th data-champ="Groupe">Groupe</th>
                <th data-champ="Gestion">Gestion</th>
                <th data-champ="Reseau">Reseau</th>
                <th data-champ="Indus">Indus</th>
                <th data-champ="bloc">bloc</th>
                <th data-champ="type">type</th>
                <th data-champ="none">visible</th>
                <th data-champ="none" colspan="2">Action</th>
            </tr>
            </thead>
            <tbody id="tablebody">

            </tbody>
        </table>
        <a class="btn btn-success centre m-2" id="addButton" href="playground.php">Ajouter</a>
    </div>
</div>

<div class="modal fade" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Supression</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                etes vous sur de vouloir supprimmer ... ?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                <button type="button" class="btn btn-success" id="deletebutton">Valider</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="deleteModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Supression</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                etes vous sur de vouloir supprimmer ... ?
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                <button type="button" class="btn btn-success" id="deletebutton">Valider</button>
            </div>
        </div>
    </div>
</div>

<div class="modal" id="redirectModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Redirection</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="redirectForm" action="">
                    <label for="addinputnom">CoursDisponibles: </label>
                    <select name="CoursRedirection" id="inputCours">

                    </select>
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                <input type="submit" form="redirectForm" class="btn btn-success" value="Valider">
            </div>
        </div>
    </div>
</div>

<div class="modal" id="afterRedirectModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Redirection</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <ul id="afterRedirectUL">
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                    <li>test</li>
                </ul>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-primary" data-dismiss="modal" id="okReload">OK</button>
            </div>
        </div>
    </div>
</div>
</body>
</html>
