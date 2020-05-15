<!doctype html>
<html lang="fr">
<head>
    <?php
    require("./../php/inc/head.php");
    require_once("./../php/includes.php");
    ?>
    <script type="module" src="/js/Backend/DashBoard.js"></script>
    <link rel="stylesheet" href="/css/dashboard.css">

    <title>Inpres Immersion</title>
</head>
<body>
<?php require(__DIR__ . "/../php/inc/BackendNav.php") ?>

<?php
try {
    $db = new DataBase();
    $sql = "SELECT DATE_FORMAT(Date, '%d/%m/%Y', 'fr_FR') as 'Date'
                            FROM inscritscours
                            INNER JOIN coursimmersion ON (Horaire = coursimmersion.ID)
                            GROUP BY Date;";
    $stm = $db->connection->prepare($sql);
    $stm->execute(array());
    $res = $stm->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die($e->getMessage());
}
?>

<div class="card col-md-10 centre mt-5">
    <div class="card-body">
        <h2 class="card-title">Liste des jours d'immersion</h2>
        <ul>
            <?php foreach ($res as $jour){?>
                <li>
                    <a class="btn btn-perso m-2" target="_blank" href="/Backend/Export/ExportPdf.php?date=<?php echo($jour['Date'])?>" class="btn"><?php echo($jour['Date']) ?></a>
                </li>
            <?php }?>
            <li>
                <a class="btn btn-perso m-2" target="_blank" href="/Backend/Export/ExportPdf.php" class="btn">Toutes les attestations</a>
            </li>
        </ul>
    </div>
</div>
</body>
</html>
