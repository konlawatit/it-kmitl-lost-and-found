const express = require('express');
const controller = express.Router();
const db = require('../database/mysql')
const {
    OAuth2Client
} = require('google-auth-library');

const querySqlModel = require('../model/querySql')
const querySql = new querySqlModel()

controller.post('/login', (req, res) => {
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

            querySql.existsUser('USER', 'user_id', payload.email.split('@')[0]).then(exists => {
                if (exists.exists == 1) {
                    querySql.getUser(payload.email.split('@')[0]).then(result => {
                        res.status(200).send({
                            statusCode: '200',
                            statusText: 'Request Success',
                            error: false,
                            messge: 'login successful',
                            data: result
                        });
                    })
                    
                } else {
                    let sqlPayload = [
                        [payload.email.split('@')[0], payload.name, payload.given_name, payload.family_name,payload.email, payload.picture]
                    ]
                    querySql.createUser(sqlPayload).then(result => {
                        res.status(200).send({
                            statusCode: '200',
                            statusText: 'Request Success',
                            error: false,
                            messge: 'New user, login successful',
                            data: payload,
                        });
                    }).catch(err => {
                        res.status(400).send({
                            statusCode: '400',
                            statusText: 'Bad Request',
                            error: true,
                            message: 'user invalid'
                        })
                    })
                }
            }).catch((err) => {
                res.status(400).send({
                    statusCode: '400',
                    statusText: 'Bad Request',
                    error: true,
                    message: 'user invalid'
                })
            })
            // If request specified a G Suite domain:
            // const domain = payload['hd'];
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

module.exports = controller;