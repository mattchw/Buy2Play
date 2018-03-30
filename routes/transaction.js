var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash    = require('connect-flash');
var thegamesdb = require('thegamesdb');
var gamelist = [];


router.get('/',isLoggedIn, function(req, res, next) {

    var db = req.con;
    var data = "";
    
    var game = "";
    var game = req.query.gamename;
    
    var platform = "";
    var platform = req.query.platform;
    
    var filter = "";
    if (game||platform) {
        filter = 'WHERE gamename = ? OR platform = ?';
    }

    db.query('SELECT * FROM transaction '+ filter,[game,platform], function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;

        res.render('transaction/transaction', { title: 'Transaction Information', data: data, user:req.user, isLoggedIn: req.isAuthenticated()});
    });

});

router.get('/new',isLoggedIn, function(req, res, next) {
    res.render('transaction/transactionNew', { title: 'New Transaction', user:req.user, isLoggedIn: req.isAuthenticated()});

});

router.get('/choose',isLoggedIn, function(req, res, next) {
    console.log(req.query.gamename);
    console.log(req.query.platform)
    
    thegamesdb.getGamesList({ name: req.query.gamename ,platform: req.query.platform}).then(function(games){
        gamelist = games;
        console.log(gamelist);
        res.render('transaction/transactionChoose', { title: 'Result of '+'\"'+req.query.gamename+'\"', gamelist,user:req.user, isLoggedIn: req.isAuthenticated()});
    }).catch(err => console.error(error));
});

router.get('/add',isLoggedIn, function(req, res, next) {
    console.log(req.query.gamename);
    res.render('transaction/transactionAdd', { title: 'Add Transaction', name: req.query.gamename, platform: req.query.platform, user:req.user, isLoggedIn: req.isAuthenticated()});

});

router.post('/add', function(req, res, next) {

    var db = req.con;
    var datetime = new Date();
    console.log(datetime);
    
    var sql = {
        id: req.user.id,
        gamename: req.body.gamename,
        platform: req.body.platform,
        price: req.body.price,
        description: req.body.description,
        date: datetime,
        likes: 0
    };
    
    var qur = db.query('INSERT INTO transaction SET ?', sql, function(err, rows) {
        if (err) {
            console.log(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/');
    });

});

router.get('/detail',isLoggedIn, function(req, res, next) {
    var db = req.con;
    var data = "";
    
    var tid = "";
    var tid = req.query.tid;
    
    var filter = "";
    if (tid) {
        filter = 'WHERE T.id=A.id AND T.tid = ?';
    }
    
    db.query('SELECT * FROM transaction T, account A '+ filter,tid, function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;

        res.render('transaction/transactionDetail', { title: 'Transaction Detail', data: data, user:req.user, isLoggedIn: req.isAuthenticated()});
    });

});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
}

module.exports = router;
