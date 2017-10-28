var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var loginRoute = require('./modules/routes/users');
var taskRoute = require('./modules/routes/tasks');
var passport = require('./modules/passport').passport;
var session=require('express-session');
var app = express();


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:"secret",
    saveUninitialized:true,
    resave:true
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/tasks', taskRoute);
app.use('/api/users', loginRoute);


app.listen(3000);
module.exports = app;
