var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash    = require('connect-flash');

router.get('/', function(req, res) {
    res.render('login',{title: 'login page', message: req.flash('loginMessage')});
});


router.post('/', passport.authenticate('local-login', {
    successRedirect : '/profile', 
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

module.exports = router;
