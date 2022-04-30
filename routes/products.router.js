const { Router } = require('express');
const ProductsService = require('../services/products.service');
const router = Router();
const service = new ProductsService();

// Products:
router.get('/', async (req, res) => {
  const productos = await service.find();
  res.json(productos);
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const product = await service.findOne(id);
    res.json(product);
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
});

router.post('/', async (req, res) => {
  const body = req.body;

  try {
    const newProduct = await service.create(body);
    res.status(201).json({
      message: 'Product created',
      data: newProduct,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
});

// Patch: actualizado parcial
// Put: actualizado completo
router.patch('/:id', async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const productUpdated = await service.update(id, body);
    res.json({
      message: 'Product updated',
      data: productUpdated,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const productDeleted = await service.delete(id);

    res.json({
      message: 'Product deleted',
      ...productDeleted,
    });
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
});

module.exports = router;
