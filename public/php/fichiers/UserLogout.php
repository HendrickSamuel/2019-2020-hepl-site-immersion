<?php
    session_start();
    if(isset($_SESSION["key"]))
    {
        $_SESSION["key"] = null;
    }

    header('Location: /Backend/StartPoint.php');
