const express=require('express');
const router=express.Router();
const mongoose=require('mongoose');
const Post=require('../models/post')
const loginRequired=require('../middlewares/loginrequired');
router.post('/create-post',loginRequired,async(req,res)=>{
    console.log(req.body.body);
    const {pic,body}=req.body;
    if(!pic || !body){
        return res.status(422).json({error:"Please fill all fields"});
    }
    console.log(req.user);
    const post=new Post({
        photo:pic,body,
        postedBy:req.user,
        likes:[],
        
    })
    post.save();
    return res.status(200).json({message:"successfully created "});


})


router.delete('/delete-mypost/:postId',loginRequired,(req,res)=>{


    Post.findOneAndDelete({ _id: req.params.postId, postedBy: req.user._id })
        .exec()
        .then((post) => {
            console.log(post);
            if (!post) {
                return res.status(400).json({ error: 'Post not found or unauthorized to delete' });
            } else {
             return    res.json({ message: 'Post Deleted Successfully' });
            }
        })
        .catch((err) => {
            console.error('Error deleting post:', err);
           return  res.status(400).json({ error: 'Error in deleting post', details: err.message });
        });
})


router.get('/get-posts',loginRequired,async(req,res)=>{
const post=await Post.find()
.populate('postedBy',"_id username profile_pic")
.populate("comments.postedBy","_id username")
try{
return res.status(200).json(post);
}
catch(err){
    console.log(err);
    return res.status(404).json(err);
}

})


router.get('/get-myposts',loginRequired,async(req,res)=>{
    //loginrequired updated req and now req ha s user data 
    const user=req.user;
    const my_posts=await Post.find({postedBy:user._id});
    try{
        console.log(my_posts);
    return res.status(200).json(my_posts);
    }
    catch(err){
        console.log(err);
        return res.send(404).json(err);
    }
})
//to update the likes
//put is method here because evrything is there already we just has to update the data
router.put('/like-post',loginRequired,(req,res)=>{
Post.findByIdAndUpdate(req.body.postId,{
    //user.-id we get from loginrequired
    $push:{likes:req.user._id}
},{
    new:true
})
.populate('postedBy',"_id username profile_pic")
.populate("comments.postedBy","_id username")
.exec()
.then((result)=>{
    res.json(result);
})
.catch((err)=>{
    
    console.log(err);
    res.status(422).json({error:err});
})
})
router.put('/unlike-post',loginRequired,(req,res)=>{
    Post.findByIdAndUpdate(req.body.postId,{
        //user.-id we get from loginrequired
        $pull:{likes:req.user._id}
    },{
        new:true
    })
    .populate('postedBy',"_id username profile_pic")
    .populate("comments.postedBy","_id username")
    .exec()
    .then((result)=>{
        res.json(result);
    })
    .catch((err)=>{
        
        console.log(err);
        res.status(422).json({error:err});
    })
    })



    router.put('/create-comment',loginRequired,(req,res)=>{
        
        const comment={
            comment:req.body.text,
            postedBy:req.user._id,
        }
    Post.findByIdAndUpdate(req.body.postId,{
        //comments arraty me comment ko push krdia
$push:{comments:comment}
    },{
        new:true,
        //to populate postedBy object of comments with _id and username
    })
    .populate('postedBy',"_id username profile_pic")
    .populate("comments.postedBy","_id username")
    .exec()
    .then(result=>res.json(result))
    .catch(err=>{res.status(422).json({error:err});
console.log(err);})

    })

module.exports=router;