DROP DATABASE IF EXISTS webchat;
CREATE DATABASE webchat;
USE webchat;

CREATE TABLE `User` (
	`user_id` int NOT NULL AUTO_INCREMENT,
	`email` varchar(25) NOT NULL UNIQUE,
	`username` varchar(25) NOT NULL UNIQUE,
	`user_password` varchar(20) NOT NULL,
	`first_name` varchar(10) NOT NULL,
	`last_name` varchar(10) NOT NULL,
	`isModerate` BOOLEAN NOT NULL DEFAULT false,
	`friend` int NOT NULL,
	PRIMARY KEY (`user_id`,`email`,`username`)
);

CREATE TABLE `Message` (
	`message_id` int NOT NULL AUTO_INCREMENT,
	`content` varchar(255) NOT NULL,
	`from_user` varchar(255) NOT NULL,
	`to_chatroom` int NOT NULL,
	PRIMARY KEY (`message_id`)
);

CREATE TABLE `Chatroom` (
	`chatroom_id` int NOT NULL AUTO_INCREMENT,
    `chatroom_name` varchar(50) NOT NULL UNIQUE,
    `chatroom_password` varchar(50),
    `chatroom_description` varchar(255),
	`member_num` int(25) NOT NULL,
	PRIMARY KEY (`chatroom_id`)
);

CREATE TABLE `UserChatroom` (
	`user_id` int NOT NULL,
	`chatroom_id` varchar(50) NOT NULL,
	PRIMARY KEY (`user_id`,`chatroom_id`)
);

ALTER TABLE `Message` ADD CONSTRAINT `Message_fk0` FOREIGN KEY (`from_user`) REFERENCES `User`(`username`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `Message` ADD CONSTRAINT `Message_fk1` FOREIGN KEY (`to_chatroom`) REFERENCES `Chatroom`(`chatroom_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE `UserChatroom` ADD CONSTRAINT `User-Chatroom_fk0` FOREIGN KEY (`user_id`) REFERENCES `User`(`user_id`) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE `UserChatroom` ADD CONSTRAINT `User-Chatroom_fk1` FOREIGN KEY (`chatroom_id`) REFERENCES `Chatroom`(`chatroom_name`) ON DELETE CASCADE ON UPDATE CASCADE;

INSERT INTO user (email, username, user_password, first_name, last_name, isModerate, friend) VALUES ('huy@123.vn', 'huy1234', '12345', 'huy', 'quang', true, 0);
INSERT INTO user (email, username, user_password, first_name, last_name, isModerate, friend) VALUES ('huy@12345.vn', 'huy12345', '12345', 'huy', 'quang', true, 0);
INSERT INTO chatroom(chatroom_name, member_num) VALUES ('ALL ROOM', 5);
INSERT INTO chatroom(chatroom_name, member_num) VALUES ('PRIVATE ROOM', 5);
INSERT INTO userchatroom VALUES (1, 'ALL ROOM');
INSERT INTO userchatroom VALUES (2, 'ALL ROOM');
INSERT INTO userchatroom VALUES (1, 'PRIVATE ROOM');

