const Sequelize = require('sequelize');
var cfg = require('../../configs/config.json');
var db = {};
const sequelize = new Sequelize(
    cfg.dbOptions.database,
    cfg.dbOptions.user,
    cfg.dbOptions.password,
    {
        host: cfg.dbOptions.host,
        dialect: cfg.dbOptions.dialect,
        operatorsAliases: false
    });

db['User'] = sequelize.import('./models/user.js');
db['Task'] = sequelize.import('./models/task.js');

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;