const faker = require('faker');

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
    return this.users;
  }

  async findOne(id) {
    return this.users.find(user => user.id === id);
  }

  async update(id, data) {
    const index = this.users.findIndex(user => user.id === id);
    if(index === -1){
      throw new Error('User not found')
    }
    this.users[index] = data;
    return this.users[index]
  }

  async delete(id) {
    const index = this.users.findIndex(user => user.id === id);
    this.users = this.users.spl(index, 1);
    return id;
  }
}

module.exports = UsersService;
