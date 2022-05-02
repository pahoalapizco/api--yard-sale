const faker = require('faker');
const boom = require('@hapi/boom');

class UsersService {
  constructor() {
    this.users = [];
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
    if(this.users.length === 0) {
      throw boom.notFound('Users not found');
    }
    return this.users;
  }

  async findOne(id) {
    const user = this.users.find(user => user.id === id);
    if(!user) {
      throw boom.notFound('User not found');
    }
    return user;
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
