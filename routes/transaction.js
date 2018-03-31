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
    
    var date = req.query.date;
    var likes = req.query.likes;
    var search = req.query.search;
    
    var filter = "";
    if (game||platform) {
        filter = 'WHERE gamename = ? OR platform = ?';
    }
    var sortDate = "";
    if (date){
        sortDate = 'ORDER BY date DESC';
    }
    
    var sortLikes = "";
    if(likes){
        sortLikes = 'ORDER BY likes DESC';
    }
    
    var sortSearch = "";
    if(search){
        sortSearch = 'ORDER BY search DESC';
    }

    db.query('SELECT * FROM transaction '+ filter+sortDate+sortLikes+sortSearch,[game,platform], function(err, rows) {
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
    console.log(req.query.platform);
    
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
        search: 0,
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
    
    db.query('SELECT * FROM transaction T, account A WHERE T.id=A.id AND T.tid = ?; UPDATE transaction SET search = search+1 WHERE tid = ?',[tid,tid], function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows[0];

        res.render('transaction/transactionDetail', { title: 'Transaction Detail', data: data, user:req.user, isLoggedIn: req.isAuthenticated()});
    });

});

router.get('/likes',isLoggedIn, function(req, res, next) {
    var db = req.con;
    var tid = req.query.tid;
    
    var qur = db.query('UPDATE transaction SET likes = likes+1 WHERE tid = ?', tid, function(err, rows) {
        if (err) {
            console.log(err);
        }
        var backURL=req.header('Referer') || '/';
        res.redirect(backURL);
    });

});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
}

module.exports = router;
