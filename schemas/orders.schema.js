const joi = require('joi');

const id = joi.number().min(1);
const customerId = joi.number().min(1);

const createOrderSchema = joi.object({
  customerId: customerId.required(),
});

const getOrderSchema = joi.object({
  id: id.required(),
});

module.exports = {
  createOrderSchema,
  getOrderSchema,
}
