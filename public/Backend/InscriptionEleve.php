<!doctype html>
<html lang="en">
<head>
    <?php require(__DIR__ . "/../php/inc/head.php"); ?>

    <!-- CSS perso -->
    <link rel="stylesheet" type="text/css" href="/css/Frontend/Frontend.css">

    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
<?php require(__DIR__ . "/../php/inc/BackendNav.php") ?>

<div>
    <div class="container-fluid pb-3">
        <div id="zone-info" class="row text-center">
            <div class="col-12">
                <div class="row">
                    <div class="col-md-12 my-3">
                        <div class="card card-body">
                            <div class="card-title text-center">
                                <h1 class="display-5">Inscription</h1>
                                <div class="title-underline-center"></div>
                            </div>
                            <form id="form-inscription">
                                <!-- Nom + Prenom -->
                                <div class="col-12 col-xl-6 mx-xl-auto">
                                    <div class="input-group mt-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fas fa-user"></i></span>
                                        </div>
                                        <input type="text" class="form-control form-control-lg" placeholder="Encodez votre nom *" id="nom" name="nom">
                                        <input type="text" class="form-control form-control-lg" placeholder="Encodez votre prenom *" id="prenom" name="prenom">
                                    </div>
                                </div>
                                <!-- Ecole -->
                                <div class="col-12 col-xl-6 mx-xl-auto">
                                    <div class="input-group mt-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fas fa-school"></i></span>
                                        </div>
                                        <input type="text" class="form-control form-control-lg" placeholder="Encodez le nom de votre établisement scolaire *" id="ecole" name="ecole">
                                    </div>
                                </div>
                                <!-- Email -->
                                <div class="col-12 col-xl-6 mx-xl-auto">
                                    <div class="input-group mt-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                        </div>
                                        <input type="email" class="form-control form-control-lg" placeholder="Encodez votre email *" id="email" name="email">
                                    </div>
                                </div>
                                <!-- Section -->
                                <div class="col-12 col-xl-6 mx-xl-auto">
                                    <div class="input-group mt-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fas fa-desktop"></i></span>
                                        </div>
                                        <select class="form-control form-control-lg" id="liste-section" name="interet">
                                            <option value="Gestion">Informatique de gestion</option>
                                            <option value="Indus">Informatique industrielle</option>
                                            <option value="Reseau">Réseaux et télécommunications</option>
                                        </select>
                                    </div>
                                    <p class="text-left my-2">Choissisez une section parmi les 3 disponibles *</p>
                                </div>
                                <!-- PlagesHoraires -->
                                <div class="col-12 col-xl-6 mx-xl-auto">
                                    <div class="input-group mt-3">
                                        <div class="input-group-prepend">
                                            <span class="input-group-text"><i class="fas fa-clock"></i></span>
                                        </div>
                                        <select class="form-control form-control-lg" id="liste-plages" name="plages">
                                            <option value="3">3 premieres plages de la journée</option>
                                            <option value="4">4 premieres plages de la journée</option>
                                        </select>
                                    </div>
                                    <p class="text-left my-2">Choissisez les plages a remplir *</p>
                                </div>

                                <!-- Boutons -->
                                <div class="form-row">
                                    <div class="col-12 col-md-6 col-lg-6 mx-lg-auto">
                                        <button id="btn-inscrire" type="submit" name="btn-inscrire" class="btn-lg btn-jour btn btn-outline mx-auto text-uppercase mt-4 mb-2">s'inscrire</button>
                                    </div>
                                    <div class="col-12 col-md-6 col-lg-6 mx-lg-auto">
                                        <button id="btn-annuler" name="btn-annuler" type="button" class="btn-lg btn btn-jour btn-outline mx-auto text-uppercase mt-4 mb-2">annuler</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="ReceptacleResultat">

</div>

</body>

<script src="/js/Backend/InscriptionEleve.js" type="module"></script>
</html>