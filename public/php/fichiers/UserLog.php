<?php
    session_start();
    if(!isset($_SESSION["key"]) || empty($_SESSION["key"]))
    {
        header('Location: /Backend/StartPoint.php');
    }