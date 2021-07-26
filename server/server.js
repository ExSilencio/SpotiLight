const express = require('express')
const cors = require('cors')
const path = require('path')
const cookieSession = require('cookie-session')

const passport = require('passport')
const passportSetup = require('./config/passport-setup');


// Environment
require('dotenv').config()
require('./database');

const app = express();
app.use(cors())

app.use(cookieSession({
  maxAge: 24* 60 * 60 * 1000,
  secret: process.env.cookieKey
}))


app.use(express.json())

// Initialise Passport service
app.use(passport.initialize())
app.use(passport.session())


// APIs
const authRoutes = require('./routes/auth-routes')
app.use('/auth', authRoutes)


const port = process.env.PORT || 5000

// express.static delivers static files which are the ones 
// built when npm run build is run on a React project
/*
app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})
*/


app.get('/', (req, res) => {
  res.send({ user: req.user });
});

// Initiate port listening, and send confirmation message to server
app.listen(port, () => {
  console.log('App is listening on port ' + port);
})

// Old method
/**
app.post('/login', (req, res) => {
  const code = req.body.code
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.PROXY + port + process.env.authCallbackPath,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  })

  spotifyApi
    .authorizationCodeGrant(code)
    .then(data => {
      console.log(data)
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in
      })
    })
  .catch(err => {
    console.log(err)
    res.sendStatus(400)
  })
})

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken
  const spotifyApi = new SpotifyWebApi({
    redirectUri: process.env.PROXY + port + process.env.authCallbackPath,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken
})
  spotifyApi
    .refreshAccessToken()
    .then(data => {
      console.log(data)
      res.json({
        accessToken: data.body.accessToken,
        expiresIn: data.body.expiresIn,
      })
    })
    .catch(err => {
      console.log(err)
      res.sendStatus(400)
    })
})

*/

// get driver connection
 
