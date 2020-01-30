CREATE TABLE `member` (
  `mem_no` int NOT NULL AUTO_INCREMENT,
  `id` varchar(45) COLLATE utf8_bin NOT NULL,
  `pw` varchar(200) COLLATE utf8_bin NOT NULL,
  `birth` datetime DEFAULT NULL,
  `nickname` varchar(20) COLLATE utf8_bin NOT NULL,
  `img` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `rdate` datetime NOT NULL,
  `wdate` datetime DEFAULT NULL,
  `sns` varchar(120) COLLATE utf8_bin DEFAULT NULL,
  `msg` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`mem_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `follow` (
  `follower_no` int NOT NULL,
  `following_no` int NOT NULL,
  `fol_time` datetime NOT NULL,
  PRIMARY KEY (`follower_no`,`following_no`),
  KEY `following_no_idx` (`following_no`),
  CONSTRAINT `follower_no` FOREIGN KEY (`follower_no`) REFERENCES `member` (`mem_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `following_no` FOREIGN KEY (`following_no`) REFERENCES `member` (`mem_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `channel` (
  `ch_no` int NOT NULL AUTO_INCREMENT,
  `id` varchar(45) COLLATE utf8_bin NOT NULL,
  `pw` varchar(200) COLLATE utf8_bin NOT NULL,
  `nickname` varchar(20) COLLATE utf8_bin NOT NULL,
  `img` varchar(100) COLLATE utf8_bin DEFAULT NULL,
  `rdate` datetime NOT NULL,
  `wdate` datetime DEFAULT NULL,
  `sns` varchar(120) COLLATE utf8_bin DEFAULT NULL,
  `msg` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`ch_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `category` (
  `category_no` int NOT NULL,
  `category_name` varchar(45) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`category_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `favor` (
  `favor_no` int NOT NULL,
  `favor_name` varchar(60) COLLATE utf8_bin NOT NULL,
  `category_no` int DEFAULT NULL,
  PRIMARY KEY (`favor_no`),
  KEY `category_no_idx` (`category_no`),
  CONSTRAINT `category_no` FOREIGN KEY (`category_no`) REFERENCES `category` (`category_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `filter` (
  `filter_no` int NOT NULL AUTO_INCREMENT,
  `filter_name` varchar(30) COLLATE utf8_bin NOT NULL,
  `filter_content` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `filter_color` varchar(7) COLLATE utf8_bin NOT NULL,
  PRIMARY KEY (`filter_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `schedule` (
  `sch_no` int NOT NULL AUTO_INCREMENT,
  `title` varchar(30) COLLATE utf8_bin NOT NULL,
  `contents` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `sdate` datetime NOT NULL,
  `edate` datetime NOT NULL,
  `place` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `sch_ch_no` int DEFAULT NULL,
  `sch_mem_no` int DEFAULT NULL,
  `filter_no` int DEFAULT NULL,
  PRIMARY KEY (`sch_no`),
  KEY `sc_mem_no_idx` (`sch_mem_no`),
  KEY `sc_ch_no_idx` (`sch_ch_no`),
  KEY `sc_filter_no_idx` (`filter_no`),
  CONSTRAINT `filter_no` FOREIGN KEY (`filter_no`) REFERENCES `filter` (`filter_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sch_ch_no` FOREIGN KEY (`sch_ch_no`) REFERENCES `channel` (`ch_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sch_mem_no` FOREIGN KEY (`sch_mem_no`) REFERENCES `member` (`mem_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `feed` (
  `feed_no` int NOT NULL AUTO_INCREMENT,
  `feed_time` datetime NOT NULL,
  `contents` varchar(500) COLLATE utf8_bin NOT NULL,
  `sch_no` int NOT NULL,
  PRIMARY KEY (`feed_no`),
  KEY `sch_no_idx` (`sch_no`),
  CONSTRAINT `sch_no` FOREIGN KEY (`sch_no`) REFERENCES `schedule` (`sch_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `reply` (
  `reply_no` int NOT NULL,
  `id` varchar(45) COLLATE utf8_bin NOT NULL,
  `contents` varchar(200) COLLATE utf8_bin NOT NULL,
  `rdate` datetime NOT NULL,
  `mdate` datetime DEFAULT NULL,
  `parent` int DEFAULT NULL,
  `feed_no` int DEFAULT NULL,
  PRIMARY KEY (`reply_no`),
  KEY `feed_no_idx` (`feed_no`),
  CONSTRAINT `feed_no` FOREIGN KEY (`feed_no`) REFERENCES `feed` (`feed_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `subscribe` (
  `sub_mem_no` int NOT NULL,
  `sub_ch_no` int NOT NULL,
  `sub_date` datetime NOT NULL,
  PRIMARY KEY (`sub_mem_no`,`sub_ch_no`),
  KEY `ch_no_idx` (`sub_ch_no`),
  CONSTRAINT `sub_ch_no` FOREIGN KEY (`sub_ch_no`) REFERENCES `channel` (`ch_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sub_mem_no` FOREIGN KEY (`sub_mem_no`) REFERENCES `member` (`mem_no`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `interests` (
  `int_mem_no` int NOT NULL,
  `int_favor_no` int NOT NULL,
  PRIMARY KEY (`int_mem_no`,`int_favor_no`),
  KEY `favor_no_idx` (`int_favor_no`),
  CONSTRAINT `int_favor_no` FOREIGN KEY (`int_favor_no`) REFERENCES `favor` (`favor_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `int_mem_no` FOREIGN KEY (`int_mem_no`) REFERENCES `member` (`mem_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

CREATE TABLE `attribute` (
  `att_favor_no` int NOT NULL,
  `att_ch_no` int NOT NULL,
  KEY `favor_no_fk_idx` (`att_favor_no`),
  KEY `ch_no_fk_idx` (`att_ch_no`),
  CONSTRAINT `att_ch_no` FOREIGN KEY (`att_ch_no`) REFERENCES `channel` (`ch_no`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `att_favor_no` FOREIGN KEY (`att_favor_no`) REFERENCES `favor` (`favor_no`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;


