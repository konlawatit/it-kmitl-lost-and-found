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

controller.get('/oneposts/:id', async (req, res) =>{
    post_id = req.params.id
    try{
        let myposts = await querySql.onePosts(post_id);
        let result = []
        for (post of myposts){
            result.push(await post)
        }
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'get posts',
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
        console.log("finally post")
    }
})

controller.get('/lostpost', async (req, res) => {
    try {
        let posts = await querySql.lostPosts();
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
        console.log('finally lost post')
    }
})

controller.get('/foundpost', async (req, res) => {
    try {
        let posts = await querySql.foundPosts();
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
        console.log('finally found post')
    }
})

controller.get('/mylostpost/:id', async (req, res) => {
    userid = req.params.id
    try {
        let posts = await querySql.myLostPosts(userid);
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
        console.log('finally lost post')
    }
})

controller.get('/myfoundpost/:id', async (req, res) => {
    userid = req.params.id
    try {
        let posts = await querySql.myFoundPosts(userid);
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
        console.log('finally found post')
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

controller.post('/editpost', async (req, res)=>{
    id = req.body.id
    topic = req.body.topic
    place = req.body.place
    post_desc = req.body.post_desc
    type = req.body.type
    let payload = {id:id, topic:topic, place:place, post_desc:post_desc, type:type}
    try{
        await querySql.editPost(payload)
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'edit post',
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
        console.log('finally edit post')
    }
})

controller.delete('/deletepost/:id', async (req, res) => {
    id = req.params.id
    try {
        await querySql.deletePost(id);
        //console.log('result',posts)
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'delete posts',
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error แตกก' + id,
            error: true,
            messge: 'Internal Server Error',
        })
    } finally {
        console.log('finally delete post')
    }
})

controller.get('/countuser', async (req, res) => {
    try {
        let result = await querySql.countUser();
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'get count user111',
            data: result
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error',
            error: true,
            messge: 'Internal Server Error!!!'
        })
    } finally {
        console.log('finally count user')
    }
})

controller.get('/countpost', async (req, res) => {
    try {
        let result = await querySql.countPost();
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'get count user111',
            data: result
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error',
            error: true,
            messge: 'Internal Server Error!!!'
        })
    } finally {
        console.log('finally count user')
    }
})

controller.post('/searchposts', async (req, res)=>{
    textsearch = req.body.text
    try{
        let result = await querySql.searchPosts(textsearch)
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
        console.log('finally search')
    }
})

module.exports = controller;