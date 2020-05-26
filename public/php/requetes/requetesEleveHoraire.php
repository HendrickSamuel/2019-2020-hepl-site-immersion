<?php 
    require_once("./../includes.php"); // Connexion BD
    header("Content-Type:application/json");

    $result["valid"] = true;
    $action = $_POST['action'];
    $result["action"] = $action;
    $varsEleveImmersion = $_POST["dataEleve"];
    $varsHoraire = $_POST["horaire"];

    $coursImmersion = array();
    $erreur = false;

    $insertParamEleveImmersion = array(
                                    "nom" => "/^[A-Za-z]+[\s\-A-Za-z]$/", 
                                    "prenom" => "/^[A-Za-z]+[\s\-A-Za-z]$/",
                                    "ecole" => "/^[A-Za-z][0-9A-Za-z\-\s]*[A-Za-z0-9]$/",
                                    "email" => "/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/",
                                    "interet" => "/.*/"
    );

    if(isset($action) && !empty($action)){
        $db = new DataBase();
        $db->connection->beginTransaction();//Enleve l'auto-comit pour faire un eventuel rollback
        switch ($action) {
            case "INSERT_ELEVE_HORAIRE":
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
                            $result["idEleve"] = $db->connection->lastInsertId();
                            // $varsHoraire = $_POST["horaire"];
                            $taille = count($varsHoraire);
                                // Recuperation des IDs des cours Immersion
                            for ($i=0; $i < $taille && !$erreur; $i++) {                
                                $sql = "SELECT ID FROM coursimmersion WHERE Cours = ? AND Date = ? AND PlageHoraire = ? ORDER BY RAND() LIMIT 1 FOR UPDATE;";
                                $stm = $db->connection->prepare($sql);
                                $res = $stm->execute([$varsHoraire[$i]["idCours"], $varsHoraire[$i]["date"], $varsHoraire[$i]["plage"]]);
                                $resultIdImmersion = $stm->fetch(PDO::FETCH_ASSOC);
                                
                                if($resultIdImmersion !== false){
                                    $coursImmersion[$i] = $resultIdImmersion["ID"];
                                }
                                else{
                                    $erreur = true;
                                }
                            }
                            // Insertion des cours immersion pour l'éléve
                            if(!$erreur){
                                $taille = count($coursImmersion);
                                for ($i=0; $i < $taille && !$erreur; $i++) {
                                    $sql = "INSERT INTO inscritscours(Etudiant, Horaire) VALUES(?, ?);";
                                    $stm = $db->connection->prepare($sql);
                                    $resInsertionHoraire = $stm->execute([$result["idEleve"], $coursImmersion[$i]]);
                                    if($resInsertionHoraire == false){
                                        $erreur = true;
                                        $result["message"] = "Un cours selectionne n'a plus de place, veuillez recommencer votre choix";
                                    }
                                }
                                if(!$erreur){
                                    $result["message"] = "L'etudiant a bien ete enregistre";
                                    $db->connection->commit();            
                                }
                            }
                            else{
                                $db->connection->rollBack();
                                $result["message"] = "Plus aucune correspondance pour les cours choisis";
                            }
                        }
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