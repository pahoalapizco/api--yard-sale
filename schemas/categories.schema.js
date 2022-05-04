const joi = require('joi');

const CategoryId = joi.number().min(1);
const name = joi.string().min(3);
const image = joi.string().uri();

const createCategorySchema = joi.object({
  name: name.required(),
  image: image.required(),
});

const updateCategorySchema = joi.object({
  name: name,
  image: image,
});

const getCategorySchema = joi.object({
  categoryId: CategoryId.require(),
});

module.exports = {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
}
