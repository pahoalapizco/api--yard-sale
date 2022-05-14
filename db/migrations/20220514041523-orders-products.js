'use strict';

const { orderProductSchema, ORDER_PRODUCT_TABLE } = require('../models/orders-products.models');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, orderProductSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(ORDER_PRODUCT_TABLE);
  }
};
