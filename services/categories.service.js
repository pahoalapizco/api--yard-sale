const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class CategoriesService {
  constructor(){
    this.categories = [];
    this.model = models.Category;
  }

  async create(data) {
    const newCategory = await this.model.create(data);

    return newCategory.dataValues;
  }

  async find() {
    const categories = await this.model.findAll();
    if(!categories){
      throw boom.notFound('Categories not found');
    }
    return categories;
  }

  async findOne(id) {
    const category = await this.model.findByPk(id);
    if(!category){
      throw boom.notFound('Category not found');
    }
    return category;
  }

  async update(id, data) {
    const category = await this.findOne(id);
    const categoryUpdated = category.update(data);

    return categoryUpdated;
  }

  async delete(id) {
    const category = await this.findOne(id);
    const categoryDeleted = await category.destroy(id);

    return categoryDeleted;
  }
}

module.exports = CategoriesService;
