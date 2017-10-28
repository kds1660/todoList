var router = require('express').Router();
var models = require('./../db/dbService');
var passport = require('./../passport').passport;
var User = require('./../db/dbService').User;
var msg = require('./../../configs/messages.json');

router
    .get('/logged', function (req, res) {
        if (req.isAuthenticated()) {
            res.send({message: req.user.name});
        } else res.send('')
    })

    .get('/logout', function (req, res) {
        req.logout();
        res.status(200).send({message: msg.send.loginLogout});
    })

    .post('/', function (req, res, next) {

        passport.authenticate('local', function (err, user, info) {
            if (!user) {
                return res.status(401).send({message: msg.send.loginFalse});

            } else {
                req.login(user, {}, function (err) {
                });
                return res.status(200).send({message: msg.send.loginOk});
            }

        })(req, res, next);
    })

    .put('/', function (req, res) {
        if (req.body.name && req.body.password) {
            User.create({name: req.body.name, password: req.body.password}).then(function () {
                return res.status(200).send({message: msg.send.loginRegister});
            }).catch(function (error) {
                res.status(500).send({message: error.message});
            });
        }

    });

module.exports = router;