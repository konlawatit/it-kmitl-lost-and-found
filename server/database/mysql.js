const mysql = require('mysql');
const db = mysql.createConnection({   // config ค่าการเชื่อมต่อฐานข้อมูล
   host     : 'db', 
   user     : 'root',
   password : '123456',
   // port: '3999',
   database : `it_lost_and_found`
})
db.connect() // เชื่อมต่อฐานข้อมูล

// CREATE TABLE `mockup_schema`.`member` (
//     `member_id` INT NOT NULL AUTO_INCREMENT,
//     `fname` VARCHAR(45) NULL,
//     `lname` VARCHAR(45) NULL,
//     PRIMARY KEY (`member_id`));

module.exports = db;
