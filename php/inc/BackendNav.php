<nav class="navbar py-2 navbar-light navbar-expand-md">
    <!-- logo -->
    <a href="#" class="navbar-brand text-uppercase text-vert font-italic">
        <img src="/img/Logo_HEPL.png" height="28" alt="LogoHEPL">
    </a>
    <button type="button" class="navbar-toggler" data-toggle="collapse" data-target="#navbarLinks">
        <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarLinks">
        <ul class="navbar-nav">
            <li class="nav-item">
                <a class="nav-link" href="/Backend/DashBoard.php">Home</a>
            </li>

            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Cours
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href="/Backend/GestionCours.php">Gestion des cours</a>
                    <a class="dropdown-item" href="/Backend/GestionImmersion.php">Gestion des immersions</a>
                </div>
            </li>
            <li class="nav-item dropdown">

            <li class="nav-item">
                <a class="nav-link" href="/Backend/GestionProfesseur.php">Professeurs</a>
            </li>

            <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Inscriptions
                </a>
                <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                    <a class="dropdown-item" href="/Backend/GestionInscritsGlobal.php">Liste des inscrits</a>
                    <a class="dropdown-item" href="#">Programmes individuels</a>
                </div>
            </li>
        </ul>
    </div>
</nav>