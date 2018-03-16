var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash    = require('connect-flash');
var thegamesdb = require('thegamesdb');
var app = express();

<<<<<<< HEAD
//const qs = require('querystring');

app.get('/', function(req, res) {
    console.log(req.body.gamename);
    
});
=======
var name="display game name";

//thegamesdb.getGame({ id: 1 }).then(function(games){
//        console.log(games.title);
//        name=games.title;
//    
//    }).catch(err => console.error(error));
>>>>>>> 274b75ef2254db20498146259a7f71fdf1c714bf

thegamesdb.getGamesList({ name: 'marvel' }).then(function(games){
        console.log(games);
        gamelist = games;
    
<<<<<<< HEAD
    }).catch(err => console.error(error));

router.get('/',function(req, res, next) {  
    res.render('game', { title: 'Welcome to Buy2Play', gamelist, isLoggedIn: req.isAuthenticated()});
=======
    res.render('game', { title: 'Welcome to Buy2Play', name , user: req.user, isLoggedIn: req.isAuthenticated()});
});

router.post('/',function(req, res, next) {
    thegamesdb.getGame({ id: req.body.id }).then(function(games){
        console.log(games.title);
        name=games.title;
    
    }).catch(err => console.error(error));

    res.redirect('/game');
>>>>>>> 274b75ef2254db20498146259a7f71fdf1c714bf
});

module.exports = router;