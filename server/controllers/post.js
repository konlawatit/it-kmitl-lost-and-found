const express = require("express");
const controller = express.Router();
const querySqlModel = require('../model/querySql')
const querySql = new querySqlModel()
const multer = require('multer')
const path = require("path")
const Joi = require('joi')

const nameValidator = async (value, helpers) => {
    const [rows, _] = await querySql.checkItemName(value)
    if (rows.length > 0) {
        const message = 'This item name is already taken'
        throw new Joi.ValidationError(message, { message })
    }
    return value
}
const addItemSchema = Joi.object({
    item_name: Joi.string().required().min(3).external(nameValidator),
    user_id: Joi.string().required()
})

const createPostSchema = Joi.object({
    userid: Joi.string().required(),
    topic: Joi.string().required().min(3),
    categoryPost: Joi.string(),
    postDesc: Joi.string(),
    post_time:Joi.string(),
    place: Joi.string(),
    post_image: Joi.string().required().min(1),
    categoryItem: Joi.string().required()
})

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './static/uploads/imagePost') // path to save file
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

var storageItem = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './static/uploads/imageItem') // path to save file
    },
    filename: function (req, file, callback) {
        // set file name
        callback(null, 'item' + '-' + req.query.item_name + '.png')
    }
})

const uploadItem = multer({
    storage: storageItem
})

controller.get('/count/:select', async (req, res) => {
    try {
        console.log(req.query.date)
        let posts = await querySql.pagePosts(req.params.select, req.query.date, req.query.search, req.query.id, req.query.item);

        let result = []
        // for (post of posts) {
        //     result.push(await post)
        // }
        //console.log('result',posts)
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'get all posts',
            data: posts
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

controller.get('/home/:page', async (req, res) => {
    try {
        let posts = await querySql.allPostsPage(req.params.page);
        let result = []
        // for (post of posts) {
        //     result.push(await post)
        // }
        //console.log('result',posts)
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'get all posts',
            data: posts
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

controller.get('/allmyposts/:id/:page', async (req, res) => {
    userid = req.params.id
    try {
        let myposts = await querySql.myPosts(userid, req.params.page);
        let result = []
        for (post of myposts) {
            result.push(await post)
        }
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'get all my posts',
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
        console.log("finally all my post")
    }
})

controller.get('/oneposts/:id', async (req, res) => {
    post_id = req.params.id
    try {
        let myposts = await querySql.onePosts(post_id);
        let result = []
        for (post of myposts) {
            result.push(await post)
        }
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'get posts',
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
        console.log("finally post")
    }
})

controller.get('/lostpost/:page', async (req, res) => {
    try {
        let posts = await querySql.lostPosts(req.params.page);
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

controller.get('/foundpost/:page', async (req, res) => {
    try {
        let posts = await querySql.foundPosts(req.params.page);
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

controller.get('/mylostpost/:id/:page', async (req, res) => {
    userid = req.params.id
    try {
        let posts = await querySql.myLostPosts(userid, req.params.page);
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

controller.get('/myfoundpost/:id/:page', async (req, res) => {
    userid = req.params.id
    try {
        let posts = await querySql.myFoundPosts(userid, req.params.page);
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

controller.get('/mycompletepost/:id/:page', async (req, res) => {
    userid = req.params.id
    try {
        let posts = await querySql.myCompletePosts(userid, req.params.page);
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


controller.post('/createpost', upload.single('post_image'), async (req, res) => {
    userid = req.body.userid
    topic = req.body.topic
    categoryPost = req.body.categoryPost
    postDesc = req.body.postDesc
    post_time = req.body.post_time
    place = req.body.place
    categoryItem = req.body.categoryItem
    if (req.file) {
        post_image = req.file.path
    }
    else{
        post_image = ""
    }
    console.log(req.file)
    let payload = {
        userid: userid, topic: topic, categoryPost: categoryPost,
        postDesc: postDesc, post_time: post_time, place: place, categoryItem: categoryItem, post_image: post_image
    }
    try {
        await createPostSchema.validateAsync(payload, { abortEarly: false })
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
    try {
        console.log('cat item',categoryItem)
        let result = await querySql.createPost(payload);
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

controller.post('/editpost', upload.single('post_image'), async (req, res) => {
    id = req.body.id
    topic = req.body.topic
    place = req.body.place
    post_desc = req.body.post_desc
    type = req.body.category_post
    update_time = req.body.update_time
    post_image = ""
    if (req.file) {
        post_image = req.file.path
        console.log(req.file)
    }
    else {
        post_image = req.body.post_image
        console.log(req.body.post_image)
    }
    let payload = { id: id, topic: topic, place: place, post_desc: post_desc, type: type, update_time: update_time, post_image: post_image }
    try {
        await querySql.editPost(payload)
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'edit post',
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

controller.post('/searchposts', async (req, res) => {
    textsearch = req.body.text
    try {
        let result = await querySql.searchPosts(textsearch)
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'banned user',
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
        console.log('finally search')
    }
})

controller.get('/search/:id/:page/:msg', async (req, res) => { //สำหรับหน้า post และอื่นๆ
    try {
        let msg = req.params.msg;
        console.log(msg, req.params.page)
        let posts = await querySql.searchMyPosts(msg, req.params.id, req.params.page);
        let result = []
        for (post of posts) {
            result.push(await post)
        }
        //console.log('result',posts)
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'get search posts',
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

controller.get('/search/:page/:msg', async (req, res) => { //สำหรับหน้า post home
    try {
        let msg = req.params.msg;
        console.log(msg, req.params.page)
        let posts = await querySql.searchPostsHome(msg, req.params.page);
        let result = []
        for (post of posts) {
            result.push(await post)
        }
        //console.log('result',posts)
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'get search posts',
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

controller.post('/additem', uploadItem.single('file'), async (req, res) => {
    try {
        await addItemSchema.validateAsync(req.query, { abortEarly: false })
    } catch (err) {
        console.log(err)
        return res.status(400).json(err)
    }
    let item_name = req.query.item_name
    let user_id = req.query.user_id
    let image = ''

    try {
        console.log(req.file)
        iamge = req.file.path
        console.log('add item', item_name, user_id, image)
        await querySql.addItem(item_name, user_id, req.file.path);
        //console.log('result',posts)
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'Add item',
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
        console.log('finally add item')
    }
})

controller.get('/itempost', async (req, res) => {
    try {
        let items = await querySql.getItemPosts();
        let result = []
        for (item of items) {
            result.push(await item)
        }
        //console.log('result',posts)
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'get all items',
            data: result
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error',
            error: true,
            messge: 'Internal Server Error111',
        })
    } finally {
        console.log('finally get item post')
    }
})

controller.post('/postbydate/:page', async (req, res) => {
    date = req.body.date
    try {
        let posts = await querySql.postbyDate(date, req.params.page);
        let result = []
        for (post of posts) {
            result.push(await post)
        }
        //console.log('result',posts)
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success' + date,
            error: false,
            messge: 'get all posts by date',
            data: result
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error' + date,
            error: true,
            messge: 'Internal Server Error',
        })
    } finally {
        console.log('finally get post by date')
    }
})

controller.post('/mypostbydate', async (req, res) => {
    date = req.body.date
    id = req.body.id
    try {
        let posts = await querySql.myPostbyDate(date, id, req.body.page);
        let result = []
        for (post of posts) {
            result.push(await post)
        }
        //console.log('result',posts)
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success' + date,
            error: false,
            messge: 'get all my posts by date',
            data: result
        })
    } catch (err) {
        console.log(err)
        res.status(500).send({
            statusCode: '500',
            statusText: 'Internal Server Error' + date,
            error: true,
            messge: 'Internal Server Error',
        })
    } finally {
        console.log('finally get post by date')
    }
})

controller.post('/completepost', async (req, res) => {
    id = req.body.id
    date = req.body.date
    try {
        await querySql.completePost(id, date)
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'complete post',
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
        console.log('finally complete post')
    }
})

controller.post('/incompletepost', async (req, res) => {
    id = req.body.id
    try {
        await querySql.inCompletePost(id)
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'incomplete post',
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
        console.log('finally incomplete post')
    }
})

controller.get('/categoryitems', async (req, res) => {
    id = req.body.id
    try {
        let items = await querySql.getCategoryItems();

        res.status(200).send({
            items,
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'incomplete post',
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
        console.log('finally incomplete post')
    }
})

controller.post('/searchcompleteposts', async (req, res) => {
    textsearch = req.body.text
    try {
        let result = await querySql.searchCompletePosts(textsearch)
        res.status(200).send({
            statusCode: '200',
            statusText: 'Request Success',
            error: false,
            messge: 'banned user',
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
        console.log('finally search')
    }
})


controller.get('/allcompleteposts', async (req, res) => {
    try {
        let posts = await querySql.allCompletePosts();
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

controller.get('/filteritem/:page/:item', async (req, res) => {
    try {
        let posts = await querySql.filterItem(req.params.item, req.params.page);
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

controller.get('/filterMyitem/:page/:id/:item', async (req, res) => {
    try {
        let posts = await querySql.filterMyItem(req.params.item, req.params.id, req.params.page);
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