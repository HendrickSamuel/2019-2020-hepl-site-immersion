-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  lun. 25 mai 2020 à 13:23
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
,`PlacesDisponibles` decimal(32,0)
,`PlacesTotal` decimal(32,0)
,`Indus` decimal(25,0)
,`Reseau` decimal(25,0)
,`Gestion` decimal(25,0)
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
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `coursimmersion`
--

INSERT INTO `coursimmersion` (`ID`, `visible`, `Cours`, `Professeur`, `Date`, `PlageHoraire`, `PlacesDisponibles`, `PlacesTotal`, `HeureDebut`, `HeureFin`, `bloc`, `Groupe`, `Local`, `Gestion`, `Indus`, `Reseau`, `type`) VALUES
(45, 1, 11, 162, '2020-05-25', 1, 9, 10, '8h20', '10h20', 2, '2203', 'pv11', 1, 0, 0, 'theorie'),
(46, 1, 11, 162, '2020-05-25', 2, 5, 5, '10h30', '12h30', 2, '2203', 'pv11', 1, 0, 0, 'laboratoire'),
(47, 1, 2, 163, '2020-05-25', 3, 10, 10, '13h30', '15h30', 2, '2203', 'pv11', 1, 1, 1, 'theorie'),
(48, 1, 14, 152, '2020-05-25', 4, 5, 5, '15h30', '17h30', 2, '2203', 'pv11', 1, 0, 0, 'laboratoire'),
(49, 1, 10, 167, '2020-05-25', 1, 5, 5, '8h50', '10h20', 2, '2226', 'cx', 0, 1, 1, 'laboratoire'),
(50, 1, 17, 158, '2020-05-25', 2, 5, 5, '10h30', '12h30', 2, '2226', 'cx', 0, 0, 1, 'laboratoire'),
(51, 1, 6, 160, '2020-05-25', 3, 5, 5, '13h30', '15h', 2, '2226', 'cx', 1, 1, 1, 'laboratoire'),
(52, 1, 9, 154, '2020-05-25', 1, 10, 10, '8h20', '10h20', 2, '2201', 'ax', 1, 0, 0, 'theorie'),
(53, 1, 7, 166, '2020-05-25', 2, 5, 5, '10h30', '12h30', 2, '2201', 'pv12', 1, 1, 1, 'laboratoire'),
(54, 1, 16, 165, '2020-05-25', 3, 5, 5, '13h30', '15h30', 2, '2201', 'pv12', 1, 0, 0, 'laboratoire'),
(55, 1, 1, 157, '2020-05-25', 1, 5, 5, '8h20', '10h20', 2, '2202', 'leo', 1, 0, 0, 'laboratoire'),
(56, 1, 4, 160, '2020-05-25', 2, 5, 5, '10h30', '12h30', 2, '2202', 'pv10', 1, 0, 0, 'laboratoire'),
(57, 1, 12, 161, '2020-05-25', 3, 5, 5, '13h30', '15h30', 2, '2202', 'lpo1', 0, 1, 1, 'laboratoire'),
(58, 1, 11, 168, '2020-05-25', 1, 10, 10, '08h20', '10h20', 2, '2228', 'ae', 1, 1, 1, 'theorie'),
(59, 1, 9, 154, '2020-05-26', 1, 10, 10, '8h20', '10h20', 2, '2202', 'ax', 1, 0, 0, 'theorie'),
(60, 1, 1, 157, '2020-05-26', 2, 5, 5, '10h30', '12h', 2, '2203', 'leo', 1, 0, 0, 'laboratoire'),
(61, 1, 16, 165, '2020-05-26', 3, 5, 5, '13h30', '15h30', 2, '2203', 'pv11', 1, 0, 0, 'laboratoire'),
(63, 1, 12, 161, '2020-05-26', 4, 10, 10, '15h30', '17h30', 2, '2203', 'ax', 1, 1, 1, 'theorie'),
(64, 1, 2, 163, '2020-05-26', 2, 10, 10, '10h30', '12h30', 2, '2203', 'pv14', 1, 1, 1, 'theorie'),
(65, 1, 15, 151, '2020-05-26', 2, 5, 5, '10h30', '12h30', 2, '2227', 'pv17', 0, 0, 1, 'laboratoire'),
(66, 1, 13, 151, '2020-05-26', 1, 5, 5, '08h20', '10h20', 2, '2226', 'cx', 0, 0, 1, 'laboratoire'),
(67, 1, 7, 166, '2020-05-26', 4, 10, 10, '15h30', '17h30', 2, '2203', 'ae', 1, 1, 1, 'theorie'),
(68, 1, 5, 159, '2020-05-26', 3, 5, 5, '13h', '15h30', 2, '2201', 'pv15', 1, 0, 0, 'laboratoire'),
(69, 1, 3, 160, '2020-05-25', 4, 5, 5, '15h30', '17h30', 2, '2202', 'pv12', 1, 1, 1, 'laboratoire'),
(70, 1, 3, 167, '2020-05-25', 4, 5, 5, '15h30', '17h30', 2, '2227', 'pv13', 1, 1, 1, 'laboratoire'),
(71, 1, 8, 157, '2020-05-27', 1, 2, 2, '08h20', '10h20', 3, '2303', 'AE', 1, 1, 1, 'tfe'),
(72, 1, 14, 164, '2020-05-27', 1, 10, 10, '08h20', '10h20', 2, '2203', 'pv11', 1, 1, 1, 'theorie'),
(74, 1, 14, 152, '2020-05-27', 1, 10, 10, '08h20', '10h20', 2, '2202', 'pv11', 1, 1, 1, 'theorie'),
(75, 1, 6, 151, '2020-05-27', 1, 5, 5, '08h20', '10h20', 1, '2103', 'cx', 1, 1, 1, 'laboratoire'),
(76, 1, 12, 161, '2020-05-27', 2, 5, 5, '10h30', '12h30', 2, '2203', 'lpo1', 1, 1, 1, 'laboratoire'),
(77, 1, 16, 165, '2020-05-27', 2, 5, 5, '10h30', '12h30', 2, '2201', 'lp02', 1, 0, 0, 'laboratoire'),
(78, 1, 16, 158, '2020-05-27', 2, 5, 5, '10h30', '12h30', 2, '2202', 'lp02', 1, 0, 0, 'laboratoire'),
(79, 1, 10, 167, '2020-05-27', 2, 5, 5, '10h30', '12h', 2, '2227', 'cx', 0, 1, 1, 'laboratoire'),
(80, 1, 10, 160, '2020-05-27', 2, 5, 5, '10h30', '12h30', 2, '2226', 'cx', 0, 1, 1, 'laboratoire'),
(81, 1, 7, 157, '2020-05-27', 3, 5, 5, '13h30', '15h30', 2, '2203', 'pv11', 1, 1, 1, 'laboratoire'),
(82, 1, 13, 156, '2020-05-27', 3, 10, 10, '13h30', '15h30', 2, '2226', 'ax', 0, 0, 1, 'theorie'),
(83, 1, 3, 152, '2020-05-27', 3, 5, 5, '13h30', '15h30', 2, '2201', 'pv12', 1, 1, 1, 'laboratoire');

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
  `Interet` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `eleves`
--

INSERT INTO `eleves` (`ID`, `Email`, `Nom`, `Prenom`, `Etablissement`, `Interet`) VALUES
(1, 'onsenfout@gmail.com', 'Hendrick', 'Samuel', 'Inpres', '1'),
(2, '', 'Khamana', 'Bene', 'Inpres', '1');

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
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `questionsfeedback`
--

INSERT INTO `questionsfeedback` (`ID`, `Question`, `TypeQuestion`) VALUES
(1, 'comment s\'est passé la journée ?', 1),
(2, 'est ce que cetait interessant ? ', 1),
(3, 'pas d idee', 1);

-- --------------------------------------------------------

--
-- Structure de la table `reponsesfeedback`
--

DROP TABLE IF EXISTS `reponsesfeedback`;
CREATE TABLE IF NOT EXISTS `reponsesfeedback` (
  `IDQuestion` int(11) NOT NULL,
  `IDEtudiant` int(11) NOT NULL,
  `Commentaire` varchar(280) COLLATE utf8_unicode_ci NOT NULL,
  `Ressenti` int(11) NOT NULL COMMENT 'entre 1 et 5 ',
  `Date` date NOT NULL DEFAULT current_timestamp() COMMENT 'consernant la journée x',
  PRIMARY KEY (`IDEtudiant`,`IDQuestion`,`Date`),
  KEY `FKQuestionReponse` (`IDQuestion`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `reponsesfeedback`
--

INSERT INTO `reponsesfeedback` (`IDQuestion`, `IDEtudiant`, `Commentaire`, `Ressenti`, `Date`) VALUES
(1, 1, 'com', 2, '2020-02-02'),
(2, 1, '', 5, '2020-02-20'),
(3, 1, '', 5, '2020-02-12'),
(1, 2, '', 4, '2020-02-20');

-- --------------------------------------------------------

--
-- Structure de la vue `coursdisponibles`
--
DROP TABLE IF EXISTS `coursdisponibles`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `coursdisponibles`  AS  select `cours`.`Intitule` AS `Intitule`,`coursimmersion`.`Cours` AS `Cours`,`coursimmersion`.`Date` AS `Date`,`coursimmersion`.`PlageHoraire` AS `PlageHoraire`,sum(`coursimmersion`.`PlacesDisponibles`) AS `PlacesDisponibles`,sum(`coursimmersion`.`PlacesTotal`) AS `PlacesTotal`,sum(`coursimmersion`.`Indus`) AS `Indus`,sum(`coursimmersion`.`Reseau`) AS `Reseau`,sum(`coursimmersion`.`Gestion`) AS `Gestion` from (`coursimmersion` join `cours` on(`coursimmersion`.`Cours` = `cours`.`ID`)) where `coursimmersion`.`visible` = '1' group by `coursimmersion`.`Cours`,`coursimmersion`.`Date`,`coursimmersion`.`PlageHoraire` order by `coursimmersion`.`Date`,`coursimmersion`.`PlageHoraire` ;

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
