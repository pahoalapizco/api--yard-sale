const { User, userSchema } = require('./users.model');
const { Category, categorySchema } = require('./categories.models');
const { Product, productSchema } = require('./products.model');

function setupModels(sequelize) {
  User.init(userSchema, User.config(sequelize));
  Category.init(categorySchema, Category.config(sequelize));
  Product.init(productSchema, Product.config(sequelize));
}

module.exports = setupModels;
