<!doctype html>
<html lang="fr">
<head>
    <?php
        require(__DIR__ . "/../php/inc/head.php");
    ?>
    <script type="module" src="/js/Backend/DashBoard.js"></script>
    <link rel="stylesheet" href="/css/dashboard.css">

    <title>Inpres Immersion</title>
</head>
<body>
    <?php require(__DIR__ . "/../php/inc/BackendNav.php") ?>
    <div class="page">
        <div class="sidebar ">
            <h4 class="centre-text">Quick clicks</h4>

            <div class="card">
                <div class="card-body">
                    Autoriser les inscriptions
                    <br>
                    <label class="switch">
                        <input type="checkbox">
                        <span></span>
                    </label>
                </div>
            </div>

            <div class="card">
                <div class="card-body">
                    Autre parametre
                    <br>
                    <label class="switch">
                        <input type="checkbox">
                        <span></span>
                    </label>
                </div>
            </div>
        </div>

        <div class="pagecontent">

        </div>
    </div>
</body>
</html>
