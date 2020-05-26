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
            <div class="card-body">
                <h5 class="card-title">Liste des inscrits</h5>
                <div class="form-row">
                    <div class="input-group mt-3">
                        <div class="input-group-prepend">
                            <span class="input-group-text">
                                <h4>Filtre: </h4>
                                <i class="fas fa-envelope"></i></span>
                        </div>
                        <input type="text" class="form-control form-control-lg" placeholder="Encodez La 1ere lettre du nom de famille" id="InputNom">
                    </div>
                </div>
                <div class="liste">

                </div>
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
            <tfoot>
                <td colspan = '100%'><a target="_blank" href="" class="btn btn-outline-primary data-attestationjour">attestation de la journée</a> </td>
            </tfoot>
        </table>
</template>

<template id="templateEleve">
    <div class="card" style="width: 100%;">
        <div class="card-body">
            <h3 class="card-title data-entete">Albert Einstein</h3>
            <div class="card-content data-horaires">

            </div>
            <div class="card-footer">
                <a target="_blank" class="btn btn-outline-primary data-attestationEtudiant" href="">Attestation de l'etudiant</a>
                <a target="_blank" class="btn btn-outline-primary data-ProgrammeEtudiant" href="">Programme de l'etudiant (PDF)</a>

                <div class="data-confirm-delete" style="display: inline">
                    <button class="card-link btn btn-success data-canceldelete" >Annuler supression</button>
                    <button class="card-link btn btn-danger data-redelete" >Valider supression</button>
                </div>
                <button class="card-link btn btn-danger data-delete" >Supprimer</button>
            </div>
        </div>
    </div>
</template>

</html>
