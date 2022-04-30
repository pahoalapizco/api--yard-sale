const { Router } = require('express');
const CategoriesService = require('../services/categories.service');

const router = Router();
const service = new CategoriesService();

// Categories:
router.get('/', async (req, res) => {
  const categories = await service.find();
  res.json(categories);
});

router.get('/:categoryId/', async (req, res) => {
  const { categoryId } = req.params;
  const category = await service.findOne(categoryId);
  res.json({
    ...category
  });
});

router.get('/:categoryId/products/', (req, res) => {
  const { categoryId } = req.params;
  res.json({ categoryId, products: [] });
});

router.post('/', async (req, res) => {
  const body = req.body;
  const newCategory = await service.create(body);
  res.status(201).json({
    ...newCategory,
  });
});

router.patch('/:categoryId', async (req, res) => {
  const { categoryId } = req.params;
  const body = req.body;
  const categoryUpdate = await service.update(categoryId, body);
  res.json({
    ...categoryUpdate
  });
});

router.delete('/:categoryId/', async (req, res) => {
  const { categoryId } = req.params;
  const categoryDelete = await service.delete(categoryId);
  res.json({
    name: 'Cagetory deleted',
    ...categoryDelete,
  });
});

module.exports = router;
