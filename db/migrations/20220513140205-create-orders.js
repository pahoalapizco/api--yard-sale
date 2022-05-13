'use strict';

const { orderSchema, ORDER_TABLE } = require('../models/orders.models');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(ORDER_TABLE, orderSchema);
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable(ORDER_TABLE);
  }
};
