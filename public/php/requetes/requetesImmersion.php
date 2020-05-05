<?php
require_once("./../includes.php");
header("Content-Type:application/json");


$insertParam = array("Visible"=>"can-empty","IDCours"=>"cant-empty",
        "IDProfesseur"=>"cant-empty","Date"=>"cant-empty","PlageHoraire"=>"cant-empty","Places"=>"cant-empty",
        "HeureDebut"=>"cant-empty","HeureFin"=>"cant-empty","Bloc"=>"cant-empty","Type"=>"cant-empty",
        "Groupe"=>"cant-empty","Local"=>"cant-empty","Gestion"=>"can-empty","Indus"=>"can-empty","Reseau"=>"can-empty");
$deleteParam = array("IDCours","IDProfesseur","Date","PlageHoraire");

$vars = $_POST;
$action = $_POST["Action"];

$result["input"] = $vars;
$result["result"] = true;
$result["message"] = "";
$result["action"] = $_POST["Action"];

if (isset($action) && !empty($action)) {
    $db = new DataBase();
    switch ($action) {
        case "SELECT":
            try {
                $stm = $db->connection->query("SELECT * FROM coursimmersion
                                                INNER JOIN profs ON (Professeur = profs.ID)
                                                INNER JOIN cours ON (Cours = cours.ID);");
                $result["returnval"] = $stm->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                $result["result"] = false;
                $result["message"] = $e->getMessage();
            }
            break;

        case "INSERT":
            $retour = verificateur($vars,$insertParam);
            if ($retour['value'] == true) {
                try {
                    $sql = "INSERT INTO coursimmersion 
                            (Visible,Cours,Professeur,Date,PlageHoraire,PlacesDisponibles,PlacesTotal,HeureDebut,HeureFin,bloc,type,Groupe,Local,Gestion,Indus,Reseau) 
                            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
                    $stm = $db->connection->prepare($sql);
                    $res = $stm->execute([$vars["Visible"],$vars["IDCours"],$vars["IDProfesseur"],$vars["Date"],$vars["PlageHoraire"],
                        $vars["Places"],$vars["Places"],$vars["HeureDebut"],$vars["HeureFin"],$vars["Bloc"],$vars["Type"],$vars["Groupe"],
                        $vars["Local"],$vars["Gestion"],$vars["Indus"],$vars["Reseau"]]);

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
                $result["message"] = $retour["message"];
            }

            break;
        case "DELETE":
            $retour = verificateur($vars,$deleteParam);
            if ($retour['value'] == true) {
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
                $result["message"] = $retour["message"];
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

function verificateur($entree,$parametres)
{
    $ret["message"] = "";
    foreach($parametres as $param => $state){
        if(!isset($entree[$param])){
            $ret["message"] .= "not set: ".$param.", ";
        }
        else
        if($state == "cant-empty" && empty($entree[$param]))
        {
            $ret["message"] .= "empty: ".$param.", ";
        }
    }

    if(isset($ret["message"]) && !empty($ret["message"]))
        $ret['value'] = false;
    else
        $ret['value'] = true;

    return $ret;
}
