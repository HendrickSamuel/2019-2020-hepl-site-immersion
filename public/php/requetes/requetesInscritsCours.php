<?php
require_once("./../includes.php");
header("Content-Type:application/json");


//$insertParam = array("IDCours","IDProfesseur","Date","PlageHoraire","Places","HeureDebut","HeureFin","Bloc","Type");
//$deleteParam = array("IDCours","IDProfesseur","Date","PlageHoraire");

$vars = $_POST;
$action = $_POST["Action"];

$result["result"] = true;
$result["action"] = $_POST["Action"];

if (isset($action) && !empty($action)) {
    $db = new DataBase();
    switch ($action) {
        case "SELECT":
            try {
                $stm = $db->connection->query("SELECT * FROM inscritscours order by(Etudiant)");
                $result["returnval"] = $stm->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                $result["result"] = false;
                $result["message"] = $e->getMessage();
            }
            break;

        case "SELECTALL":
            try {
                $stm = $db->connection->query("SELECT *, DATE_FORMAT(Date, '%d/%m/%Y', 'fr_FR') as 'Date' FROM inscritscours
                                              INNER JOIN coursimmersion ON (Horaire = coursimmersion.ID)
                                              INNER JOIN cours ON (Cours = cours.ID)
                                              INNER JOIN profs On (Professeur = profs.ID)                                              
                                              ORDER BY Etudiant,Date,PlageHoraire;");
                $result["returnval"] = $stm->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                $result["result"] = false;
                $result["message"] = $e->getMessage();
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
