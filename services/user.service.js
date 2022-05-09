const faker = require('faker');
const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class UsersService {
  constructor() {
    this.users = [];
    this.model = models.User;
  }

  async create(data) {
    const newUser = {
      id: faker.datatype.uuid(),
      ...data,
    };
    this.users.push(newUser);
    return newUser;
  }

  async find() {
    const resp = await this.model.findAll();
    return resp;
  }

  async findOne(id) {
    const user = await this.model.findByPk(id);
    if(!user) {
      throw boom.notFound('User not found');
    }
    return user.dataValues;
  }

  async update(id, data) {
    const index = this.users.findIndex(user => user.id === id);
    if(index === -1){
      throw boom.notFound('User not found');
    }
    this.users[index] = data;
    return this.users[index]
  }

  async delete(id) {
    const index = this.users.findIndex(user => user.id === id);
    if(index === -1){
      throw boom.notFound('User not found');
    }
    this.users = this.users.spl(index, 1);
    return id;
  }
}

module.exports = UsersService;
