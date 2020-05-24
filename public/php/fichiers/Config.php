<?php
date_default_timezone_set('UTC');
$action = $_POST['Action'];

// verifier les valeurs etc
switch ($action)
{
    case 'GET':
        $val = json_decode(file_get_contents("./../../../fichiers/config.json"));
        $format = "dd/mm/YYYY";
        $now = date($format);

        if(date($format,strtotime($val->datedebut)) <= $now && $now <= date($format,strtotime($val->datefin)))
            $val->ouvertureNaturelle = true;
        else
            $val->ouvertureNaturelle = false;

        if((date($format,strtotime($val->datedebut)) <= $now && $now <= date($format,strtotime($val->datefin))) || $val->force == true)
            $val->periodeInscription = true;
        else
            $val->periodeInscription = false;

        echo json_encode($val);

        break;

    case 'SET':
        $json = file_get_contents("./../../json/config.json");
        // qqch
        file_put_contents("./../../json/config.json",$json);
        break;
}



