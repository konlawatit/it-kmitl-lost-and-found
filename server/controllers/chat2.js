module.exports = function (app, io) {
    app.post('/foo', function (req, res) {

        console.log("PUT OK!");

        io.sockets.emit('update'); // how?
        res.json({
            result: "update sent over IO"
        });
    });
}