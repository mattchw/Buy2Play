var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash    = require('connect-flash');

router.get('/',isLoggedIn, function(req, res, next) {
    var db = req.con;
    var data = "";
    
    var id = "";
    var id = req.query.id;
    

    db.query('SELECT * FROM account WHERE id = ?; SELECT * FROM transaction WHERE id = ?', [id,id], function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows[0];
        var transaction = rows[1];

        res.render('user', { title: 'Account Information', data: data,transaction:transaction, user:req.user, isLoggedIn: req.isAuthenticated()});
    });
});

router.get('/userEdit', function(req, res, next) {

    var id = req.query.id;
    var db = req.con;
    var data = "";

    db.query('SELECT * FROM account WHERE id = ?', id, function(err, rows) {
        if (err) {
            console.log(err);
        }

        var data = rows;
        res.render('userEdit', { title: 'Edit Account', data: data });
    });

});

router.post('/userEdit', function(req, res, next) {

    var db = req.con;
    var id = req.body.id;

    var sql = {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    };

    var qur = db.query('UPDATE account SET ? WHERE id = ?', [sql, id], function(err, rows) {
        if (err) {
            console.log(err);
        }

        res.setHeader('Content-Type', 'application/json');
        res.redirect('/');
    });

});

router.get('/userDelete', function(req, res, next) {

    var id = req.query.id;
    var db = req.con;

    var qur = db.query('DELETE FROM account WHERE id = ?', id, function(err, rows) {
        if (err) {
            console.log(err);
        }
        res.redirect('/');
    });
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
}

module.exports = router;
