"use strict";

module.exports = function (sequelize, DataTypes) {
    var Task = sequelize.define("Task",
        {
            user_id: DataTypes.INTEGER,
            text: DataTypes.STRING,
            date: DataTypes.DATE,
            executed: DataTypes.BOOLEAN
        },
        {
            timestamps: false
        });

    Task.associate = function (models) {
        Task.belongsTo(models.User, {
            onDelete: "CASCADE",
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Task;
};