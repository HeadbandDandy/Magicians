const express = require('express');
const app = express();
const passport= require('passport-local')
const LocalStrategy= require('passport-local').Strategy;
const bodyParser = require("body-parser");
const mysql = require('mysql');
const crypto = require('crypto');
var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);

app.use(session({
    key: 'session_cookie_name' ,
    secret: 'session_cookie_secret' ,
    store: new MySQLStore({
        host: 'localhost' ,
        port: 3306,
        user: 'root' ,
        database: 'cookie_user'
     }),
     resave: false,
     saveUninitialized: false,
     cooke:{
        maxAge:1000*60*60*24,
     }
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.set("view engine", "ejs");

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "user",
    multipleStatements: true
});
connection.connect((err) => {
    if (!err) {
        console.log("Connected");
    } else {
        console.log("Connection Failed");
    }
});