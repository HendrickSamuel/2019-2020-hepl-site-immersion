<?php
require_once("./../includes.php");
header("Content-Type:application/json");

$nom = $_POST['Nom'];
$ID = $_POST['ID'];
$action = $_POST['action'];

$result["result"] = true;
$result["action"] = $_POST["action"];

if (isset($action) && !empty($action)) {
    $db = new DataBase();
    switch ($action) {
        case "SELECT":
            try {
                $stm = $db->connection->query("SELECT * FROM profs");
                $result["returnval"] = $stm->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                $result["result"] = false;
                $result["message"] = $e->getMessage();
            }
            break;

        case "INSERT":
            if (isset($nom) && !empty($nom)) {
                try {
                    $sql = "INSERT INTO profs (Nom) VALUES (?)";
                    $stm = $db->connection->prepare($sql);
                    $stm->execute([$nom]);

                    $sql = "SELECT * FROM profs WHERE ID = (SELECT max(ID) FROM profs WHERE nom = ?)";
                    $stm = $db->connection->prepare($sql);
                    $stm->execute([$nom]);
                    $result["returnval"] = $stm->fetchAll(PDO::FETCH_ASSOC);
                } catch (PDOException $e) {
                    $result["result"] = false;
                    $result["message"] = $e->getMessage();
                }
            } else {
                $result["result"] = false;
                $result["message"] = "missing name for insert";
            }

            break;

        case "DELETE":
            if (isset($ID) && !empty($ID)) {
                try {
                    $sql = "SELECT * FROM profs WHERE ID = ?";
                    $stm = $db->connection->prepare($sql);
                    $stm->execute([$ID]);
                    $result["returnval"] = $stm->fetchAll(PDO::FETCH_ASSOC);

                    $sql = "DELETE FROM profs WHERE ID = ?"; // verifier sur nom et ID pour etre sur ?
                    $stm = $db->connection->prepare($sql);
                    $stm->execute([$ID]);
                } catch (PDOException $e) {
                    $result["result"] = false;
                    $result["message"] = $e->getMessage();
                }
            } else {
                $result["result"] = false;
                $result["message"] = "missing id for delete";
            }
            break;

        case "UPDATE":
            if (isset($ID, $nom) && !empty($ID) && !empty($nom)) {
                try {
                    $sql = "SELECT * FROM profs WHERE ID = ?";
                    $stm = $db->connection->prepare($sql);
                    $stm->execute([$ID]);
                    $result["returnval"] = $stm->fetchAll(PDO::FETCH_ASSOC);

                    $sql = "UPDATE profs set Nom=?  WHERE ID = ?";
                    $stm = $db->connection->prepare($sql);
                    $stm->execute([$nom, $ID]);
                } catch (PDOException $e) {
                    $result["result"] = false;
                    $result["message"] = $e->getMessage();
                }
            } else {
                $result["result"] = false;
                $result["message"] = "missing id and name for update";
            }
            break;
        default:
            $result["result"] = false;
            $result["message"] = "wrong action";
    }
} else {
    $result["result"] = false;
    $result["message"] = "missing action";
}

echo json_encode($result);
