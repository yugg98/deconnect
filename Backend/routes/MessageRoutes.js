const express = require('express');
const {addMessage,conversation} = require("../controllers/messages");
const {newConversation,conversationu,findConversation} = require("../controllers/conversations");
const router = express.Router();


router.route("/addmsg").post(addMessage)
router.route("/newconversation").post(newConversation)
router.route("/messages/:id").get(conversation)
router.route("/conversationsUser/:userId").get(conversationu)
router.route("/findConversation/:firstUserId/:secondUserId").get(findConversation)

module.exports = router;
