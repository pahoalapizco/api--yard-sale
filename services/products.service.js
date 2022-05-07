const { QueryTypes } = require('sequelize');
const faker = require('faker');
const boom = require('@hapi/boom');

// DB
const sequelize =require('../libs/sequelize');


class ProductsService {
  constructor() {
    this.products = [];
    this.generate();
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
    const query = 'SELECT * FROM Tasks'
    const data = await sequelize.query(query, {
      type: QueryTypes.SELECT,
    });

    return data;
  }

  async findOne(id) {
    const product = this.products.find((prod) => prod.id === id);
    if(!product) {
      throw boom.notFound('Product not found');
    }
    return product;
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
