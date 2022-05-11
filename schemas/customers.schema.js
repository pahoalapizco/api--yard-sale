const joi = require('joi');

const customerId = joi.number().integer().min(0);
const name = joi.string().min(5);
const lastName = joi.string().min(3);
const phone = joi.string().min(8).pattern(new RegExp('([0-9][ -]*){8}'));
const userId = joi.number().integer().min(1);

const crearteCustomerSchema = joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  userId: userId.required(),
});

const updateCustomerSchema = joi.object({
  name,
  lastName,
  phone,
});

const getCustomerchema = joi.object({
  customerId: customerId.required(),
});



module.exports = {
  crearteCustomerSchema,
  updateCustomerSchema,
  getCustomerchema,
}
