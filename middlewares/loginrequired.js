
const { jwt_secret } = require("../keys");

const jwt=require("jsonwebtoken");
const User = require("../models/usermodel");

const loginRequired=async(req,res,next)=>{
    console.log("heyyyy");
const {authorization}=req.headers;
if(!authorization){
    return res.status(401).json("You must have to loggedIn first");
}
const token=authorization.replace("Bearer ","");
jwt.verify(token,jwt_secret,async(err,payload)=>{
    const {_id}=payload;
    const user=await User.findById(_id);
req.user=user;
next();
})
}

module.exports = loginRequired;