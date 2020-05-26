<?php
error_reporting(E_ERROR | E_PARSE);
require_once("./../../php/includes.php");
require_once("./../../../mpdf-6.1.3/mpdf.php");
$res = [];

$dateparam = $_GET['date'];
$etudiantparam = $_GET['etudiant'];

try {
    $db = new DataBase();
    $condition = "";
    if(isset($dateparam) && !empty($dateparam))
    {
        if(isset($etudiantparam) && !empty($etudiantparam))
            $condition = "WHERE Etudiant = $etudiantparam AND Date = STR_TO_DATE('$dateparam','%d/%m/%Y')";
        else
            $condition = "WHERE Date = STR_TO_DATE('$dateparam','%d/%m/%Y')";
    }
    else
    {
        if(isset($etudiantparam) && !empty($etudiantparam))
            $condition = "WHERE Etudiant = $etudiantparam";
        else
            $condition = "";
    }

    $sql = "SELECT Nom, Prenom, MD5(Email) as hash, DATE_FORMAT(Date, '%W %d %b %Y', 'fr_FR') as 'Date'
                        FROM inscritscours
                        INNER JOIN eleves ON (Etudiant = eleves.ID)
                        INNER JOIN coursimmersion ON (Horaire = coursimmersion.ID)
                        ".$condition."
                        GROUP BY Etudiant, Date
                        ORDER BY Date DESC, Nom, Prenom;";

        $stm = $db->connection->prepare($sql);
        $stm->execute(array(':etudiant' => $etudiantparam, ':date' => $dateparam));
        $res = $stm->fetchAll(PDO::FETCH_ASSOC);
} catch (PDOException $e) {
    die($e->getMessage());
}

$mpdf = new Mpdf();
ob_start();
$i = 0;
        foreach ($res as $val)
        {
        ?>
            <div style="text-align: justify">
                <img src="/img/Logo_HEPL.png" alt="ImageDeLaHEPL" style="width: 20%">
                <p>Par le présente, je sousigné ______________________, déclare que</p>
                <h3><?php echo ($val["Nom"] . " " . $val["Prenom"]);?></h3>
                <p>était bien présent(e) ce <?php echo($val["Date"]); ?>.</p>
                <br>
                <small>Signature de la direction: </small>
                <div style="text-align: right; float: right; margin-top: -100px">
                    <img src="./QRCode.php?data=http://<?php echo($_SERVER["HTTP_HOST"] . "/Frontend/feedback.php?userKey=".$val["hash"]); ?>"/>
                    <br>
                    <small>Donnez votre avis sur la journées !</small>
                </div>
            </div>
            <hr>
        <?php
            $i++;
            if($i == 4)
            {
                echo ("<pagebreak>");
                $i = 0;
            }
        }

$content = ob_get_contents();
ob_clean();
$mpdf->WriteHTML($content);

$mpdf->SetProtection([], "", "bidon");


$date = date("Y_m_d_h_i_s", time());
$mpdf->SetTitle("Attestations".$date);
$mpdf->Output("Immersionhepl Attestations".$date.".pdf", "I");
