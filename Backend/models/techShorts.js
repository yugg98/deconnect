const mongoose = require('mongoose')


const shorts = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    image: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    img: {
        type: String
    },
    body: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    timestamp: {
        type: Date,
        default: Date.now,
    },
    link: {
        type: String,
        required: true
    },
    sourceUrl:{
        type:String,
    },
    sourceName:{
        type:String,
    }

});

module.exports = mongoose.model('shorts', shorts);
