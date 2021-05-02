const express = require('express');
const controller = express.Router();
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './static/uploads/profile') // path to save file
    },
    filename: function (req, file, callback) {
        // set file name
        console.log(req.params)
        callback(null, 'profile' + '-' + req.params.email + '.png')
    }
})

const upload = multer({
    storage: storage
})

const querySqlModel = require('../model/querySql')
const querySql = new querySqlModel()

controller.get('/user', async (req, res) => {
    try {
        let profile = await querySql.getUser(req.body.email)
        res.send({
            data: profile
        })
        
    } catch (err) {
        res.send(err)
    }
})

controller.put('/update/:email', upload.single('file'), async (req, res) => {
    try {
        let {user_name,fname, lname, phone_number, birthday, user_id} = req.body;

        if (req.file) {
            image = req.file.path
        } else {
            image = (req.body.linkImage).split('http://localhost:8888/')[1]
        }
        let sqlPayload = [
            user_name, fname, lname, image, birthday, phone_number, user_id
        ]
        
        await querySql.updateProfile(sqlPayload);
        console.log('pass')
        res.send('passs')

    } catch (err) {
        res.send(err)
    }
})

module.exports = controller;