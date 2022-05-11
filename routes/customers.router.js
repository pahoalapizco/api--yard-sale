const { Router } = require('express');
const CustomersService = require('../services/customer.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  crearteCustomerSchema,
  updateCustomerSchema,
  getCustomerchema,
} = require('../schemas/customers.schema');

const router = Router();
const service = new CustomersService();

// Users:
router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:customerId',
  validatorHandler(getCustomerchema, 'params'),
  async (req, res, next) => {
    try {
      const { customerId } = req.params;
      const user = await service.findOne(customerId);
      res.json({
        ...user.dataValues,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(crearteCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newUser = await service.create(body);
      res.status(201).json({
        message: 'User created',
        data: newUser,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:customerId',
  validatorHandler(getCustomerchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  async (req, res, next) => {
    try {
      const { customerId } = req.params;
      const body = req.body;
      const userUpdate = await service.update(customerId, body);
      res.json({
        message: 'User updated',
        ...userUpdate,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:customerId',
  validatorHandler(getCustomerchema, 'params'),
  async (req, res, next) => {
    try {
      const { customerId } = req.params;
      const userDelete = await service.delete(customerId);
      res.json({
        message: 'Customer deleted',
        ...userDelete,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
