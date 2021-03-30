//require library
const express = require('express');
const cors = require('cors'); //Use cors to solve : No 'Access-Control-Allow-Origin'
const path = require('path')

//require file
const logger = require('./middleware/logger');
const mockup = require('./controllers/mockup');
const auth = require('./controllers/auth');
const post = require('./controllers/post');

const app = express();

// Statics
app.use("/static", express.static(path.join(__dirname, "static")))

app.use(cors());

//middleware when the user request will make read the body
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

//Custom middleware
app.use(logger);

// Router
app.use('/apis/mockup', mockup);
app.use('/apis/auth', auth);
app.use('/apis/post', post);


app.get('/', (reg, res) => {
    res.send('Hello World')
})

app.listen(8888, ()=> {
    console.log('Listening to port 8888')
})