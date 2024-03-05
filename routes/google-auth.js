const express = require('express');
const router = express.Router();
const passport = require('passport');
const session = require("express-session");
const User = require('../models/usermodel');
const cors = require('cors');
const { google_client_Secret, google_client_ID, jwt_secret } = require("../keys");
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require("jsonwebtoken");

let user;
router.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}));

router.use(cors({
  origin: 'http://friends-flow.onrender.com',
  methods: 'GET,POST,DELETE,PUT',
  credentials: true,
}));

router.use(passport.initialize());
router.use(passport.session());

passport.use(new GoogleStrategy({
  clientID: google_client_ID,
  clientSecret: google_client_Secret,
  callbackURL: "http://friends-flow.onrender.com/authentication/auth/google/callback",
  
  scope: ["profile", "email"]
},

  async function (accessToken, refreshToken, profile, done) {
    try {
      // Find user by email
       user = await User.findOne({ email: profile.emails[0].value });
       console.log('user already existed',user);

      if (!user) {
        // Create a new user if not found
        user = new User({
          email: profile.emails[0].value,
          username: profile._json.name,
          profile_pic: "http://res.cloudinary.com/harshcloud11/image/upload/v1704894890/s5tetcek6tibbrm4jkbz.png",
        });
        await user.save();
        console.log('user not already existed',user);
      }

      // Generate JWT token
       token=jwt.sign({_id:user.id},jwt_secret)
      console.log(token);
      return done(null, { user, token });
    } catch (error) {
      return done(error);
    }
  }
));

// Serialize user into session
passport.serializeUser(function (user, done) {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser(function (id, done) {
  User.findById(id, function (err, user) {
    done(err, user);
  });
});

router.get('/auth/google',
  passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email'],
    accessType: 'offline',
    approvalPrompt: 'force'
  })
);

router.get('/auth/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/login',
    session: false
  }),
  (req, res) => {
    const payload = {
      id: req.user.id
    };

    // TODO find another way to send the token to frontend
   
   
    
    
    const userJson = JSON.stringify(user);
    const userParam = encodeURIComponent(userJson);
    console.log(userJson,req.user,user,userParam);

    // Redirect with token and user parameters
    res.redirect(`/auth/success?token=${req.user.token}&user=${userJson}`);
  }
);

module.exports = router;



