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
        let result = await querySql.createComment([
            comment, req.params.postId, user_id, dateTime
        ], req.params.postId)
        //console.log('result',posts)
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

controller.get('/:postId', async (req, res) => {
    try {
        let postId = req.params.postId;
        res.send(await querySql.getComments(postId))
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

controller.post('/:postId/editcomment', async (req, res)=>{
    comment_no = req.body.comment_no
    comment_desc = req.body.comment_desc
    let payload = {comment_no: comment_no, comment_desc: comment_desc}
    try{
        await querySql.editComment(payload)
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'edit comment',
        })
    } catch (err){
        console.log(err)
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error แตกก',
            error: true,
            messge: 'Internal Server Error1111',
        })
    } finally {
        console.log('finally edit comment')
    }
})

controller.delete('/deletecomment/:id', async (req, res) => {
    comment_no = req.params.id
    try {
        await querySql.deleteComment(comment_no);
        //console.log('result',posts)
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success' + comment_no,
            error: false,
            messge: 'delete posts',
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error ' + comment_no,
            error: true,
            messge: 'Internal Server Error',
        })
    } finally {
        console.log('finally delete post')
    }
})


module.exports = controller;