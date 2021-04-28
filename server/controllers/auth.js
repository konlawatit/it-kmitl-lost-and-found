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
        callback(null, './static/uploads/profile') // path to save file
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
            const userid = (payload['sub']+'').slice(0, 9);
            console.log(payload)

            if ((await querySql.exists('USER', 'user_id', userid)).exists) {
                let user_info = await querySql.getUser(userid);
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
                    [userid, payload.name, payload.given_name, payload.family_name, payload.email, payload.picture]
                ]
                //await querySql.createUser(sqlPayload);
                payload['sub'] = userid
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
            type,
            email
        } = req.body
        let user_id = req.params.id
        console.log(user_id)
        let picture = ''
        if (req.file) {
            picture = req.file.path
        } else {
            const url = req.body.linkImage
            picture = `static\\uploads\\profile\\profile-${req.params.id}.png`
            const response = await fetch(url);
            const buffer = await response.buffer();
            fs.writeFile(`./static/uploads/profile/profile-${req.params.id}.png`, buffer, async () => {
                console.log('finished downloading!')
            });
        }
        let sqlPayload = [
            [user_id, name, firstname, lastname, email, picture, birthday, phone, type, 0, 'normal'],
        ]
        console.log('payload', sqlPayload)
        await querySql.createUser(sqlPayload);
        //let info = await querySql.getUser(user_id)
        console.log('create success')
        res.send({data: {
            "sub": user_id,
            "name": name,
            "email": email,
            "given_name": firstname,
            "family_name": lastname,
            "picture": 'http://localhost:8888/' + picture,
            'type': type,
            'role': 'normal',
            'phone_number': phone,
            'merit': 0,
            'birthday': birthday
        }})

    } catch (err) {
        console.log(err)
        res.send(err)
    }
})
controller.get('/alluser', async (req, res) => {
    try {
        let users = await querySql.allUser();
        let result = []
        for (user of users) {
            result.push(await user)
        }
        //console.log('result',posts)
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'get all user',
            data: result
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error',
            error: true,
            messge: 'Internal Server Error!',
        })
    } finally {
        console.log('finally alluser')
    }
})

controller.post('/normaltoadmin', async (req, res)=>{
    id = req.body.id
    try{
        await querySql.normaltoAdmin(id)
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'change role to admin',
        })
    } catch (err){
        console.log(err)
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error แตกก',
            error: true,
            messge: 'Internal Server Error',
        })
    } finally {
        console.log('finally change role to admin')
    }
})

controller.post('/admintonormal', async (req, res)=>{
    id = req.body.id
    try{
        await querySql.admintoNormal(id)
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'change role to normal',
        })
    } catch (err){
        console.log(err)
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error แตกก',
            error: true,
            messge: 'Internal Server Error',
        })
    } finally {
        console.log('finally change role to normal')
    }
})

controller.post('/banuser', async (req, res)=>{
    id = req.body.id
    try{
        await querySql.banUser(id)
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'banned user',
        })
    } catch (err){
        console.log(err)
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error แตกก',
            error: true,
            messge: 'Internal Server Error',
        })
    } finally {
        console.log('finally banned user 111')
    }
})

controller.post('/searchuser', async (req, res)=>{
    textsearch = req.body.text
    try{
        let result = await querySql.searchUser(textsearch)
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'banned user',
            data: result
        })
    } catch (err){
        console.log(err)
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error แตกก',
            error: true,
            messge: 'Internal Server Error',
        })
    } finally {
        console.log('finally search' + textsearch)
    }
})

module.exports = controller;