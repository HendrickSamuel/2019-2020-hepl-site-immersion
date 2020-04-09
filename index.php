<!DOCTYPE html>
<html lang="fr">
<head>
    <?php
        require(__DIR__."/php/inc/head.php");
        require_once (__DIR__."/php/includes.php");
    ?>
    <title>Accueil</title>
</head>
<body>
    <?php require(__DIR__."/php/inc/nav.php"); ?>
    <?php
        $db = new DataBase();
        $stm = $db->connection->query("SELECT * FROM cours order by ID");

        $rows = $stm->fetchAll(PDO::FETCH_ASSOC);

        foreach($rows as $row) {
            echo($row['ID']." - ".$row['Intitule'] . "</br>");
        }
    ?>
</body>

</html>