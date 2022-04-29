const { Router } = require('express');

const router = Router();

// Categories:
router.get('/', (req, res) => {
  res.json([
    {
      id: 1,
      name: 'Clothes',
    },
    {
      id: 2,
      name: 'Electronics',
    },
  ]);
});

router.get('/:categoryId/', (req, res) => {
  const { categoryId } = req.params;
  res.json({
    categoryId,
    name: 'Electronics',
  });
});

router.get('/:categoryId/products/', (req, res) => {
  const { categoryId } = req.params;
  res.json({ categoryId, products: [] });
});

router.post('/', (req, res) => {
  const body = req.body;
  res.status(201).json({
    name: 'Cagetory created',
    data: body,
  });
});

router.patch('/:categoryId', (req, res) => {
  const { categoryId } = req.params;
  const body = req.body;
  res.json({
    name: 'Cagetory updated',
    data: body,
    categoryId,
  });
});

router.delete('/:categoryId/', (req, res) => {
  const { categoryId } = req.params;
  res.json({
    name: 'Cagetory deleted',
    categoryId,
  });
});

module.exports = router;
