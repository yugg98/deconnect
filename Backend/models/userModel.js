const mongoose = require("mongoose");
const {ObjectId} = mongoose.Schema.Types;
const validator = require("validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter Your Name"],
    maxLength: [30, "Name cannot exceed 30 characters"],
    minLength: [4, "Name should have more than 4 characters"],
  },
  totallikes:Number,
  totalFollow:Number,
  totalFollowers:Number,
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    unique: true,
    validate: [validator.isEmail, "Please Enter a valid Email"],
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater than 8 characters"],
    select: false,
  },
  dateofBirth:{
    type:String,
  },
  avatar: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "NotPremium",
  },
  banner: {
    public_id: {
      type: String,
      // required: true,
    },
    url: {
      type: String,
      // required: true,
    },
  },
  follow:{
    type:Array
  },
  followers:{
    type:Array
  },
  intrests:[
    {type:String}
  ],
  link:[
    {
      id:ObjectId,
      status:String 
    }
  ],
  position:{
     type:String
    }
  ,
  about:{
    type:String,
  },
  Education:
    {type:String}
  ,
  skills:[
    {type:String}
  ],
  Experience:{
    type:String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  Notification:[{
    id:ObjectId,
    Message:String,
    Head:String,
    M:String,
    name:String,
    url:String
  }],
  resetPasswordToken: String,
  resetPasswordExpire: Date,
})

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  this.password = await bcrypt.hash(this.password, 10);
});



// JWT TOKEN
userSchema.methods.getJWTToken = function () {
  return jwt.sign({ id: this._id }, 'uihfewiuhfriuhriuhiuhhfiufefehfei', {
    expiresIn: '30d',
  });
};

// Compare Password

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generating Password Reset Token
userSchema.methods.getResetPasswordToken = function () {
  // Generating Token
  const resetToken = crypto.randomBytes(20).toString("hex");

  // Hashing and adding resetPasswordToken to userSchema
  this.resetPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  this.resetPasswordExpire = Date.now() + 15 * 60 * 1000;

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);