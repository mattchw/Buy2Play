var LocalStrategy   = require('passport-local').Strategy;

var mysql = require('mysql');

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1520",
    database: "csci3100"
});
connection.query('USE csci3100;');

module.exports = function(passport) {
    console.log("Hello");
    passport.serializeUser(function(user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(function(id, done) {
        connection.query("SELECT * FROM account WHERE id = ? ",[id], function(err, rows){
            done(err, rows[0]);
        });
    });
    
    passport.use(
        'local-signup',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {
            connection.query("SELECT * FROM account WHERE username = ?",[username], function(err, rows) {
                if (err)
                    return done(err);
                if (password!=req.body.repassword){
                    return done(null, false, req.flash('signupMessage', 'passwords are not matched'));
                }
                else if (rows.length) {
                    return done(null, false, req.flash('signupMessage', 'username exist'));
                } else {
                    var newUserMysql = {
                        username: username,
                        password: password,
                        email: req.body.email
                    };

                    var insertQuery = "INSERT INTO account ( username, password ,email) values (?,?,?)";

                    connection.query(insertQuery,[newUserMysql.username, newUserMysql.password,req.body.email],function(err, rows) {
                        newUserMysql.id = rows.insertId;

                        return done(null, newUserMysql);
                    });
                }
            });
        })
    );

    passport.use(
        'local-login',
        new LocalStrategy({
            usernameField : 'username',
            passwordField : 'password',
            passReqToCallback : true
        },
        function(req, username, password, done) {
            connection.query("SELECT * FROM account WHERE username = ?",[username], function(err, rows){
                console.log(rows[0]);
                if (err)
                    return done(err);
                if (!rows.length) {
                    return done(null, false, req.flash('loginMessage', 'username not exist'));
                }

                //if (!bcrypt.compareSync(password, rows[0].password)){
                if(password!=rows[0].password){
                    return done(null, false, req.flash('loginMessage', 'password incorrect'));
                }

                return done(null, rows[0]);
            });
        })
    );
};