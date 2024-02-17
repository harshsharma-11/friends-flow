
const { jwt_secret } = require("../keys");

const jwt=require("jsonwebtoken");
const User = require("../models/usermodel");

const loginRequired=async(req,res,next)=>{
    console.log("heyyyy");
const {authorization}=req.headers;
console.log(authorization);
if(!authorization){
    return res.status(401).json("You must have to loggedIn first");
}
const token=authorization.replace("Bearer ","");
jwt.verify(token,jwt_secret,async(err,payload)=>{
    const {_id}=payload;
    console.log(_id);
    const user=await User.findById(_id);
    console.log(user);
req.user=user;
next();
})
}

module.exports = loginRequired;
