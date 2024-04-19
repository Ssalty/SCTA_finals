CREATE DATABASE  IF NOT EXISTS `finals` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `finals`;
-- MySQL dump 10.13  Distrib 8.0.36, for Win64 (x86_64)
--
-- Host: localhost    Database: finals
-- ------------------------------------------------------
-- Server version	8.0.36

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
-- Table structure for table `userattendance`
--

DROP TABLE IF EXISTS `userattendance`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userattendance` (
  `userID` varchar(10) NOT NULL,
  `Checkin` datetime DEFAULT NULL,
  `Checkout` datetime DEFAULT NULL,
  `key` int NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`key`),
  KEY `id_idx` (`userID`),
  CONSTRAINT `id` FOREIGN KEY (`userID`) REFERENCES `userinfo` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=155 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userattendance`
--

LOCK TABLES `userattendance` WRITE;
/*!40000 ALTER TABLE `userattendance` DISABLE KEYS */;
INSERT INTO `userattendance` VALUES ('21200201','2024-04-19 01:45:41','2024-04-19 01:46:19',142),('21200201','2024-04-19 01:47:15','2024-04-19 01:47:22',143),('3786247926','2024-04-19 01:48:49','2024-04-19 01:49:08',144),('21200201','2024-04-19 02:24:42','2024-04-19 02:24:43',145),('21200201','2024-04-19 02:44:31','2024-04-19 02:44:52',146),('8930587915','2024-04-19 06:33:45','2024-04-19 06:33:53',147),('8930587915','2024-04-19 06:34:02','2024-04-19 06:34:03',148),('7972305332','2024-04-19 08:03:08','2024-04-19 08:03:40',149),('7972305332','2024-04-19 08:03:56','2024-04-19 08:04:17',150),('21200201','2024-04-19 08:04:35','2024-04-19 08:04:57',151),('8930587915','2024-04-19 08:05:32','2024-04-19 08:05:39',152),('21200201','2024-04-19 08:52:28','2024-04-19 08:53:20',153),('9416735860','2024-04-19 08:53:36','2024-04-19 08:53:41',154);
/*!40000 ALTER TABLE `userattendance` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userinfo`
--

DROP TABLE IF EXISTS `userinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userinfo` (
  `userID` varchar(10) NOT NULL,
  `cName` varchar(50) DEFAULT NULL,
  `address` varchar(100) DEFAULT NULL,
  `number` varchar(20) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `uscID_UNIQUE` (`userID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userinfo`
--

LOCK TABLES `userinfo` WRITE;
/*!40000 ALTER TABLE `userinfo` DISABLE KEYS */;
INSERT INTO `userinfo` VALUES ('21200201','Dave Nelson F. Ogue','Lawaan 1, Talisay City, Cebuasdasdsadasdsadasdasad','09194741985','21200201@gmail.com'),('3786247926','Justin Amber','Lawaan 2, Talisay City, Cebu','09475637656','Amberjustin@gmail.com'),('7972305332','Gwyneth Jugan','Talamban, Cebu City, Cebu','09123456789','Gwynethjugan@gmail.com'),('8930587915','Baumi Plays','Sambag I, Cebu City, Cebu','09425685234','Baumiplays@yahoo.com'),('9416735860','9416735860','9416735860','9416735860','9416735860@gmail.com');
/*!40000 ALTER TABLE `userinfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-04-19  9:31:37
