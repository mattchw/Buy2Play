var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash    = require('connect-flash');

router.get('/', function(req, res) {
		res.render('signup', { title: 'signup page',message: req.flash('signupMessage') });
});
router.post('/', passport.authenticate('local-signup', {
		successRedirect : '/', 
		failureRedirect : '/signup', 
		failureFlash : true
}));
    
module.exports = router;