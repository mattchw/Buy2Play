var express = require("express");
var app = express();
var router = express.Router();
var path = __dirname;

var mysql = require("mysql");

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "test"
});

con.connect(function(err) {
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
