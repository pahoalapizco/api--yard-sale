const { Sequelize, } = require('sequelize');
const { config } = require('../config/config');
const setupModels = require('../db/models');

const USER = encodeURIComponent(config.dbUser);
const PASS = encodeURIComponent(config.dbPass);

const URI = config.dbUrl || `${config.dbDialect}://${USER}:${PASS}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const options = {
  dialect: config.dbDialect,
  logging: !config.idProd,
}

if(config.idProd) {
  options.ssl = {
    rejectUnauthorized: !config.idProd
  };
}

const sequelize = new Sequelize(URI, options);

setupModels(sequelize);

module.exports = sequelize;
