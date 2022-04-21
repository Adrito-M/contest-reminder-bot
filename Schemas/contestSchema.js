const mongoose = require('mongoose')

const schema = new mongoose.Schema({

    _id: {
        //the actual link of the contest
        type: String,
        required: true,
    },

    website: {
        type: String,
        required: true,
    },

    contestName: {
        type: String,
        required: true,
    },

    contestType: {
        type: String,
        required: false,
    },

    contestStartTime: {
        type: Date,
        required: true,
    },

    contestDurationInMins: {
        type: Number,
        required: true,
    },

    ratedFor: {
        type: String,
        required: false,
    },

    notiSentFor8hrs: {
        type: Boolean,
        default: false,
    },

    notiSentFor1hr: {
        type: Boolean,
        default: false,
    },

    notiSentFor30mins: {
        type: Boolean,
        default: false,
    },

    notiSentFor5mins: {
        type: Boolean,
        default: false,
    },

})

module.exports = mongoose.model('contests', schema)