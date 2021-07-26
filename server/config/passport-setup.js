const passport = require('passport')
const SpotifyStrategy = require('passport-spotify').Strategy
//const JwtStrategy = require('passport-jwt').Strategy;
const User = require('../models/user')

// Environment variables
require("dotenv").config()

const port = process.env.PORT || 5000


passport.serializeUser((user, done) => {
  done(null, user.id)
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user)
    })
    .catch(e => {
      done(new Error("Failed to deserialize a user"))
    })
});

passport.use(
  new SpotifyStrategy(
    {
    clientID: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    callbackURL: process.env.PROXY + port + process.env.authCallbackPath,
    },
    async (accessToken, refreshToken, expires_in, profile, done) => {
      // console.log("passport success")
      console.log("Access token: " + accessToken + ", Refresh token: " + refreshToken + ", Expires in: " + expires_in)

      const currentUser = await User.findOne({
        profileId: profile.id
      })
      // Check if the user already exists in db
      if(!currentUser){
        const newUser = await new User({
          profileName: profile.displayName,
          profileId: profile.id
        }).save()
        if (newUser) {
          // Else, create new user in db
          console.log('New user created:' + newUser)
          done(null, newUser)
        }
      }
      done(null, currentUser)
            
        // To keep the example simple, the user's spotify profile is returned to
        // represent the logged-in user. In a typical application, you would want
        // to associate the spotify account with a user record in your database,
        // and return that user instead.
        //return done(null, accessToken)
    }
  )
)

/*
passport.use(
  new JwtStrategy(
    {
        jwtFromRequest: (req) => req.session.jwt,
        secretOrKey: process.env.JWTKey,
    },
    (payload, done) => {
        // TODO: add additional jwt token verification
        return done(null, payload);
    }
  )
)
*/

module.exports = passport