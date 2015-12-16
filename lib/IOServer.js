var config = require("../config/config.js");
var io = require('socket.io')(config.socketServer.port);
var database = require('./database.js')(config.socketServer.port);

module.exports = function() {

    var keyboard = io
        .on('connection', function (socket) {

            var sendQuestions = function(s) {
                database.Questions.find({}, function(err, questions) {
                    if (err) throw err;
                    console.log("I'm sending the questions");
                    s.emit("listOfQuestions", questions);
                    s.broadcast.emit("listOfQuestions", questions);

                });
            }

            socket.on('keypress', function (data) {
                console.log(data);
                socket.broadcast.emit('keypressed',data);
            });
            socket.on('getQuestions', function () {
                console.log("Need questions");
                sendQuestions(socket);
            });
            socket.on('newQuestion', function (data) {
                console.log("got a new question",data);
                var newQuestion = database.Questions(data);
                newQuestion.save(function(err) {
                    if (err) throw err;
                    console.log('Question created!');
                    sendQuestions(socket);
                });
            });
        });
    console.log("Server created");
}

