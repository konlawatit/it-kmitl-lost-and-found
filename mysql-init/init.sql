-- CREATE DATABASE it_lost_and_found;
USE it_lost_and_found;

-- CREATE TABLE Accounts (
--     id int not null auto_increment primary key,
--     first_name varchar(200) not null,
--     last_name varchar(200) not null,
--     username varchar(200) not null unique,
--     `password` varchar(200) not null,
--     email varchar(200) not null unique
-- );
-- CREATE TABLE Tasks(
--     id int not null auto_increment primary key,
--     title varchar(200) not null,
--     `desc` text not null,
--     `owner` int,
--     CONSTRAINT FK_owner FOREIGN KEY (`owner`) REFERENCES Accounts(id) ON DELETE SET NULL
-- );

CREATE TABLE USER (
    user_id int(10) primary key,
    user_name varchar(255),
    firstname varchar(255),
    lastname varchar(255),
    birthday varchar(255),
    age int(10),
    phone_number char(10),
    role ENUM('a', 'b'),
    merit int(10),
    type ENUM('personnel', 'student')
);

CREATE TABLE USER2 (
    user_id int(10) primary key,
    user_name varchar(255),
    firstname varchar(255),
    lastname varchar(255),
    birthday varchar(255),
    age int(10),
    phone_number char(10),
    role ENUM('a', 'b'),
    merit int(10),
    type ENUM('personnel', 'student')
);