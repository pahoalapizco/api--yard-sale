'use strict';
const { productSchema, PRODUCT_TABLE } = require('./../models/products.models');

module.exports = {
  async up (queryInterface) {
    await queryInterface.addColumn(PRODUCT_TABLE, 'description', productSchema.description);
    await queryInterface.changeColumn(PRODUCT_TABLE, 'category_id', productSchema.categoryId);
  },
  async down (queryInterface) {
    await queryInterface.removeColumn(PRODUCT_TABLE, 'role', productSchema.description);
  }
};
