const express = require("express");
const controller = express.Router();

const querySqlModel = require('../model/querySql')
const querySql = new querySqlModel()

controller.get('/allposts', async (req, res) => {
    try {
        let posts = await querySql.allPosts();
        let result = []
        for (post of posts) {
            result.push(await post)
        }
        //console.log('result',posts)
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'get all posts',
            data: result
        })
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

controller.post('/createpost', async (req, res) => {
    userid = req.body.userid
    topic = req.body.topic
    categoryPost = req.body.categoryPost
    postDesc = req.body.postDesc
    post_time = req.body.post_time
    let payload = {userid: userid, topic:topic, categoryPost:categoryPost, postDesc:postDesc, post_time:post_time}
    try {
        await querySql.createPost(payload);
        //console.log('result',posts)
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'create posts',
            data: result
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error แตกก',
            error: true,
            messge: 'Internal Server Error',
        })
    } finally {
        console.log('finally createpost')
    }
})

module.exports = controller;