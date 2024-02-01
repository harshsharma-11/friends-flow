const express=require('express');
const router=express.Router();
const User=require('../models/usermodel');
const UserOtp=require('../models/userotpschema');
const bcrypt=require('bcrypt');
const nodemailer=require('nodemailer');
const jwt=require("jsonwebtoken");
const {jwt_secret}=require('../keys');
const loginRequired = require('../middlewares/loginrequired'); 
const {userr,pass}=require("../keys");

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: userr,
      pass: pass
    }
  });





//email enter kro and otp send ho jaega for signup purpose
router.post('/signup/email',async(req,res)=>{
   
    try{ const {email}=req.body;
     if(!email){
         return res.status(422).json({message:"Please fill your email"});
     }
 const user= await User.findOne({email:email});
 if(user){
     return res.status(404).json({error:"User with this email already existed"});
 }
 
 const otp=Math.floor((Math.random() * 1000000) + 1);
 
 //otp bhejna email pe
 
 const userOtp= await UserOtp.findOne({email:email});
 if(!userOtp){
     const newUser = new UserOtp({
         email:email,
         otp:otp,
     });
     await newUser.save();
 }
 else{
    const updatedUser= await UserOtp.findByIdAndUpdate(userOtp,{
 otp:otp,
     },{
         new:true
     })
     await updatedUser.save();
 }
 
 var mailOptions = {
     from: userr,
     to: email,
     subject: 'Sending Email For Otp validation',
     text: `OTP- ${otp}`
   };
 
   transporter.sendMail(mailOptions, function(error, info){
     if (error) {
       console.log(error);
       
       return res.status(404).json({msg:"Email not send"});
     } else {
       console.log('Email sent: ' + info.response);
       
       return res.status(200).json({msg:"OTP send to your email"});
     }
   });
   
    }
    catch(error){
         
       console.log(error);
       
      return  res.status(404).json({msg:"Email not send"});
    }
 
 
 })
 
 

 
//otp enter kiya for sugnup pusrpose
router.post('/signup/otp-send',(req,res)=>{
 
    const {otp,email}=req.body;
   //check do otp matches or not
 UserOtp.findOne({email:email}).then((userotp)=>{
    
   console.log(userotp.otp,otp);
if(userotp.otp==otp){
    
    res.json({msg:"Otp validated successfully"});
}
else{
    
    res.json({err:"Please enter correct otp"});
}
 })
 .catch(err=>{
    res.status(404).json({msg:"Something went wrong"});
 })

})

 





router.post('/signup',async(req,res)=>{
    const {username,email,password}=req.body;
    if(!username || !email || !password){
        //422 is source code that there are some problemsserver ye chiz samajh ni ayi
        return res.status(422).json({message:"please fill all the fields"});
    }

const user=await User.findOne({username:req.body.username});
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
    
    console.log("helllo from signin");
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




//email enter kro and otp send ho jaega
router.post('/forgot-pass/email-send',async(req,res)=>{
   
   try{ const {email}=req.body;
    if(!email){
        return res.status(422).json({message:"Please fill your email"});
    }
const user= await User.findOne({email:email});
if(!user){
    return res.status(404).json({error:"User not found with this email"});
}

const otp=Math.floor((Math.random() * 1000000) + 1);

//otp bhejna email pe

const userOtp= await UserOtp.findOne({email:email});
if(!userOtp){
    const newUser = new UserOtp({
        email:email,
        otp:otp,
    });
    await newUser.save();
}
else{
   const updatedUser= await UserOtp.findByIdAndUpdate(userOtp,{
otp:otp,
    },{
        new:true
    })
    await updatedUser.save();
}

var mailOptions = {
    from: userr,
    to: email,
    subject: 'Sending Email For Otp validation',
    text: `OTP- ${otp}`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
      
      res.status(404).json({msg:"Email not send"});
    } else {
      console.log('Email sent: ' + info.response);
      
      res.status(200).json({msg:"OTP send to your email"});
    }
  });
  
  res.json({msg:"otp send to your email"});
   }
   catch(error){
        
      console.log(error);
      
      res.status(404).json({msg:"Email not send"});
   }


})



//otp enter kiya to validate kro sahi h ya galat
router.post('/forgot-pass/otp-send',(req,res)=>{
 
    const {otp,email}=req.body;
   //check do otp matches or not
 UserOtp.findOne({email:email}).then((userotp)=>{
    
   console.log(userotp.otp,otp);
if(userotp.otp==otp){
    
    res.json({msg:"Otp validated successfully"});
}
else{
    
    res.json({err:"Please enter correct otp"});
}
 })
 .catch(err=>{
    res.status(404).json({msg:"please enter otp"});
 })



})



//naya password create kiya
router.put('/forgot-pass/pass-send',async(req,res)=>{
const {email,newpass,confirmpass}=req.body;
if(newpass!=confirmpass){
    
    return res.status(422).json({err:"Password and confirm password does not matches"});
}


//to make the password strong not readable
bcrypt.hash(newpass, 12).then(hashedpass=>{
User.findOne({email:email}).then((user)=>{
    User.findByIdAndUpdate(user._id,{
    $set:{password:hashedpass}
    },{
        new:true
    }).exec()
    .then(result=>{
        res.json({message:'Your  password updated ...',details:result});
    }).catch(err=>{
        res.status(422).json({error:err});
        console.log(err);
    })
})


.catch(err=>{
    res.status(422).json({error:err});
    console.log(err);
})

})
.catch(err=>{
    
    res.status(422).json({error:err});
    console.log(err);
})
})

module.exports=router;