var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash    = require('connect-flash');
var thegamesdb = require('thegamesdb');
var app = express();

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
    
    db.query("SELECT * FROM transaction WHERE platform = 'Sony Playstation 4' ORDER BY date DESC; SELECT * FROM transaction WHERE platform = 'Sony Playstation 4' ORDER BY search DESC; SELECT * FROM transaction WHERE platform = 'Sony Playstation 4' ORDER BY likes DESC; SELECT * FROM transaction WHERE platform = 'Microsoft Xbox' ORDER BY date DESC; SELECT * FROM transaction WHERE platform = 'Microsoft Xbox' ORDER BY search DESC; SELECT * FROM transaction WHERE platform = 'Microsoft Xbox' ORDER BY likes DESC; SELECT * FROM transaction WHERE platform = 'Nintendo Switch' ORDER BY date DESC; SELECT * FROM transaction WHERE platform = 'Nintendo Switch' ORDER BY search DESC; SELECT * FROM transaction WHERE platform = 'Nintendo Switch' ORDER BY likes DESC; SELECT * FROM transaction ORDER BY date DESC", function(err, results) {
        if (err) {
            console.log(err);
        }
        
        var ps4New = results[0];
        var ps4Search = results[1];
        var ps4Likes = results[2];
        var xboxNew = results[3];
        var xboxSearch = results[4];
        var xboxLikes = results[5];
        var switchNew = results[6];
        var switchSearch = results[7]
        var switchLikes = results[8];
        var recently = results[9];
        
        res.render('index', { title: 'Welcome to Buy2Play', ps4New: ps4New, ps4Search: ps4Search, ps4Likes: ps4Likes, xboxNew: xboxNew, xboxSearch: xboxSearch, xboxLikes: xboxLikes, switchNew: switchNew, switchSearch: switchSearch, switchLikes: switchLikes, recently: recently, user:req.user, isLoggedIn: req.isAuthenticated()});
        
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
