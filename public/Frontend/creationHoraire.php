<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <!-- Bootstrap -->
    <link rel="stylesheet" type="text/css" href="/css/bootstrap.min.css">

    <!-- FontAwesome -->
    <link href="/css/all.min.css" type="text/css" rel="stylesheet"> <!--load all styles -->
    <!-- Swipper -->
    <link rel="stylesheet" type="text/css" href="/css/Frontend/swiper.min.css"/> 
    <!-- CSS perso -->
    <link rel="stylesheet" type="text/css" href="/css/Frontend/Frontend.css">

    <!-- Polices -->
    <link href="https://fonts.googleapis.com/css2?family=Lato&family=Roboto:wght@500&display=swap" rel="stylesheet">
    
    <!-- Librairies Javascript  -->
    <script src="/js/lib/jquery.min.js"></script>
    <script src="/js/lib/bootstrap.min.js"></script>
    <script src="/js/lib/all.min.js"></script>
    <script type="module" src="/js/Frontend/Horaire.js"></script>

    <title>Journée Immersion HEPL</title>
</head>
<body>
    <?php require(__DIR__ . "/../php/inc/nav.php") ?>
    <section id="jour-plage-horaire" class="py-5">
        <div class="container-fluid">
            <div class="row">
                <div class="col">
                    <h2 class="pl-5">Jours disponibles</h2>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row align-items-center">
                <div id="liste-jours-immersion" class="col-12">
                    <!-- Boutons choix des jours -->
                </div>
            </div>
        </div>
    </section>
    <section id="" class="py-5 plages-horaire ">
        <!-- Plage avec template -->
    </section>
    <section id="zone-confirmation" class="py-5">
        <div class="container-fluid">
            <div class="row">
                <div class="col-12">
                    <button id="btn-confirmation" class="btn-jour btn-lg btn-outline my-2 mx-auto btn-block" style="width: 400px">Terminer</button>
                </div>
            </div>
        </div>
    </section>
</body>

<template id="carteDisponibleTemplate">
    <div class="swiper-slide">
        <div id="" class="carte-cours">
            <div class="r-btn">
                <button type="button"> 
                    <i class="fas fa-plus-circle"></i>
                </button>
            </div>
            <div class="nb-place-dispo">
                <span class="badge badge-pill badge-primary ">7/10</span>
            </div>                  
            <div class="info-cours">
                <div class="row">
                    <div class="col-12 pl-4 titre">
                        <p>C++</p>
                    </div>
                </div>
                <div class="row">
                    <div class=" col-12 px-4 description">
                        <p>Le cours est donné en :</p>
                        <span class="badge badge-pill badge-primary gestion">Gestion</span>
                        <span class="badge badge-pill badge-success indus">Indus</span>
                        <span class="badge badge-pill badge-danger reseau">Réseau</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<template id="carteChoisieTemplate">
    <div id="" class="carte-cours-choisi">
        <div class="r-btn">
            <i class="fas fa-check-circle"></i>
        </div>
        <div class="r-btn-close">
            <button>
                <i class="fas fa-times-circle"></i>
            </button>
        </div>                  
        <div class="info-cours">
            <div class="row">
                <div class="col-12 pl-4 titre">
                    <p>C++</p>
                </div>
            </div>
            <div class="row">
                <div class=" col-12 px-4 description">
                    <p>Le cours est donné en :</p>
                    <span class="badge badge-pill badge-primary gestion">Gestion</span>
                    <span class="badge badge-pill badge-success indus">Indus</span>
                    <span class="badge badge-pill badge-danger reseau">Réseau</span>
                </div>
            </div>
        </div>
    </div>
</template>

<template id="carteIndisponibleTemplate">
    <div class="swiper-slide">
        <div class="carte-cours-indisponible">             
            <div class="row">
                <div class="info-cours">
                    <div class="description">
                        <p>Cours indisponible pour cette plage horaire</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<template id="carteIndisponibleTemplate">
    <div class="swiper-slide">
        <div class="carte-cours-indisponible">             
            <div class="row">
                <div class="info-cours">
                    <div class="description">
                        <p>Cours indisponible pour cette plage horaire</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<template id="plageHoraireTemplate">
    <div id="" class="container-fluid mb-5">
        <div class="row">
            <div class="title ml-5 col-12">
                <h2>Plage horaire 1 (obligatoire)</h2>
                <div class="title-underline "></div>
            </div>
        </div>
        <div class="row">
            <div class="col-12 col-md-6 col-lg-5 mt-3 mx-auto" >
                <div id="drop" class="row zone-drop ml-5">
                </div>
            </div>
            <div class="col-12 col-md-6 mx-auto col-lg-7 mt-3" >
                <div id="slider">
                    <div class="swiper-container">
                        <div class="swiper-wrapper">
                            <!-- SLides -->
                        </div>
                        <div class="swiper-pagination"></div>
                        <div class="swiper-button-prev"></div>
                        <div class="swiper-button-next"></div>
                    </div>
                </div>
            </div>      
        </div>
    </div>
</template>

<template id="recapTemplate">
    <section id="zone-recap">
        <div class="container-fluid py-3">
            <div class="row text-center">
                <div class="col">
                    <h1 class="display-4">Recapitulatif</h1>
                </div>
            </div>
            <div id="zone-journee" class="row container-fluid">
                <!-- Une Journee recap -->
            </div>
        </div>
    </section>
</template>

<template id="recapJourneeTemplate">
    <div class="col-12 col-md-6 col-lg-6 my-3 journee">
        <!-- Titre : jour n + date -->
        <div class="row mb-4 titre-jour">
            <h2 class="pl-4">Jour 1 : </h2>
        </div>
        <div class="row container liste-plage">
            <!-- Une plage horaire recap -->
        </div>
    </div>
</template>

<template id="recapPlageTemplate">
    <div class="col-6 col-md-12 col-xl-6 mb-4 plage">
        <div class="row numero-plage">
            <h3 class="pl-4">Plage 1</h3>
        </div>
        <!-- Liste de cours choisi -->
        <div class="row cours">
        </div>
    </div>
</template>

<template id="carteRecapTemplate">
    <div id="" class="carte-cours-recap">
        <div class="r-btn">
            <i class="fas fa-check-circle"></i>
        </div>          
        <div class="info-cours">
            <div class="row">
                <div class="col-12 pl-4 titre">
                    <p>C++</p>
                </div>
            </div>
            <div class="row">
                <div class="col-12 px-4 description">
                    <p>Le cours est donné en :</p>
                    <span class="badge badge-pill badge-primary gestion">Gestion</span>
                    <span class="badge badge-pill badge-success indus">Indus</span>
                    <span class="badge badge-pill badge-danger reseau">Réseau</span>
                </div>
            </div>
        </div>
    </div>
</template>

<template id="inscriptionTemplate">
    <footer id="zone-info-eleve">
        <div class="container-fluid pb-3">
            <div id="zone-info" class="row text-center">
                <div class="col-12">
                    <div class="row">
                        <div class="col-md-12 my-3">
                            <div class="card card-body">
                                <div class="card-title text-center">
                                    <h1 class="display-5">Confirmation de l'inscription</h1>
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
    </footer>
</template>