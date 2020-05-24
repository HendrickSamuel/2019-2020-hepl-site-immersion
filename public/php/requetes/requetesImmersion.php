<?php
require_once("./../includes.php");
header("Content-Type:application/json");


$insertParam = array("inputvisible"=>"can-empty","inputcours"=>"cant-empty",
        "inputprofesseur"=>"cant-empty","inputjour"=>"cant-empty","inputplage"=>"cant-empty","places"=>"cant-empty",
        "inputdebut"=>"cant-empty","inputfin"=>"cant-empty","inputbloc"=>"cant-empty","types"=>"cant-empty",
        "inputgroupe"=>"cant-empty","inputlocal"=>"cant-empty","inputgestion"=>"can-empty","inputindus"=>"can-empty","inputreseaux"=>"can-empty", "places"=>"cant-empty");
$deleteParam = array("ID"=>"cant-empty");
$getPlacesParam = array("ID"=>"cant-empty");
$moveParam = array("ID"=>"cant-empty", "IDTo"=>"cant-empty");
$vsibileParam = array("ID"=>"cant-empty", "Visibilite"=>"can-empty");

$vars = $_POST["Data"];
$action = $_POST["Action"];

$result["result"] = true;
$result["message"] = "";
$result["action"] = $_POST["Action"];

if (isset($action) && !empty($action)) {
    $db = new DataBase();
    switch ($action) {
        case "SELECT":
            try {
                $stm = $db->connection->query("SELECT *,coursimmersion.ID as 'IDPrincipal' FROM coursimmersion
                                              INNER JOIN profs ON (Professeur = profs.ID)
                                              INNER JOIN cours ON (Cours = cours.ID)
                                              ORDER BY Date;");
                $result["returnval"] = $stm->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                $result["result"] = false;
                $result["message"] = $e->getMessage();
            }
            break;
        case "SELECTPLACES":
            try {
                $sql = "SELECT *, PlacesTotal-PlacesDisponibles as 'PlacesPrises',
                        coursimmersion.ID as 'IDPrincipal' FROM coursimmersion
                        INNER JOIN profs ON (Professeur = profs.ID)
                        INNER JOIN cours ON (Cours = cours.ID)    
                        WHERE PlacesDisponibles >= (SELECT PlacesTotal-PlacesDisponibles
                        FROM coursimmersion WHERE ID = ?)
                        AND coursimmersion.ID <> ?
                        AND Visible = 1
                        AND Date = (SELECT Date FROM coursimmersion WHERE ID = ?)
                        AND PlageHoraire = (SELECT PlageHoraire FROM coursimmersion WHERE ID = ?);";
                $stm = $db->connection->prepare($sql);
                $stm->execute(array($vars["ID"],$vars["ID"],$vars["ID"], $vars["ID"]));
                $result["returnval"] = $stm->fetchAll(PDO::FETCH_ASSOC);
            } catch (PDOException $e) {
                $result["result"] = false;
                $result["message"] = $e->getMessage();
            }
            break;
        case "VISIBILITYCHANGE":
            $retour = verificateur($vars,$vsibileParam);
            if ($retour['value'] == true) {
                try {
                    $sql = "UPDATE coursImmersion
                            set visible = ?
                            WHERE ID = ?;";
                    $stm = $db->connection->prepare($sql);
                    $res = $stm->execute(array($vars["Visibilite"], $vars["ID"]));
                    if(!$res)
                    {
                        $result["message"] = $stm->errorInfo();
                        $result["result"] = false;
                    }
                } catch (PDOException $e) {
                    $result["result"] = false;
                    $result["message"] = $e->getMessage();
                }
            }
            else {
                $result["result"] = false;
                $result["message"] = $retour["message"];
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
                    $res = $stm->execute([$vars["inputvisible"],$vars["inputcours"],$vars["inputprofesseur"],$vars["inputjour"],$vars["inputplage"],
                        $vars["places"],$vars["places"],$vars["inputdebut"],$vars["inputfin"],$vars["inputbloc"],$vars["types"],$vars["inputgroupe"],
                        $vars["inputlocal"],$vars["inputgestion"],$vars["inputindus"],$vars["inputreseaux"]]);

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
                    $sql = "DELETE FROM coursimmersion WHERE ID = ?";
                    $stm = $db->connection->prepare($sql);
                    $res = $stm->execute([$vars["ID"]]);
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
        case "MOVE":
            $retour = verificateur($vars,$moveParam);
            if ($retour['value'] == true) {
                try {
                    $sql = "SELECT * FROM inscritscours 
                            INNER JOIN eleves ON (Etudiant = eleves.ID)
                            WHERE Horaire = ?;";
                    $stm = $db->connection->prepare($sql);
                    $stm->execute(array($vars["ID"]));
                    $result["returnval"] = $stm->fetchAll(PDO::FETCH_ASSOC); //tous les eleves déplacés

                    $sql = "UPDATE inscritscours SET Horaire = ? WHERE Horaire = ?;"; // verifier sur nom et ID pour etre sur ?
                    $stm = $db->connection->prepare($sql);
                    $res = $stm->execute([$vars["IDTo"], $vars["ID"]]);
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
