require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'develop',
  port: process.env.PORT || 3000,
  dbUser: process.env.DB_USER,
  dbPass: process.env.DB_PASS,
  dbName: process.env.DB_NAME,
  dbPort: process.env.DB_PORT,
  dbHost: process.env.DB_HOST || 'localhost',
  dbDialect: process.env.DB_DIALECT || 'postgres',
};

module.exports = { config };
