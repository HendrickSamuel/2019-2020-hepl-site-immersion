<?php 
    require_once("./../includes.php"); // Connexion BD
    header("Content-Type:application/json");

    $result["valid"] = true;
    $action = $_POST['action'];
    $result["action"] = $action;
    $varsEleveImmersion = $_POST["donneeEleve"];

    $insertParamEleveImmersion = array(
                                    "nom" => "/^[A-Za-z]+[\s\-A-Za-z]$/", 
                                    "prenom" => "/^[A-Za-z]+[\s\-A-Za-z]$/",
                                    "ecole" => "/^[A-Za-z][0-9A-Za-z\-\s]*[A-Za-z0-9]$/",
                                    "email" => "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/",
                                    "interet" => "/.*/"
    );

    if(isset($action) && !empty($action)){
        $db = new DataBase();
        switch ($action) {
            case 'INSERT_ELEVE':
                $retour = verificateurParamEleveImmersion($varsEleveImmersion, $insertParamEleveImmersion);
                if($retour["valid"] == true){
                    try {
                        $sql = "INSERT INTO eleves(Nom, Prenom, Etablissement, Email, Interet) VALUES (?, ?, ?, ?, ?)";
                        $stm = $db->connection->prepare($sql);
                        $res = $stm->execute([$varsEleveImmersion["nom"], $varsEleveImmersion["prenom"], $varsEleveImmersion["ecole"], $varsEleveImmersion["email"], $varsEleveImmersion["interet"]]);
                        if(!$res){
                            $result["message"] = $stm->errorInfo();
                            $result["valid"] = false;
                        }
                        else{
                            //Id de l'eleve pour ensuite faire l'insert de son horaire
                            $result["id"] = $db->connection->lastInsertId();
                        }
<<<<<<< HEAD




=======
>>>>>>> BranchBeneV2
                    } 
                    catch (PDOException $e) {
                        $result["valid"] = false;
                        $result["message"] = $e->getMessage();
                    }
                }
                else{
                    $result["valid"] = false;
                    $result["message"] = $retour["message"];
                }
                break;
            
            default:
                # code...
                break;
        }

    }
    else{
        $result["valid"] = false;
        $result["message"] = "action manquante";
    }
    echo json_encode($result);

    
    function verificateurParamEleveImmersion($data, $bonParametres){
        $retour["message"] = "";

        foreach ($bonParametres as $nomData => $regex) {
            if(!preg_match($regex, $data[$nomData])){
                $retour["message"] = `La valeur recue {$nomData} ne respecte pas le regex choisi {$regex}, insertion impossible`;
<<<<<<< HEAD
                // $retour["message"] = "La valeur recue $nomData ne respecte pas le regex choisi $regex, insertion impossible";
=======
>>>>>>> BranchBeneV2
                break;
            }
        }
        if(isset($retour["message"]) && !empty($retour["message"]))
            $retour["valid"] = false;
        else
            $retour["valid"] = true;
    
        return $retour;
    }
?>