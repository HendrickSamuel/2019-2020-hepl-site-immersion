-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  mer. 06 mai 2020 à 11:31
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
-- Structure de la table `cours`
--

DROP TABLE IF EXISTS `cours`;
CREATE TABLE IF NOT EXISTS `cours` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Intitule` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Intitule` (`Intitule`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `cours`
--

INSERT INTO `cours` (`ID`, `Intitule`) VALUES
(13, 'Administration réseaux'),
(1, 'Analyse et gestion de données'),
(14, 'Analyse orientée objet'),
(2, 'Anglais Technique'),
(9, 'Comptabilité appliquée et langue'),
(7, 'Développement orienté objet Java'),
(3, 'Langage et logique de programmation 2'),
(10, 'Logiciel de contrôle'),
(4, 'Mathématique et statistiques appliquées 2'),
(12, 'Mathématiques appliquées au traitement d\'images'),
(5, 'Organisation et exploitation des données'),
(18, 'Présentation des finalités en informatique'),
(8, 'Présentation stage et TFE par les étudiants de 3ème année'),
(16, 'Programmation WEB'),
(11, 'Réseau TCP/IP'),
(17, 'Réseaux et programmation réseaux'),
(15, 'Sécurité réseau'),
(6, 'Technique des microporcesseurs');

-- --------------------------------------------------------

--
-- Doublure de structure pour la vue `coursdisponibles`
-- (Voir ci-dessous la vue réelle)
--
DROP VIEW IF EXISTS `coursdisponibles`;
CREATE TABLE IF NOT EXISTS `coursdisponibles` (
`Intitule` varchar(255)
,`Cours` int(11)
,`Date` date
,`PlageHoraire` int(11)
,`sum(PlacesDisponibles)` decimal(32,0)
,`sum(PlacesTotal)` decimal(32,0)
,`sum(Indus)` decimal(25,0)
,`sum(Reseau)` decimal(25,0)
,`sum(Gestion)` decimal(25,0)
);

-- --------------------------------------------------------

--
-- Structure de la table `coursimmersion`
--

DROP TABLE IF EXISTS `coursimmersion`;
CREATE TABLE IF NOT EXISTS `coursimmersion` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `visible` tinyint(1) NOT NULL,
  `Cours` int(11) NOT NULL,
  `Professeur` int(11) NOT NULL,
  `Date` date NOT NULL,
  `PlageHoraire` int(11) NOT NULL,
  `PlacesDisponibles` int(11) NOT NULL,
  `PlacesTotal` int(11) NOT NULL,
  `HeureDebut` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `HeureFin` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `bloc` int(11) NOT NULL,
  `Groupe` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `Local` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Gestion` tinyint(1) NOT NULL,
  `Indus` tinyint(1) NOT NULL,
  `Reseau` tinyint(1) NOT NULL,
  `type` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`),
  UNIQUE KEY `Professeur` (`Professeur`,`PlageHoraire`,`Date`)
) ENGINE=InnoDB AUTO_INCREMENT=17 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `coursimmersion`
--

INSERT INTO `coursimmersion` (`ID`, `visible`, `Cours`, `Professeur`, `Date`, `PlageHoraire`, `PlacesDisponibles`, `PlacesTotal`, `HeureDebut`, `HeureFin`, `bloc`, `Groupe`, `Local`, `Gestion`, `Indus`, `Reseau`, `type`) VALUES
(12, 1, 1, 130, '2020-05-16', 1, 10, 10, '08h20', '10h30', 2, '2203', 'pv2', 0, 1, 1, 'theorie'),
(14, 1, 1, 1, '2020-05-16', 1, 10, 10, '08h20', '10h30', 2, '2203', 'pv3', 1, 1, 0, 'theorie'),
(15, 0, 1, 1, '2020-05-14', 1, 10, 10, '08h20', '10h30', 2, '2203', 'pv3', 1, 0, 1, 'theorie'),
(16, 1, 1, 1, '2020-05-12', 1, 10, 10, '08h20', '10h30', 2, '2203', 'pv3', 1, 0, 1, 'theorie');

-- --------------------------------------------------------

--
-- Structure de la table `eleves`
--

DROP TABLE IF EXISTS `eleves`;
CREATE TABLE IF NOT EXISTS `eleves` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Nom` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Prenom` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `Etablissement` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `gestion` tinyint(1) NOT NULL,
  `indus` tinyint(1) NOT NULL,
  `reseaux` tinyint(1) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `eleves`
--

INSERT INTO `eleves` (`ID`, `Email`, `Nom`, `Prenom`, `Etablissement`, `gestion`, `indus`, `reseaux`) VALUES
(1, 'test@live.be', 'Hendrick', 'Samuel', 'inpres', 1, 0, 0);

-- --------------------------------------------------------

--
-- Structure de la table `inscritscours`
--

DROP TABLE IF EXISTS `inscritscours`;
CREATE TABLE IF NOT EXISTS `inscritscours` (
  `Etudiant` int(11) NOT NULL,
  `Cours` int(11) NOT NULL,
  PRIMARY KEY (`Etudiant`,`Cours`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `profs`
--

DROP TABLE IF EXISTS `profs`;
CREATE TABLE IF NOT EXISTS `profs` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nom` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=150 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `profs`
--

INSERT INTO `profs` (`ID`, `Nom`) VALUES
(1, 'Mr. Vilvens'),
(129, 'Mr. Delaval'),
(130, 'Mr. Khamana');

-- --------------------------------------------------------

--
-- Structure de la table `questionsfeedback`
--

DROP TABLE IF EXISTS `questionsfeedback`;
CREATE TABLE IF NOT EXISTS `questionsfeedback` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Question` varchar(1024) COLLATE utf8_unicode_ci NOT NULL,
  `TypeQuestion` int(11) NOT NULL COMMENT '1 ressenti / 2 ouvert',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `questionsfeedback`
--

INSERT INTO `questionsfeedback` (`ID`, `Question`, `TypeQuestion`) VALUES
(1, 'comment s\'est passé la journée ?', 1);

-- --------------------------------------------------------

--
-- Structure de la table `reponsesfeedback`
--

DROP TABLE IF EXISTS `reponsesfeedback`;
CREATE TABLE IF NOT EXISTS `reponsesfeedback` (
  `IDEtudiant` int(11) NOT NULL,
  `IDQuestion` int(11) NOT NULL,
  `TypeReponse` int(11) NOT NULL COMMENT '1/ Ressenti 2/Commentaire',
  `Commentaire` varchar(280) COLLATE utf8_unicode_ci NOT NULL,
  `Ressenti` int(11) NOT NULL COMMENT 'entre 1 et 5 ',
  `Date` date NOT NULL COMMENT 'consernant la journée x',
  PRIMARY KEY (`IDEtudiant`,`IDQuestion`,`Date`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la vue `coursdisponibles`
--
DROP TABLE IF EXISTS `coursdisponibles`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `coursdisponibles`  AS  select `cours`.`Intitule` AS `Intitule`,`coursimmersion`.`Cours` AS `Cours`,`coursimmersion`.`Date` AS `Date`,`coursimmersion`.`PlageHoraire` AS `PlageHoraire`,sum(`coursimmersion`.`PlacesDisponibles`) AS `sum(PlacesDisponibles)`,sum(`coursimmersion`.`PlacesTotal`) AS `sum(PlacesTotal)`,sum(`coursimmersion`.`Indus`) AS `sum(Indus)`,sum(`coursimmersion`.`Reseau`) AS `sum(Reseau)`,sum(`coursimmersion`.`Gestion`) AS `sum(Gestion)` from (`coursimmersion` join `cours` on(`coursimmersion`.`Cours` = `cours`.`ID`)) where `coursimmersion`.`visible` = '1' group by `coursimmersion`.`Cours`,`coursimmersion`.`Date`,`coursimmersion`.`PlageHoraire` ;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
