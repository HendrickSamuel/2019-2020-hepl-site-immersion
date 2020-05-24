<?php
require_once("./../includes.php");
header("Content-Type:application/json");

$db = new DataBase();
$stm = $db->connection->query("SELECT *,Count(IDEtudiant) as 'Etudiants' FROM reponsesfeedback
                            JOIN questionsfeedback on (IDQuestion = questionsfeedback.ID)
                            WHERE TypeQuestion = 1
                            GROUP BY IDQuestion, Ressenti");

$rows = $stm->fetchAll(PDO::FETCH_GROUP);

$ret = null;
foreach ($rows as $key => $val)
{
    for($i = 1; $i <= 5; $i++)
        $ret[$key]['avis'][$i] = "0";

    foreach ($val as $key2 => $val2)
    {
        $ret[$key]['Question'] = $val2['Question'];
        $ret[$key]['avis'][$val2['Ressenti']] = $val2['Etudiants'];
    }
}

echo json_encode($ret);
