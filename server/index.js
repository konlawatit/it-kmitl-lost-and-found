//require library
const express = require('express');
const cors = require('cors'); //Use cors to solve : No 'Access-Control-Allow-Origin'
const path = require('path')
const http = require('http'); //user for socket.io

const app = express();

const server = http.createServer(app);
const io = require('socket.io')(server, {
    cors: {
        origin: "http://localhost:8080",
        methods: ["GET", "POST"]
    }
});


//require file
const logger = require('./middleware/logger');
const mockup = require('./controllers/mockup');
const auth = require('./controllers/auth');
const post = require('./controllers/post');
const profile = require('./controllers/profile')
const comment = require('./controllers/comment')
const chat = require('./controllers/chat')
const chat2 = require('./controllers/chat2')(app, io)


// Statics
app.use("/static", express.static(path.join(__dirname, "static")))

app.use(cors());

//middleware when the user request will make read the body
app.use(express.json());
app.use(express.urlencoded({
    extended: false
}))

//Custom middleware
//app.use(logger);
app.use(function (req, res, next){
    req.io = io
    next();
})

// app.use(function (req, res, next) {
//     console.log('dddd',req.url)
//     next()
//   })




// Router
app.use('/apis/mockup', mockup);
app.use('/apis/auth', auth);
app.use('/apis/post', post);
app.use('/apis/profile', profile)
app.use('/apis/comment', comment)
app.use('/apis/chat', chat)



app.get('/', (reg, res) => {
    res.send('Hello World')
})


//register socket
// const registerTest = require('./model/chatSocket')
// const ttt = require('./controllers/chat')
// const onConnection = (socket) => {
//     registerTest(io, socket)
//     ttt(io, socket)
// }
// io.on("connection", onConnection)


io.on('connection', (socket) => {
    // คนที่เข้ามาจะมี id ตรงนี้นะครับ
    socket.join('room1');
    console.log('a user connected ', socket.id)

    // user ที่เปิดหรืออก browser
    socket.on('disconnect', function () {
        console.log('user disconnected ', socket.id)
    })

    // รับเฉพาะ Event ข้อความ จาก client
    socket.on('chat message',function (msg) {
        console.log('socket by : ', socket.id, ' message: ' + msg)
        // ส่งข้อมูลกลับไปหาผู้ส่งมา
        io.emit('chat message', msg)
    })

    io.to('room1').emit('event1', 'eeeeeeeeee2222222')
});
// io.to('room1').emit('event1', 'eeeeeeeeee22222223')



server.listen(8888, () => {
    console.log('Listening to port 8888')
})