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
-- Table structure for table `_permissions`
--

DROP TABLE IF EXISTS `_permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_permissions` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `CreationTime` datetime NOT NULL,
  `CreatorUserId` bigint(20) DEFAULT NULL,
  `TenantId` int(11) DEFAULT NULL,
  `Name` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `IsGranted` tinyint(1) NOT NULL,
  `Discriminator` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `RoleId` int(11) DEFAULT NULL,
  `UserId` bigint(20) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX__Permissions_TenantId_Name` (`TenantId`,`Name`),
  KEY `IX__Permissions_RoleId` (`RoleId`),
  KEY `IX__Permissions_UserId` (`UserId`),
  CONSTRAINT `FK__Permissions__Roles_RoleId` FOREIGN KEY (`RoleId`) REFERENCES `_roles` (`id`) ON DELETE CASCADE,
  CONSTRAINT `FK__Permissions__Users_UserId` FOREIGN KEY (`UserId`) REFERENCES `_users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_permissions`
--

LOCK TABLES `_permissions` WRITE;
/*!40000 ALTER TABLE `_permissions` DISABLE KEYS */;
INSERT INTO `_permissions` VALUES (1,'2020-08-16 17:21:22',NULL,NULL,'Pages.Users',1,'RolePermissionSetting',1,NULL),(2,'2020-08-16 17:21:22',NULL,NULL,'Pages.Roles',1,'RolePermissionSetting',1,NULL),(3,'2020-08-16 17:21:22',NULL,NULL,'Pages.Tenants',1,'RolePermissionSetting',1,NULL),(4,'2020-08-16 17:21:22',NULL,1,'Pages.Roles',1,'RolePermissionSetting',2,NULL),(5,'2020-08-16 17:21:22',NULL,1,'Pages.Users',1,'RolePermissionSetting',2,NULL);
/*!40000 ALTER TABLE `_permissions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-31  9:05:39
