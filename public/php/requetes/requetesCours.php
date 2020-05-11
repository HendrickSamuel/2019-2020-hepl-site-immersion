<?php
require_once("./../includes.php");
header("Content-Type:application/json");

$intitule = $_POST['Intitule'];
$ID = $_POST['ID'];
$action = $_POST['action'];

$result["result"] = true;
$result["action"] = $_POST["action"];

if (isset($action) && !empty($action)) {
    $db = new DataBase();
    switch ($action) {
        case "SELECT":
            try {
                $stm = $db->connection->query("SELECT * FROM cours");
                $result["returnval"] = $stm->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                $result["result"] = false;
                $result["message"] = $e->getMessage();
            }
            break;

        case "INSERT":
            if (isset($intitule) && !empty($intitule)) {
                try {
                    $sql = "INSERT INTO cours (Intitule) VALUES (?);";
                    $stm = $db->connection->prepare($sql);
                    $res = $stm->execute([$intitule]);

                    if(!$res)
                    {
                        $result["message"] = $stm->errorInfo();
                        $result["result"] = false;
                    }
                    else
                    {
                        $sql = "SELECT * FROM cours WHERE ID = ?;";
                        $stm = $db->connection->prepare($sql);
                        $stm->execute([$db->connection->lastInsertId()]);
                        $result["returnval"] = $stm->fetchAll(PDO::FETCH_ASSOC);
                    }
                } catch (PDOException $e) {
                    $result["result"] = false;
                    $result["message"] = $e->getMessage();
                }
            } else {
                $result["result"] = false;
                $result["message"] = "missing course name for insert";
            }

            break;

        case "DELETE":
            if (isset($ID) && !empty($ID)) {
                try {
                    $sql = "SELECT * , ID as 'IDPrincipal' FROM cours WHERE ID = ?";
                    $stm = $db->connection->prepare($sql);
                    $stm->execute([$ID]);
                    $result["returnval"] = $stm->fetchAll(PDO::FETCH_ASSOC);

                    $sql = "DELETE FROM cours WHERE ID = ?"; // verifier sur nom et ID pour etre sur ?
                    $stm = $db->connection->prepare($sql);
                    $res = $stm->execute([$ID]);
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

        case "UPDATE":
            if (isset($ID, $intitule) && !empty($ID) && !empty($intitule)) {
                try {
                    $sql = "SELECT * FROM cours WHERE ID = ?";
                    $stm = $db->connection->prepare($sql);
                    $stm->execute([$ID]);
                    $result["returnval"] = $stm->fetchAll(PDO::FETCH_ASSOC);

                    $sql = "UPDATE cours set Intitule=?  WHERE ID = ?";
                    $stm = $db->connection->prepare($sql);
                    $res = $stm->execute([$intitule, $ID]);
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
                $result["message"] = "missing id and course name for update";
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
