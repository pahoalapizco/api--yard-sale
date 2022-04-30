const faker = require('faker');

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
    return this.products;
  }

  async findOne(id) {
    return this.products.find((prod) => prod.id === id);
  }

  async update(id, data) {
    const index = this.products.findIndex(user => user.id === id);
    if(index === -1){
      throw new Error('User not found')
    }
    this.products[index] = data;
    return this.products[index]
  }

  async delete(id) {
    const index = this.products.findIndex(user => user.id === id);
    this.products = this.products.spl(index, 1);
    return id;
  }
}

module.exports = ProductsService;
