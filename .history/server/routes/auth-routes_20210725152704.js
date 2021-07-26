const router = require('express').Router();
const passport = require('passport')
require('dotenv').config()



router.get(
	'/login', 
	passport.authenticate('spotify', {
		scope: ['streaming', 'user-read-email', 'user-read-private', 'user-library-read', 'user-library-modify', 'user-read-playback-state', 'user-modify-playback-state'],
		showDialog: true,
	})
)

router.get(
	'/logout', 
	(req, res) => {
		res.send('Redirecting to Spotify Authentication Service...')
		req.logout()
		res.redirect('../')
  }
)


router.get(
  '/callback',
  passport.authenticate('spotify', {failureRedirect: '/login'}),
  (req, res) => {
		//req.user
	  //res.send('You have reached the callback URI')
		res.send(req.user)
    //res.redirect('../')
  }
)


// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed. Otherwise, the user will be redirected to the
//   login page.
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;