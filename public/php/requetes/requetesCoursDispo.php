<?php 
    require_once("./../includes.php"); // Connexion BD
    header("Content-Type:application/json");

    // $result["donnees"] = $_POST;
    $result["valid"] = true;
    $action = $_POST['action'];
    $result["action"] = $action;
    if (isset($action) && !empty($action)){
        $db = new DataBase();
        $db->connection->query('SET lc_time_names = \'fr_BE\'');
        switch($action){
            case "SELECTALL" :
                try{
                    $sql = "SELECT DATE_FORMAT(Date, '%W %e %M %Y'),PlageHoraire,Intitule,Cours,PlacesDisponibles,PlacesTotal,Indus,Reseau,Gestion, DATE_FORMAT(Date, '%W %e %M %Y') FROM coursdisponibles;";
                    $stm = $db->connection->query($sql);
                    $tmp = $stm->fetchAll(PDO::FETCH_GROUP| PDO::FETCH_ASSOC);
                    $vect = [];
                    foreach ($tmp as $key => $value) {
                        for ($i=1; $i <= 4; $i++)
                            $vect[$key][$i] = [];
                        foreach ($value as $key2 => $value2)
                            $vect[$key][$value2["PlageHoraire"]][] = $value2;    
                    }
                    $result["data"] = $vect;
                    
                }
                catch(PDOException $e){
                    $result["valid"] = false;
                    $result["message"] = $e->getMessage();
                }
                break;
        }
    }
    else{
        $result["valid"] = false;
        $result["message"] = "action manquante";
    }
    echo json_encode($result);
?>