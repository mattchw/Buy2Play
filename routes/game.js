const api = require('thegamesdb');  


var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash    = require('connect-flash');
var thegamesdb = require('thegamesdb');

router.get('/',function(req, res, next) {
    var game;
    var str="";
    thegamesdb.getGame({ id: 1 }).then(function(games){
        game=games;
        console.log(game.title);
        str=game.title;
        str="dsvdsvsdsdvssd";
    
    }).catch(err => console.error(error));
    

    
    res.render('game', { title: 'Welcome to Buy2Play', test: str, isLoggedIn: req.isAuthenticated()});
});


module.exports = router;