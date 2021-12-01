const mongoose = require("mongoose");
const User = require('../models/userModel')
const { ObjectId } = mongoose.Schema.Types;
const commentSchema = new mongoose.Schema({
    userId:{
        type:ObjectId,
        ref:"User"
    },
    postid:{
        type:ObjectId
    },
    body:{
        type:String,
        
    },
    commentId:{
        type:ObjectId
    },
    reply:[
        {type:ObjectId}
    ]
    
})

module.exports = mongoose.model("Comments", commentSchema);