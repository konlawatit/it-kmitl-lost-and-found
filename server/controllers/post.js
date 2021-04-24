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

controller.get('/allmyposts/:id', async (req, res) =>{
    userid = req.params.id
    try{
        let myposts = await querySql.myPosts(userid);
        let result = []
        for (post of myposts){
            result.push(await post)
        }
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'get all my posts',
            data: result
        })
    } catch (err){
        console.log(err)
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error',
            error: true,
            messge: 'Internal Server Error',
        })
    } finally {
        console.log("finally all my post")
    }
})

controller.post('/createpost', async (req, res) => {
    userid = req.body.userid
    topic = req.body.topic
    categoryPost = req.body.categoryPost
    postDesc = req.body.postDesc
    post_time = req.body.post_time
    place = req.body.place
    let payload = {userid: userid, topic:topic, categoryPost:categoryPost, postDesc:postDesc, post_time:post_time, place:place}
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