require('dotenv').config()
const express=require('express');
const port = process.env.PORT || 5000;

//const port=5000;
const {db_url,jwt_key}=require("./keys");
const app=express();
const mongoose=require('mongoose');
const auth=require('./routes/auth');
const post=require('./routes/post');
const user=require('./routes/user');
const google_auth=require('./routes/google-auth');
const path=require('path');

const cors = require('cors');
///to avoid problem of cors which is due to diff domain of fronend and backend
app.use(cors());
/****************************** */
mongoose.connection.on("connected",()=>{
    console.log("successfully connected to mongodb");
})
mongoose.connection.on("error",()=>{
    
    console.log("error in connection to mongodb");
})
mongoose.connect(db_url);
/********************** */

//so that incoming data to auth first convreted to json format
app.use(express.json());

app.use('/auth',auth);
app.use('/post',post);
app.use('/user',user);
app.use('/authentication',google_auth);

///serving the frontend
app.use(express.static(path.join(__dirname,"./ff-frontend/build")))

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,"./ff-frontend/build/index.html"),
    function(err){
res.status(500).send(err);
    })
})


app.listen(port,()=>{
console.log("server is running at port ",port);
})

//297242735982-g4i86d8e0huimo2skn90o8v4ubstmb8v.apps.googleusercontent.com
//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

