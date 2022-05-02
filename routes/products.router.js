const { Router } = require('express');
const ProductsService = require('../services/products.service');
const router = Router();
const service = new ProductsService();

// Products:
router.get('/', async (req, res, next) => {
  try {
    const productos = await service.find();
    res.json(productos);
  } catch (error) {
    next(error);
  }
});

router.get('/:id', async (req, res, next) => {
  const { id } = req.params;

  try {
    const product = await service.findOne(id);
    res.json(product);
  } catch (error) {
    next(error)
  }
});

router.post('/', async (req, res, next) => {
  const body = req.body;

  try {
    const newProduct = await service.create(body);
    res.status(201).json({
      message: 'Product created',
      data: newProduct,
    });
  } catch (error) {
    next(error)
  }
});

// Patch: actualizado parcial
// Put: actualizado completo
router.patch('/:id', async (req, res, next) => {
  const { id } = req.params;
  const body = req.body;

  try {
    const productUpdated = await service.update(id, body);
    res.json({
      message: 'Product updated',
      data: productUpdated,
    });
  } catch (error) {
    next(error)
  }
});

router.delete('/:id', async (req, res, next) => {
  const { id } = req.params;
  try {
    const productDeleted = await service.delete(id);

    res.json({
      message: 'Product deleted',
      ...productDeleted,
    });
  } catch (error) {
    next(error)
  }
});

module.exports = router;
