const express = require('express');
const router = express.Router();
const multer = require('multer')

var fs = require('fs')
const fetch = require('node-fetch');

const path = require("path")

const querySqlModel = require('../model/querySql')
const querySql = new querySqlModel()

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './static/uploads') // path to save file
  },
  filename: function (req, file, callback) {
    // set file name
    callback(null, 'profile-' + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})



//const db = require('../database/mysql');

router.get('/test', async (req, res, ) => {
  try {
    //let test = await querySql.allPosts();
    //console.log('main', test)
    //console.log('auth', name)
    console.log('path', path.resolve('static/uploads'))
    res.status(200).send('info')
  } catch (err) {
    console.log(err)
    res.status(404).send(err)
  }
})

router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    console.log(req.file)
    res.send(req.file)
  } catch (err) {
    console.log(err)
    res.send(err)
  }
})

router.get('/dowload', async (req, res) => {
  try {
    const url = "https://lh3.googleusercontent.com/fife/ABSRlIpGOG7Cp_gImjgI3KzQsPHQqaem7xsG_KsQIH6zQTNAwluJovEp2iBkJO_qm-6_avXPg3l_GngZIDxG45qvgaSEKVcO4FZi9FSLfORt1Jg3CEgr2xI6FSaXJUf6_N8z9tltll0sU_H6qcWqMv_7fKGMrQk_G2CqidiFJTy1nqzBYkp_fc-6KzBitCj82FzRaU3CAqrUqn9Inb-COyyy4jRTQWOZT2DW2TQlGwAJ-Rc86YK1Lgtg16YH8HJ1aUR9FgrzudZFYXoGTA3YpGvBDMJ2JS_ktRoGanfuCWyzasQtRZK8N0ZEbU2SV83EiqyW9XhQtUvL96R6EvGEupDNGUb8BgvONncYJTlnLiuiAXuxQp69cyEuywTqAnAU9EOTZyTj5mnF44EJIi3IUAdWpWo-SOpL4sGSic4ZUMk47UtteyIBne4pO8uKxGJ-8LaVlL9jnGZhMRBT6np4JNsP8FeEceE6TvyK24J75qAVLQD6COQ59dFx3OgwzUi2_ZlUWp4YCk_4glEiqQgDqIm3IlilkNmlAVKpQRKvvzr50U0dW3kuWL3bHAsyh53833xYtEMXkysUx8Z06pEUfFuZIPsyHJqm8mCzjda8oKq2l_bSkNZ-jK51-p9sTCiX9gZR3MQfa4MGLRAEqRhvSw-oRxckjIwF0a6nOgkZ2K7Ypgm2AEssvqKB5Jb2OSyOmjALz1Yinll08xZwSoPoo0pkizsmqFt7hqWPiyRGJbMln4_NQQ=s83-c"
    const response = await fetch(url);
    const buffer = await response.buffer();
    fs.writeFile(`./static/uploads/image.jpg`, buffer, () => {
      console.log('finished downloading!')
      res.send(upload)
    });
    
  } catch (err) {
    console.log(err);
    res.send(err)
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