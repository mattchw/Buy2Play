var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash    = require('connect-flash');
var thegamesdb = require('thegamesdb');
var app = express();

// call thegamesdb api - get PS4

thegamesdb.getPlatformGames({ id: 4919 }).then(function(games){
    ps4gamelist = games;
}).catch(err => console.error(error));

thegamesdb.getPlatformGames({ id: 4971 }).then(function(games){
    switchgamelist = games;
}).catch(err => console.error(error));

/* GET home page. */
// home page
router.get('/',function(req, res, next) {
    res.render('index', { 
        title: 'Welcome to Buy2Play',
        isLoggedIn: req.isAuthenticated(),
        ps4gamelist,
        switchgamelist,
        user: req.user
    });
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
