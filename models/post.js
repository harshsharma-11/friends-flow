const mongoose=require('mongoose');
const {ObjectId}=mongoose.Schema;
const PostSchema=new mongoose.Schema({
photo:{
    type:String,
    required:true,
},
body:{
type:String,
required:true,
},
postedBy:{
    type:ObjectId,
    ref:"User"
},


//array of users 
likes:[{
    type:ObjectId,
    ref:"User"
}],

//array of coment and user that commented
comments:[{
    postedBy:{type:ObjectId,
    ref:'User'},
    comment:{
        type:String,

    }
}]


})


const Post=mongoose.model("Post",PostSchema);
module.exports=Post;