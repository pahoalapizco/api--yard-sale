const { User, userSchema } = require('./users.model');
const { Category, categorySchema } = require('./categories.models');
const { Product, productSchema } = require('./products.models');
const { Customer, customerSchema } = require('./customers.models');

function setupModels(sequelize) {
  User.init(userSchema, User.config(sequelize));
  Category.init(categorySchema, Category.config(sequelize));
  Product.init(productSchema, Product.config(sequelize));
  Customer.init(customerSchema, Customer.config(sequelize));

  User.associate(sequelize.models);
  Customer.associate(sequelize.models);
  Category.associate(sequelize.models);
  Product.associate(sequelize.models);
}

module.exports = setupModels;
