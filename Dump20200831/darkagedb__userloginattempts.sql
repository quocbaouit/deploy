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
-- Table structure for table `_userloginattempts`
--

DROP TABLE IF EXISTS `_userloginattempts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_userloginattempts` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `TenantId` int(11) DEFAULT NULL,
  `TenancyName` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `UserId` bigint(20) DEFAULT NULL,
  `UserNameOrEmailAddress` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ClientIpAddress` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `ClientName` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `BrowserInfo` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Result` tinyint(3) unsigned NOT NULL,
  `CreationTime` datetime NOT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX__UserLoginAttempts_UserId_TenantId` (`UserId`,`TenantId`),
  KEY `IX__UserLoginAttempts_TenancyName_UserNameOrEmailAddress_Result` (`TenancyName`,`UserNameOrEmailAddress`,`Result`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_userloginattempts`
--

LOCK TABLES `_userloginattempts` WRITE;
/*!40000 ALTER TABLE `_userloginattempts` DISABLE KEYS */;
INSERT INTO `_userloginattempts` VALUES (1,1,'Default',2,'admin','171.235.174.223',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',1,'2020-08-16 17:23:18'),(2,1,'Default',2,'admin','113.173.22.227',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',1,'2020-08-17 02:55:02'),(3,1,'Default',2,'admin','222.253.144.211',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',1,'2020-08-17 03:24:42'),(4,1,'Default',2,'admin','171.235.174.223',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',1,'2020-08-17 03:32:44'),(5,1,'Default',2,'admin','222.253.144.211',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',1,'2020-08-17 04:33:46'),(6,1,'Default',2,'admin','171.244.236.218',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',1,'2020-08-17 05:00:44'),(7,1,'Default',2,'admin','171.244.236.218',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',1,'2020-08-17 05:18:50'),(8,1,'Default',2,'admin','171.235.174.223',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',1,'2020-08-17 05:25:26'),(9,1,'Default',2,'admin','222.253.144.211',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',1,'2020-08-17 06:44:11'),(10,1,'Default',2,'admin','171.244.236.218',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',1,'2020-08-17 08:42:31'),(11,1,'Default',2,'admin','171.244.236.218',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',1,'2020-08-17 09:09:51'),(12,1,'Default',2,'admin','222.253.144.211',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',1,'2020-08-18 01:30:21'),(13,1,'Default',2,'admin','171.235.174.223',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',1,'2020-08-18 16:50:53'),(14,1,'Default',2,'admin','171.235.174.223',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',1,'2020-08-18 17:25:51'),(15,1,'Default',2,'admin','222.253.144.211',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',1,'2020-08-19 01:48:34'),(16,1,'Default',2,'admin','171.235.174.223',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',1,'2020-08-19 02:44:39'),(17,1,'Default',2,'admin','171.244.236.218',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',1,'2020-08-19 06:32:45'),(18,1,'Default',2,'admin','222.253.144.211',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',1,'2020-08-20 01:41:45'),(19,1,'Default',2,'admin','171.244.236.218',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',1,'2020-08-20 03:05:46'),(20,1,'Default',2,'admin','171.235.174.223',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',1,'2020-08-20 14:59:14'),(21,1,'Default',2,'admin','171.235.174.223',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.125 Safari/537.36',1,'2020-08-20 16:24:08'),(22,1,'Default',2,'admin','222.253.144.211',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',1,'2020-08-21 01:54:55'),(23,1,'Default',2,'admin','115.77.191.248',NULL,'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',1,'2020-08-21 07:49:28'),(24,1,'Default',2,'admin','103.199.36.62',NULL,'Mozilla/5.0 (iPhone; CPU iPhone OS 13_6 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/13.1.2 Mobile/15E148 Safari/604.1',1,'2020-08-22 04:22:02'),(25,1,'Default',2,'admin','222.253.144.211',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',1,'2020-08-24 01:33:27'),(26,1,'Default',2,'admin','222.253.144.211',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36 Edg/84.0.522.63',1,'2020-08-24 01:40:57'),(27,1,'Default',2,'admin','222.253.144.211',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',1,'2020-08-24 08:49:24'),(28,1,'Default',2,'admin','222.253.144.211',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',1,'2020-08-24 09:42:00'),(29,1,'Default',2,'admin','222.253.144.211',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',1,'2020-08-25 01:31:06'),(30,1,'Default',2,'admin','222.253.144.211',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36 Edg/84.0.522.63',1,'2020-08-25 07:12:26'),(31,1,'Default',2,'admin','222.253.144.211',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36 Edg/84.0.522.63',1,'2020-08-26 01:31:43'),(32,1,'Default',2,'admin','222.253.144.211',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',1,'2020-08-26 01:33:44'),(33,1,'Default',2,'admin','171.252.155.152',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',3,'2020-08-26 03:08:04'),(34,1,'Default',2,'admin','171.252.155.152',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',3,'2020-08-26 03:08:08'),(35,1,'Default',2,'admin','171.252.155.152',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',3,'2020-08-26 03:08:45'),(36,1,'Default',2,'admin','115.77.191.248',NULL,'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',1,'2020-08-26 03:08:59'),(37,1,'Default',2,'admin','171.252.155.152',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',1,'2020-08-26 03:09:06'),(38,1,'Default',2,'admin','222.253.144.211',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',1,'2020-08-26 09:08:03'),(39,1,'Default',2,'admin','222.253.144.211',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',1,'2020-08-27 01:59:52'),(40,1,'Default',2,'admin','222.253.144.211',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36 Edg/84.0.522.63',1,'2020-08-27 08:00:43'),(41,1,'Default',2,'admin','222.253.144.211',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',1,'2020-08-27 09:57:59'),(42,1,'Default',2,'admin','222.253.144.211',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',1,'2020-08-28 01:43:47'),(43,1,'Default',2,'admin','113.161.112.218',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',1,'2020-08-28 03:24:48'),(44,1,'Default',2,'admin','113.161.112.218',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',1,'2020-08-28 03:26:33'),(45,1,'Default',2,'admin','14.183.216.245',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',1,'2020-08-28 04:18:50'),(46,1,'Default',2,'admin','222.253.144.211',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',1,'2020-08-28 07:16:33'),(47,1,'Default',2,'admin','222.253.144.211',NULL,'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/84.0.4147.135 Safari/537.36',1,'2020-08-31 01:07:05');
/*!40000 ALTER TABLE `_userloginattempts` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-31  9:05:41
