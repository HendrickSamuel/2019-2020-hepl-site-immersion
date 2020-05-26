-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  lun. 18 mai 2020 à 21:21
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
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
  UNIQUE KEY `Professeur` (`Professeur`,`PlageHoraire`,`Date`),
  KEY `FKCoursImmersions` (`Cours`)
) ENGINE=InnoDB AUTO_INCREMENT=40 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `coursimmersion`
--

INSERT INTO `coursimmersion` (`ID`, `visible`, `Cours`, `Professeur`, `Date`, `PlageHoraire`, `PlacesDisponibles`, `PlacesTotal`, `HeureDebut`, `HeureFin`, `bloc`, `Groupe`, `Local`, `Gestion`, `Indus`, `Reseau`, `type`) VALUES
(36, 1, 5, 157, '2020-06-09', 1, 10, 10, '08h20', '10h30', 2, '2203', 'pv2', 1, 0, 0, 'theorie'),
(37, 0, 16, 165, '2020-06-09', 1, 10, 10, '08h20', '10h30', 2, '2201', 'pv3', 1, 0, 0, 'theorie'),
(38, 1, 7, 166, '2020-06-09', 2, 10, 10, '10h20', '13h00', 2, '2203', 'AE', 1, 1, 0, 'theorie'),
(39, 0, 10, 161, '2020-05-28', 3, 2, 2, '13h30', '15h30', 3, '2303', 'AX', 0, 1, 1, 'tfe');

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
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déclencheurs `eleves`
--
DROP TRIGGER IF EXISTS `deleteInscriptions`;
DELIMITER $$
CREATE TRIGGER `deleteInscriptions` BEFORE DELETE ON `eleves` FOR EACH ROW BEGIN
    DELETE FROM inscritscours
    WHERE Etudiant = OLD.ID;
END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `inscritscours`
--

DROP TABLE IF EXISTS `inscritscours`;
CREATE TABLE IF NOT EXISTS `inscritscours` (
  `Etudiant` int(11) NOT NULL,
  `Horaire` int(11) NOT NULL,
  PRIMARY KEY (`Etudiant`,`Horaire`) USING BTREE,
  KEY `FKCoursImmersion` (`Horaire`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déclencheurs `inscritscours`
--
DROP TRIGGER IF EXISTS `DeleteDisponibilites`;
DELIMITER $$
CREATE TRIGGER `DeleteDisponibilites` AFTER DELETE ON `inscritscours` FOR EACH ROW BEGIN
    DECLARE places TINYINT;

    SELECT PlacesDisponibles INTO places
    FROM coursimmersion WHERE ID = OLD.Horaire FOR UPDATE;

    UPDATE coursimmersion SET PlacesDisponibles = places+1 WHERE ID = OLD.Horaire;

END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `InsertDisponibilites`;
DELIMITER $$
CREATE TRIGGER `InsertDisponibilites` BEFORE INSERT ON `inscritscours` FOR EACH ROW BEGIN
    DECLARE places TINYINT;
    DECLARE errno SMALLINT UNSIGNED DEFAULT 31001;

    SELECT PlacesDisponibles INTO places
    FROM coursimmersion WHERE ID = NEW.Horaire FOR UPDATE;

    IF(places < 1) THEN
        SIGNAL SQLSTATE '45000' SET
            MYSQL_ERRNO = errno,
            MESSAGE_TEXT = 'Plus de placesDisponibles';
    ELSE
        UPDATE coursimmersion SET PlacesDisponibles = places-1 WHERE ID = NEW.Horaire;
    END IF;

END
$$
DELIMITER ;
DROP TRIGGER IF EXISTS `UpdateDisponibilites`;
DELIMITER $$
CREATE TRIGGER `UpdateDisponibilites` BEFORE UPDATE ON `inscritscours` FOR EACH ROW BEGIN
    DECLARE anciennesPlaces TINYINT;
    DECLARE nouvellesPlaces TINYINT;
    DECLARE errno SMALLINT UNSIGNED DEFAULT 31001;

    SELECT PlacesDisponibles INTO anciennesPlaces
    FROM coursimmersion
    WHERE ID = OLD.Horaire FOR UPDATE;

    SELECT PlacesDisponibles INTO nouvellesPlaces
    FROM coursimmersion
    WHERE ID = NEW.Horaire FOR UPDATE;

    IF (nouvellesPlaces < 1) THEN
        SIGNAL SQLSTATE '45000' SET
            MYSQL_ERRNO = errno,
            MESSAGE_TEXT = 'Pas assez de places pour le deplacement';
    ELSE
        UPDATE coursimmersion SET PlacesDisponibles = anciennesPlaces +1 WHERE ID = OLD.Horaire;
        UPDATE coursimmersion SET PlacesDisponibles = nouvellesPlaces - 1 WHERE ID = NEW.Horaire;
    END IF;

END
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Structure de la table `profs`
--

DROP TABLE IF EXISTS `profs`;
CREATE TABLE IF NOT EXISTS `profs` (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `Nom` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=169 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `profs`
--

INSERT INTO `profs` (`ID`, `Nom`) VALUES
(151, 'Caprasse François'),
(152, 'COSTA Corinne'),
(153, 'DOSERAY Béatrice'),
(154, 'GIOVINAZZO Florence'),
(155, 'GUISSE Florence'),
(156, 'LECLOUX Dominique'),
(157, 'LEONARD Anne'),
(158, 'MADANI Mounawar'),
(159, 'MATAGNE Xavier'),
(160, 'MERCENIER Denys'),
(161, 'MOITROUX Cécile'),
(162, 'QUETIER Patrick'),
(163, 'RANDAXHE Véronique'),
(164, 'SERRHINI Souad'),
(165, 'THIERNESSE Cédric'),
(166, 'VILVENS Claude'),
(167, 'WAGNER Jean-Marc'),
(168, 'YANS Barbara');

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
  PRIMARY KEY (`IDEtudiant`,`IDQuestion`,`Date`),
  KEY `FKQuestionReponse` (`IDQuestion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la vue `coursdisponibles`
--
DROP TABLE IF EXISTS `coursdisponibles`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `coursdisponibles`  AS  select `cours`.`Intitule` AS `Intitule`,`coursimmersion`.`Cours` AS `Cours`,`coursimmersion`.`Date` AS `Date`,`coursimmersion`.`PlageHoraire` AS `PlageHoraire`,sum(`coursimmersion`.`PlacesDisponibles`) AS `sum(PlacesDisponibles)`,sum(`coursimmersion`.`PlacesTotal`) AS `sum(PlacesTotal)`,sum(`coursimmersion`.`Indus`) AS `sum(Indus)`,sum(`coursimmersion`.`Reseau`) AS `sum(Reseau)`,sum(`coursimmersion`.`Gestion`) AS `sum(Gestion)` from (`coursimmersion` join `cours` on(`coursimmersion`.`Cours` = `cours`.`ID`)) where `coursimmersion`.`visible` = '1' group by `coursimmersion`.`Cours`,`coursimmersion`.`Date`,`coursimmersion`.`PlageHoraire` ;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `coursimmersion`
--
ALTER TABLE `coursimmersion`
  ADD CONSTRAINT `FKCoursImmersions` FOREIGN KEY (`Cours`) REFERENCES `cours` (`ID`),
  ADD CONSTRAINT `FKProfesseurImmersion` FOREIGN KEY (`Professeur`) REFERENCES `profs` (`ID`);

--
-- Contraintes pour la table `inscritscours`
--
ALTER TABLE `inscritscours`
  ADD CONSTRAINT `FKCoursImmersion` FOREIGN KEY (`Horaire`) REFERENCES `coursimmersion` (`ID`),
  ADD CONSTRAINT `FKEleveImmersion` FOREIGN KEY (`Etudiant`) REFERENCES `eleves` (`ID`) ON DELETE CASCADE;

--
-- Contraintes pour la table `reponsesfeedback`
--
ALTER TABLE `reponsesfeedback`
  ADD CONSTRAINT `FKElevesReponse` FOREIGN KEY (`IDEtudiant`) REFERENCES `eleves` (`ID`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `FKQuestionReponse` FOREIGN KEY (`IDQuestion`) REFERENCES `questionsfeedback` (`ID`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
