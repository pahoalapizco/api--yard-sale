const { Model, DataTypes } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customers.models');

const ORDER_TABLE = 'orders';

const orderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    },
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE'
  },
  totalItems: {
    field: 'total_items',
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  total: {
    allowNull: false,
    type: DataTypes.DECIMAL,
  },
  createAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: DataTypes.NOW
  },
}

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, {
      as: 'customer',
    });
    // Relacion muchos a muchos
    this.belongsToMany(models.Product, {
      as: 'items',
      through: 'orders_products', // Tabla relacion,
      foreignKey: 'orderId',
      otherKey: 'productId'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false,
    }
  }
}

module.exports = {
  ORDER_TABLE,
  orderSchema,
  Order
}
