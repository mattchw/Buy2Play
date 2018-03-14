var express = require('express');
var router = express.Router();

/* GET home page. */
// home page
router.get('/', function(req, res, next) {
    res.render('index', { title: 'welcome to buy2play'});
});


module.exports = router;
