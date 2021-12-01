const jwt = require('jsonwebtoken')
const User = require("../models/userModel");

checktoken = (token) =>{
    const decodedData = jwt.verify(token, 'uihfewiuhfriuhriuhiuhhfiufefehfei');
    const user = User.findById(decodedData.id);

    if (user==null) {
       return false;
    }
    return "6175238ace6a63d77ab9dc6a";
}
module.exports = checktoken