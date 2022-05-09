const { Sequelize, } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASS = encodeURIComponent(config.dbPass);

const URI = `${config.dbDialect}://${USER}:${PASS}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: config.dbDialect,
  logging: console.log,
});

setupModels(sequelize);

sequelize.sync();

module.exports = sequelize;
