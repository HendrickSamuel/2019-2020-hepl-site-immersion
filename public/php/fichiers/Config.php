<?php
date_default_timezone_set('UTC');
$action = $_POST['Action'];
$contenu = $_POST['Config'];

switch ($action)
{
    case 'GET':
        $val = json_decode(file_get_contents("./../../../fichiers/config.json"));
        $now = time();
        $ouverture = strtotime($val->datedebut);
        $fermeture = strtotime($val->datefin);
        $fermeture += 86400; // ajout de 24h

        if($ouverture <= $now && $now <= $fermeture)
            $val->ouvertureNaturelle = true;
        else
            $val->ouvertureNaturelle = false;

        if(($ouverture <= $now && $now <= $fermeture) || $val->force == true)
            $val->periodeInscription = true;
        else
            $val->periodeInscription = false;

        echo json_encode($val);

        break;

    case 'SET':
        foreach ($contenu as $key=>$val)
            if($val === "true")
                $contenu[$key] = true;
            else
            if($val === "false")
                $contenu[$key] = false;

        file_put_contents("./../../../fichiers/config.json",json_encode($contenu));
        echo json_encode($contenu);
        break;
}



