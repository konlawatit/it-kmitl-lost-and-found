const express = require('express');
const controller = express.Router();

const multer = require('multer')

const path = require("path")

var storage = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, './static/uploads') // path to save file
  },
  filename: function (req, file, callback) {
    // set file name
    callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
  }
})

const upload = multer({
  storage: storage
})

const {
    OAuth2Client
} = require('google-auth-library');

const querySqlModel = require('../model/querySql')
const querySql = new querySqlModel()

controller.post('/login', async (req, res) => {
    try {
        let CLIENT_ID = '869793669585-thq4uiq4ir7cqqsdg0p90cafo28hu61d.apps.googleusercontent.com'
        let token = req.body.idtoken
        console.log(token)
        const client = new OAuth2Client(CLIENT_ID);
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID, // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            console.log(payload)

            if ((await querySql.exists('USER', 'user_id', payload.email.split('@')[0])).exists) {
                let user_info = await querySql.getUser(payload.email.split('@')[0]);
                res.status(200).send({
                    statusCode: '200',
                    statusText: 'Request Success',
                    error: false,
                    messge: 'login successful',
                    data: user_info,
                    new_user: false,
                });
            } else {
                let sqlPayload = [
                    [payload.email.split('@')[0], payload.name, payload.given_name, payload.family_name, payload.email, payload.picture]
                ]
                await querySql.createUser(sqlPayload);
                console.log('weeeeee')
                res.status(200).send({
                    statusCode: '200',
                    statusText: 'Request Success',
                    error: false,
                    messge: 'New user, login successful',
                    data: payload,
                    new_user: true
                });
            }

            // If request specified a G Suite domain:
            // const domain = payload['hd'];
            //res.send('success')
        }
        verify().catch(e => {
            console.log(e)
            res.status(400).send({
                statusCode: '400',
                statusText: 'Bad Request',
                error: true,
                message: 'user invalid'
            })
        });
    } catch (err) {
        console.log(err)
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error',
            error: true,
            messge: 'Internal Server Error',
        })
    }
})

controller.post('/login/confirm', upload.single('file'), async (req, res) => {
    try {
        let {name, firstname, lastname, phone, birthday, role} = req.body
        console.log(req.file)
        console.log(req.body)
        let picture = req.file.path
        let userPayload = [name, firstname, lastname, birthday, picture]
        
        let result = await querySql.updateProfile(userPayload)
        console.log(result)
        res.send(req.file)
      } catch (err) {
        console.log(err)
        res.send(err)
      }
})

module.exports = controller;