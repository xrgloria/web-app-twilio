const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Text = new Schema({
    isSent: {
        type: Boolean
    },
    isReceived: {
        type: Boolean
    },
    name: {
        type: String
    },
    phoneNumber: {
        type: String
    },
    message: {
        type: String
    }
});

module.exports = mongoose.model('Text', Text);