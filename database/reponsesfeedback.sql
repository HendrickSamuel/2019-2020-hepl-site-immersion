-- phpMyAdmin SQL Dump
-- version 4.9.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le :  lun. 25 mai 2020 à 13:28
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

--
-- Contraintes pour les tables déchargées
--

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
