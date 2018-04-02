var express = require('express');
var router = express.Router();
var passport = require('passport');
var flash    = require('connect-flash');
var thegamesdb = require('thegamesdb');

var multer  = require('multer');
var upload = multer({ dest: 'public/images/transactions/' });

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
        game = "%"+req.query.gamename+"%";
        filter = "WHERE gamename LIKE ? OR platform = ?";
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

    db.query("SELECT * FROM transaction "+ filter+sortDate+sortLikes+sortSearch,[game,platform], function(err, rows) {
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

router.post('/add', upload.array('transactionImages', 5), function(req, res, next) {
    var db = req.con;
    var datetime = new Date();
    console.log(datetime);
    console.log(req.files);
    console.log(req.body.checkbox);
    
    var str="";
    
    var sql = {
        id: req.user.id,
        gamename: req.body.gamename,
        platform: req.body.platform,
        preview: req.files[0].path.substring(6),
        price: req.body.price,
        description: req.body.description,
        location: JSON.stringify(req.body.checkbox),
        date: datetime,
        search: 0,
        likes: 0
    };
    
    var qur = db.query("INSERT INTO transaction SET ?", sql, function(err, rows) {
        if (err) {
            console.log(err);
        }
        console.log(rows.insertId);
        
        for(i=0;i<req.files.length;i++){
            var oldpath = req.files[i].path;
            var newpath = oldpath.substring(6);
            str+="INSERT INTO transactionImage(tid,path) VALUES ("+rows.insertId+","+"'"+newpath+"')";
            if(i!=(req.files.length-1)){
                str+=";";
            }
        }
        
        console.log(str);
        
        db.query(str, function(err, rows) {
            if (err) {
                console.log(err);
            }

            res.setHeader('Content-Type', 'application/json');
            res.redirect('/');
        });
        
        
    });

});

router.get('/detail',isLoggedIn, function(req, res, next) {
    var db = req.con;
    var data = "";
    
    var tid = "";
    var tid = req.query.tid;
    
    db.query('SELECT * FROM transaction T, account A, transactionImage I WHERE T.id=A.id AND T.tid=I.tid AND T.tid = ?; UPDATE transaction SET search = search+1 WHERE tid = ?; SELECT COUNT(*) AS count FROM wishlist w, transaction t WHERE w.tid=t.tid AND w.tid=? AND w.id=?; SELECT COUNT(*) AS count FROM likes l, transaction t WHERE l.tid=t.tid AND l.tid=? AND l.id=?; SELECT * FROM comments c, account a WHERE c.id=a.id AND c.tid=? ORDER BY c.date DESC',[tid,tid,tid,req.user.id,tid,req.user.id,tid], function(err, rows) {
        if (err) {
            console.log(err);
        }
        console.log(rows[2]);
        var data = rows[0];
        
        var checkWishlist = rows[2];
        var checkLikes = rows[3];
        var comments=rows[4];

        res.render('transaction/transactionDetail', { title: 'Transaction Detail', data: data, checkWishlist:checkWishlist, checkLikes:checkLikes,comments:comments, user:req.user, isLoggedIn: req.isAuthenticated()});
    });

});

router.post('/comment', function(req, res, next) {
    var db = req.con;
    var datetime = new Date();
    
    var sql = {
        tid:req.query.tid,
        id:req.user.id,
        date: datetime,
        comment: req.body.comment
    };
    
    var qur = db.query("INSERT INTO comments SET ?", sql, function(err, rows) {
        if (err) {
            console.log(err);
        }
        var backURL=req.header('Referer') || '/';
        res.redirect(backURL);
    });

});

router.get('/likes',isLoggedIn, function(req, res, next) {
    var db = req.con;
    var tid = req.query.tid;
    
    var qur = db.query('UPDATE transaction SET likes = likes+1 WHERE tid = ?; INSERT INTO likes (tid,id) VALUES (?,?)', [tid,tid,req.user.id], function(err, rows) {
        if (err) {
            console.log(err);
        }
        var backURL=req.header('Referer') || '/';
        res.redirect(backURL);
    });

});

router.get('/likes/delete',isLoggedIn, function(req, res, next) {
    var db = req.con;
    var tid = req.query.tid;

    var qur = db.query('UPDATE transaction SET likes = likes-1 WHERE tid = ?; DELETE FROM likes WHERE id = ? AND tid = ?', [tid,req.user.id,tid], function(err, rows) {
        if (err) {
            console.log(err);
        }
        var backURL=req.header('Referer') || '/';
        res.redirect(backURL);
    });

});

router.get('/wish',isLoggedIn, function(req, res, next) {
    var db = req.con;
    var tid = req.query.tid;
    var id = req.user.id;
    
    var qur = db.query('INSERT INTO wishlist (tid,id) VALUES (?,?)', [tid,id], function(err, rows) {
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
