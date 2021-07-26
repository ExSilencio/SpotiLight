const cookieSession = require('cookie-session')
const cookieParser = require("cookie-parser")
const express = require('express')

const port = process.env.PORT || 5000

const cors = require('cors')
const path = require('path')

// Environment
require('./database');
require('dotenv').config()


const passport = require('passport')

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000", // allow to server to accept request from different origin
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true // allow session cookie from browser to pass through
  })
)


app.use(cookieSession({
  maxAge: 24* 60 * 60 * 1000,
  secret: process.env.cookieKey
}))

app.use(cookieParser());

app.use(express.json())

// Initialise Passport service
app.use(passport.initialize())
app.use(passport.session())


// APIs
const authRoutes = require('./routes/auth')
app.use('/auth', authRoutes)

const authCheck = (req, res, next) => {
  if (!req.user) {
    res.status(401).json({
      authenticated: false,
      message: "user has not been authenticated"
    });
  } else {
    next();
  }
};

app.get("/", authCheck, (req, res) => {
  res.status(200).json({
    authenticated: true,
    message: "user successfully authenticated",
    user: req.user,
    cookies: req.cookies
  });
});



// express.static delivers static files which are the ones 
// built when npm run build is run on a React project

/*
app.use(express.static(path.join(__dirname, '../client/src')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/src/index.js'))
})*/



app.get('/', (req, res) => {
  console.log("Reached HOME page")
  res.send({ user: req.user });
});

app.get('/test', (req, res) => {
  console.log("Reached TEST page")
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
 
