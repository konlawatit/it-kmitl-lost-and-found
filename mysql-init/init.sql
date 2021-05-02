-- DROP SCHEMA it_lost_and_found;
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

CREATE TABLE `USER` (
    user_id int(10) primary key auto_increment,
    user_name varchar(255),
    firstname varchar(255),
    lastname varchar(255),
    `birthday` date,
    age int(10),
    phone_number char(10),
    `role` ENUM('normal', 'admin', 'banned'),
    `type` ENUM('personnel', 'student'),
    `email` varchar(255),
    image varchar(255)
);

CREATE TABLE STUDENT (
    student_id char(8) not null unique,
    branch enum('IT', 'DSBA', 'BIT', 'AIDL'),
    degree enum('bachelor', 'master', 'doctor'),
    `year` enum('1', '2', '3', '4', 'graduate'),
    USER_user_id int(10),
    FOREIGN KEY (USER_user_id)
    REFERENCES USER (`user_id`)
);


CREATE TABLE PERSONNEL (
    position varchar(255),
    USER_user_id int(10),
    FOREIGN KEY (USER_user_id)
    REFERENCES USER (`user_id`)
);

-- ลบ user_id2 เปลี่ยน user_found เป็น varchar(255)
CREATE TABLE INFO_POST ( 
    post_id int(10) primary key auto_increment,
    `topic` varchar(255),
    category_post ENUM('found', 'lost'),
    post_desc text,
    `status` boolean,
    place varchar(255),
    post_time datetime,
    USER_user_id int(10) not null,
    complete_time datetime,
    user_found_or_own varchar(255),
    noti_post int(10),
    delete_by int(10),
    update_time datetime,
    FOREIGN KEY (USER_user_id)
    REFERENCES USER (`user_id`)
);
-- CHARACTER SET 'utf8' COLLATE 'utf8_icelandic_ci'

CREATE TABLE INFO_POST_POST_IMAGE (
    post_image_no int(10) primary key auto_increment,
    post_image varchar(255),
    INFO_POST_post_id int(10) not null,
    FOREIGN KEY (INFO_POST_post_id)
    REFERENCES INFO_POST (post_id)
);

CREATE TABLE INFO_COMMENT (
    comment_no int(10) primary key auto_increment,
    comment_desc text,
    comment_time datetime,
    INFO_POST_post_id int(10),
    USER_user_id int(10) not null,
    -- status varchar(255), ลบ
    delete_by int(10),
    FOREIGN KEY (USER_user_id)
    REFERENCES USER (`user_id`)
);

CREATE TABLE INFO_COMMENT_COMMENT_IMAGE (
    comment_image_no int(10) primary key auto_increment,
    comment_image varchar(255),
    INFO_COMMENT_comment_no int(10) not null,
    FOREIGN KEY (INFO_COMMENT_comment_no)
    REFERENCES INFO_COMMENT (comment_no)
);


CREATE TABLE CONVERSATION (
    con_id int(10) PRIMARY KEY auto_increment,
    USER_user_id_1 int(10) not null,
    USER_user_id_2 int(10) not null,
    noti_user_id_1 int(10),
    noti_user_id_2 int(10),
    FOREIGN KEY (USER_user_id_1)
    REFERENCES USER (`user_id`),
    FOREIGN KEY (USER_user_id_2)
    REFERENCES USER (`user_id`)
);

CREATE TABLE MESSAGES (
    msg_no int(10) primary key auto_increment,
    content text,
    CONVERSATION_con_id int(10) not null,
    USER_user_id int(10) not null,
    msg_time datetime not null,
    `is_image` boolean,
    FOREIGN KEY (CONVERSATION_con_id) REFERENCES CONVERSATION(con_id),
    FOREIGN KEY (USER_user_id) REFERENCES USER (`user_id`)
);

CREATE TABLE CATEGORY_ITEM (
    item_id int(10) primary key auto_increment,
    `name` varchar(255),
    USER_user_id int(10) not null,
    image varchar(255) not null,
    FOREIGN KEY (USER_user_id)
    REFERENCES USER (`user_id`)
);

CREATE TABLE CATEGORY_ITEM_INFO_POST (
    CATEGORY_ITEM_item_id int(10) primary key,
    INFO_POST_post_id int(10) not null,
    FOREIGN KEY (CATEGORY_ITEM_item_id)
    REFERENCES CATEGORY_ITEM (item_id),
    FOREIGN KEY (INFO_POST_post_id)
    REFERENCES INFO_POST (post_id)
);

INSERT INTO USER (user_id, user_name, firstname, lastname, `birthday`, age, phone_number, `role`, `type`, `email`, `image`) VALUES('0000000001', 'bas007', 'Konlawat', 'Hutsaithong', '2000-04-17', '21', '0909573314', 'normal', 'student',  '64070001@it.kmitl.ac.th', 'static\\uploads\\profile\\profile-0000000001.jpg');
INSERT INTO USER (user_id, user_name, firstname, lastname, `birthday`, age, phone_number, `role`, `type`, `email`, `image`) VALUES('0000000002', 'eng027', 'CHANKRACHANG', 'LIMPANACHO', '2000-04-18', '21', '0909573327', 'normal', 'student',  '64070002@it.kmitl.ac.th', 'static\\uploads\\profile\\profile-0000000002.jpg');
INSERT INTO USER (user_id, user_name, firstname, lastname, `birthday`, age, phone_number, `role`, `type`, `email`, `image`) VALUES('0000000003', 'earth096', 'TEERAPAT', 'BOONCHUAYLAEW', '2000-04-19', '21', '0909573396', 'admin', 'student',  '64070003@it.kmitl.ac.th', 'static\\uploads\\profile\\profile-0000000003.jpg');
INSERT INTO USER (user_id, user_name, firstname, lastname, `birthday`, age, phone_number, `role`, `type`, `email`, `image`) VALUES('0000000004', 'newbeer126', 'PONGSAKORN', 'PRAWANNA', '2000-04-20', '21', '0909573126', 'admin', 'student',  '64070004@it.kmitl.ac.th', 'static\\uploads\\profile\\profile-0000000004.jpg');
INSERT INTO USER (user_id, user_name, firstname, lastname, `birthday`, age, phone_number, `role`, `type`, `email`, `image`) VALUES('0000000005', 'pammy0133', 'PORNSINEE', 'CHAIMEE', '2000-04-21', '21', '0909573133', 'normal', 'student',  '64070005@it.kmitl.ac.th', 'static\\uploads\\profile\\profile-0000000005.jpg');
INSERT INTO USER (user_id, user_name, firstname, lastname, `birthday`, age, phone_number, `role`, `type`, `email`, `image`) VALUES('0000000006', 'eve223', 'AMARIN', 'JUNBUMROONG', '2000-04-22', '21', '0909573223', 'normal', 'student',  '64070006@it.kmitl.ac.th', 'static\\uploads\\profile\\profile-0000000006.jpg');
INSERT INTO USER (user_id, user_name, firstname, lastname, `birthday`, age, phone_number, `role`, `type`, `email`, `image`) VALUES('0000000007', 'filme011', 'KANLAYA', 'POOTSUPHA', '2000-09-18', '21', '0909573001', 'admin', 'student',  '64070007@it.kmitl.ac.th', 'static\\uploads\\profile\\profile-0000000007.jpg');
INSERT INTO USER (user_id, user_name, firstname, lastname, `birthday`, age, phone_number, `role`, `type`, `email`, `image`) VALUES('0000000008', 'shoei130', 'PONGPERA', 'WONGSAMRAN', '2000-09-23', '21', '0968906111', 'normal', 'student',  '64070008@it.kmitl.ac.th', 'static\\uploads\\profile\\profile-0000000008.jpg');
INSERT INTO USER (user_id, user_name, firstname, lastname, `birthday`, age, phone_number, `role`, `type`, `email`, `image`) VALUES('0000000009', 'sun130', 'THANAYUT', 'KUNSUN', '2000-09-23', '21', '0968906130', 'normal', 'student',  '64070009@it.kmitl.ac.th', 'static\\uploads\\profile\\profile-0000000009.jpg');
INSERT INTO USER (user_id, user_name, firstname, lastname, `birthday`, age, phone_number, `role`, `type`, `email`, `image`) VALUES('0000000010', 'pobchang198', 'SIRAPOB', 'CHANG', '2000-09-23', '21', '0968906198', 'normal', 'student',  '64070010@it.kmitl.ac.th', 'static\\uploads\\profile\\profile-0000000010.jpg');

INSERT INTO USER (user_id, user_name, firstname, lastname, `birthday`, age, phone_number, `role`, `type`, `email`, `image`) VALUES('0000000011', 'personnel01', 'Pawaris', 'Wongsaied', '1996-10-17', '25', '0807511314', 'normal', 'personnel',  '64070011@it.kmitl.ac.th', 'static\\uploads\\profile\\profile-0000000011.jpg');
INSERT INTO USER (user_id, user_name, firstname, lastname, `birthday`, age, phone_number, `role`, `type`, `email`, `image`) VALUES('0000000012', 'personnel02', 'KRITSAKORN', 'AMNAJSATIT', '1996-04-18', '25', '0809571317', 'normal', 'personnel',  '64070012@it.kmitl.ac.th', 'static\\uploads\\profile\\profile-0000000012.jpg');
INSERT INTO USER (user_id, user_name, firstname, lastname, `birthday`, age, phone_number, `role`, `type`, `email`, `image`) VALUES('0000000013', 'personnel03', 'NATCHANON', 'AMNATTHONG', '1996-04-19', '25', '0809571196', 'admin', 'personnel',  '64070013@it.kmitl.ac.th', 'static\\uploads\\profile\\profile-0000000013.jpg');
INSERT INTO USER (user_id, user_name, firstname, lastname, `birthday`, age, phone_number, `role`, `type`, `email`, `image`) VALUES('0000000014', 'personnel04', 'KANASIN', 'AMORNKITTISARN', '1996-04-20', '25', '0801513126', 'normal', 'personnel',  '64070014@it.kmitl.ac.th', 'static\\uploads\\profile\\profile-0000000014.jpg');
INSERT INTO USER (user_id, user_name, firstname, lastname, `birthday`, age, phone_number, `role`, `type`, `email`, `image`) VALUES('0000000015', 'personnel05', 'KOMCHAN', 'AUMPONG', '1996-04-21', '25', '0809573111', 'normal', 'personnel',  '62040015t.kmitl.ac.th', 'static\\uploads\\profile\\profile-62040015pg');
INSERT INTO USER (user_id, user_name, firstname, lastname, `birthday`, age, phone_number, `role`, `type`, `email`, `image`) VALUES('0000000016', 'personnel06', 'SUKIT', 'AUNTYOO', '1996-04-22', '25', '0809573113', 'normal', 'personnel',  '64070016@it.kmitl.ac.th', 'static\\uploads\\profile\\profile-0000000016.jpg');
INSERT INTO USER (user_id, user_name, firstname, lastname, `birthday`, age, phone_number, `role`, `type`, `email`, `image`) VALUES('0000000017', 'personnel07', 'SAKARN', 'BANTADJUN', '1996-09-18', '25', '0809513101', 'admin', 'personnel',  '64070017@it.kmitl.ac.th', 'static\\uploads\\profile\\profile-0000000017.jpg');
INSERT INTO USER (user_id, user_name, firstname, lastname, `birthday`, age, phone_number, `role`, `type`, `email`, `image`) VALUES('0000000018', 'personnel08', 'PATCHARAPON', 'BOONCHOOM', '1996-09-23', '25', '0861906111', 'admin', 'personnel',  '64070018@it.kmitl.ac.th', 'static\\uploads\\profile\\profile-0000000018.jpg');
INSERT INTO USER (user_id, user_name, firstname, lastname, `birthday`, age, phone_number, `role`, `type`, `email`, `image`) VALUES('0000000019', 'personnel09', 'THITIKORN', 'BOONLUMPHAN', '1996-09-23', '25', '0868106130', 'normal', 'personnel',  '64070019@it.kmitl.ac.th', 'static\\uploads\\profile\\profile-0000000019.jpg');
INSERT INTO USER (user_id, user_name, firstname, lastname, `birthday`, age, phone_number, `role`, `type`, `email`, `image`) VALUES('0000000020', 'personnel10', 'THITIPOL', 'BOONLUMPHAN', '1996-09-23', '25', '0868106198', 'normal', 'personnel',  '64070020@it.kmitl.ac.th', 'static\\uploads\\profile\\profile-0000000020.jpg');

INSERT INTO STUDENT (USER_user_id, student_id, branch, degree, `year`) VALUES('0000000001', '62070007', 'IT', 'bachelor', '2');
INSERT INTO STUDENT (USER_user_id, student_id, branch, degree, `year`) VALUES('0000000002', '62070027', 'IT', 'bachelor', '4');
INSERT INTO STUDENT (USER_user_id, student_id, branch, degree, `year`) VALUES('0000000003', '62070096', 'DSBA', 'bachelor', '4');
INSERT INTO STUDENT (USER_user_id, student_id, branch, degree, `year`) VALUES('0000000004', '62070126', 'DSBA', 'bachelor', '2');
INSERT INTO STUDENT (USER_user_id, student_id, branch, degree, `year`) VALUES('0000000005', '62070133', 'IT', 'bachelor', '3');
INSERT INTO STUDENT (USER_user_id, student_id, branch, degree, `year`) VALUES('0000000006', '62070223', 'IT', 'bachelor', '2');
INSERT INTO STUDENT (USER_user_id, student_id, branch, degree, `year`) VALUES('0000000007', '62070011', 'BIT', 'bachelor', '3');
INSERT INTO STUDENT (USER_user_id, student_id, branch, degree, `year`) VALUES('0000000008', '62070130', 'BIT', 'bachelor', '2');
INSERT INTO STUDENT (USER_user_id, student_id, branch, degree, `year`) VALUES('0000000009', '62070084', 'IT', 'bachelor', '1');
INSERT INTO STUDENT (USER_user_id, student_id, branch, degree, `year`) VALUES('0000000010', '62070198', 'IT', 'bachelor', '2');

INSERT INTO PERSONNEL (USER_user_id, position) VALUES('0000000011', 'Dean');
INSERT INTO PERSONNEL (USER_user_id, position) VALUES('0000000012', 'Instructor');
INSERT INTO PERSONNEL (USER_user_id, position) VALUES('0000000013', 'IT Support');
INSERT INTO PERSONNEL (USER_user_id, position) VALUES('0000000014', 'Staff');
INSERT INTO PERSONNEL (USER_user_id, position) VALUES('0000000015', 'Staff');
INSERT INTO PERSONNEL (USER_user_id, position) VALUES('0000000016', 'Staff');
INSERT INTO PERSONNEL (USER_user_id, position) VALUES('0000000017', 'IT Support');
INSERT INTO PERSONNEL (USER_user_id, position) VALUES('0000000018', 'IT Support');
INSERT INTO PERSONNEL (USER_user_id, position) VALUES('0000000019', 'Instructor');
INSERT INTO PERSONNEL (USER_user_id, position) VALUES('0000000020', 'Instructor');

-- CREATE TABLE MESSAGES (
--     msg_no int(10) primary key auto_increment,
--     content text,
--     CONVERSATION_con_id int(10) not null,
--     USER_user_id int(10) not null,
--     msg_time datetime not null,
--     `is_image` boolean,
--     FOREIGN KEY (CONVERSATION_con_id) REFERENCES CONVERSATION(con_id),
--     FOREIGN KEY (USER_user_id) REFERENCES USER (`user_id`)
-- );

INSERT INTO CONVERSATION (con_id, USER_user_id_1, USER_user_id_2, noti_user_id_1, noti_user_id_2) VALUES('1', '0000000003', '0000000001', 0, 0);
INSERT INTO CONVERSATION (con_id, USER_user_id_1, USER_user_id_2, noti_user_id_1, noti_user_id_2) VALUES('2', '0000000002', '0000000005', 0, 0);
INSERT INTO CONVERSATION (con_id, USER_user_id_1, USER_user_id_2, noti_user_id_1, noti_user_id_2) VALUES('3', '0000000008', '0000000004', 0, 0);
INSERT INTO CONVERSATION (con_id, USER_user_id_1, USER_user_id_2, noti_user_id_1, noti_user_id_2) VALUES('4', '0000000008', '0000000007', 0, 0);
INSERT INTO CONVERSATION (con_id, USER_user_id_1, USER_user_id_2, noti_user_id_1, noti_user_id_2) VALUES('5', '0000000002', '0000000004', 0, 0);
INSERT INTO CONVERSATION (con_id, USER_user_id_1, USER_user_id_2, noti_user_id_1, noti_user_id_2) VALUES('6', '0000000011', '0000000013', 0, 0);
INSERT INTO CONVERSATION (con_id, USER_user_id_1, USER_user_id_2, noti_user_id_1, noti_user_id_2) VALUES('7', '0000000001', '0000000017', 0, 0);
INSERT INTO CONVERSATION (con_id, USER_user_id_1, USER_user_id_2, noti_user_id_1, noti_user_id_2) VALUES('8', '0000000008', '0000000017', 0, 0);
INSERT INTO CONVERSATION (con_id, USER_user_id_1, USER_user_id_2, noti_user_id_1, noti_user_id_2) VALUES('9', '0000000006', '0000000018', 0, 0);
INSERT INTO CONVERSATION (con_id, USER_user_id_1, USER_user_id_2, noti_user_id_1, noti_user_id_2) VALUES('10', '0000000009', '0000000008', 0, 0);


INSERT INTO MESSAGES (CONVERSATION_con_id, content, user_user_id, msg_time, `is_image`) VALUES('1', 'Hi', '0000000003', "2021-05-02 20:00:00", 0);
INSERT INTO MESSAGES (CONVERSATION_con_id, content, user_user_id, msg_time, `is_image`) VALUES('1', 'Hi', '0000000001', "2021-05-02 20:05:00", 0);
INSERT INTO MESSAGES (CONVERSATION_con_id, content, user_user_id, msg_time, `is_image`) VALUES('1', 'Is this your phone?', '0000000003', "2021-05-02 20:09:00", 0);
INSERT INTO MESSAGES (CONVERSATION_con_id, content, user_user_id, msg_time, `is_image`) VALUES('2', 'Hi', '0000000002', "2021-05-03 09:00:00", 0);
INSERT INTO MESSAGES (CONVERSATION_con_id, content, user_user_id, msg_time, `is_image`) VALUES('2', 'Hi', '0000000005', "2021-05-03 09:05:00", 0);
INSERT INTO MESSAGES (CONVERSATION_con_id, content, user_user_id, msg_time, `is_image`) VALUES('3', 'Hi', '0000000008', "2021-05-04 10:00:00", 0);
INSERT INTO MESSAGES (CONVERSATION_con_id, content, user_user_id, msg_time, `is_image`) VALUES('4', 'Hi', '0000000008', "2021-05-05 10:02:00", 0);
INSERT INTO MESSAGES (CONVERSATION_con_id, content, user_user_id, msg_time, `is_image`) VALUES('5', 'Hi', '0000000002', "2021-05-06 11:02:00", 0);
INSERT INTO MESSAGES (CONVERSATION_con_id, content, user_user_id, msg_time, `is_image`) VALUES('6', 'Hi', '0000000011', "2021-05-07 12:02:00", 0);
INSERT INTO MESSAGES (CONVERSATION_con_id, content, user_user_id, msg_time, `is_image`) VALUES('7', 'Hi', '0000000001', "2021-05-08 11:02:00", 0);
INSERT INTO MESSAGES (CONVERSATION_con_id, content, user_user_id, msg_time, `is_image`) VALUES('8', 'Hi', '0000000008', "2021-05-09 11:02:00", 0);
INSERT INTO MESSAGES (CONVERSATION_con_id, content, user_user_id, msg_time, `is_image`) VALUES('9', 'Hi', '0000000006', "2021-05-10 08:02:00", 0);
INSERT INTO MESSAGES (CONVERSATION_con_id, content, user_user_id, msg_time, `is_image`) VALUES('10', 'Hi', '0000000009', "2021-05-11 11:02:00", 0);

INSERT INTO INFO_POST (`topic`, category_post, post_desc, `status`, place, post_time, USER_user_id, complete_time, user_found_or_own, noti_post, delete_by, update_time) VALUES ('Topic1', 'found', 'Post description1', 1, "IT KMITL", "2021-01-01 19:00:00", 0000000003, "2021-02-02 20:00:00", null, null, null, null);
INSERT INTO INFO_POST (`topic`, category_post, post_desc, `status`, place, post_time, USER_user_id, complete_time, user_found_or_own, noti_post, delete_by, update_time) VALUES ('Topic2', 'found', 'Post description2', 1, "IT KMITL", "2021-01-01 18:00:00", 0000000002, "2021-02-02 19:00:00", null, null, null, null);
INSERT INTO INFO_POST (`topic`, category_post, post_desc, `status`, place, post_time, USER_user_id, complete_time, user_found_or_own, noti_post, delete_by, update_time) VALUES ('Topic3', 'found', 'Post description3', 1, "IT KMITL", "2021-01-01 17:00:00", 0000000001, "2021-02-02 18:00:00", null, null, null, null);
INSERT INTO INFO_POST (`topic`, category_post, post_desc, `status`, place, post_time, USER_user_id, complete_time, user_found_or_own, noti_post, delete_by, update_time) VALUES ('Topic4', 'found', 'Post description4', 1, "IT KMITL", "2021-01-01 16:00:00", 0000000004, "2021-02-02 17:00:00", null, null, null, null);
INSERT INTO INFO_POST (`topic`, category_post, post_desc, `status`, place, post_time, USER_user_id, complete_time, user_found_or_own, noti_post, delete_by, update_time) VALUES ('Topic5', 'found', 'Post description5', 1, "IT KMITL", "2021-01-01 15:00:00", 0000000005, "2021-02-02 16:00:00", null, null, null, null);
INSERT INTO INFO_POST (`topic`, category_post, post_desc, `status`, place, post_time, USER_user_id, complete_time, user_found_or_own, noti_post, delete_by, update_time) VALUES ('Topic6', 'lost', 'Post description6', 1, "M04", "2021-01-01 14:00:00", 0000000006, "2021-02-02 15:00:00", null, null, null, null);
INSERT INTO INFO_POST (`topic`, category_post, post_desc, `status`, place, post_time, USER_user_id, complete_time, user_found_or_own, noti_post, delete_by, update_time) VALUES ('Topic7', 'lost', 'Post description7', 1, "IT KMITL", "2021-01-01 13:00:00", 0000000007, "2021-02-02 14:00:00", null, null, null, null);
INSERT INTO INFO_POST (`topic`, category_post, post_desc, `status`, place, post_time, USER_user_id, complete_time, user_found_or_own, noti_post, delete_by, update_time) VALUES ('Topic8', 'lost', 'Post description8', 1, "M23", "2021-01-01 12:00:00", 0000000008, "2021-02-02 13:00:00", null, null, null, null);
INSERT INTO INFO_POST (`topic`, category_post, post_desc, `status`, place, post_time, USER_user_id, complete_time, user_found_or_own, noti_post, delete_by, update_time) VALUES ('Topic9', 'lost', 'Post description9', 1, "IT KMITL", "2021-01-01 11:00:00", 0000000009, "2021-02-02 12:00:00", null, null, null, null);
INSERT INTO INFO_POST (`topic`, category_post, post_desc, `status`, place, post_time, USER_user_id, complete_time, user_found_or_own, noti_post, delete_by, update_time) VALUES ('Topic10', 'lost', 'Post description10', 1, "M23", "2021-01-01 10:00:00", 0000000010, "2021-02-02 11:00:00", 1, null, null, null);

INSERT INFO_POST_POST_IMAGE (post_image, INFO_POST_post_id) VALUES ('static\\uploads\\imagePost\\post-1.jpg', 1);
INSERT INFO_POST_POST_IMAGE (post_image, INFO_POST_post_id) VALUES ('static\\uploads\\imagePost\\post-2.jpg', 2);
INSERT INFO_POST_POST_IMAGE (post_image, INFO_POST_post_id) VALUES ('static\\uploads\\imagePost\\post-3.jpg', 3);
INSERT INFO_POST_POST_IMAGE (post_image, INFO_POST_post_id) VALUES ('static\\uploads\\imagePost\\post-4.jpg', 4);
INSERT INFO_POST_POST_IMAGE (post_image, INFO_POST_post_id) VALUES ('static\\uploads\\imagePost\\post-5.jpg', 5);
INSERT INFO_POST_POST_IMAGE (post_image, INFO_POST_post_id) VALUES ('static\\uploads\\imagePost\\post-6.jpg', 6);
INSERT INFO_POST_POST_IMAGE (post_image, INFO_POST_post_id) VALUES ('static\\uploads\\imagePost\\post-7.jpg', 7);
INSERT INFO_POST_POST_IMAGE (post_image, INFO_POST_post_id) VALUES ('static\\uploads\\imagePost\\post-8.jpg', 8);
INSERT INFO_POST_POST_IMAGE (post_image, INFO_POST_post_id) VALUES ('static\\uploads\\imagePost\\post-9.jpg', 9);
INSERT INFO_POST_POST_IMAGE (post_image, INFO_POST_post_id) VALUES ('static\\uploads\\imagePost\\post-10.jpg', 10);

INSERT INFO_COMMENT (comment_desc, comment_time, INFO_POST_post_id, USER_user_id) VALUES ('comment1', '2021-03-03 01:02:00', 1, 0000000003);
INSERT INFO_COMMENT (comment_desc, comment_time, INFO_POST_post_id, USER_user_id) VALUES ('comment2', '2021-03-04 01:02:01', 2, 0000000002);
INSERT INFO_COMMENT (comment_desc, comment_time, INFO_POST_post_id, USER_user_id) VALUES ('comment3', '2021-03-05 01:02:02', 3, 0000000001);
INSERT INFO_COMMENT (comment_desc, comment_time, INFO_POST_post_id, USER_user_id) VALUES ('comment4', '2021-03-06 01:02:03', 4, 0000000004);
INSERT INFO_COMMENT (comment_desc, comment_time, INFO_POST_post_id, USER_user_id) VALUES ('comment5', '2021-03-07 01:02:04', 5, 0000000005);
INSERT INFO_COMMENT (comment_desc, comment_time, INFO_POST_post_id, USER_user_id) VALUES ('comment6', '2021-03-08 01:02:05', 6, 0000000006);
INSERT INFO_COMMENT (comment_desc, comment_time, INFO_POST_post_id, USER_user_id) VALUES ('comment7', '2021-03-09 01:02:06', 7, 0000000007);
INSERT INFO_COMMENT (comment_desc, comment_time, INFO_POST_post_id, USER_user_id) VALUES ('comment8', '2021-03-10 01:02:07', 8, 0000000008);
INSERT INFO_COMMENT (comment_desc, comment_time, INFO_POST_post_id, USER_user_id) VALUES ('comment9', '2021-03-11 01:02:08', 9, 0000000009);
INSERT INFO_COMMENT (comment_desc, comment_time, INFO_POST_post_id, USER_user_id) VALUES ('comment10', '2021-03-12 01:02:09', 10, 0000000010);

INSERT INFO_COMMENT_COMMENT_IMAGE (comment_image, INFO_COMMENT_comment_no) VALUES ('static\\uploads\\imageComment\\comment-1.jpg', 1);
INSERT INFO_COMMENT_COMMENT_IMAGE (comment_image, INFO_COMMENT_comment_no) VALUES ('static\\uploads\\imageComment\\comment-2.jpg', 2);
INSERT INFO_COMMENT_COMMENT_IMAGE (comment_image, INFO_COMMENT_comment_no) VALUES ('static\\uploads\\imageComment\\comment-3.jpg', 3);
INSERT INFO_COMMENT_COMMENT_IMAGE (comment_image, INFO_COMMENT_comment_no) VALUES ('static\\uploads\\imageComment\\comment-4.jpg', 4);
INSERT INFO_COMMENT_COMMENT_IMAGE (comment_image, INFO_COMMENT_comment_no) VALUES ('static\\uploads\\imageComment\\comment-5.jpg', 5);
INSERT INFO_COMMENT_COMMENT_IMAGE (comment_image, INFO_COMMENT_comment_no) VALUES ('static\\uploads\\imageComment\\comment-6.jpg', 6);
INSERT INFO_COMMENT_COMMENT_IMAGE (comment_image, INFO_COMMENT_comment_no) VALUES ('static\\uploads\\imageComment\\comment-7.jpg', 7);
INSERT INFO_COMMENT_COMMENT_IMAGE (comment_image, INFO_COMMENT_comment_no) VALUES ('static\\uploads\\imageComment\\comment-8.jpg', 8);
INSERT INFO_COMMENT_COMMENT_IMAGE (comment_image, INFO_COMMENT_comment_no) VALUES ('static\\uploads\\imageComment\\comment-9.jpg', 9);
INSERT INFO_COMMENT_COMMENT_IMAGE (comment_image, INFO_COMMENT_comment_no) VALUES ('static\\uploads\\imageComment\\comment-10.jpg', 10);

INSERT CATEGORY_ITEM (`name`, USER_user_id, image) VALUES ('Item1', 0000000003, 'static\\uploads\\imageItem\\item-1.jpg');
INSERT CATEGORY_ITEM (`name`, USER_user_id, image) VALUES ('Item2', 0000000003, 'static\\uploads\\imageItem\\item-2.jpg');
INSERT CATEGORY_ITEM (`name`, USER_user_id, image) VALUES ('Item3', 0000000003, 'static\\uploads\\imageItem\\item-3.jpg');
INSERT CATEGORY_ITEM (`name`, USER_user_id, image) VALUES ('Item4', 0000000003, 'static\\uploads\\imageItem\\item-4.jpg');
INSERT CATEGORY_ITEM (`name`, USER_user_id, image) VALUES ('Item5', 0000000003, 'static\\uploads\\imageItem\\item-5.jpg');
INSERT CATEGORY_ITEM (`name`, USER_user_id, image) VALUES ('Item6', 0000000003, 'static\\uploads\\imageItem\\item-6.jpg');
INSERT CATEGORY_ITEM (`name`, USER_user_id, image) VALUES ('Item7', 0000000003, 'static\\uploads\\imageItem\\item-7.jpg');
INSERT CATEGORY_ITEM (`name`, USER_user_id, image) VALUES ('Item8', 0000000003, 'static\\uploads\\imageItem\\item-8.jpg');
INSERT CATEGORY_ITEM (`name`, USER_user_id, image) VALUES ('Item9', 0000000003, 'static\\uploads\\imageItem\\item-9.jpg');
INSERT CATEGORY_ITEM (`name`, USER_user_id, image) VALUES ('Item10', 0000000003, 'static\\uploads\\imageItem\\item-10.jpg');

INSERT CATEGORY_ITEM_INFO_POST (CATEGORY_ITEM_item_id, INFO_POST_post_id) VALUES (1, 1);
INSERT CATEGORY_ITEM_INFO_POST (CATEGORY_ITEM_item_id, INFO_POST_post_id) VALUES (2, 2);
INSERT CATEGORY_ITEM_INFO_POST (CATEGORY_ITEM_item_id, INFO_POST_post_id) VALUES (3, 3);
INSERT CATEGORY_ITEM_INFO_POST (CATEGORY_ITEM_item_id, INFO_POST_post_id) VALUES (4, 4);
INSERT CATEGORY_ITEM_INFO_POST (CATEGORY_ITEM_item_id, INFO_POST_post_id) VALUES (5, 5);
INSERT CATEGORY_ITEM_INFO_POST (CATEGORY_ITEM_item_id, INFO_POST_post_id) VALUES (6, 6);
INSERT CATEGORY_ITEM_INFO_POST (CATEGORY_ITEM_item_id, INFO_POST_post_id) VALUES (7, 7);
INSERT CATEGORY_ITEM_INFO_POST (CATEGORY_ITEM_item_id, INFO_POST_post_id) VALUES (8, 8);
INSERT CATEGORY_ITEM_INFO_POST (CATEGORY_ITEM_item_id, INFO_POST_post_id) VALUES (9, 9);
INSERT CATEGORY_ITEM_INFO_POST (CATEGORY_ITEM_item_id, INFO_POST_post_id) VALUES (10, 10);





