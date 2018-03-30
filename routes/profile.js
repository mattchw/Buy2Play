var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash    = require('connect-flash');

router.get('/', isLoggedIn, function(req, res) {
    var db = req.con;
    var data = "";
    var id = req.user.id;
    
    console.log(id);

    db.query('SELECT * FROM transaction WHERE id = ?',id, function(err, rows) {
        if (err) {
            console.log(err);
        }
        var data = rows;

        res.render('profile', {title: 'Your Profile', data: data,isLoggedIn: req.isAuthenticated(), user : req.user });
    });
    //res.render('profile', {title: 'Your Profile', isLoggedIn: req.isAuthenticated(), user : req.user });
});

function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
}

module.exports = router;