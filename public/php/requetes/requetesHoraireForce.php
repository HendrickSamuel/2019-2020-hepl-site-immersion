<?php
require_once("./../includes.php");
header("Content-Type:application/json");
$resultat["resultat"] = true;
$params = array(
    "etudiant" => "/^[0-9]*$/",
    "plages" => "/^[0-9]*$/",
    "date" => "/^[0-9]{2}\/[0-9]{2}\/[0-9]{4}$/",
);

$data = $_POST["Data"];
$resultat["valeurs"] = $data;

$res = verificateurParams($data,$params);
if($res["valid"] === false)
{
    $resultat["resultat"] = false;
    $resultat["message"] = $res["message"];
    echo json_encode($resultat);
    die();
}

$db = new DataBase();
$db->connection->beginTransaction();
$IDImmersion = array();
$erreur = false;

$sql = "SELECT count(Etudiant) FROM inscritscours WHERE Etudiant = ? GROUP BY Etudiant;";
$stm = $db->connection->prepare($sql);
$stm->execute([$data["etudiant"]]);
$etudiant = $stm->fetch(PDO::FETCH_ASSOC);

/*
if($etudiant !== false)
{
    $resultat["resultat"] = false;
    $resultat["message"] = "L'éléve suit déja des cours ...";
    echo json_encode($resultat);
    die();
}
*/


for($i = 1; $i <= $data["plages"] && !$erreur; $i++)
{
    $places = false;
    $essais = 0;
    do{
        $sql = "SELECT ID FROM coursimmersion WHERE Date = STR_TO_DATE(?,'%d/%m/%Y') AND PlageHoraire = ? AND PlacesDisponibles > 0 ORDER BY RAND() LIMIT 1;";
        $stm = $db->connection->prepare($sql);
        $stm->execute([$data["date"],$i]);
        $IDImmersion = $stm->fetch(PDO::FETCH_ASSOC);

        if($IDImmersion !== false)
        {
            $sql = "INSERT INTO `inscritscours`(`Etudiant`, `Horaire`) VALUES (?,?);";
            $stm = $db->connection->prepare($sql);
            $places = $stm->execute([$data["etudiant"],$IDImmersion["ID"]]);

            if(!$places) // si manque de place on recommance sinon
            {
                if($stm->errorInfo() !== "Plus de placesDisponibles")
                {
                    $erreur =  true;
                    $resultat["message"] = $stm->errorInfo()[2]; // eleve deja inscrit à ce cours
                    $resultat["resultat"] = false;
                }
                else
                    $essais++;
            }
            else
            {
                $resultat["Plages"][$i] = $IDImmersion["ID"];
            }
        }
        else
        {
            $erreur = true; // pas de cours disponible ce jour a cette plage horaire
            $resultat["message"] = "pas assez de cours disponibles pour vous à cette date !";
            $resultat["resultat"] = false;
        }

    }while($essais < 5 && (!$erreur && !$places));
}

if($erreur === true || $essais == 4)
{
    $db->connection->rollBack(); // annulation des insertions si précédemment lieu
}
else
{
    $db->connection->commit();
}

echo json_encode($resultat);



function verificateurParams($data, $bonParametres){
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

