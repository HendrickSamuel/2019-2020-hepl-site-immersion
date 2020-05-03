<?php
require_once("./../includes.php");
header("Content-Type:application/json");


$insertParam = array("IDCours","IDProfesseur","Date","PlageHoraire","Places","HeureDebut","HeureFin","Bloc","Type");
$deleteParam = array("IDCours","IDProfesseur","Date","PlageHoraire");

$vars = $_POST;
$action = $_POST["Action"];

$result["result"] = true;
$result["action"] = $_POST["Action"];

if (isset($action) && !empty($action)) {
    $db = new DataBase();
    switch ($action) {
        case "SELECT":
            try {
                $stm = $db->connection->query("SELECT * FROM coursdisponibles");
                $result["returnval"] = $stm->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                $result["result"] = false;
                $result["message"] = $e->getMessage();
            }
            break;

        case "INSERT":
            if (verificateur($vars,$insertParam,$result)) {
                try {
                    $sql = "INSERT INTO coursimmersion 
                            (Cours,Professeur,Date,PlageHoraire,PlacesDisponibles,PlacesTotal,HeureDebut,HeureFin,bloc,type) 
                            VALUES (?,?,?,?,?,?,?,?,?,?)";
                    $stm = $db->connection->prepare($sql);
                    $res = $stm->execute([$vars["IDCours"],$vars["IDProfesseur"],$vars["Date"],$vars["PlageHoraire"],
                        $vars["Places"],$vars["Places"],$vars["HeureDebut"],$vars["HeureFin"],$vars["Bloc"],$vars["Type"]]);

                    if(!$res)
                    {
                        $result["message"] = $stm->errorInfo();
                        $result["result"] = false;
                    }
                    else
                    {
                        $result["id"] = $db->connection->lastInsertId();
                        /*$sql = "SELECT * FROM cours WHERE ID = (SELECT max(ID) FROM cours WHERE intitule = ?)";
                        $stm = $db->connection->prepare($sql);
                        $stm->execute([$intitule]);
                        $result["returnval"] = $stm->fetchAll(PDO::FETCH_ASSOC);*/
                    }

                } catch (PDOException $e) {
                    $result["result"] = false;
                    $result["message"] = $e->getMessage();
                }
            } else {
                $result["result"] = false;
            }

            break;
        case "DELETE":
            if (verificateur($vars,$deleteParam,$result)) {
                try {
                    $sql = "DELETE FROM coursimmersion WHERE Cours = ? AND Professeur = ? AND Date = ? AND PlageHoraire = ?"; // verifier sur nom et ID pour etre sur ?
                    $stm = $db->connection->prepare($sql);
                    $res = $stm->execute([$vars["IDCours"],$vars["IDProfesseur"],$vars["Date"],$vars["PlageHoraire"]]);
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

function verificateur($entree,$parametres,$result)
{
    foreach($parametres as $param){
        if(!isset($entree[$param])){
            $result["message"] .= "not set: ".$param.", ";
        }
        else
        if(empty($entree[$param]))
        {
            $result["message"] .= "empty: ".$param.", ";
        }
    }

    if(isset($result["message"]) && !empty($result["message"]))
        return false;
    else
        return true;
}
