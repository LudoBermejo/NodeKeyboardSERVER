var mongoose = require("mongoose");
module.exports = function() {

    var QuestionsSchema = new mongoose.Schema({
        who: {
            type: String,
            required:true
        },
        what: {
            type: String,
            required:true
        }
    });

    var Questions = mongoose.model('Questions', QuestionsSchema);
    return Questions;
}
