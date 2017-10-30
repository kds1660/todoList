var passport = require('passport')
    , LocalStrategy = require('passport-local').Strategy;
var User = require('./db/dbService').User;
var bCrypt = require('bcrypt-nodejs');

passport.use(new LocalStrategy({
        usernameField: 'name',
        passwordField: 'password'
    },
    function (name, password, done) {
        User.findOne({
            where: {
                name: name
            }
        }).then(function (user) {

            if (!user) {
                return done(null, false, {message: 'Incorrect username.'});
            }

            if (!bCrypt.compareSync(password, user.password)) {
                return done(null, false, {
                    message: 'Incorrect password.'
                });
            }
            return done(null, user);
        })
    }
));

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id).then(function (user) {

        if (user) {
            done(null, user.get());
        } else {
            done(user.errors, null);
        }

    });
});

module.exports = {
    passport: passport,
    LocalStrategy: LocalStrategy
};