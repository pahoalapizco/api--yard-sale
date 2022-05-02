const faker = require('faker');
const boom = require('@hapi/boom');
class CategoriesService {
  constructor(){
    this.categories = [];
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
    if(this.categories.length === 0){
      throw boom.notFound('Categories not found');
    }
    return this.categories;
  }

  async findOne(id) {
    const category = this.categories.find(cat => cat.id === id);
    if(!category){
      throw boom.notFound('Category not found');
    }
    return category;
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
