const { Router } = require('express');
const productRouter = require('./products.router');
const usersRouter = require('./users.router');
const categoriesRouter = require('./categories.router');
const customersRouter = require('./customers.router');
const ordersRouter = require('./orders.router');

function routerApi(app) {
  const router = Router();

  app.use('/api/v1', router);
  router.use('/products', productRouter);
  router.use('/users', usersRouter);
  router.use('/categories', categoriesRouter);
  router.use('/customers', customersRouter);
  router.use('/orders', ordersRouter);
}

module.exports = routerApi;
