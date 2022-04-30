const { Router } = require('express');
const UsersService = require('../services/user.service');

const router = Router();
const service = new UsersService();

// Users:
router.get('/', async (req, res) => {
  const users = await service.find();
  res.json(users);
});

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;
  const user = service.findOne(userId);
  res.json({
    ...user,
  });
});

// users - orders
router.get('/:userId/orders', (req, res) => {
  res.json([
    {
      id: 1,
      date: '28/04/2022',
      totalItems: 2,
      total: 1000,
    },
  ]);
});

router.get('/:userId/orders/:orderId', (req, res) => {
  const { userId, orderId } = req.params;
  res.json({
    userId,
    orderId,
    date: '28/04/2022',
    totalItems: 2,
    items: [],
    total: 1000,
  });
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newUser = await service.create(body);
  res.status(201).json({
    message: "User created",
    data: newUser,
  });
});

router.patch('/:userId', async (req, res) => {
  const { userId } = req.params;
  const userUpdate = await service.update(userId, body);
  const body = req.body;
  res.json({
    message: "User updated",
    ...userUpdate,
  });
});

router.delete('/:userId', async (req, res) => {
  const { userId } = req.params;
  const userDelete = await service.delete(userId);
  res.json({
    message: "User deleted",
    ...userDelete,
  });
});

module.exports = router;
