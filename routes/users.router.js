const { Router } = require('express');

const router = Router();

// Users:
router.get('/', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'Paola Alapizco',
      username: 'pahoalapizco',
    },
    {
      id: 2,
      name: 'David Lopez',
      username: 'davidcorp',
    },
  ]);
});

router.get('/:userId', (req, res) => {
  const { userId } = req.params;
  res.json({
    userId,
    name: 'Paola Alapizco',
    username: 'pahoalapizco',
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

router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    message: "User created",
    body,
  });
});

router.patch('/:userId', (req, res) => {
  const { userId } = req.params;
  const body = req.body;
  res.json({
    message: "User updated",
    data: body,
    userId
  });
});

router.delete('/:userId', (req, res) => {
  const { userId } = req.params;
  res.json({
    message: "User deleted",
    userId
  });
});

module.exports = router;
