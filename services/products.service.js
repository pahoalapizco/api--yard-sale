const faker = require('faker');
const boom = require('@hapi/boom');

// DB
const { models } = require('../libs/sequelize');


class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
    this.model = models.Product;
  }

  generate() {
    const limit = 100;
    for (let i = 0; i < limit; i++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: Number(faker.commerce.price()),
        image: faker.image.lorempixel,
      });
    }
  }

  async create({ name, price, image }) {
    const newProduct = {
      id: faker.datatype.uuid(),
      name,
      price,
      image,
    }
    this.products.push(newProduct);
    return newProduct;
  }

  async find() {
    const data = await this.model.findAll();

    return data;
  }

  async findOne(id) {
    const product = await this.model.findByPk(id);
    return product.dataValues;
  }

  async update(id, data) {
    const index = this.products.findIndex(user => user.id === id);
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    this.products[index] = data;
    return this.products[index]
  }

  async delete(id) {
    const index = this.products.findIndex(user => user.id === id);
    if(index === -1){
      throw boom.notFound('Product not found');
    }
    this.products = this.products.spl(index, 1);
    return id;
  }
}

module.exports = ProductsService;
