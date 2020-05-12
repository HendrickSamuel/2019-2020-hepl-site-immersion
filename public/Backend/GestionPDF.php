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

foreach ($res as $jour)
{?>
    <a target="_blank" href="/Backend/Export/ExportPdf.php?date=<?php echo($jour['Date'])?>" class="btn"><?php echo($jour['Date']) ?></a>
    
<?php
}

?>
<a target="_blank" href="/Backend/Export/ExportPdf.php" class="btn">Toutes les attestations</a>

</body>
</html>
