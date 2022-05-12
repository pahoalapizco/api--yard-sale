const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {
    this.model = models.Customer;
  }

  async create(data) {
    const newUser =  await this.model.create(data, {
      include: ['user']
    });
    return newUser;
  }

  async find() {
    const users = await this.model.findAll({
      include: ['user']
    });
    if(!users) {
      throw boom.notFound('Customers not found');
    }
    return users;
  }

  async findOne(id) {
    const user = await this.model.findByPk(id);
    if(!user) {
      throw boom.notFound('Customer not found');
    }
    return user;
  }

  async update(id, data) {
    const user = await this.findOne(id);
    const userUpdated = await user.update(data);

    return userUpdated.dataValues;
  }

  async delete(id) {
    const user = await this.findOne(id);
    const userUpdated = await user.destroy();

    return userUpdated;
  }
}

module.exports = CustomerService;
