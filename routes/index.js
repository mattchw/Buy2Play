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
    var db = req.con;
    var ps4game = "";
    
    db.query('SELECT * FROM transaction WHERE platform = ? ORDER BY date DESC; SELECT * FROM transaction WHERE platform = ? ORDER BY likes DESC;SELECT * FROM transaction WHERE platform = ? ORDER BY date DESC; SELECT * FROM transaction WHERE platform = ? ORDER BY likes DESC; SELECT * FROM transaction WHERE platform = ? ORDER BY date DESC; SELECT * FROM transaction WHERE platform = ? ORDER BY likes DESC',["Sony Playstation 4","Sony Playstation 4","Microsoft Xbox","Microsoft Xbox","Nintendo Switch","Nintendo Switch"], function(err, results) {
        if (err) {
            console.log(err);
        }
        
        var ps4New = results[0];
        var ps4Likes = results[1];
        var xboxNew = results[2];
        var xboxLikes = results[3];
        var switchNew = results[4];
        var switchLikes = results[5];
        
        res.render('index', { title: 'Welcome to Buy2Play', ps4New: ps4New, ps4Likes: ps4Likes, xboxNew: xboxNew, xboxLikes: xboxLikes, switchNew: switchNew, switchLikes: switchLikes, user:req.user, isLoggedIn: req.isAuthenticated()});
        
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
