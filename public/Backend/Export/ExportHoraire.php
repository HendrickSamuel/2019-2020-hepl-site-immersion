<?php
error_reporting(E_ERROR | E_PARSE);
require_once("./../../php/includes.php");
require_once("./../../../mpdf-6.1.3/mpdf.php");
$res = [];

$etudiantparam = $_GET['etudiant'];

try {
    $db = new DataBase();

    $sql = "SELECT  DATE_FORMAT(Date, '%d/%m/%Y', 'fr_FR') as 'Date', HeureDebut, HeureFin,
       Groupe, bloc, Local, type, Intitule, p.Nom as 'Professeur', e.Nom as 'Nom', e.Prenom as 'Prenom'

            FROM inscritscours
                    INNER JOIN coursimmersion ON (Horaire = coursimmersion.ID)
                    INNER JOIN cours c ON (Cours = c.ID)
                    INNER JOIN profs p On (Professeur = p.ID)
                    INNER JOIN eleves e on (inscritscours.Etudiant = e.ID)
                    WHERE Etudiant = ?
            ORDER BY Date,PlageHoraire;";

    $stm = $db->connection->prepare($sql);
    $stm->execute([$etudiantparam]);
    $res = $stm->fetchAll(PDO::FETCH_GROUP);
} catch (PDOException $e) {
    die($e->getMessage());
}

$mpdf = new Mpdf();
ob_start();
$i = 0;
?>

<img src="/img/Logo_HEPL.png" alt="ImageDeLaHEPL" style="width: 20%">
<h1>Récapitulatif des cours</h1>

<?php
foreach ($res as $key => $val)
{
    ?>
    <p> <?php echo $key?></p>
        <table style="width:100%; border: 1px solid black; background: #6c757d">
            <tr>
                <th>Local</th>
                <th>Professeur</th>
                <th>Intitule</th>
                <th>bloc</th>
                <th>type</th>
                <th>HeureDebut</th>
                <th>HeureFin</th>
            </tr>
<?php
    foreach ($val as $key2 => $val2) {
    ?>
            <tr>
                <td><?php echo $val2['Local']?></td>
                <td><?php echo $val2['Professeur']?></td>
                <td><?php echo $val2['Intitule']?></td>
                <td><?php echo $val2['bloc']?></td>
                <td><?php echo $val2['type']?></td>
                <td><?php echo $val2['HeureDebut']?></td>
                <td><?php echo $val2['HeureFin']?></td>
            </tr>

    <?php }
    ?>
    </table>
    <?php
}

$content = ob_get_contents();
ob_clean();
$mpdf->WriteHTML($content);

$date = date("Y_m_d_h_i_s", time());
$mpdf->SetTitle("Attestations".$date);
$mpdf->Output("Immersionhepl Attestations".$date.".pdf", "I");