-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  lun. 25 mai 2020 à 13:27
-- Version du serveur :  10.4.10-MariaDB
-- Version de PHP :  7.3.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `immersion`
--

-- --------------------------------------------------------

--
-- Structure de la vue `coursdisponibles`
--

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `coursdisponibles`  AS  select `cours`.`Intitule` AS `Intitule`,`coursimmersion`.`Cours` AS `Cours`,`coursimmersion`.`Date` AS `Date`,`coursimmersion`.`PlageHoraire` AS `PlageHoraire`,sum(`coursimmersion`.`PlacesDisponibles`) AS `PlacesDisponibles`,sum(`coursimmersion`.`PlacesTotal`) AS `PlacesTotal`,sum(`coursimmersion`.`Indus`) AS `Indus`,sum(`coursimmersion`.`Reseau`) AS `Reseau`,sum(`coursimmersion`.`Gestion`) AS `Gestion` from (`coursimmersion` join `cours` on(`coursimmersion`.`Cours` = `cours`.`ID`)) where `coursimmersion`.`visible` = '1' group by `coursimmersion`.`Cours`,`coursimmersion`.`Date`,`coursimmersion`.`PlageHoraire` order by `coursimmersion`.`Date`,`coursimmersion`.`PlageHoraire` ;

--
-- VIEW  `coursdisponibles`
-- Données :  Aucun(e)
--

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
