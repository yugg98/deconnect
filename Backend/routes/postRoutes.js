const express = require('express');
const { createPost, deletePost ,getAllPost,Like, updatePost,comment,disLike,delComment,reply,share,delshare,updateComment
,getComment} = require('../controllers/postControlers');

const router = express.Router();

router.route("/create").post(createPost);
router.route("/delete").post(deletePost);
router.route("/update").post(updatePost);
router.route("/main").get(getAllPost);
router.route("/Like").put(Like);
router.route("/disLike").put(disLike);
router.route("/Comment").post(comment);
router.route("/delComment").post(delComment);
router.route("/reply").post(reply);
router.route("/share").post(share);
router.route("/delshare").post(delshare);
router.route("/updateComment").post(updateComment);
router.route("/getComment/:pid").get(getComment);

module.exports = router;