const express = require("express");
const controller = express.Router();

const querySqlModel = require('../model/querySql')
const querySql = new querySqlModel()


//create new comment
controller.post('/:postId', async (req, res) => {
    try {
        let {
            comment,
            user_id
        } = req.body
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        await querySql.createComment([
            comment, req.params.postId, user_id, dateTime
        ])
        //console.log('result',posts)
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