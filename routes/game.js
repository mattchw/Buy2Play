var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash    = require('connect-flash');
var thegamesdb = require('thegamesdb');
var app = express();

var searchGame;
//const qs = require('querystring');

thegamesdb.getGamesList({ name: 'marvel' }).then(function(games){
    gamelist = games;    
}).catch(err => console.error(error));


router.get('/',function(req, res, next) {  
    console.log(req.query.gamename);
    searchGame = req.query.gamename;
    console.log(searchGame);
    console.log("---------------------------------");
    res.render('game', { title: 'Welcome to Buy2Play', gamelist, isLoggedIn: req.isAuthenticated()});
});

module.exports = router;