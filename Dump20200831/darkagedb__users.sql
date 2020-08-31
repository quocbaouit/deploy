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
-- Table structure for table `_users`
--

DROP TABLE IF EXISTS `_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_users` (
  `Id` bigint(20) NOT NULL AUTO_INCREMENT,
  `CreationTime` datetime NOT NULL,
  `CreatorUserId` bigint(20) DEFAULT NULL,
  `LastModificationTime` datetime DEFAULT NULL,
  `LastModifierUserId` bigint(20) DEFAULT NULL,
  `IsDeleted` tinyint(1) NOT NULL,
  `DeleterUserId` bigint(20) DEFAULT NULL,
  `DeletionTime` datetime DEFAULT NULL,
  `AuthenticationSource` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `UserName` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `TenantId` int(11) DEFAULT NULL,
  `EmailAddress` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Name` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Surname` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `Password` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `EmailConfirmationCode` varchar(328) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `PasswordResetCode` varchar(328) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `LockoutEndDateUtc` datetime DEFAULT NULL,
  `AccessFailedCount` int(11) NOT NULL,
  `IsLockoutEnabled` tinyint(1) NOT NULL,
  `PhoneNumber` varchar(32) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `IsPhoneNumberConfirmed` tinyint(1) NOT NULL,
  `SecurityStamp` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `IsTwoFactorEnabled` tinyint(1) NOT NULL,
  `IsEmailConfirmed` tinyint(1) NOT NULL,
  `IsActive` tinyint(1) NOT NULL,
  `NormalizedUserName` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `NormalizedEmailAddress` varchar(256) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `ConcurrencyStamp` varchar(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  PRIMARY KEY (`Id`),
  KEY `IX__Users_CreatorUserId` (`CreatorUserId`),
  KEY `IX__Users_DeleterUserId` (`DeleterUserId`),
  KEY `IX__Users_LastModifierUserId` (`LastModifierUserId`),
  KEY `IX__Users_TenantId_NormalizedEmailAddress` (`TenantId`,`NormalizedEmailAddress`),
  KEY `IX__Users_TenantId_NormalizedUserName` (`TenantId`,`NormalizedUserName`),
  CONSTRAINT `FK__Users__Users_CreatorUserId` FOREIGN KEY (`CreatorUserId`) REFERENCES `_users` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `FK__Users__Users_DeleterUserId` FOREIGN KEY (`DeleterUserId`) REFERENCES `_users` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `FK__Users__Users_LastModifierUserId` FOREIGN KEY (`LastModifierUserId`) REFERENCES `_users` (`id`) ON DELETE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_users`
--

LOCK TABLES `_users` WRITE;
/*!40000 ALTER TABLE `_users` DISABLE KEYS */;
INSERT INTO `_users` VALUES (1,'2020-08-16 17:21:22',NULL,NULL,NULL,0,NULL,NULL,NULL,'admin',NULL,'admin@aspnetboilerplate.com','admin','admin','AQAAAAEAACcQAAAAEFYi4Ecs4cShLbPk29fBy6iirDOxuIvHxDbOpNhwQJ8tskYCdEp9ETOsbNyQWD2m/A==',NULL,NULL,NULL,0,0,NULL,0,'5afd088b-c599-cd36-fa34-39f70a771543',0,1,1,'ADMIN','ADMIN@ASPNETBOILERPLATE.COM','beb56597-4714-477a-9bfd-2787bfc5d4ac'),(2,'2020-08-16 17:21:22',NULL,'2020-08-26 03:08:59',NULL,0,NULL,NULL,NULL,'admin',1,'admin@defaulttenant.com','admin','admin','AQAAAAEAACcQAAAAEB3KlKo0RKttgZ6hR+woJXIQgnmC05UO0iozk/RlwZ32pFftedFpq5DOpd2HJ3LB5A==',NULL,NULL,NULL,0,0,NULL,0,'481584d7-a74f-ce87-bd3d-39f70a7716e1',0,1,1,'ADMIN','ADMIN@DEFAULTTENANT.COM','8d7c1c6c-69de-4c41-b4d8-dcdacd07cdc5');
/*!40000 ALTER TABLE `_users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-31  9:05:20
