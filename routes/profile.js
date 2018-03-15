var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash    = require('connect-flash');

router.get('/', isLoggedIn, function(req, res) {
    res.render('profile', {title: 'your profile',
        user : req.user 
    });
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

module.exports = router;