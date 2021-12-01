const Conversation = require("../models/Conversation");
const User = require("../models/userModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const decodeToken = require('../utils/decodetoken');

//new conv

exports.newConversation = catchAsyncErrors(async (req, res, next) => {
  const id = await decodeToken(req.body.token);
  var savedConversation;
    const newConversation = new Conversation({
      members: [id._id, req.body.id],
    });
    savedConversation = newConversation.save()
  res.status(200).json(savedConversation);

});

//get conv of a user

exports.conversationu = catchAsyncErrors(async (req, res, next) => {
    const conversation = await Conversation.find({});
    console.log(conversation)
    res.status(200).json({conversation});
});

// get conv includes two userId

exports.findConversation = catchAsyncErrors(async (req, res, next) => {
  try {
    const conversation = await Conversation.findOne({
      members: { $all: [req.params.firstUserId, req.params.secondUserId] },
    });
    res.status(200).json(conversation)
  } catch (err) {
    res.status(500).json(err);
  }
});

