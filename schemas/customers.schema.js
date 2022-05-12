const joi = require('joi');
const { crearteUserFromCustomerSchema } = require('./users.schema');

const customerId = joi.number().integer().min(0);
const name = joi.string().min(5);
const lastName = joi.string().min(3);
const phone = joi.string().min(8).pattern(new RegExp('([0-9][ -]*){8}'));

const crearteCustomerSchema = joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
  user: crearteUserFromCustomerSchema,
});

const crearteCustomerFromUsersSchema = joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
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
  crearteCustomerFromUsersSchema,
}
