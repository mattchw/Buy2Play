var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash    = require('connect-flash');
var thegamesdb = require('thegamesdb');
var app = express();

//const qs = require('querystring');

function search(gamename) {
    //console.log("I am testing");
    thegamesdb.getGamesList({ name: gamename }).then(function(games){
        //console.log(games);
        gamelist = games;
    }).catch(err => console.error(error));
}


router.get('/',function(req, res, next) {  
    console.log(req.query.gamename);
    search(req.query.gamename);
    res.render('game', { title: 'Welcome to Buy2Play', gamelist, isLoggedIn: req.isAuthenticated()});
});

module.exports = router;