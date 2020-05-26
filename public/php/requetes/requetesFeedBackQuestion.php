<?php 

    require_once("./../includes.php"); // Connexion BD
    header("Content-Type:application/json");

    // $result["donnees"] = $_POST;
    $result["valid"] = true;
    $action = $_POST['action'];
    $result["action"] = $action;

    if (isset($action) && !empty($action)){
        $db = new DataBase();
        switch($action){
            case "SELECTALL" :
                try{
                    $sql = "SELECT * FROM questionsfeedback WHERE TypeQuestion = 1;";
                    $stm = $db->connection->query($sql);
                    $tmp = $stm->fetchAll(PDO::FETCH_ASSOC);
                    $result["data"] = $tmp;
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