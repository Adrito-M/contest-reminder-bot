const mongoose = require('mongoose')

const schema = new mongoose.Schema({

    _id: {
        type: String,
        required: true,
    },

    defaultChannel: {
        type: String,
        required: true,
    },

    preferences: {
        type: [String],
        required: true,
    }

})

module.exports = mongoose.model('Channel', schema)