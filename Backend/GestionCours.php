<!doctype html>
<html lang="fr">
<head>
    <script type="module" src="https://unpkg.com/ionicons@5.0.0/dist/ionicons/ionicons.esm.js"></script>
    <?php
    require(__DIR__."/../php/inc/head.php");
    ?>
    <script type="module" src="/js/Backend/Cours.js"></script>
    <link rel="stylesheet" href="/css/dashboard.css">

    <title>Inpres Immersion</title>
</head>
<body>
<?php require(__DIR__."/../php/inc/BackendNav.php") ?>
<div id="test"></div>
<div class="page">

    <div class="pagecontent">
        <div class="card col-md-10 centre">
            <div class="card-body">
                <h5 class="card-title">Liste des cours</h5>
                <table class="tg" id="CourseTable">
                    <thead>
                    <tr>
                        <th>ID</th>
                        <th>Cours</th>
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

<!-- Modal -->
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

<div class="modal fade" id="addModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Ajout</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="addForm" action="">
                    <label for="addinputnom">Nom du Cours: </label>
                    <input id="addinputnom" type="text">
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                <input type="submit" form="addForm" class="btn btn-success" value="Valider">
            </div>
        </div>
    </div>
</div>

<div class="modal fade" id="updateModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLongTitle">Modification</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <form id="updateForm" action="">
                    <label for="updateinputnom">Nom du Cours: </label>
                    <input id="updateinputnom" type="text">
                </form>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-danger" data-dismiss="modal">Annuler</button>
                <input type="submit" class="btn btn-success" form="updateForm" value="Valider">
            </div>
        </div>
    </div>
</div>
</body>
</html>
