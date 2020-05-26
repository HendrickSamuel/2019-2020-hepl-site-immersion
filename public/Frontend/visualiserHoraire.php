<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Bootstrap -->
    <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css">

    <!-- FontAwesome -->
    <link href="/css/all.min.css" type="text/css" rel="stylesheet"> <!--load all styles -->
    
    <!-- CSS perso -->
    <link rel="stylesheet" type="text/css" href="/css/Frontend/Frontend.css">
    
    <!-- Polices -->
    <link href="https://fonts.googleapis.com/css2?family=Lato&family=Roboto:wght@500&display=swap" rel="stylesheet">
    
    <!-- Librairies Javascript  -->
    <script src="/js/lib/jquery.min.js"></script>
    <script src="/js/lib/bootstrap.min.js"></script>
    <script src="/js/lib/all.min.js"></script>
    <script type="module" src="/js/Frontend/VisualisationHoraire.js"></script>

    <title>Horaire Journée Immersion HEPL</title>
</head>
<body>
    <?php require(__DIR__ . "/../php/inc/nav.php") ?>
    <section id="zone-info-eleve">
        <div class="container-fluid pb-3">
            <div id="zone-info" class="row text-center">
                <div class="col-12">
                    <div class="row">
                        <div class="col-md-12 my-3">
                            <div class="card card-body">
                                <div class="card-title text-center">
                                    <h1 class="display-5">Encoder votre mail pour accéder à votre horaire</h1>
                                    <div class="title-underline-center"></div>
                                </div>
                                <form id="form-email">
                                    <!-- Email -->
                                    <div class="col-12 col-xl-6 mx-xl-auto">
                                        <div class="input-group mt-3">
                                            <div class="input-group-prepend">
                                                <span class="input-group-text"><i class="fas fa-envelope"></i></span>
                                            </div>
                                            <input type="email" class="form-control form-control-lg" placeholder="email *" id="email" name="email" required>
                                        </div>
                                    </div>
                                    <!-- Boutons -->
                                    <div class="form-row">
                                        <div class="col-12 col-md-6 col-lg-6 mx-lg-auto">
                                            <button id="btn-confirmer-mail" type="submit" name="btn-confirmer-mail" class="btn-lg btn-jour btn btn-outline mx-auto text-uppercase mt-4 mb-2">confirmer</button>
                                        </div>
                                    </div>   
                                </form>
                            </div>

                        </div>
                    </div> 
                </div>
                <div class="col-12 col-md-6 col-lg-6 mx-lg-auto">
                    <a id="btn-horaire" href="#" class="btn-lg btn-jour btn btn-outline mx-auto text-uppercase mt-4 mb-2">Afficher mon horaire</a>
                </div>
            </div>
        </div>    
    </section>
</body>