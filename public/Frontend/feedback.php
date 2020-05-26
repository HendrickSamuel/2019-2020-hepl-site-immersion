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
        <div class="card my-4" id="zone-question">
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
</body>

<template id="questionTemplate">
<div id="" class="col-12 question pt-3">
    <div class="row">
        <div class="titre-question col-12 px-4 py-0">
        <h3>Comment était la journee ?</h3>
            <div class="title-underline-center"></div>
        </div>
    </div>
    <div class="row pt-4 pb-5">
        <div class="col-12 ressenti-dispo">
            <div class="r-btn-question">
                <input type="radio" name="reponse-1" id="reponse-1-1" value="1">  
                <label class="r-btn-insatisfait mr-3" for="reponse-1-1"><i class="fas fa-3x fa-angry"></i></label>

                <input type="radio" name="reponse-1" id="reponse-1.2" value="2">  
                <label class="r-btn-meh mr-3" for="reponse-1-2"><i class="fas fa-3x fa-meh"></i></label>

                <input type="radio" name="reponse-1" id="reponse-1-3" value="3">  
                <label class="r-btn-neutre mr-3" for="reponse-1-3"><i class="fas fa-3x fa-smile"></i></label>

                <input type="radio" name="reponse-1" id="reponse-1-4" value="4">  
                <label class="r-btn-satisfait mr-3" for="reponse-1-4"><i class="fas fa-3x fa-smile-beam"></i></label>

                <input type="radio" name="reponse-1" id="reponse-1-5"value="5">  
                <label class="r-btn-heureux mr-3" for="reponse-1-5"><i class="fas fa-3x fa-grin-stars"></i></label>
            </div>
        </div>
    </div>
</div>
</template>