const mongoose=require('mongoose');

const {ObjectId}=mongoose.Schema;
const userSchema= new mongoose.Schema({
    username:{
        type:String,
        required:true,
    }
    ,
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        
    },
    profile_pic:{
        
    type:String,
    required:true,
    },

    followers:[
        {type:ObjectId,ref:"User"}
    ],
    following:[
        {type:ObjectId,ref:"User"}
    ]
})
const User=mongoose.model("User",userSchema);
module.exports=User;