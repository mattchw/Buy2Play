var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash    = require('connect-flash');
var thegamesdb = require('thegamesdb');
var app = express();

var searchGame;
//const qs = require('querystring');

thegamesdb.getPlatformGames({ id: 4971 }).then(function(games){
    console.log(games);
    gamelist = games;
}).catch(err => console.error(error));


router.get('/',function(req, res, next) {  
    
    res.render('game', { title: 'Welcome to Buy2Play', gamelist, isLoggedIn: req.isAuthenticated()});
});

module.exports = router;