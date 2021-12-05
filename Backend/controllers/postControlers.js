const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const Post = require("../models/postModel");
const jwt = require('jsonwebtoken');
const User = require("../models/userModel");
const checktoken = require('../utils/checktoken');
const sendToken = require("../utils/jwtToken");
const Comment = require('../models/commentModel');
const cloudinary = require('cloudinary');

// const mongoose = require('mongoose')
exports.createPost = catchAsyncErrors(async (req, res, next) => {
    const { body, token } = req.body;
    const decodedData = jwt.verify(token, 'uihfewiuhfriuhriuhiuhhfiufefehfei');
    const user = await User.findById(decodedData.id);
    
    const myCloud = await cloudinary.v2.uploader.upload(req.body.img, {
        folder: "Post",
        width: 150,
        crop: "scale",
    });
    const post = await Post.create({
        user_id: decodedData.id,
        body,
        image: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
        }
    })
    res.status(200).json({
        success: true,
        user,
        post
    });
    
   
});
exports.deletePost = catchAsyncErrors(async (req, res, next) => {
    const id = req.body.id;
    const post = await Post.deleteOne({ _id: id });
    if (post == null) {
        res.status(401).json({
            success: false,
            message: "Post not found"
        });
    }
    res.status(200).json({
        success: true,
        message: "Post has benn deleted"
    });
})
exports.updatePost = catchAsyncErrors(async (req, res, next) => {
    const id = req.body.id;
    // const post = Post.findByIdAndUpdate(id);
    await Post.findByIdAndUpdate(id,
        {
            title: req.body.title
        }).then(() => {
        }).catch();
    res.status(200).json({
        success: 200
    })
})
exports.getAllPost = catchAsyncErrors(async (req, res, next) => {
    const allPost = await Post.find({});
    JSON.stringify(allPost);
    res.status(200).json({
        success: true,
        allPost
    });
})
exports.Like = (req, res) => {
    const id = checktoken(req.body.token);
    if (id == false) {
        res.status(200).json({
            "message": "user not found"
        })
    }
    const user = User.findById(id)
    const useri = User.findByIdAndUpdate(id,{
        $push:{notification:{id:req.body.id,Head:`${user.name} liked your profile`},Message:"",}
    });
    Post.findByIdAndUpdate(req.body.id, {
        $addToSet: { likes: id }
    }, {
        new: true
    }).exec((err, res) => {
        if (err) {
        }
    });
    res.status(200).json({
        "message": "user found",
        user
    })
}
exports.disLike = (req, res) => {
    const id = checktoken(req.body.token);
    if (id == false) {
        res.status(200).json({
            "message": "user not found"
        })
    }
    Post.findByIdAndUpdate(req.body.id, {
        $pull: { likes: id }
    }, {
        new: true
    }).exec((err, res) => {
        if (err) {
        }
    });
    res.status(200).json({
        "message": "user  found"
    })
}

exports.comment = catchAsyncErrors(async (req, res, next) => {
    const decodedData = jwt.verify(req.body.token, 'uihfewiuhfriuhriuhiuhhfiufefehfei');
    const userid = decodedData.id;
    const pid = req.body.id;
    const postid = await Post.findById(pid);

    const comment = await Comment.create({
        userId: userid,
        postid: pid,
        body: req.body.cbody
    })

    const user = await User.findById(userid);

    const useri = await User.findByIdAndUpdate(postid.user_id,{
        $push:{Notification:{id:comment._id,Message:`${comment.body}`,Head:`${user.name} commented on your Post`,M:"N"}}
    })
    
    const post = Post.findByIdAndUpdate(pid, {
        $push: { comments: comment._id }
    }, {
        new: true
    }).exec((err, res) => {
        if (err) {
        }
    });
    res.status(200).json({
        comment
    })
});
exports.delComment = catchAsyncErrors(async (req, res, next) => {
    await Comment.findByIdAndDelete(req.body.id);
    const post = await Post.findByIdAndUpdate(req.body.pid, {
        $pull: { comments: req.body.id }
    }, {
        new: true
    }).exec((err, res) => {
        if (err) {
        }
    });
    res.status(200).json({

    })
})
exports.updateComment = catchAsyncErrors(async (req, res, next) => {
    const decodedData = jwt.verify(req.body.token, 'uihfewiuhfriuhriuhiuhhfiufefehfei');
    const user = decodedData.id;
    const cid = req.body.cid;

    const comment = await Comment.findById(cid);
    comment.body = req.body.cbody;

    await comment.save();
    res.status(200).json({
        comment
    })
})
exports.reply = catchAsyncErrors(async (req, res, next) => {
    const decodedData = jwt.verify(req.body.token, 'uihfewiuhfriuhriuhiuhhfiufefehfei');
    const user = decodedData.id;
    const mcid = req.body.cid;

    const reply = await Comment.create({
        userId: user,
        commentId: mcid,
        body: req.body.cbody
    })

    const cid = await Comment.findByIdAndUpdate(mcid, {
        $push: {
            reply: reply._id
        }
    })

    res.status(200).json({
        reply,
        cid
    })
})
exports.share = catchAsyncErrors(async (req, res, next) => {
    const decodedData = jwt.verify(req.body.token, 'uihfewiuhfriuhriuhiuhhfiufefehfei');
    const user = decodedData.id;
    const id = req.body.pid;
    const useri = User.findByIdAndUpdate(id,{
        $push:{notification:{id:id,Head:`${useri.name} Shared your post`},Message:"",}
    });
    const post = await Post.findById(id);
    post.shareUser = user;
    await post.save();
    res.status(200).json({
        post
    })
})

exports.delshare = catchAsyncErrors(async (req, res, next) => {
    const decodedData = jwt.verify(req.body.token, 'uihfewiuhfriuhriuhiuhhfiufefehfei');
    const user = decodedData.id;
    const id = req.body.pid;

    const post = await Post.findById(id);

    post.shareUser = null;
    await post.save();
    res.status(200).json({
        post
    })
})
exports.getComment = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.pid;
    const Comments = await Comment.find({postid:id}).populate("userId","name avatar _id");
    res.status(200).json({
        Comments
    })
})