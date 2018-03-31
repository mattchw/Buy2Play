var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash    = require('connect-flash');
var multer  = require('multer')
var upload = multer({ dest: 'public/images/users/' })

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
});

router.post('/fileupload',upload.any(),function(req, res) {
    var db = req.con;
    var oldpath = req.files[0].path;
    var newpath = oldpath.substring(6);

    db.query('UPDATE account SET image = ? WHERE id = ?',[newpath,req.user.id], function(err, rows) {
        if (err) {
            console.log(err);
        }
        res.redirect('/profile');
    });
});



function isLoggedIn(req, res, next) {
	if (req.isAuthenticated())
		return next();
	res.redirect('/login');
}

module.exports = router;