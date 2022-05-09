const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class UsersService {
  constructor() {
    this.model = models.User;
  }

  async create(data) {
    const newUser =  await this.model.create(data);
    return newUser;
  }

  async find() {
    const users = await this.model.findAll();
    if(!users) {
      throw boom.notFound('Users not found');
    }
    return users;
  }

  async findOne(id) {
    const user = await this.model.findByPk(id);
    if(!user) {
      throw boom.notFound('User not found');
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

module.exports = UsersService;
