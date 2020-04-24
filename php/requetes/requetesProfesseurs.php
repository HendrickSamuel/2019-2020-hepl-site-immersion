<?php
require_once ("./../includes.php");
header("Content-Type:application/json");

$nom = $_POST['Nom'];
$ID = $_POST['ID'];

$result["result"] = true;

if(isset($ID , $nom) && !empty($nom))
{
    $db = new DataBase();
    switch ($_POST['action'])
    {
        case "ADD":
            try{
                $sql = "INSERT INTO profs (Nom) VALUES (?)";
                $stm = $db->connection->prepare($sql);
                $stm->execute([$nom]);
            }
            catch(PDOException $e){
                $result["result"] = false;
                $result["message"] = $e->getMessage();
            }
            break;

        case 'DELETE':
            try{
                $sql = "DELETE FROM profs (Nom) WHERE ID = ?"; // verifier sur nom et ID pour etre sur ?
                $stm = $db->connection->prepare($sql);
                $stm->execute([$nom]);
            }
            catch(PDOException $e){
                $result["result"] = false;
                $result["message"] = $e->getMessage();
            }
            break;

        case 'UPDATE':
            try{
                $sql = "UPDATE profs set Nom=?  WHERE ID = ?";
                $stm = $db->connection->prepare($sql);
                $stm->execute([$nom,$ID]);
            }
            catch(PDOException $e){
                $result["result"] = false;
                $result["message"] = $e->getMessage();
            }
            break;
        default: echo "ta";
    }
}
else
{
    $result["result"] = false;
    $result["message"] = "missing info";
}

echo json_encode($result);
