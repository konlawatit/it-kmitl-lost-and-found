const express = require('express');
const controller = express.Router();
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './static/uploads') // path to save file
    },
    filename: function (req, file, callback) {
        // set file name
        console.log(req.params)
        callback(null, 'profile' + '-' + req.params.id + '.png')
    }
})

const upload = multer({
    storage: storage
})

const querySqlModel = require('../model/querySql')
const querySql = new querySqlModel()

controller.get('/user', async (req, res) => {
    try {
        let user_id = req.body.user_id
        let profile = await querySql.getUser(user_id)
        res.send({
            data: profile
        })
        
    } catch (err) {
        res.send(err)
    }
})

controller.put('/update/:id', upload.single('file'), async (req, res) => {
    try {
        let {name,firstname, lastname, phone_number, birthday} = req.body;
        console.log('body ', req.body)
        let user_id = req.params.id
        console.log(phone_number)

        if (req.file) {
            picture = req.file.path
        } else {
            picture = (req.body.linkImage).split('http://localhost:8888/')[1]
        }
        let sqlPayload = [
            name, firstname, lastname, picture, birthday, phone_number, user_id
        ]
        await querySql.updateProfile(sqlPayload);
        console.log('pass')
        res.send('passs')

    } catch (err) {
        res.send(err)
    }
})

module.exports = controller;