/**
 * Created by alemjc on 2/7/16.
 */
var express = require('express');
var bodyparser = require('body-parser');
var session = require('express-session');
var app = express();
var PORT = process.env.PORT||8080;



app.use(session({
  secret:'sfjksdlhgfdgthf',
  cookie:{
    maxAge:600000000000000
  },
  saveUninitialized: true,
  resave: false
}));

app.use(bodyparser.urlencoded({extended:false}));

app.use(function(req, res, next){

  next();

});

app.use("/scrpt",express.static("js/"));
app.use("/style",express.static("css/"));
app.use("/pckg",express.static("htmlJson/"));

app.get("/", function(req, res){
  req.session.firstTime = 'true';
  res.status("200").sendFile(process.cwd()+"/myPortfolio.html");
});

app.get("/pictures/:file",function(req,res){
  res.sendFile(process.cwd()+"/"+"pictures/"+req.params.file);
});

app.get("/firstTime",function(req,res){
  res.send(req.session.firstTime);
  req.session.firstTime = !req.session.firstTime;
});

app.listen(PORT,function(req, res){
  console.log("Listening to port %s", PORT);
});