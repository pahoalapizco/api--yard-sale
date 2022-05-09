const faker = require('faker');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class CategoriesService {
  constructor(){
    this.categories = [];
    this.model = models.Category;
  }

  async create(data) {
    const newCategory = {
      id: faker.datatype.uuid(),
      ...data
    }
    this.categories.push(newCategory);

    return newCategory;
  }

  async find() {
    const categories = await this.model.findAll();

    return categories;
  }

  async findOne(id) {
    const category = await this.model.findByPk(id);
    return category.dataValues;
  }

  async update(id, data) {
    const index = this.categories.findIndex(user => user.id === id);
    if(index === -1){
      throw boom.notFound('Category not found');
    }
    this.categories[index] = data;
    return this.categories[index]
  }

  async delete(id) {
    const index = this.categories.findIndex(user => user.id === id);
    if(index === -1){
      throw boom.notFound('Category not found');
    }
    this.categories = this.categories.spl(index, 1);
    return id;
  }
}

module.exports = CategoriesService;
