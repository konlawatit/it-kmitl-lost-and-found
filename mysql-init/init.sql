CREATE DATABASE my_db;
USE my_db;

CREATE TABLE Accounts (
    id int not null auto_increment primary key,
    first_name varchar(200) not null,
    last_name varchar(200) not null,
    username varchar(200) not null unique,
    `password` varchar(200) not null,
    email varchar(200) not null unique
);
CREATE TABLE Tasks(
    id int not null auto_increment primary key,
    title varchar(200) not null,
    `desc` text not null,
    `owner` int,
    CONSTRAINT FK_owner FOREIGN KEY (`owner`) REFERENCES Accounts(id) ON DELETE SET NULL
);