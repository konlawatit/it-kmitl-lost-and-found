const express = require("express");
const controller = express.Router();

const querySqlModel = require('../model/querySql')
const querySql = new querySqlModel()
const multer = require('multer')
const path = require("path")

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './static/uploads/imageComment') // path to save file
    },
    filename: function (req, file, callback) {
        // set file name
        console.log(req.params)
        callback(null, `${file.originalname}-${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({
    storage: storage
})

//create new comment
controller.post('/:postId', upload.single('comment_image'), async (req, res) => {
    let comment = req.body.commentText
    let user_id = req.body.user_id
    let postId = req.params.postId
    let comment_image = ""
    if(req.file){
        comment_image = req.file.path
        console.log(comment_image)
    }
    else{
        comment_image = ''
        console.log('')
    }
    try {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = (today.getHours()+7) + ":" + today.getMinutes() + ":" + today.getSeconds();
        var dateTime = date + ' ' + time;
        let payload = {comment: comment, user_id: user_id, postId: postId, dateTime: dateTime, comment_image: comment_image}
        // let result = await querySql.createComment([
        //     comment, req.params.postId, user_id, dateTime
        // ], req.params.postId)
        let result = await querySql.createComment(payload)
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