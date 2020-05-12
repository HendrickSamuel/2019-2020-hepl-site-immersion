<?php
require_once("./../../php/includes.php");

$date = date("y_m_d_h_i_s", time());

header("Content-type: text/csv; charset=utf-8");
header("Content-Disposition: attachment; filename=Inscrits" . $date . ".csv");
header("Pragma: no-cache");
header("Expires: 0");

$listeChamps = array("NomEtudiant", "PrenomEtudiant", "Email", "Etablissement", "InteretGestion", "InteretIndus",
    "InteretReseaux", "Date","NomProfesseur","Intitule","PlageHoraire", "HeureDebut", "HeureFin", "Local");

$endofline = "\r\n";
$divider = ";";

$head = "";
foreach ($listeChamps as $col) {
    $head .= $col . $divider;
}

$head = substr($head, 0, strlen($head) - 1); // enlever les espaces du string
$head .= $endofline;
echo($head);

try {
    $db = new DataBase();
    $stm = $db->connection->query("SELECT
                                        eleves.Nom as 'NomEtudiant',
                                        eleves.Prenom as 'PrenomEtudiant',
                                        Email, Etablissement,
                                        eleves.gestion as 'InteretGestion',
                                        eleves.indus as 'InteretIndus',
                                        eleves.reseaux as 'InteretReseaux',
                                        DATE_FORMAT(Date, '%d/%m/%Y') as 'Date',
                                        profs.Nom as 'NomProfesseur',
                                        Intitule, PlageHoraire, HeureDebut, HeureFin, Local
         
                                    FROM inscritscours
                                             INNER JOIN eleves ON (Etudiant = eleves.ID)
                                             INNER JOIN coursimmersion ON (Horaire = coursimmersion.ID)
                                             INNER JOIN cours ON (Cours = cours.ID)
                                             INNER JOIN profs On (Professeur = profs.ID)
                                    ORDER BY Etudiant,Date,PlageHoraire;");
    $all = $stm->fetchAll(PDO::FETCH_ASSOC);

    foreach ($all as $ligne) {
        $lignecsv = "";
        foreach ($ligne as $l) {
            $data .= $l . $divider;
        }

        $lignecsv = substr($data, 0, strlen($lignecsv) - 1); // pareil que au dessus
        $lignecsv .= $endofline;
        echo($lignecsv);
    }
} catch (PDOException $e) {
    die($e->getMessage());
}


?>