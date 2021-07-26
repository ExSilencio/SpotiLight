const router = require('express').Router();
const passport = require('passport')
require('dotenv').config()

/* const jwt = require('jsonwebtoken');

 //const jwtRequired = passport.authenticate('jwt', { session: false });
 
router.get(
	'/private-route', 
	jwtRequired, (req, res) => {
    	res.send('This is a private route');
	}
)
*/

router.get(
	'/login',
	passport.authenticate('spotify', {
		scope: ['streaming', 'user-read-email', 'user-read-private', 'user-library-read', 'user-library-modify', 'user-read-playback-state', 'user-modify-playback-state'],
		showDialog: true,
	})
)


router.get(
	'/callback', 
		passport.authenticate('spotify', {
			successRedirect: process.env.CLIENT_HOME_PAGE_URL,
			failureRedirect: "/auth/login/failed"
		} )
)


router.get('/current-session', (req, res) => {
    passport.authenticate('jwt', { session: false }, (err, user) => {
        if (err || !user) {
            res.send(false);
        } else {
            res.send(user);
        }
    })(req, res);
});



router.get(
	'/logout', 
	(req, res) => {
		console.log('Redirecting to Spotify Authentication Service...')
		req.logout()
		res.redirect(process.env.CLIENT_HOME_PAGE_URL);
  }
)





// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed. Otherwise, the user will be redirected to the
//   login page.
function authCheck(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect('/login');
}

module.exports = router;