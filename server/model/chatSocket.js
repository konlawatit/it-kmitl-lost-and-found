const pool = require('../database/mysql')

const chat = (io, socket) => {

    const test = (payload) => {
        console.log('socket test: ', payload)
    }
    socket.on("test", test)
}

class SocketModel {
    test(io, socket) {
        console.log('socket test: ', payload)
    }
}


module.exports = chat