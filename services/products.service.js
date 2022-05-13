const boom = require('@hapi/boom');

// DB
const { models } = require('../libs/sequelize');


class ProductsService {
  constructor() {
    this.model = models.Product;
    this.categoryModel = models.Category
  }

  async create(data) {
    const newProduct = await this.model.create(data);
    return newProduct;
  }

  async find() {
    const products = await this.model.findAll({
      include: [{
        attributes: ['id', "name", "image"],
        model: this.categoryModel,
        as: 'category'
      }]
    });

    if(!products){
      throw boom.notFound('Products not found');
    }
    return products;
  }

  async findOne(id) {
    const product = await this.model.findByPk(id);
    if(!product){
      throw boom.notFound('Product not found');
    }
    return product;
  }

  async update(id, data) {
    const product = await this.findOne(id);
    const productUpdated =  await product.update(data);
    return productUpdated;
  }

  async delete(id) {
    const product = await this.findOne(id);
    const productDeleted =  await product.destroy();
    return productDeleted;
  }
}

module.exports = ProductsService;
