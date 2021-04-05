const mysql = require('mysql2/promise');
const pool = mysql.createPool({ // config ค่าการเชื่อมต่อฐานข้อมูล
   host: 'db', //ใช้ docker ให้เปลี่ยนเป็น db ปกติ 127.0.0.1
   user: 'root',
   password: '123456',
   // port: '3999', //ใช้ docker ให้ปิดตรงนี้
   database: `it_lost_and_found`,
   waitForConnections: true,
   connectionLimit: 10,
   queueLimit: 0
});

// CREATE TABLE `mockup_schema`.`member` (
//     `member_id` INT NOT NULL AUTO_INCREMENT,
//     `fname` VARCHAR(45) NULL,
//     `lname` VARCHAR(45) NULL,
//     PRIMARY KEY (`member_id`));

module.exports = pool;