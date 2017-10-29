"use strict";
var bcrypt   = require('bcrypt-nodejs');
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("user",
        {
            name: DataTypes.STRING,
            password: DataTypes.STRING
        },
        {
            instanceMethods: {
                authenticate: function(value) {
                    if (bcrypt.compareSync(value, this.password))
                        return this;
                    else
                        return false;
                }
            },
            timestamps: false
        });

    User.beforeCreate(function(user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync());
    });

    return User;
};