var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash    = require('connect-flash');
var Strategy = require('passport-facebook').Strategy;

passport.use(new Strategy({
    clientID: '2033422926898580',
    clientSecret: '2c57d03a3a53eaa42a729ab8e6053eca',
    callbackURL: 'http://localhost:3000/login/facebook/return'
},
    function(accessToken, refreshToken, profile, cb) {
        return cb(null, profile);
    }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});



router.get('/',notLoggedIn, function(req, res) {
    res.render('login',{title: 'User Login',isLoggedIn: req.isAuthenticated(), message: req.flash('loginMessage')});
});


router.post('/', passport.authenticate('local-login', {
    successRedirect : '/', 
    failureRedirect : '/login', 
    failureFlash : true 
}), function(req, res) {
    console.log("hello");
    if (req.body.remember) {
        req.session.cookie.maxAge = 1000 * 60 * 3;
    } else {
        req.session.cookie.expires = false;
    }
		res.redirect('/');
});

function notLoggedIn(req, res, next) {
	if (!req.isAuthenticated())
		return next();
	res.redirect('/');
}

module.exports = router;
