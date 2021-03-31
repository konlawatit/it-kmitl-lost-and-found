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
    birthday date,
    age int(10),
    phone_number char(10),
    role ENUM('normal', 'admin'),
    merit int(10),
    type ENUM('personnel', 'student'),
    email varchar(255),
    picture text
);

CREATE TABLE STUDENT (
    student_id char(8) not null unique,
    branch enum('IT', 'DSBA', 'BIT'),
    `year` int(1),
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

CREATE TABLE INFO_POST (
    post_id int(10) primary key auto_increment,
    `user_id` int(10),
    `topic` varchar(255),
    category_post ENUM('found', 'lost'),
    post_desc text,
    `status` boolean,
    place varchar(255),
    post_time datetime,
    USER_user_id1 int(10),
    USER_user_id2 int(10),
    complete_time datetime,
    picture text,
    FOREIGN KEY (USER_user_id1)
    REFERENCES USER (`user_id`),
    FOREIGN KEY (USER_user_id2)
    REFERENCES USER (`user_id`)
) CHARACTER SET 'utf8' COLLATE 'utf8_icelandic_ci';

CREATE TABLE INFO_POST_POST_IMAGE (
    post_image_no int(10) primary key auto_increment,
    post_image text,
    INFO_POST_post_id int(10),
    FOREIGN KEY (INFO_POST_post_id)
    REFERENCES INFO_POST (post_id)
);

CREATE TABLE INFO_COMMENT (
    comment_no int(10) primary key auto_increment,
    comment_desc text,
    comment_time datetime,
    INFO_POST_post_id int(10),
    USER_user_id int(10),
    FOREIGN KEY (USER_user_id)
    REFERENCES USER (`user_id`)
);

CREATE TABLE INFO_COMMENT_COMMENT_IMAGE (
    comment_image_no int(10) primary key auto_increment,
    comment_image text,
    INFO_COMMENT_comment_no int(10),
    FOREIGN KEY (INFO_COMMENT_comment_no)
    REFERENCES INFO_COMMENT (comment_no)
);

CREATE TABLE INFO_CHAT (
    chat_id int(10) primary key,
    chat_no int(10) not null unique auto_increment,
    `message` varchar(255),
    chat_time datetime,
    USER_user_id1 int(10),
    USER_user_id2 int(10),
    FOREIGN KEY (USER_user_id1)
    REFERENCES USER (`user_id`),
    FOREIGN KEY (USER_user_id2)
    REFERENCES USER (`user_id`)
);

CREATE TABLE INFO_CHAT_CHAT_IMAGE (
    chat_image_no int(10) primary key auto_increment,
    chat_image text,
    INFO_CHAT_chat_no int(10),
    FOREIGN KEY (INFO_CHAT_chat_no)
    REFERENCES INFO_CHAT (chat_id)
);

CREATE TABLE CATAGORY_ITEM (
    item_id int(10) primary key auto_increment,
    `name` varchar(255),
    USER_user_id int(10),
    FOREIGN KEY (USER_user_id)
    REFERENCES USER (`user_id`)
);

CREATE TABLE CATAGORY_ITEM_INFO_POST (
    CATAGORY_ITEM_item_id int(10),
    INFO_POST_post_id int(10),
    FOREIGN KEY (CATAGORY_ITEM_item_id)
    REFERENCES CATAGORY_ITEM (item_id),
    FOREIGN KEY (INFO_POST_post_id)
    REFERENCES INFO_POST (post_id)
);

INSERT INTO USER (user_id, user_name, firstname, lastname, birthday, email, picture) VALUES('62070077', 'test007', 'Konlawat', 'Hutsaithong', '2000-04-17', '62070007@it.kmitl.ac.th', 'static\\uploads\\profile-62070007.jpg');

INSERT INTO INFO_POST(user_id, topic, post_desc, post_time, picture) VALUES('62070077', 'Tam ha nong Eng teon pom!!!', 'Hi!', '2021-03-28 10:10:10', 'https://scontent.fbkk7-2.fna.fbcdn.net/v/t1.15752-9/166327698_776500569906547_6614718348313859894_n.jpg?_nc_cat=111&ccb=1-3&_nc_sid=ae9488&_nc_eui2=AeElIe43co5I27xD-vlilj6GJqXI3E_8jPUmpcjcT_yM9fj6xVIaGkaXpsluV2GPMaHz-LFR_bt5zxXMUzdPpENO&_nc_ohc=pj_yFhtqvIUAX-PrYeG&_nc_ht=scontent.fbkk7-2.fna&oh=7b8f83b8d71e07466221b7b3285a553f&oe=6084B37D');
INSERT INTO INFO_POST(user_id, topic, post_desc, post_time, picture) VALUES('62070077', 'Tam ha nong Eng teon pom!!!', 'Hi! ทดสอบ', '2021-03-28 10:10:10', 'https://scontent.fbkk7-3.fna.fbcdn.net/v/t1.15752-9/165827485_159358352623499_4855381441308277690_n.jpg?_nc_cat=107&ccb=1-3&_nc_sid=ae9488&_nc_eui2=AeG5GP9dDHp9F-R8uGmTE3ZlWCQUuLoXpXFYJBS4uhelcfpk-a1vm7ebx6Gw5bLnZSpzj4NBC6pemNtcTacvlmKo&_nc_ohc=KVmzka4Ic28AX9cg_Dl&_nc_ht=scontent.fbkk7-3.fna&oh=3813bc1f40c096bb3a8e01c615410481&oe=6088066E');
INSERT INTO INFO_POST(user_id, topic, post_desc, post_time, picture) VALUES('62070077', 'Tam ha nong Eng teon pom!!!', 'Hi!', '2021-03-28 10:10:10'
, 'https://scontent.fbkk7-2.fna.fbcdn.net/v/t1.15752-9/165280283_859141274643190_8489336105055123969_n.jpg?_nc_cat=102&ccb=1-3&_nc_sid=ae9488&_nc_eui2=AeE0kaaNU3N1o_R0WeIT4dcI1x7pe0_wkXbXHul7T_CRdsMD99Itad3BoWYdDIeqXd3OIcXZPWxscjm-Zd8h_ihF&_nc_ohc=eN-r7TWbsfUAX8xmaj6&_nc_ht=scontent.fbkk7-2.fna&oh=f1ce50f06f3f45d70282473db571cb3e&oe=6085AD5C');
INSERT INTO INFO_POST(user_id, topic, post_desc, post_time, picture) VALUES('62070077', 'Tam ha nong Eng teon pom!!!', 'Hi!', '2021-03-28 10:10:10', 'https://scontent.fbkk7-2.fna.fbcdn.net/v/t1.15752-9/165533935_896196034492239_3141671990484018006_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=ae9488&_nc_eui2=AeGINckz0sdZe5eB_emjvg3yyJKQ7EJ8UH7IkpDsQnxQfnmItyNEsECTN893PS6TKg0H8v5w5FeiN2RWMaEPtvbC&_nc_ohc=BaVIGS_UZZoAX_QNfxW&_nc_ht=scontent.fbkk7-2.fna&oh=85cc39502e7d669b182099ef9bf5fc80&oe=6085C758');
INSERT INTO INFO_POST(user_id, topic, post_desc, post_time, picture) VALUES('62070077', 'Tam ha nong Eng teon pom!!!', 'Hi!', '2021-03-28 10:10:10', 'https://scontent.fbkk7-2.fna.fbcdn.net/v/t1.15752-9/165677853_247613530405062_1490061857720354813_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=ae9488&_nc_eui2=AeFDIQvPV8Aj_0MWkn-2HL1tE74g1uL4zaETviDW4vjNoX9sSpcNPtfAbaezkEDaHWbWXAM3uwPSmuMuOJSq4swR&_nc_ohc=XapHD53ZOd0AX_C-l9r&_nc_ht=scontent.fbkk7-2.fna&oh=e05bd4101d9bf647f42be1fd2d1158b5&oe=608550E7');
INSERT INTO INFO_POST(user_id, topic, post_desc, post_time, picture) VALUES('62070077', 'Tam ha nong Eng teon pom!!!', 'Hi!', '2021-03-28 10:10:10', 'https://scontent.fbkk7-3.fna.fbcdn.net/v/t1.15752-9/165885117_487149712326877_2947398921459878053_n.jpg?_nc_cat=101&ccb=1-3&_nc_sid=ae9488&_nc_eui2=AeEni5hai0mHqkrhUK-KvSZbKayhTlPcvmkprKFOU9y-aZ4A5Sw-l7fl871rr3W0fInwLlY-AgZjpphVyWx14zbZ&_nc_ohc=wCY2CLadd8sAX_nroNg&_nc_ht=scontent.fbkk7-3.fna&oh=cd8d3fa4ba9aa238c2e53a338c90dbd1&oe=60881004');
