'use strict';
const { productSchema, PRODUCT_TABLE } = require('./../models/products.model');

module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(PRODUCT_TABLE, productSchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(PRODUCT_TABLE);
  }
};
