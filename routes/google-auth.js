const express=require('express');
const router=express.Router();
const passport=require('passport');
const  session=require("express-session");
const User = require('../models/usermodel');
var GoogleStrategy = require('passport-google-oauth20').Strategy;
console.log('hey');
const jwt=require("jsonwebtoken");
const {jwt_secret}=require('../keys');

router.use(session({
secret:'keyboard cat',
resave:false,
saveUninitialized:true,
}))

router.use(passport.initialize());
router.use(passport.session());

passport.use(new GoogleStrategy({
    clientID: "120016440594-v8jh27b5c1a55u9atfgdnssv3uimcde1.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:5000/auth/google/callback",
    scope:["profile","email"]
  },

    async function(accessToken, refreshToken, profile, done) {
        // Use findOne to find a user with the given googleId
        console.log(profile._json.name);
        console.log(accessToken);
        const user=await User.findOne({email:profile.emails[0].value}) ;

          if (user) {
            return done(null, user);
          } else {
            const newUser = new User({
              email: profile.emails[0].value,
    username:profile._json.name,
     profile_pic:"http://res.cloudinary.com/harshcloud11/image/upload/v1704894890/s5tetcek6tibbrm4jkbz.png",
        });
    
  try {
    // Save user in the database
    await newUser.save();
    console.log("Success");
//const token=jwt.sign({_id:newUser.id},jwt_secret);

newUser.token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });
return done(null, newUser);
} catch (err) {
    console.log("Error in creating user", err);
    return done(err,null);
}

}
        
    }
));

// Serialize user into session
passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  // Deserialize user from session
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
})

//router.get('/',//passport.authenticate('google', { scope: ["https://www.googleapis.com/auth/plus.login"] }));

  router.get('/',
  passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/callback', 
  passport.authenticate('google', { failureRedirect: 'http://localhost:8070/login' ,
  successRedirect:"http://localhost:8070",
  function (req, res) {
    // Successful authentication, include the token in the response
    res.json({ token: req.user.token, user: req.user });
  }
}),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('http://localhost:8070');
//   });

//   function(req, res) {
//     // Successful authentication, send token in the response body
//     const token=jwt.sign({_id:req.user.id},jwt_secret);
//      // Replace with your token generation logic
//     return res.json({ token });
  //}

  );
  module.exports=router;