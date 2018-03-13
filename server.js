var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname;

var mysql = require("mysql");

var db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "csci3100"
});
app.set('view engine', 'ejs');

db.connect(function(err) {
    if (err) {
        console.log('mysql connecting error');
        return;
    }
    console.log('mysql connecting success');
});

router.use(function (req,res,next) {
    console.log("/" + req.method);
    next();
});

//create database
router.get("/createdb", function(req,res){
    let sql = 'CREATE DATABASE csci3100';
    db.query(sql, function(err,result){
        if(err) throw err;
        console.log(result);
        res.send("database csci3100 created");
    });
});
//create table
router.get("/createtable", function(req,res){
    let sql = 'CREATE TABLE account(id int AUTO_INCREMENT,username CHAR(20) NOT NULL,password CHAR(15) NOT NULL,email CHAR(40) NOT NULL,PRIMARY KEY (id))';
    db.query(sql, function(err,result){
        if(err) throw err;
        console.log(result);
        res.send("table user created");
    });
});

router.get("/", function(req,res){
    res.sendFile(path + "/index.html");
});

router.get(/^[^.]+.html/, function(req, res){
    res.sendFile(path + req.url);
    console.log("You are visiting "+req.url);
});

app.use("/",router);

app.use("/js", express.static(__dirname + '/js'));

app.use("/css", express.static(__dirname + '/css'));

app.use("/fonts", express.static(__dirname + '/fonts'));

app.use("/img", express.static(__dirname + '/img'));

app.listen(8000,function(){
  console.log("Live at http://127.0.0.1:8000");
});
