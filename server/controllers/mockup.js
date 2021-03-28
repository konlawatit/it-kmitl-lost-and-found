const express = require('express');
const router = express.Router();

const querySqlModel = require('../model/querySql')
const querySql = new querySqlModel()

//const db = require('../database/mysql');

router.get('/test', async (req, res,) => {
    try {
        let test = await querySql.exists('USER', 'user_id', '62070007');
        console.log('main', test)
        //console.log('auth', name)
        res.status(200).send({'info': test})
    } catch (err) {
        console.log(err)
        res.status(404).send(err)
    }
})

// router.post('/create', (req, res) => {
//     try {
//         let sql =  [`CREATE DATABASE mockup_schema2;`,`CREATE TABLE mockup_schema2.member(member_id INT NOT NULL AUTO_INCREMENT,fname VARCHAR(45) NULL,lname VARCHAR(45) NULL,PRIMARY KEY (member_id));`]
//         let stackResult = []
//         sql.forEach((command, index) => {
//             db.query(command, (err, result) => {
//                 if (err) res.status(404).send(err)
//                 stackResult.push(result)
//                 if (index === sql.length - 1) res.status(200).send(stackResult);
//             })
//         })
//     } catch (err) {
//         res.status(404).send(err)
//     }
// })

// router.get('/member', (req, res) => { // get column mockup_schema
//     try {
//         let sql = 'describe mockup_schema.member;'
//         db.query(sql, (err, result) => {
//             if (err) res.status(404).send(err)
//             console.log(result)
//             res.status(200).send(result)
//         })
//     } catch (err) {
//         res.status(404).send(err)
//     }
// })

// router.post('/member', (req, res) => {
//     try {
//         let sql = `alter table mockup_schema.member add member1 varchar(255);`
//         db.query(sql, (err, result) => {
//             if (err) res.status(404).send(err)
//             res.status(200).send(result)
//         })
//     } catch (err) {
//         res.status(404).send(err);
//     }
// })

// router.delete('/member', (req, res) => {
//     try {
//         let sql = `alter table mockup_schema.member drop member1;`
//         db.query(sql, (err, result) => {
//             if (err) res.status(404).send(err)
//             res.status(200).send(result)
//         })
//     } catch(err) {
//         res.status(404).send(err)
//     }
// })

module.exports = router;