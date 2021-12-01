const jwt = require('jsonwebtoken');
const User = require("../models/userModel");

const decodeToken = (token) =>{
    try{
    const decodedData = jwt.verify(token, 'uihfewiuhfriuhriuhiuhhfiufefehfei');
    const user =  User.findById(decodedData.id);
    return user
    }
    catch{
        return "user not found"; 
    }
}

module.exports =  decodeToken