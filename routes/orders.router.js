const { Router } = require('express');
const OrdersService = require('../services/orders.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createOrderSchema,
  getOrderSchema,
  createNewOrderItemSchema,
} = require('../schemas/orders.schema');
const router = Router();
const service = new OrdersService();

// Ordes:
router.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const orders = await service.findOne(id);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createOrderSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const orders = await service.create(data);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

router.post('/add-item',
  validatorHandler(createNewOrderItemSchema, 'body'),
  async (req, res, next) => {
    try {
      const data = req.body;
      const orders = await service.addItem(data);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
