const express = require('express');
const controller = express.Router();

const multer = require('multer')

const path = require("path")
// fetch image
var fs = require('fs')
const fetch = require('node-fetch');

const querySqlModel = require('../model/querySql')
const querySql = new querySqlModel()

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

const {
    OAuth2Client
} = require('google-auth-library');



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
            //const userid = payload['sub'];
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
            } else if (req.body.state == 'reload') {
                res.status(200).send({
                    statusCode: '200',
                    statusText: 'Request Success',
                    error: true,
                    messge: 'user not pass',
                });
            } else {
                let sqlPayload = [
                    [payload.email.split('@')[0], payload.name, payload.given_name, payload.family_name, payload.email, payload.picture]
                ]
                //await querySql.createUser(sqlPayload);
                payload['sub'] = payload.email.split('@')[0]
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


controller.post('/login/confirm/:id', upload.single('file'), async (req, res) => {
    try {
        let {
            name,
            firstname,
            lastname,
            phone,
            birthday,
            role,
            user_id,
            email
        } = req.body
        let picture = ''
        //let userPayload = [name, firstname, lastname, birthday, picture, user_id]
        if (req.file) {
            picture = req.file.path
            //let result = await querySql.updateProfile(userPayload)
            //res.send({path: 'http://localhost:8888/'+picture})
        } else {
            const url = req.body.linkImage
            picture = `static\\uploads\\profile-${req.params.id}.png`
            const response = await fetch(url);
            const buffer = await response.buffer();
            fs.writeFile(`./static/uploads/profile-${req.params.id}.png`, buffer, async () => {
                //let result = await querySql.updateProfile(userPayload)
                //console.log(result)
                console.log('finished downloading!')
                // res.send({
                //     path: 'http://localhost:8888/'+picture
                // })
            });
        }
        let sqlPayload = [
            [user_id, name, firstname, lastname, email, picture, birthday,]
        ]
        console.log('payload', sqlPayload)
        await querySql.createUser(sqlPayload);
        console.log('create success')
        res.send({
            path: 'http://localhost:8888/'+picture
        })

    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

module.exports = controller;