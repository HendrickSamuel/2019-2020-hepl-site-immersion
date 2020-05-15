<?php
    session_start();

    require(__DIR__ . "/../php/inc/head.php");

    if(isset($_POST["InputNom"], $_POST["InputMDP"]))
    {
        $valeurs = json_decode(file_get_contents("./../../fichiers/Users.json"), true);

        if (array_key_exists($_POST["InputNom"], $valeurs)){
            if($valeurs[$_POST["InputNom"]] == md5($_POST['InputMDP']))
            {
                $_SESSION["key"] = md5($_POST["InputNom"]);
                //todo: vider post
            }
            else
            {
                $_SESSION["key"] ="";
                $keyerreur = "La combinaison mot de passe utilisateur n'existe pas";
        }
    }
    else{
        $usererreur = "L'utilisateur n'existe pas";
    }
}

if( isset ($_SESSION["key"]) && !empty($_SESSION["key"]))
{
    header("Location: ./DashBoard.php");
    die();
}
?>
<body>


    <nav class="navbar py-2 navbar-light navbar-expand-md">
    <!-- logo -->
    <a href="#" class="navbar-brand text-uppercase text-vert font-italic">
        <img src="/img/Logo_HEPL.png" height="28" alt="LogoHEPL">
    </a>
    <div class="collapse navbar-collapse" id="navbarLinks">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link disabled" href="#"  >Home</a>
            </li>

            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle disabled" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Cours
                </a>
            </li>
            <li class="nav-item dropdown">

            <li class="nav-item">
                <a class="nav-link disabled" href="#">Professeurs</a>
            </li>

            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle disabled" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Inscriptions
                </a>
            </li>
        </ul>
    </div>
    </nav>

    <div class=" col-md-5 centre mt-5">

        <form action="#" method="POST" class="form-horizontal">
            <div class="form-group">
                <label for="InputNom">UserName</label>
                <input class="form-control" type="text" name="InputNom" id="InputNom">
                <?php if(isset($usererreur)){ ?>
                    <p><?php echo $usererreur?></p>
                <?php } ?>
            </div>

            <div class="form-group">
                <label for="InputMDP">Password</label>
                <input class="form-control" type="password" name="InputMDP" id="InputMDP">
                <?php if(isset($keyerreur)){ ?>
                    <p><?php echo $keyerreur?></p>
                <?php } ?>
            </div>

            <input type="submit" class="btn btn-primary">
        </form>
    </div>
</body>
