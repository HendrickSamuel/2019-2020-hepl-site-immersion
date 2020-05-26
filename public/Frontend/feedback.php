<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Bootstrap -->
    <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css">

    <!-- FontAwesome -->
    <link href="/css/all.min.css" type="text/css" rel="stylesheet"> <!--load all styles -->

    <!-- Toaster -->
    <link rel="stylesheet" type="text/css" href="/css/toastr.min.css">

    <!-- CSS perso -->
    <link rel="stylesheet" type="text/css" href="/css/Frontend/Frontend.css">
    
    <!-- Polices -->
    <link href="https://fonts.googleapis.com/css2?family=Lato&family=Roboto:wght@500&display=swap" rel="stylesheet">
    
    <!-- Librairies Javascript  -->
    <script src="/js/lib/jquery.min.js"></script>
    <script src="/js/lib/bootstrap.min.js"></script>
    <script src="/js/lib/all.min.js"></script>
    <script src="/js/lib/md5.min.js"></script>
    <script src="/js/lib/toastr.min.js"></script>
    <script type="module" src="/js/Frontend/Feedback.js"></script>

    <title>Feedback Journée Immersion HEPL</title>
</head>

<body>
    <?php require(__DIR__ . "/../php/inc/nav.php") ?>
    
    <section class="container-fluid py-3">
        <div class="row text-center">
            <div class="col">
                <h1 class="display-4">A propos de la journée d'immersion</h1>
            </div>
        </div>
        <div class="my-4" id="zone-question">
            <form class="row text-center" id="form-question">
                <!-- Toutes les questions -->
                <div id="les-questions" class="col-12">
                    <!-- Une question -->
                </div>
                <!-- Les boutons de confirmation =>submit -->
                <div class="col-12 pb-3">
                    <button id="btn-confirmer" type="submit" name="btn-inscrire" class="btn-lg btn-jour btn btn-outline text-uppercase mt-2 mb-2">Confirmer les réponses</button>
                </div>
            </form>
        </div>
    </section>
    <section id="zone-info-eleve">
        <div class="container-fluid pb-3">
            <div id="zone-info" class="row text-center">
                <div class="col-12">
                    <div class="row">
                        <div class="col-md-12 my-3">
                            <div class="card card-body">
                                <div class="card-title text-center">
                                    <h1 class="display-5">Encoder votre mail pour accéder aux questions</h1>
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
            </div>
        </div>    
    </section>
</body>

<?php
if(isset($_GET['userKey']) && !empty($_GET['userKey']))
{
    ?>
    <input type="hidden" id="InputGetEmail" value="<?php echo $_GET['userKey']; ?>">
    <?php
}
?>

<template id="questionTemplate">
    <div id="" class="col-12 question  card my-3">
        <div class="row">
            <div class="titre-question col-12 px-4 pt-2">
            <h3>Comment était la journee ?</h3>
                <div class="title-underline-center"></div>
            </div>
        </div>
        <div class="row pt-4 pb-5">
            <div class="col-12 ressenti-dispo">
                <div class="r-btn-question">
                    <input type="radio" name="reponse-1" id="reponse-1-1" value="1" required>  
                    <label class="r-btn-insatisfait mr-3" for="reponse-1-1"><i class="far fa-3x fa-angry"></i></label>

                    <input type="radio" name="reponse-1" id="reponse-1-2" value="2" required>  
                    <label class="r-btn-meh mr-3" for="reponse-1-2"><i class="far fa-3x fa-meh"></i></label>

                    <input type="radio" name="reponse-1" id="reponse-1-3" value="3" required>  
                    <label class="r-btn-neutre mr-3" for="reponse-1-3"><i class="far fa-3x fa-smile"></i></label>

                    <input type="radio" name="reponse-1" id="reponse-1-4" value="4" required>  
                    <label class="r-btn-satisfait mr-3" for="reponse-1-4"><i class="far fa-3x fa-smile-beam"></i></label>

                    <input type="radio" name="reponse-1" id="reponse-1-5"value="5" required>  
                    <label class="r-btn-heureux mr-3" for="reponse-1-5"><i class="far fa-3x fa-grin-stars"></i></label>
                </div>
            </div>
        </div>
    </div>
</template>