var io = require('socket.io')(9000);

module.exports.create = function() {

    var keyboard = io
        .on('connection', function (socket) {
            socket.on('keypress', function (data) {
                console.log(data);
                socket.broadcast.emit('keypressed',data);
            });
        })


    console.log("Server created");
}

