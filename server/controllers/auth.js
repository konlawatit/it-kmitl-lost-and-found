const express = require('express');
const controller = express.Router();
const db = require('../database/mysql')
const {
    OAuth2Client
} = require('google-auth-library');

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

            let sqlIsExists = `SELECT EXISTS(SELECT user_id FROM it_lost_and_found.USER WHERE user_id = ${payload.email.split('@')[0]})`
            await db.query(sqlIsExists, async (err, check) => {
                if (err) res.status(404).send(err)
                console.log(check)
                if (check[0][sqlIsExists.slice(7)] == 1) { //เช็คว่าอยู่ใน database มั้ย
                    console.log(check[0][sqlIsExists])
                    res.status(200).send({ 
                        statusCode: '200',
                        statusText: 'Request Success',
                        error: false,
                        messge: 'login successful',
                        data: payload, //เดะต้องแก้ดึงจาก database
                    });
                } else {
                    let sql = `insert into it_lost_and_found.USER (user_id, user_name, firstname, lastname) values (${payload.email.split('@')[0]}, '${payload.name}', '${payload.given_name}', '${payload.family_name}');`
                    await db.query(sql, (err, result) => { //ไม่มีใน database ก็เพิ่มข้อมูล
                        if (err) res.status(404).send(err)
                        console.log(result)
                        res.status(200).send({ 
                            statusCode: '200',
                            statusText: 'Request Success',
                            error: false,
                            messge: 'New user, login successful',
                            data: payload, 
                            sql: result
                        });
                    })
                }
            })
            


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