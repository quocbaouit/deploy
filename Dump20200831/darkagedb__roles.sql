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
-- Table structure for table `_roles`
--

DROP TABLE IF EXISTS `_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_roles` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `CreationTime` datetime NOT NULL,
  `CreatorUserId` bigint(20) DEFAULT NULL,
  `LastModificationTime` datetime DEFAULT NULL,
  `LastModifierUserId` bigint(20) DEFAULT NULL,
  `IsDeleted` tinyint(1) NOT NULL,
  `DeleterUserId` bigint(20) DEFAULT NULL,
  `DeletionTime` datetime DEFAULT NULL,
  `TenantId` int(11) DEFAULT NULL,
  `Name` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `DisplayName` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `IsStatic` tinyint(1) NOT NULL,
  `IsDefault` tinyint(1) NOT NULL,
  `NormalizedName` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ConcurrencyStamp` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `Description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  PRIMARY KEY (`Id`),
  KEY `IX__Roles_CreatorUserId` (`CreatorUserId`),
  KEY `IX__Roles_DeleterUserId` (`DeleterUserId`),
  KEY `IX__Roles_LastModifierUserId` (`LastModifierUserId`),
  KEY `IX__Roles_TenantId_NormalizedName` (`TenantId`,`NormalizedName`),
  CONSTRAINT `FK__Roles__Users_CreatorUserId` FOREIGN KEY (`CreatorUserId`) REFERENCES `_users` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `FK__Roles__Users_DeleterUserId` FOREIGN KEY (`DeleterUserId`) REFERENCES `_users` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `FK__Roles__Users_LastModifierUserId` FOREIGN KEY (`LastModifierUserId`) REFERENCES `_users` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_roles`
--

LOCK TABLES `_roles` WRITE;
/*!40000 ALTER TABLE `_roles` DISABLE KEYS */;
INSERT INTO `_roles` VALUES (1,'2020-08-16 17:21:22',NULL,NULL,NULL,0,NULL,NULL,NULL,'Admin','Admin',1,1,'ADMIN','d48b390b-859b-4fac-bc71-fb073a6dab08',NULL),(2,'2020-08-16 17:21:22',NULL,NULL,NULL,0,NULL,NULL,1,'Admin','Admin',1,0,'ADMIN','b1743a68-a992-43f4-b39e-44e70f3e907d',NULL);
/*!40000 ALTER TABLE `_roles` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-31  9:05:32
