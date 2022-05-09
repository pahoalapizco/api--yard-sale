const { ValidationError } = require('sequelize');

const logError = (error, req, res, next) => {
  console.error(error);
  next(error);
}

const errorHandler = (error, req, res, next) => {
  res.status(500).json({
    error: true,
    message: error.message,
    stack: error.stack
  });
}

const boomErrorHandler = (error, req, res, next) => {
  if(error.isBoom) {
    const { statusCode, payload } = error.output;
    return res.status(statusCode).json({
      ...payload
    });
  }
  next(error);
}

const dbErrorHandler = (error, req, res, next) => {
  if(error instanceof ValidationError) {
    return res.status(409).json({
      "statusCode": 409,
      message: error.name,
      errors: error.errors,
    });
  }
  next(error);
}

module.exports = {
  logError,
  errorHandler,
  boomErrorHandler,
  dbErrorHandler,
}
