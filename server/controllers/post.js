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

module.exports = controller;