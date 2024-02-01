const mongoose=require('mongoose');

const {ObjectId}=mongoose.Schema;
const userOtpSchema= new mongoose.Schema({
    email:{
type:String,
required:true,
unique:true,
    }
    ,
    otp:{
        type:String,
        required:true,
    }

})

const userOtp=mongoose.model("UserOtp",userOtpSchema);
module.exports=userOtp;