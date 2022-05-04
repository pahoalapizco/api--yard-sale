const joi = require('joi');

const userId = joi.number().integer().min(0);
const name = joi.string().min(5);
const email = joi.string().email();
const password = joi.string().min(5);
const role = joi.string().min(3);
const avatar = joi.string().uri();

const orderIduser = joi.number().integer().min(1);

const crearteUserSchema = joi.object({
  name: name.required(),
  email: email.required(),
  password: password.required(),
  role: role.required(),
  avatar: avatar.required(),
});

const updateUserSchema = joi.object({
  name: name,
  email: email,
  password: password,
  role: role,
  avatar: avatar,
});

const getUserchema = joi.object({
  userId: userId.require(),
});

const getUserOrderchema = joi.object({
  userId: userId.require(),
  orderId: orderIduser.required(),
});


module.exports = {
  crearteUserSchema,
  updateUserSchema,
  getUserchema,
  getUserOrderchema,
}
