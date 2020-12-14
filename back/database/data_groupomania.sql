-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 14 déc. 2020 à 16:43
-- Version du serveur :  5.7.31
-- Version de PHP : 7.3.21

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `groupomania`
--

-- --------------------------------------------------------

--
-- Structure de la table `comments`
--

DROP TABLE IF EXISTS `comments`;
CREATE TABLE IF NOT EXISTS `comments` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `message` text NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) NOT NULL,
  `PostId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `UserId` (`UserId`),
  KEY `PostId` (`PostId`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `comments`
--

INSERT INTO `comments` (`id`, `message`, `createdAt`, `updatedAt`, `UserId`, `PostId`) VALUES
(1, 'Waouh, la prochaine fois tu m\'emmènes dans ta valise !!!', '2020-12-11 15:02:00', '2020-12-11 15:02:00', 2, 1),
(2, 'J\'espère que ta valise est grande Stéph\', parce que tu n\'y retourneras pas sans moi non plus ! :p ', '2020-12-12 15:12:56', '2020-12-12 15:12:56', 3, 1),
(3, 'Allez, je suis sympa, je te mets un like pour t\'encourager à faire mieux pour la prochaine blague ahah', '2020-12-12 15:14:30', '2020-12-12 15:14:30', 3, 2),
(4, 'Cet ensemble turquoise est absolument fabuleux ! Quelle est la marque ?', '2020-12-14 15:18:18', '2020-12-14 15:18:18', 1, 4),
(5, 'Désolée, je suis du camp Rolling Stones héhé...', '2020-12-13 15:19:18', '2020-12-13 15:19:18', 1, 3),
(6, 'Tu as raison Pomme, encourageons-le parce qu\'il nous a habituées à mieux !', '2020-12-14 16:10:02', '2020-12-14 16:10:02', 1, 2),
(7, 'Tu veux me l\'offrir Stéph en récompense pour l\'employé du mois ? ;)', '2020-12-14 16:14:14', '2020-12-14 16:14:14', 2, 4),
(8, 'Ecoute la voix de la sagesse et reconnais le génie des deux groupes !', '2020-12-14 16:15:41', '2020-12-14 16:15:41', 2, 3),
(9, 'Et ben, merci les collègues !!!', '2020-12-14 16:16:07', '2020-12-14 16:16:07', 2, 2),
(10, 'Quel livre dévores-tu en ce moment ?', '2020-12-14 16:17:44', '2020-12-14 16:17:44', 3, 5),
(11, 'Stéphanie, il s\'agit de la maison de couture Kamizo. Et Marc, tu oublies que c\'est MOI l\'employée du mois !', '2020-12-14 16:18:40', '2020-12-14 16:18:40', 3, 4),
(12, 'Pffff....', '2020-12-14 16:40:19', '2020-12-14 16:40:19', 1, 7);

-- --------------------------------------------------------

--
-- Structure de la table `likes`
--

DROP TABLE IF EXISTS `likes`;
CREATE TABLE IF NOT EXISTS `likes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) NOT NULL,
  `PostId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `UserId` (`UserId`),
  KEY `PostId` (`PostId`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `likes`
--

INSERT INTO `likes` (`id`, `createdAt`, `updatedAt`, `UserId`, `PostId`) VALUES
(1, '2020-12-14 15:01:38', '2020-12-14 15:01:38', 2, 1),
(2, '2020-12-14 15:13:20', '2020-12-14 15:13:20', 3, 2),
(3, '2020-12-14 15:17:34', '2020-12-14 15:17:34', 1, 4),
(4, '2020-12-14 16:09:12', '2020-12-14 16:09:12', 1, 2),
(5, '2020-12-14 16:16:22', '2020-12-14 16:16:22', 2, 5),
(6, '2020-12-14 16:18:56', '2020-12-14 16:18:56', 3, 3),
(7, '2020-12-14 16:19:03', '2020-12-14 16:19:03', 3, 1),
(8, '2020-12-14 16:38:14', '2020-12-14 16:38:14', 2, 6);

-- --------------------------------------------------------

--
-- Structure de la table `posts`
--

DROP TABLE IF EXISTS `posts`;
CREATE TABLE IF NOT EXISTS `posts` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `text` text NOT NULL,
  `imageUrl` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `UserId` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  KEY `UserId` (`UserId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `posts`
--

INSERT INTO `posts` (`id`, `text`, `imageUrl`, `createdAt`, `updatedAt`, `UserId`) VALUES
(1, 'Je vous partage mes vacances, sous le soleil de San Diego !', 'http://localhost:3000/images/frank-mckenna-OD9EOzfSOh0-unsplash.jpg1607957933370.jpg', '2020-12-11 14:58:53', '2020-12-11 14:58:53', 1),
(2, 'La blague du jour concerne mon animal préféré : \n\"Comment fait-on aboyer un chat? \nOn lui donne une soucoupe pleine de lait et il la boit !\"', 'http://localhost:3000/images/macau-photo-agency-7hJvHBU-MCY-unsplash.jpg1607958352906.jpg', '2020-12-12 15:05:52', '2020-12-12 00:00:00', 2),
(3, 'Superbe street art en Pologne, rendant hommage à l\'un des plus grands groupes de tous les temps... ', 'http://localhost:3000/images/fedor-mqPtRW6e9Jk-unsplash.jpg1607958570957.jpg', '2020-12-13 15:09:30', '2020-12-13 15:09:30', 2),
(4, 'Magnifique défilé auquel j\'ai eu la chance d\'assister l\'an dernier... Qu\'en pensez-vous ?', 'http://localhost:3000/images/armen-aydinyan-bhJfx7t4QUA-unsplash.jpg1607958954124.jpg', '2020-12-14 15:15:54', '2020-12-14 15:15:54', 3),
(5, 'Un livre + la nature = combo parfait.', 'http://localhost:3000/images/annelies-geneyn-bhBONc07WsI-unsplash.jpg1607962291759.jpg', '2020-12-14 16:11:31', '2020-12-14 16:11:31', 1),
(6, 'Petite anecdote historique pour votre culture : Saviez-vous que la première bombe tombée sur Berlin pendant la guerre n\'avait tué personne ? A part un éléphant...\nL’éléphant se trouvait dans le zoo de Berlin. Certaines sources disent aussi qu’une girafe est morte dans le même temps.', NULL, '2020-12-14 16:21:25', '2020-12-14 16:21:25', 3),
(7, 'Une game boy + la nature = LE combo parfait !', 'http://localhost:3000/images/elias-castillo-1qx2J3TsRsk-unsplash.jpg1607963968140.jpg', '2020-12-14 16:39:28', '2020-12-14 16:39:28', 2);

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `firstName` varchar(255) NOT NULL,
  `surname` varchar(255) NOT NULL,
  `photo` varchar(255) DEFAULT NULL,
  `bio` text,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`),
  UNIQUE KEY `email` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `role`, `firstName`, `surname`, `photo`, `bio`, `createdAt`, `updatedAt`) VALUES
(1, 'stephanie.debray@groupomania.com', '$2b$10$nTPSRFfuHN8b.lT18f7lqu6m9aEf6mbyOsde1KcmAPlm6i7O3Tw.S', 'admin', 'Stéphanie', 'Debray', 'http://localhost:3000/images/christopher-campbell-rDEOVtE7vOs-unsplash.jpg1607957851307.jpg', 'J\'aime lire et voyager. Je suis le shérif ici, alors attention à ce que vous faites, je veille ! ', '2020-12-11 14:52:56', '2020-12-11 14:58:05'),
(2, 'marc.doubs@groupomania.com', '$2b$10$BnykfuzOPBuTFAHwbPAPdOHU28X.8FjAibkTwkBl6R/HSZLRySKDS', 'user', 'Marc', 'Doubs', 'http://localhost:3000/images/anton-darius-3x9GG5YPo8k-unsplash.jpg1607958021021.jpg', 'Blagueur invétéré, passionné de jeux vidéos, de musique et de chats. Miaou.', '2020-12-11 14:53:21', '2020-12-11 15:01:31'),
(3, 'pomme.dumarbre@groupomania.com', '$2b$10$MwjAinxBSvQjEITnVYKd9eZaMXfH9oAidM7jYKu23bpxSI.i6ftXG', 'user', 'Pomme', 'Dumarbre', 'http://localhost:3000/images/clem-onojeghuo-FbTOrJ2G8KI-unsplash.jpg1607958671561.jpg', 'Non, je n\'aime pas les pommes... Par contre j\'adore la mode, le cinéma et l\'histoire !', '2020-12-11 14:53:52', '2020-12-11 15:12:04');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `comments`
--
ALTER TABLE `comments`
  ADD CONSTRAINT `comments_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `comments_ibfk_2` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `likes`
--
ALTER TABLE `likes`
  ADD CONSTRAINT `likes_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `likes_ibfk_2` FOREIGN KEY (`PostId`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`UserId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
