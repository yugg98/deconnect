// Register a User
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendEmail = require('../utils/sendEmail')
const sendToken = require("../utils/jwtToken");
const crypto = require("crypto");
const cloudinary = require("cloudinary");
const jwt = require('jsonwebtoken');
const Searchuser = require('../utils/SearchUser');
const decodeToken = require('../utils/decodetoken');
const post = require('../models/postModel')
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password, position } = req.body;
  const user = await User.create({
    name,
    email,
    password,
    avatar: {
      public_id: '987724764823',
      url: 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
    },
    banner: {
      public_id: '02408482034',
      url: 'https://res.cloudinary.com/yug/image/upload/v1636912049/avatar/banner_ipltky.jpg',
    },
    position,
  });
  sendToken(user, 201, res);
});
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }
  sendToken(user, 200, res);
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged Out",
  });
});

// Forgot Password
exports.forgotPassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHander("User not found", 404));
  }

  // Get ResetPassword Token
  const resetToken = user.getResetPasswordToken();

  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset link is :- \n\n ${resetPasswordUrl} \n\nIf you have not requested this email then, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: `Ecommerce Password Recovery`,
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save({ validateBeforeSave: false });

    return next(new ErrorHander(error.message, 500));
  }
});


// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
  // creating token hash
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHander(
        "Reset Password Token is invalid or has been expired",
        400
      )
    );
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHander("Password does not password", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.params.id);

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user.id).select("+password");

  const isPasswordMatched = await user.comparePassword(req.body.oldPassword);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Old password is incorrect", 400));
  }

  if (req.body.newPassword !== req.body.confirmPassword) {
    return next(new ErrorHander("password does not match", 400));
  }

  user.password = req.body.newPassword;

  await user.save();

  sendToken(user, 200, res);
});

exports.updateBanner = catchAsyncErrors(async (req, res, next) => {
  const user = await decodeToken(req.body.token);
  if (req.body.banner !== "") {
    try {
      await cloudinary.v2.uploader.destroy(req.body.imageId);
    }
    catch {

    }

    await cloudinary.v2.uploader.destroy(imageId);

    const myCloud = await cloudinary.v2.uploader.upload(req.body.banner, {
      folder: "banners"
    });

    banner = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };


    user.banner = banner;
    user.save()
  }
  console.log(user.banner)


  console.log(user)
  res.status(200).json({
    success: true,
    user
  });
});
exports.updateAvatar = catchAsyncErrors(async (req, res, next) => {
  const user = await decodeToken(req.body.token);
  if (req.body.avatar != "") {

    try {
      await cloudinary.v2.uploader.destroy(req.body.imageId);
    }
    catch {

    }
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
      folder: "avatar",
      width: 150,
      crop: "scale",
    });

    avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };

    console.log(user)

    user.avatar = avatar;
    user.save()
  }



  res.status(200).json({
    success: true,
    user
  });
});

exports.follow = catchAsyncErrors(async (req, res, next) => {
  const fid = req.body.userid;
  const user = await decodeToken(req.body.token);
  const follow = User.findById(fid);

  if (!follow) {
    res.status(400).json({
      status: "fail"
    })
  }

  if (!user) {
    res.status(400).json({
      status: "fail"
    })
  }

  await User.findByIdAndUpdate(fid, {
    $addToSet: { followers: user._id }
  });

  await User.findByIdAndUpdate(user._id, {
    $addToSet: { follow: fid }
  });
  res.status(200).json({
    status: "success"
  })
})
exports.findUser = catchAsyncErrors(async (req, res, next) => {
  const user = await new Searchuser(User.find(), req.query).search()
  const users = await user.query;
  res.status(200).json({
    "success": true,
    users
  })
})

exports.setAbout = catchAsyncErrors(async (req, res, next) => {
  const user = await decodeToken(req.body.token);
  const about = req.body.about;
  user.about = about;
  await user.save();

  res.status(200).json({
    user
  })
})
exports.setExperience = catchAsyncErrors(async (req, res, next) => {
  const user = await decodeToken(req.body.token);

  const about = req.body.about;
  user.Experience = about;
  await user.save();

  res.status(200).json({
    user
  })
})
exports.setEducation = catchAsyncErrors(async (req, res, next) => {
  const user = await decodeToken(req.body.token);

  const about = req.body.about;
  user.Education = about;
  await user.save();

  res.status(200).json({
    user
  })
})

exports.setSkill = catchAsyncErrors(async (req, res, next) => {
  const user = await decodeToken(req.body.token);
  const skills = req.body.skill;
  const useri = await user.updateOne({
    $addToSet: { skills: skills }
  })
  res.status(200).json({
    useri
  })
})
exports.checkToken = catchAsyncErrors(async (req, res, next) => {
  const id = await decodeToken(req.body.token);
  const user = await User.findById(id);
  if (user == null) {
    res.status(200).json({
      "success": false
    })
  }
  res.status(200).json({
    "success": true,
    user
  })
})

exports.me = catchAsyncErrors(async (req, res, next) => {
  const token = req.body.token;
  const user = await decodeToken(token);
  res.status(200).json({
    user
  })
})

exports.Myposts = catchAsyncErrors(async (req, res, next) => {
  const user = await decodeToken(req.body.token);
  const posts = await post.find({ user_id: user })

  res.status(200).json({
    posts
  })
})
exports.userFeed = catchAsyncErrors(async (req, res, next) => {
  const id = await decodeToken(req.body.token);
  const user = await User.findById(id);
  let Post = [];
  var useri = [];
  var Number = 0;
  user.followers.map((e) => {
    Post = post.find({ user_id: e })
    Number++;
    if (Number == 10) {
      next();
    }
  })
  user.link.map((e) => {
    Post = post.find({ user_id: e })
    Number++;
    if (Number == 10) {
      next();
    }
  })
  const Posta = await post.find().populate("user_id", "name position avatar");
  let d = [];
  await Posta.map(async (e) => {
    d.push(await User.findById(e.user_id));
    return d;
  })
  await res.status(200).json({
    Posta
  })
})


exports.link = catchAsyncErrors(async (req, res, next) => {
  const id = await decodeToken(req.body.token);
  const linkerid = req.body.lid;
  await id.link.map((e) => {
    if (e.id == linkerid) {
      res.status(400).json({
        "message": "user allready exist"
      });
    }
  })
  const user = await User.findByIdAndUpdate(id._id, {
    $push: {
      link: { id: linkerid, status: "Pending" },
      Notification: { id: id._id, Message: `${id.name} requested you for link`, Head: `${id.name}`, M: "R" }
    }
  })
  const luser = await User.findByIdAndUpdate(linkerid, {
    $push: { link: { id: id._id, status: "Pending" } }
  })

  res.status(200).json({
    user, luser
  })
})
exports.Acceptlink = catchAsyncErrors(async (req, res, next) => {
  const id = await decodeToken(req.body.token);
  const lid = await User.findById(req.body.lid)
  const uid = id._id;
  const usid = id.link.map((e) => {
    if (e.id == req.body.lid) {
      e.status = "Accepted"
      id.save()
      return e;
    }
  })
  const lsid = lid.link.map((e) => {
    if (e.id === uid) {
      e.status = "Accepted"
      id.save()
      return e;
    }
  })

  res.status(200).json({
    usid, lsid
  })
})
exports.profile = catchAsyncErrors(async (req, res, next) => {
  const id = await decodeToken(req.body.token);
  const user = await User.findById(id)
  user.link.map((e) => {
    if (id == req.body.sid) {
      e.status = true;
    }
  })
  res.status(200).json({
    user
  })
})
exports.postsg = catchAsyncErrors(async (req, res, next) => {
  console.log(req.body.id)
  const posts = await post.find({ user_id: req.body.id })
  console.log(posts)
  res.status(200).json({
    posts
  })
})