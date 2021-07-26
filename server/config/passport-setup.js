const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy
const User = require('../models/user')

// Environment variables
require("dotenv").config()

const port = process.env.PORT || 5000


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then((user) => {
    done(null, user);
  })
});

passport.use(
  new SpotifyStrategy(
    {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.PROXY + port + process.env.authCallbackPath,
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
      // console.log("passport success")
      console.log("Access token: " + accessToken + ", Refresh token: " + refreshToken + ", Expires in: " + expires_in)

      // Check if the user already exists in db
      User.findOne({profileId: profile.id}).then((currentUser) => {
        if(currentUser){
          // User already exists
          console.log('User is: ' + currentUser)
          done(null, currentUser)
        } else {
          // Else, create new user in db
          new User({
            profileName: profile.displayName,
            profileId: profile.id
          }).save().then((newUser) => {
            console.log('New user created:' + newUser)
            done(null, newUser)
          })
        }
      })
        
      
        // To keep the example simple, the user's spotify profile is returned to
        // represent the logged-in user. In a typical application, you would want
        // to associate the spotify account with a user record in your database,
        // and return that user instead.
        //return done(null, accessToken)
    }
  )
)