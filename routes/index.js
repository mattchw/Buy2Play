var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash    = require('connect-flash');

/* GET home page. */
// home page
router.get('/',function(req, res, next) {
    res.render('index', { title: 'Welcome to Buy2Play', isLoggedIn: req.isAuthenticated(), user: req.user});
});

router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

module.exports = router;
