<?php
require_once("./../includes.php");
header("Content-Type:application/json");

$ID = $_POST['ID'];
$action = $_POST['action'];

$result["donnees"] = $_POST;
$result["result"] = true;
$result["action"] = $_POST["action"];

if (isset($action) && !empty($action)) {
    $db = new DataBase();
    switch ($action) {
        case "SELECT":
            try {
                $stm = $db->connection->query("SELECT *, ID as 'IDPrincipal' FROM Eleves");
                $result["returnval"] = $stm->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                $result["result"] = false;
                $result["message"] = $e->getMessage();
            }
            break;

        case "SELECTID":
            try {
                $sql = "SELECT *, ID as 'IDPrincipal' FROM Eleves WHERE ID = ?";
                $stm = $db->connection->prepare($sql);
                $stm->execute(array($ID));
                $result["returnval"] = $stm->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                $result["result"] = false;
                $result["message"] = $e->getMessage();
            }
            break;

        case "INSERT":
            if (isset($nom) && !empty($nom)) {
                try {
                    $sql = "INSERT INTO Eleves (Nom) VALUES (?)";
                    $stm = $db->connection->prepare($sql);
                    $stm->execute([$nom]);


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
                    $sql = "SELECT * FROM Eleves WHERE ID = ?";
                    $stm = $db->connection->prepare($sql);
                    $stm->execute([$ID]);
                    $result["returnval"] = $stm->fetchAll(PDO::FETCH_ASSOC);

                    $sql = "DELETE FROM Eleves WHERE ID = ?"; // verifier sur nom et ID pour etre sur ?
                    $stm = $db->connection->prepare($sql);
                    $res = $stm->execute([$ID]);

                    $res = true;
                    if(!$res)
                    {
                        $result["message"] = $stm->errorInfo();
                        $result["result"] = false;
                    }
                } catch (PDOException $e) {
                    $result["result"] = false;
                    $result["message"] = $e->getMessage();
                }
            } else {
                $result["result"] = false;
                $result["message"] = "missing id for delete";
            }
            break;

        case "GETIDFROMEMAIL":
            if (isset($Email) && !empty($Email)) {
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
