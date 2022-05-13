const { User, userSchema } = require('./users.model');
const { Category, categorySchema } = require('./categories.models');
const { Product, productSchema } = require('./products.models');
const { Customer, customerSchema } = require('./customers.models');
const { Order, orderSchema } = require('./orders.models');

function setupModels(sequelize) {
  User.init(userSchema, User.config(sequelize));
  Category.init(categorySchema, Category.config(sequelize));
  Product.init(productSchema, Product.config(sequelize));
  Customer.init(customerSchema, Customer.config(sequelize));
  Order.init(orderSchema, Order.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
  Order.associate(sequelize.models);
}

module.exports = setupModels;
