const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {
    this.model = models.Order;
  }

  async create(data) {
    const newOrer =  await this.model.create(data);
    return newOrer;
  }

  async find() {
    const orders = await this.model.findAll({
      include: ['customer']
    });
    if(!orders) {
      throw boom.notFound('Orders not found');
    }
    return orders;
  }

  async findOne(id) {
    const order = await this.model.findByPk(id, {
      include: {
        association: 'customer',
        include: [{
          attributes: ['name', 'email'],
          model: models.User,
          as: 'user'
        }],
      },
    });
    if(!order) {
      throw boom.notFound('Order not found');
    }
    return order;
  }

  async update(id, data) {
    const order = await this.findOne(id);
    if(!order) {
      throw boom.notFound('Order not found');
    }
    const orderUpdated = await order.update(data);

    return orderUpdated.dataValues;
  }

  async delete(id) {
    const order = await this.findOne(id);
    if(!order) {
      throw boom.notFound('Order not found');
    }
    const orderUpdated = await order.destroy();

    return orderUpdated;
  }
}

module.exports = OrderService;
