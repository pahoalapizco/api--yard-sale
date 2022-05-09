'use strict';
const { categorySchema, CATEGORY_TABLE } = require('./../models//categories.models');


module.exports = {
  async up (queryInterface) {
    await queryInterface.createTable(CATEGORY_TABLE, categorySchema);
  },

  async down (queryInterface) {
    await queryInterface.dropTable(CATEGORY_TABLE);
  }
};
