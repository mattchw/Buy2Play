const api = require('thegamesdb');  


var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash    = require('connect-flash');
var thegamesdb = require('thegamesdb');

var name="123";

thegamesdb.getGame({ id: 1 }).then(function(games){
        console.log(games.title);
        name=games.title;
    
    }).catch(err => console.error(error));

router.get('/',function(req, res, next) {
    
    res.render('game', { title: 'Welcome to Buy2Play', name , isLoggedIn: req.isAuthenticated()});
});

router.post('/',function(req, res, next) {
    console.log(req.post.gamename);
    res.render('game', { title: 'Game', name});
});


module.exports = router;