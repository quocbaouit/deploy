
SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `CoreUser`
-- ----------------------------
DROP TABLE IF EXISTS `CoreUser`;
CREATE TABLE `CoreUser` (
`UserID`  bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT ,
`UserName`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`Password`  varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'PHP(MD5) standard use for web' ,
`DisplayName`  varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Default is LastName + FirstName' ,
`Email`  varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'Email of user, unique and follow by standard' ,
`Address`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`PrimaryMobile`  varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`BirthDay`  date NULL DEFAULT NULL ,
`CardID`  varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL COMMENT 'card number use authenticate' ,
`Gender`  tinyint(1) NULL DEFAULT NULL ,
`Status`  int(11) NULL DEFAULT 0 COMMENT '0: Waiting\r\n            1:  Active \r\n            2 : InActive' ,
`ClientIP`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`DateCreate`  datetime NULL DEFAULT NULL ,
`DateUpdate`  datetime NULL DEFAULT NULL ,
PRIMARY KEY (`UserID`),
UNIQUE INDEX `IDX_EMAIL` (`Email`) USING BTREE ,
UNIQUE INDEX `UserName` (`UserName`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
COMMENT='Core users: all users of core\r\n'
AUTO_INCREMENT=1

;

-- ----------------------------
-- Table structure for `CoreUser_1000`
-- ----------------------------
DROP TABLE IF EXISTS `CoreUser_1000`;
CREATE TABLE `CoreUser_1000` (
`ID`  bigint(20) NOT NULL AUTO_INCREMENT ,
`UserID`  bigint(20) UNSIGNED NOT NULL ,
`UserName`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`DateCreate`  datetime NULL DEFAULT NULL ,
`DateUpdate`  datetime NULL DEFAULT NULL ,
`CP`  int(11) NULL DEFAULT 0 ,
`IP`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`ClientOS`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (`ID`),
UNIQUE INDEX `UserName` (`UserName`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=1

;

-- ----------------------------
-- Table structure for `CoreUserDevice_1000`
-- ----------------------------
DROP TABLE IF EXISTS `CoreUserDevice_1000`;
CREATE TABLE `CoreUserDevice_1000` (
`ID`  int(11) NOT NULL AUTO_INCREMENT ,
`UserID`  bigint(20) NULL DEFAULT NULL ,
`DeviceID`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`DeviceToken`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`ClientOS`  varchar(100) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`CP`  int(11) NULL DEFAULT 0 ,
`IP`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`DateCreate`  datetime NULL DEFAULT NULL ,
`DateUpdate`  datetime NULL DEFAULT NULL ,
PRIMARY KEY (`ID`),
UNIQUE INDEX `UserDevice` (`UserID`, `DeviceID`) USING BTREE ,
UNIQUE INDEX `UserID` (`UserID`) USING BTREE ,
UNIQUE INDEX `DeviceID` (`DeviceID`) USING BTREE ,
INDEX `ClientOS` (`ClientOS`) USING BTREE ,
INDEX `DeviceIDToken` (`DeviceID`, `DeviceToken`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=1

;

-- ----------------------------
-- Table structure for `HistoryIn`
-- ----------------------------
DROP TABLE IF EXISTS `HistoryIn`;
CREATE TABLE `HistoryIn` (
`ID`  int(11) NOT NULL AUTO_INCREMENT ,
`TransactionID`  varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`OrderID`  varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`UserID`  bigint(20) NULL DEFAULT NULL ,
`AppID`  int(11) NULL DEFAULT NULL ,
`Server`  varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`Character`  varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`CardData`  varchar(32) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`PartnerID`  int(11) NULL DEFAULT NULL ,
`PartnerResult`  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
`Amount`  double NULL DEFAULT NULL ,
`DateCreate`  datetime NULL DEFAULT NULL ,
`DateUpdate`  datetime NULL DEFAULT NULL ,
`IP`  varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`Status`  enum('process','finish','error','to-partner') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`HashKey`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (`ID`),
UNIQUE INDEX `HashKey` (`HashKey`) USING BTREE ,
INDEX `UserID` (`UserID`) USING BTREE ,
INDEX `AppID` (`AppID`) USING BTREE ,
INDEX `PartnerID` (`PartnerID`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=1

;

-- ----------------------------
-- Records of HistoryIn
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for `HistoryOut`
-- ----------------------------
DROP TABLE IF EXISTS `HistoryOut`;
CREATE TABLE `HistoryOut` (
`ID`  int(11) NOT NULL AUTO_INCREMENT ,
`HistoryInID`  int(11) NULL DEFAULT NULL ,
`TransactionID`  varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`OrderID`  varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`UserID`  bigint(20) NULL DEFAULT NULL ,
`AppID`  int(11) NULL DEFAULT NULL ,
`ClientOS`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`Server`  varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`Character`  varchar(200) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`ObjectResult`  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
`Message`  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
`Amount`  double NULL DEFAULT NULL ,
`DateCreate`  datetime NULL DEFAULT NULL ,
`DateUpdate`  datetime NULL DEFAULT NULL ,
`IP`  varchar(40) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`Status`  enum('process','finish') CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT 'process' ,
`HashKey`  varchar(50) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
PRIMARY KEY (`ID`),
UNIQUE INDEX `HashKey` (`HashKey`) USING BTREE ,
INDEX `UserID` (`UserID`) USING BTREE ,
INDEX `ClientOS` (`ClientOS`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=1

;

-- ----------------------------
-- Records of HistoryOut
-- ----------------------------
BEGIN;
COMMIT;

-- ----------------------------
-- Table structure for `SDKConfig`
-- ----------------------------
DROP TABLE IF EXISTS `SDKConfig`;
CREATE TABLE `SDKConfig` (
`AppID`  int(11) NOT NULL DEFAULT 0 ,
`AppName`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`AppKey`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`SecretKey`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`InitInfo`  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL COMMENT '192.168.1.100,254.125.25.123,.......' ,
`FBLoginInfo`  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
`InfoIAP`  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
`IAPDefine`  text CHARACTER SET utf8 COLLATE utf8_general_ci NULL ,
`AppStatus`  tinyint(1) NULL DEFAULT NULL COMMENT '0:inactive;1:active' ,
`DateCreate`  datetime NULL DEFAULT NULL ,
`DateUpdate`  datetime NULL DEFAULT NULL ,
PRIMARY KEY (`AppID`),
UNIQUE INDEX `AppID` (`AppID`) USING BTREE ,
INDEX `AppKey` (`AppKey`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci

;

-- ----------------------------
-- Table structure for `UserPartner`
-- ----------------------------
DROP TABLE IF EXISTS `UserPartner`;
CREATE TABLE `UserPartner` (
`ID`  bigint(20) NOT NULL AUTO_INCREMENT ,
`UserID`  bigint(20) NOT NULL DEFAULT 0 ,
`UserPartnerID`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`ProfileLink`  varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NULL DEFAULT NULL ,
`PartnerID`  int(11) NULL DEFAULT NULL ,
`DateUpdate`  datetime NULL DEFAULT NULL ,
PRIMARY KEY (`ID`),
INDEX `UserID` (`UserID`) USING BTREE ,
INDEX `UserPartnerID` (`UserPartnerID`) USING BTREE ,
INDEX `PartnerID` (`PartnerID`) USING BTREE 
)
ENGINE=InnoDB
DEFAULT CHARACTER SET=utf8 COLLATE=utf8_general_ci
AUTO_INCREMENT=1

;
