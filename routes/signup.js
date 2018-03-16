var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash    = require('connect-flash');

router.get('/',notLoggedIn, function(req, res) {
		res.render('signup', { title: 'signup page',isLoggedIn: req.isAuthenticated(),message: req.flash('signupMessage') });
});

router.post('/', passport.authenticate('local-signup', {
		successRedirect : '/', 
		failureRedirect : '/signup', 
		failureFlash : true
}));

function notLoggedIn(req, res, next) {
	if (!req.isAuthenticated())
		return next();
	res.redirect('/');
}
    
module.exports = router;