const faker = require('faker');

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
    return this.categories;
  }

  async findOne(id) {
    return this.categories.find(cat => cat.id === id);
  }

  async update(id, data) {
    const index = this.categories.findIndex(user => user.id === id);
    if(index === -1){
      throw new Error('User not found')
    }
    this.categories[index] = data;
    return this.categories[index]
  }

  async delete(id) {
    const index = this.categories.findIndex(user => user.id === id);
    this.categories = this.categories.spl(index, 1);
    return id;
  }
}

module.exports = CategoriesService;
