-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  jeu. 09 avr. 2020 à 21:21
-- Version du serveur :  5.7.24
-- Version de PHP :  7.2.14

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
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

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
-- Structure de la table `coursimmersion`
--

DROP TABLE IF EXISTS `coursimmersion`;
CREATE TABLE IF NOT EXISTS `coursimmersion` (
  `Cours` int(11) NOT NULL,
  `Professeur` int(11) NOT NULL,
  `Date` date NOT NULL,
  `PlageHoraire` int(11) NOT NULL,
  `PlacesDisponibles` int(11) NOT NULL,
  `HeureDebut` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `HeureFin` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `bloc` int(11) NOT NULL,
  `type` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`Cours`,`Professeur`,`Date`,`PlageHoraire`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `coursimmersion`
--

INSERT INTO `coursimmersion` (`Cours`, `Professeur`, `Date`, `PlageHoraire`, `PlacesDisponibles`, `HeureDebut`, `HeureFin`, `bloc`, `type`) VALUES
(1, 1, '2008-07-04', 1, 10, '08h50', '10h20', 1, 'labo');

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
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Structure de la table `inscritscours`
--

DROP TABLE IF EXISTS `inscritscours`;
CREATE TABLE IF NOT EXISTS `inscritscours` (
  `Etudiant` int(11) NOT NULL,
  `Cours` int(11) NOT NULL,
  PRIMARY KEY (`Etudiant`,`Cours`)
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Déchargement des données de la table `profs`
--

INSERT INTO `profs` (`ID`, `Nom`) VALUES
(1, 'Samuel');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `inscritscours`
--
ALTER TABLE `inscritscours`
  ADD CONSTRAINT `FKinscritscoursEleve` FOREIGN KEY (`Etudiant`) REFERENCES `eleves` (`ID`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
