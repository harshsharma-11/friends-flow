const express=require('express');
const router=express.Router();
const User=require('../models/usermodel');
const bcrypt=require('bcrypt');

const jwt=require("jsonwebtoken");
const {jwt_secret}=require('../keys');
router.post('/signup',async(req,res)=>{
    const {username,email,password}=req.body;
    console.log("helllo");
    if(!username || !email || !password){
        //422 is source code that there are some problemsserver ye chiz samajh ni ayi
        return res.status(422).json({message:"please fill all the fields"});
    }

    let user= await User.findOne({ email: req.body.email });

    if (user) {
        return res.status(422).json({ error: "User with this email already exists" });
    }
user=await User.findOne({username:req.body.username});
if(user){
    return res.status(422).json({error:" This username already taken"});
}


//to make the password strong not readable
const hashedPassword = await bcrypt.hash(password, 12);

// Create a new user with the hashed password
const newUser = new User({
    username,
    email,
    password: hashedPassword,
    profile_pic:"http://res.cloudinary.com/harshcloud11/image/upload/v1704894890/s5tetcek6tibbrm4jkbz.png",
});


    
    try {
        // Save user in the database
        await newUser.save();
        console.log("Success");
        const {_id,username,email,profile_pic}=newUser;
const token=jwt.sign({_id:newUser.id},jwt_secret);
console.log({token,user:{_id,username,email}});
        res.json({token,user:{_id,username,email,profile_pic}});
    } catch (err) {
        console.log("Error in creating user", err);
        res.status(500).json({ message: 'Error in creating user' });
    }



})



router.post('/signin',async(req,res)=>{
    const {email,password}=req.body;
    if(!email || !password){
        return res.status(422).json({message:"Please fill all fields"});
    }
let user= await User.findOne({email:email});
if(!user){
    return res.status(404).json({error:"User not found with this email"});
}

const match=await bcrypt.compare(password,user.password);
console.log(match);
if(!match){
    return res.status(404).json({error:"Password is Incorrect"});
}
const token=jwt.sign({_id:user.id},jwt_secret);

const {_id,username,profile_pic}=user;
console.log({token,user:{_id,username,email}});
        res.json({token,user:{_id,username,email,profile_pic}});

})
module.exports=router;