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
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Character` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `Email` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `TicketCode` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `Description` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `Status` int(11) NOT NULL,
  `FileUrls` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `Ip` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `CreationTime` datetime NOT NULL,
  `DisplayOrder` int(11) DEFAULT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` VALUES (1,'3123123123','hoanganh20181020@gmail.com','5b9e3b25-1ff6-46fa-b301-36be1ce74d3f','312321321312321321',1,'wwwroot/reports/zipfiles\\5b9e3b25-1ff6-46fa-b301-36be1ce74d3f.zip','ip=171.235.174.223','2020-08-16 17:23:14',NULL),(2,'x','x@gmail.com','0313d8b4-078f-4d75-ab81-e533436822be','a',1,'wwwroot/reports/zipfiles\\0313d8b4-078f-4d75-ab81-e533436822be.zip','ip=2001:ee0:4f52:5670:80bd:f180:d115:2c30','2020-08-16 17:23:48',NULL),(3,'sgsdfg','vjnotenough@gmail.com','b1fafa91-dadf-455d-8c25-e5c5320f22fb','gdsfgdfg',2,'wwwroot/reports/zipfiles\\b1fafa91-dadf-455d-8c25-e5c5320f22fb.zip','ip=222.253.144.211','2020-08-17 03:41:13',NULL);
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-31  9:05:35
