const joi = require('joi');

const id = joi.number().min(1);
const customerId = joi.number().min(1);
const orderId = joi.number().min(1);
const productId = joi.number().min(1);
const amount = joi.number().min(1);

// Nueva orden de compra, sin items/productos no se puede generar una orden de compra.
const items = joi.object({
  productId: productId.required(),
  amount: amount.required(),
});

const createOrderSchema = joi.object({
  customerId: customerId.required(),
  items: joi.array().items(items),
});

const getOrderSchema = joi.object({
  id: id.required(),
});

// Agregar un item nuevo a la orden
const createNewOrderItemSchema = joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
});

module.exports = {
  createOrderSchema,
  getOrderSchema,
  createNewOrderItemSchema,
}
