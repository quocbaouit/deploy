-- MySQL dump 10.13  Distrib 8.0.21, for Win64 (x86_64)
--
-- Host: localhost    Database: darkagedb
-- ------------------------------------------------------
-- Server version	8.0.13

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `galleries`
--

DROP TABLE IF EXISTS `galleries`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `galleries` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `GalleryType` tinyint(3) unsigned NOT NULL,
  `ThumbnailUrl` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ImageUrl` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `VideoUrl` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `CreationTime` datetime NOT NULL,
  `DisplayOrder` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `galleries`
--

LOCK TABLES `galleries` WRITE;
/*!40000 ALTER TABLE `galleries` DISABLE KEYS */;
INSERT INTO `galleries` VALUES (3,2,'images/gallery/3bae7602-98b0-467c-96b0-d41de257d3df.jpg','','https://www.youtube.com/watch?v=jgZiF3GXEyo','2020-08-24 08:50:55',1),(4,2,'images/gallery/6b58f39c-84cd-409a-a8c6-79f0131cfa98.jpg','','https://www.youtube.com/watch?v=0Y_5uU6kSaQ','2020-08-25 01:38:29',NULL),(5,2,'images/gallery/5ceb8cb0-ec90-4508-b424-b575b8f5cce9.jpg','','https://www.youtube.com/watch?v=iQVogFwfKqw','2020-08-25 01:39:19',NULL),(6,1,'images/gallery/459c7b7a-5805-4390-855b-5cb6fb9badc6.png','images/gallery/d67e2829-24bd-4191-a97f-516de978eee0.png','','2020-08-25 01:47:17',NULL),(7,1,'images/gallery/3a6bec5e-8b4c-4640-b6df-21deb2c5c1e6.png','images/gallery/8c4cfda6-df8b-4d58-aedf-ff7f9ea13572.png','','2020-08-25 02:12:57',NULL),(8,1,'images/gallery/84f74a5f-81e0-45b2-855b-88804e49d0a8.png','images/gallery/ed581849-dd2d-44be-892a-c6491b383daa.png','','2020-08-25 02:57:56',NULL),(9,1,'images/gallery/d833e1b4-80bb-4a96-9a46-eaa7743b4919.png','images/gallery/3c8d9c55-02e1-4b1b-98df-45096bb769cc.png','','2020-08-25 03:29:38',NULL),(10,1,'images/gallery/f0c278f9-a968-4df0-8738-87098abe6d6c.png','images/gallery/f7374d0c-8af7-469f-847f-237da820f18c.png','','2020-08-25 04:09:10',NULL);
/*!40000 ALTER TABLE `galleries` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-31  9:05:18
