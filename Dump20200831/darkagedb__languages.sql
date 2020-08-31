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
-- Table structure for table `_languages`
--

DROP TABLE IF EXISTS `_languages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_languages` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CreationTime` datetime NOT NULL,
  `CreatorUserId` bigint(20) DEFAULT NULL,
  `LastModificationTime` datetime DEFAULT NULL,
  `LastModifierUserId` bigint(20) DEFAULT NULL,
  `IsDeleted` tinyint(1) NOT NULL,
  `DeleterUserId` bigint(20) DEFAULT NULL,
  `DeletionTime` datetime DEFAULT NULL,
  `TenantId` int(11) DEFAULT NULL,
  `Name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `DisplayName` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Icon` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  `IsDisabled` tinyint(1) NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX__Languages_TenantId_Name` (`TenantId`,`Name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_languages`
--

LOCK TABLES `_languages` WRITE;
/*!40000 ALTER TABLE `_languages` DISABLE KEYS */;
INSERT INTO `_languages` VALUES (1,'2020-08-16 17:21:21',NULL,NULL,NULL,0,NULL,NULL,1,'en','English','famfamfam-flags us',0),(2,'2020-08-16 17:21:21',NULL,NULL,NULL,0,NULL,NULL,1,'vi','Vietnamese','famfamfam-flags vn',0),(3,'2020-08-16 17:21:21',NULL,NULL,NULL,0,NULL,NULL,1,'ar','العربية','famfamfam-flags sa',0),(4,'2020-08-16 17:21:21',NULL,NULL,NULL,0,NULL,NULL,1,'de','German','famfamfam-flags de',0),(5,'2020-08-16 17:21:21',NULL,NULL,NULL,0,NULL,NULL,1,'it','Italiano','famfamfam-flags it',0),(6,'2020-08-16 17:21:21',NULL,NULL,NULL,0,NULL,NULL,1,'fr','Français','famfamfam-flags fr',0),(7,'2020-08-16 17:21:21',NULL,NULL,NULL,0,NULL,NULL,1,'pt-BR','Português','famfamfam-flags br',0),(8,'2020-08-16 17:21:21',NULL,NULL,NULL,0,NULL,NULL,1,'tr','Türkçe','famfamfam-flags tr',0),(9,'2020-08-16 17:21:21',NULL,NULL,NULL,0,NULL,NULL,1,'ru','Русский','famfamfam-flags ru',0),(10,'2020-08-16 17:21:21',NULL,NULL,NULL,0,NULL,NULL,1,'zh-Hans','简体中文','famfamfam-flags cn',0),(11,'2020-08-16 17:21:21',NULL,NULL,NULL,0,NULL,NULL,1,'es-MX','Español México','famfamfam-flags mx',0),(12,'2020-08-16 17:21:21',NULL,NULL,NULL,0,NULL,NULL,1,'nl','Nederlands','famfamfam-flags nl',0),(13,'2020-08-16 17:21:21',NULL,NULL,NULL,0,NULL,NULL,1,'ja','日本語','famfamfam-flags jp',0);
/*!40000 ALTER TABLE `_languages` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-31  9:05:38
