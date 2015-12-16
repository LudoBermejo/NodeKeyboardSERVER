var config = require("../config/config.js");
module.exports = function() {
    var mongoose = require("mongoose");
    var db = mongoose.connection;

    db.on('error', console.error.bind(console,
        'connection error:'));

    db.once('open', function () {
        console.info('connected to database');
    });

    mongoose.connect(config.db.path);

    var Questions = require("./models/questions")();

    var db = {
        Questions: Questions
    }


    return db;
}