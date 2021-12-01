const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;

const postSchema = new mongoose.Schema({
  user_id: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  shareUser: {
    type: String,
  },
  body: {
    type: String,
    // minLength: [5, "Name should have more than 4 characters"],
  },
  image: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  video: {
    public_id: {
      type: String,
    },
    url: {
      type: String,
    },
  },
  comments: [
    {type:ObjectId}
  ],
  likes: [
    {
      type: ObjectId,
      ref: "User"
    }
  ],
  sharedCaption:{
    type:String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
})


module.exports = mongoose.model("Post", postSchema);