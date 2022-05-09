const { Router } = require('express');
const CategoriesService = require('../services/categories.service');
const validatorHandler = require('../middlewares/validator.handler');
const {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} = require('../schemas/categories.schema');
const router = Router();
const service = new CategoriesService();

// Categories:
router.get('/', async (req, res, next) => {
  try {
    const categories = await service.find();
    res.json(categories);
  } catch (error) {
    next(error);
  }
});

router.get('/:categoryId/',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const category = await service.findOne(categoryId);
      res.json({
        ...category.dataValues,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get('/:categoryId/products/',
  validatorHandler(getCategorySchema, 'params'),
  (req, res, next) => {
    try {
      const { categoryId } = req.params;
      res.json({ categoryId, products: [] });
    } catch (error) {
      next(error);
    }
  }
);

router.post('/',
  validatorHandler(createCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newCategory = await service.create(body);
      res.status(201).json({
        ...newCategory,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:categoryId',
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const body = req.body;
      const categoryUpdate = await service.update(categoryId, body);
      res.json({
        ...categoryUpdate.dataValues,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:categoryId/',
  validatorHandler(getCategorySchema, 'params'),
  async (req, res, next) => {
    try {
      const { categoryId } = req.params;
      const categoryDelete = await service.delete(categoryId);
      res.json({
        name: 'Cagetory deleted',
        ...categoryDelete,
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
