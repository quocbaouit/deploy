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
-- Table structure for table `characters`
--

DROP TABLE IF EXISTS `characters`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `characters` (
  `Id` int(11) NOT NULL AUTO_INCREMENT,
  `Name` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ImageOfNameUrl` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `ImageOfCharacterUrl` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `Description` varchar(1000) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `characters`
--

LOCK TABLES `characters` WRITE;
/*!40000 ALTER TABLE `characters` DISABLE KEYS */;
INSERT INTO `characters` VALUES (1,'nhan vat 1','images/character/822998de-92aa-4c3b-8a94-a3c1ebdd6ef5.png','images/character/efb13991-2ff0-48e9-a2fa-a358ac2c3974.png','Priests : Pháp Sư trầm tĩnh, ma pháp siêu nhiên, pháp lực vô biên, nhận ban phước và sở hữu trí thức vật chất nguyên tố từ Thủ Hộ Thần Athena (Athena được xem như  thần thủ hộ, trí tuệ và đồng thời cũng là vị thần tượng trưng chính nghĩa )'),(2,'nhan vat 2','images/character/dae0925a-8ee2-4eae-9373-257cdce4bbb1.png','images/character/70c79dd8-ca05-46f5-9492-23b1511dfa55.png','Warrior : Chiến Binh quả cảm, trái tim kiên định, tinh thần bất khuất, mang trong mình ý chí chiến đấu bất diệt của Chiến Thần “Ares” ( Ares là thần của chiến tranh, thần của các chiến binh và tinh thần chiến đấu. Ares được xem là vị thần có khả năng quyết định thắng bại của mọi cuộc chiến.'),(3,'nhan vat 3','images/character/52d33979-53ca-44e9-b6d1-081751365f3f.png','images/character/36a394a5-db15-4097-969a-9b4219a68efc.png','Archer : Xạ Thủ thiên tài, đôi tay thần tốc, nhất kích tất sát, được thừa hưởng các thiên phú từ Thái Dương Thần “Apollo” ( Apollo được mệnh danh là vị thần bắn xa muôn dặm, tượng trưng cho ánh sáng và chân lý )'),(4,'nhan vat 4','images/character/d8100458-329b-4536-bd1f-0edbe01a66ff.png','images/character/8ce5ba4d-29d7-49e3-8fc2-3ab034cbfd32.png','Assassin : lạnh lùng, đồng hành hắc ám, bóng ma chiến trường, bước trên con đường sinh tử với sự dìu dắt của Thần Địa Ngục Hades ( Thần Hades cai quản địa ngục, với chiếc Mũ Tàng Hình và con chó ngao ba đầu Cerberus, Hades mang đến ác mộng kinh hoàng cho thế gian)');
/*!40000 ALTER TABLE `characters` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-08-31  9:05:34
