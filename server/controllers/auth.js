const express = require('express');
const controller = express.Router();
const { OAuth2Client } = require('google-auth-library');

controller.post('/login', (req, res) => {
    try {
        let CLIENT_ID = '869793669585-thq4uiq4ir7cqqsdg0p90cafo28hu61d.apps.googleusercontent.com'
        let token = req.body.idtoken
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
            res.status(200).send({
                statusCode: '200',
                statusText: 'Request Success',
                error: false,
                messge: 'login successful',
                data: payload
            });
            // If request specified a G Suite domain:
            // const domain = payload['hd'];
        }
        verify().catch(e => {
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