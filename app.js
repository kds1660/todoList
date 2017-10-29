var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var loginRoute = require('./modules/routes/users');
var taskRoute = require('./modules/routes/tasks');
var passport = require('./modules/passport').passport;
var SessionStore=require('express-mysql-session');
var session=require('express-session');
var dbOptions=require('./configs/config').dbOptions;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret:"secret",
    saveUninitialized:true,
    resave:true,
    store: new SessionStore(dbOptions)
}));
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/tasks', taskRoute);
app.use('/api/users', loginRoute);
app.use('*',function (req,res) {
        res.sendFile(path.join(__dirname, 'public/index.html'));
    });

app.listen(3000);
module.exports = app;
