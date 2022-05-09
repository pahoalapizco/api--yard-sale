const joi = require('joi');

const productId = joi.number().integer();
const name = joi.string().min(3);
const price = joi.number().integer().min(10);
const image = joi.string().uri();
const categoryId = joi.number().integer().min(1);

const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = joi.object({
  name: name,
  price: price,
  image: image,
  categoryId: categoryId,
});

const getProductSchema = joi.object({
  id: productId.required(),
});

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
}
