const boom = require('@hapi/boom');

const { models } = require('../libs/sequelize');

class OrderService {
  constructor() {
    this.model = models.Order;
    this.OrderProductModel = models.OrderProduct;
  }

  async create(data) {
    const { items } = data;
    const newOrer =  await this.model.create(data);
    if(items) {
      await this.OrderProductModel.bulkCreate(items.map(item => ({
            ...item,
            orderId: newOrer.dataValues.id,
          })
        )
      );
    }
    return newOrer;
  }

  async addItem(data) {
    const newItem = await this.OrderProductModel.create(data);
    return newItem;
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
      include: [
        {
          attributes: ['name', 'lastName', 'phone'],
          association: 'customer',
          include: [{
            attributes: ['name', 'email'],
            model: models.User,
            as: 'user'
          }],
        },
        {
          attributes: ['name', 'price', 'image', 'categoryId'],
          association: 'items'
        }
      ],
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
