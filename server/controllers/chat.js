const express = require("express");
const controller = express.Router();
const path = require("path");
const http = require('http'); //user for socket.io
const multer = require('multer')

const querySqlModel = require('../model/querySql')
const querySql = new querySqlModel()



const app = express();

// const server = http.get('htt');
//const io = require('socket.io')

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './static/uploads/chat') // path to save file
    },
    filename: function (req, file, callback) {
        // set file name
        console.log(file, req.params)
        callback(null, req.params.con_id + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
})


//แสดง conversation ทั้งหมดที่่มีของ user นั้นๆ
controller.get('/allconversations', async (req, res) => {
    try {
        //let {message}  = req.body
        //console.log(http.request(app))
        //console.log('MSG:',message)
        // io.on("connection", socket => {
        //     socket.on("private message", (anotherSocketId, msg) => {
        //       socket.to(anotherSocketId).emit("private message", socket.id, msg);
        //     });
        //   });  ใช้ท่านี้นะะะะะะะะะะะะะ
        let {
            user_id
        } = req.query
        //let user_id = (await querySql.getUser(email).user_id
        let result = (await querySql.getAllConversations(user_id))[0]
        result = await result.map(data => {
            data['image'] = 'http://localhost:8888/' + data['image']
            return data
        })
        //req.io.to('room1').emit('event1', `${message}`) //ได้ละโว้ยยยยยยยยยยยยยย

        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error',
            error: true,
            messge: 'Internal Server Error',
        })
    } finally {
        console.log('finally allpost')
    }
})

//สร้าง conversation
controller.post('/conversation', async (req, res) => {
    try {
        let {
            user_id,
            another_id
        } = req.body
        let result = await querySql.createConversation([user_id, another_id])
        if (result == false) {
            res.send({
                message: 'already have room',
                state: false
            })
        } else {
            res.status(200).send({
                message: 'created successful',
                state: true
            })
        }
        //req.io.to('room1').emit('event1', `${message}`) //ได้ละโว้ยยยยยยยยยยยยยย

        //io.socket.emit('chat message', '3423423423')
    } catch (err) {
        console.log(err)
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error',
            error: true,
            messge: 'Internal Server Error',
        })
    } finally {
        console.log('finally allpost')
    }
})

//แสดง ดึง message และข้อมูลอื่นๆออกมา
controller.get('/messages', async (req, res) => {
    try {

        let {
            user_id,
            another_id
        } = req.query
        let result = (await querySql.getMessages(user_id, another_id))[0]
        //req.io.to('room1').emit('event1', `${message}`) //ได้ละโว้ยยยยยยยยยยยยยย

        //io.socket.emit('chat message', '3423423423')
        res.status(200).send(result)
    } catch (err) {
        console.log(err)
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error',
            error: true,
            messge: 'Internal Server Error',
        })
    } finally {
        console.log('finally allpost')
    }
})


//ส่งข้อความ
controller.post('/message/:con_id',upload.single('image'), async (req, res) => {
    try {

        let {
            user_id,
            another_id,
            message,
        } = req.body
        let is_image = false
        if (req.file) {
            is_image = true
            message = req.file.path
            
        }
        console.log(user_id, another_id, message)
        let con_id = (await querySql.getConversation(user_id, another_id)).con_id
        let addMessage = await querySql.addMessage([message, con_id, user_id, is_image])
        querySql.addNotiChat(another_id, con_id);
        //let addMessage = con_id
        req.io.emit('chat', `${message}`, another_id) //ได้ละโว้ยยยยยยยยยยยยยย
        req.io.emit('noti_chat', user_id, con_id, another_id);
        //io.socket.emit('chat message', '3423423423')


        res.status(200).send()
    } catch (err) {
        console.log(err)
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error',
            error: true,
            messge: 'Internal Server Error',
        })
    } finally {
        console.log('finally allpost')
    }
})

controller.put('/clearnoti', async (req, res) => {
    try {

        let {
            user_id,
            con_id,
        } = req.body
        querySql.clearNotiChat(user_id, con_id);
        //let addMessage = con_id
        //io.socket.emit('chat message', '3423423423')

        res.status(200).send()
    } catch (err) {
        console.log(err)
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error',
            error: true,
            messge: 'Internal Server Error',
        })
    } finally {
        console.log('finally allpost')
    }
})



module.exports = controller;