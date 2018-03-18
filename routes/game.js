var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash    = require('connect-flash');
var thegamesdb = require('thegamesdb');
var gamelist = [];

router.get('/',function(req, res, next) {  
    console.log(req.query.gamename);
    
    thegamesdb.getGamesList({ name: req.query.gamename }).then(function(games){
        gamelist = games;
        res.render('game', { title: 'Welcome to Buy2Play', gamelist, isLoggedIn: req.isAuthenticated()});
    }).catch(err => console.error(error));
    
    //search(req.query.gamename);
    //res.render('game', { title: 'Welcome to Buy2Play', gamelist, isLoggedIn: req.isAuthenticated()});
    
});

module.exports = router;