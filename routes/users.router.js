const { Router } = require('express');
const UsersService = require('../services/user.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  crearteUserSchema,
  updateUserSchema,
  getUserchema,
} = require('../schemas/users.schema');

const router = Router();
const service = new UsersService();

// Users:
router.get('/', async (req, res, next) => {
  try {
    const users = await service.find();
    res.json(users);
  } catch (error) {
    next(error);
  }
});

router.get('/:userId',
  validatorHandler(getUserchema, 'params'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const user = await service.findOne(userId);
      res.json({
        ...user.dataValues,
      });
    } catch (error) {
      next(error);
    }
  }
);

// users - orders
router.get('/:userId/orders',
  validatorHandler(getUserchema, 'params'),
  (req, res, next) => {
    try {
      res.json([
        {
          id: 1,
          date: '28/04/2022',
          totalItems: 2,
          total: 1000,
        },
      ]);
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:userId/orders/:orderId', (req, res, next) => {
  try {
    const { userId, orderId } = req.params;
    res.json({
      userId,
      orderId,
      date: '28/04/2022',
      totalItems: 2,
      items: [],
      total: 1000,
    });
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validatorHandler(crearteUserSchema, 'body'),
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

router.patch('/:userId',
  validatorHandler(getUserchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const body = req.body;
      const userUpdate = await service.update(userId, body);
      res.json({
        message: 'User updated',
        ...userUpdate,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:userId',
  validatorHandler(getUserchema, 'params'),
  async (req, res, next) => {
    try {
      const { userId } = req.params;
      const userDelete = await service.delete(userId);
      res.json({
        message: 'User deleted',
        ...userDelete,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
