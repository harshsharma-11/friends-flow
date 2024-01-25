const monogoose=require('mongoose');
const express=require('express');
const router=express.Router();
const Post=require('../models/post');
const User=require('../models/usermodel');
const loginRequired = require('../middlewares/loginrequired');

router.get('/suggestion', loginRequired, (req, res) => {
    
    console.log("helllo from suggestion");
    User.find({ followers: { $nin: [req.user._id] } })
        .then(result => {
            console.log("jdhbi");
            res.json(result);
        })
        .catch(err => {
            console.error("kese pahuncha be");
            res.status(422).json({ error: 'Error fetching suggestions', details: err.message });
        });
});

router.get('/:userId',(req,res)=>{

    
    User.findOne({_id:req.params.userId})
    .then(user=>{
Post.find({postedBy:req.params.userId})
.populate('postedBy','_id')
.exec()
.then(post=>{
    console.log(post);
    res.json({user,post});
})
.catch(err=>{
    console.log('error in loading user posts');
    res.status(404).json({error:"error in loading user posts"})
})
    })
    .catch(err=>{
        console.log('error in loading user.. ');
        res.status(404).json({error:"error in loading user.... "});
})
})


router.put('/follow',loginRequired,(req,res)=>{
    User.findByIdAndUpdate(req.body.followId,{
        $push:{followers:req.user._id}
    },{
        new:true,
    }).then(result=>{
User.findByIdAndUpdate(req.user._id,{
    $push:{following:req.body.followId}
},{
    new:true,
})
.then(result=>{
    res.json(result);
})
.catch(err=>res.status(422).json({error:err}));
    })
    .catch(err=>res.status(422).json({error:err}));
})



router.put('/unfollow',loginRequired,(req,res)=>{
    User.findByIdAndUpdate(req.body.unfollowId,{
        $pull:{followers:req.user._id}
    },{
        new:true,
    }).then(result=>{
User.findByIdAndUpdate(req.user._id,{
    $pull:{following:req.body.unfollowId}
},{
    new:true,
})
.then(result=>{
    res.json(result);
})
.catch(err=>res.status(422).json({error:err}));
    })
    .catch(err=>res.status(422).json({error:err}));
})

router.put('/profile-pic',loginRequired,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{
    $set:{profile_pic:req.body.profile_pic}
    },{
        new:true
    }).exec()
    .then(result=>{
        res.json({message:'profile pic updated',details:req.body.profile_pic});
    }).catch(err=>{
        res.status(422).json({error:err});
        console.log(err);
    })
})

router.put('/remove-profile-pic',loginRequired,(req,res)=>{
    User.findByIdAndUpdate(req.user._id,{
    $set:{profile_pic:"http://res.cloudinary.com/harshcloud11/image/upload/v1704894890/s5tetcek6tibbrm4jkbz.png"}
    },{
        new:true
    }).exec()
    .then(result=>{
        res.json({message:'profile pic updated',details:"http://res.cloudinary.com/harshcloud11/image/upload/v1704894890/s5tetcek6tibbrm4jkbz.png"});
    }).catch(err=>{
        res.status(422).json({error:err});
        console.log(err);
    })
})



module.exports=router;