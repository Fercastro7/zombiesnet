var express = require("express");
var mongoose = require("mongoose");

var path=require("path");
var bodyParser=require("body-parser");
var cookieParser = require("cookie-parser");
var session = require("express-session");
var flash = require("connect-flash");

var passport = require("passport");

var routes = require("./routes");
var passportsetup = require("./passportsetup");
var app = express();

mongoose.connect("mongodb://admin:admin123@ds237922.mlab.com:37922/miscelanearam");
//mongoose.connect("mongodb://localhost:27017/zombies_nest");
passportsetup();

app.set("port",process.env.PORT||3000);

app.set("views",path.resolve(__dirname,"views"));
app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended:false}));
app.use(cookieParser());
app.use(session({
    secret:"udcnwds#$$&ESDCFTY64y5trfs54#%TF%456//",
    resave:true,
    saveUninitialized:true
}));
app.use(flash());

app.use(passport.initialize({
    userProperty: "zombie"
}));
app.use(passport.session());
app.use(routes);
app.listen(app.get("port"),()=>{
    console.log("la aplicacion inicio por el puerto "+ app.get("port"));
});