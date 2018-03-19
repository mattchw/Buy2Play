var express = require('express');
var router = express.Router();

router.get('/',isLoggedIn, function(req, res, next) {

    var db = req.con;
    var data = "";

    db.query('SELECT * FROM transaction', function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;

        res.render('transaction', { title: 'Transaction Information', data: data});
    });

});

router.get('/add',isLoggedIn, function(req, res, next) {
    res.render('transactionAdd', { title: 'Add Transaction'});

});

router.post('/add', function(req, res, next) {

    var db = req.con;

    var sql = {
        id: req.user.id,
        gamename: req.body.gamename,
        price: req.body.price
    };

    //console.log(sql);
    var qur = db.query('INSERT INTO transaction SET ?', sql, function(err, rows) {
        if (err) {
            console.log(err);
        }
        res.setHeader('Content-Type', 'application/json');
        res.redirect('/');
    });

});
function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}


module.exports = router;
