<?php
require_once("./../includes.php");
header("Content-Type:application/json");

$data = $_POST["Data"];

$result["valid"] = true;

switch ($_POST["action"])
{
    case "GETIDFROMEMAIL":
        $db = new DataBase();
        $sql = "SELECT ID FROM Eleves WHERE MD5(Email) = ?;";
        $stm = $db->connection->prepare($sql);
        $stm->execute(array($data));
        $id = $stm->fetch(PDO::FETCH_ASSOC);
        if($id === false)
        {
            $result["valid"] = false;
            $result["message"] = `{$data} n'est pas enregistrée.`;
        }
        else{
            $result["idEtudiant"] = $id['ID'];
        }
        echo json_encode($result);
        break;

    case "INSERT":
        $db = new DataBase();
        $db->connection->beginTransaction();

        $sql = "INSERT INTO `reponsesfeedback`(`IDQuestion`, `IDEtudiant`, `Commentaire`, `Ressenti`, `Date`) 
                VALUES (?,?,'aucun',?,NOW())";
        $stm = $db->connection->prepare($sql);

        $insert = true;
        $result['message'] = '';
        foreach($data as $key => $value)
        {
            $res = $stm->execute([$value['question'], $_POST['idEtudiant'], $value['ressenti']]);
            if (!$res)
            {
                $insert = false;
                $result['valid'] = false;
                $result['message'] .= `La question: {$value['question']} n'a pas pu etre inserrée \n`;
            }
        }

        if($insert === true)
        {
            $db->connection->commit();
        }
        else
        {
            $db->connection->rollBack();
            $result['message'] .= `Veuillez réessayer plus tard.`;
        }

        echo json_encode($result);

        break;
}