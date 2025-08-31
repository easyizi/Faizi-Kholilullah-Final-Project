'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Ticket extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Ticket.belongsTo(models.Event);
      Ticket.belongsTo(models.Attendee);
    }
  }
  Ticket.init({
    code: DataTypes.STRING,
    status: DataTypes.STRING,
    purchasedAt: DataTypes.DATE,
    EventId: DataTypes.INTEGER,
    AttendeeId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Ticket',
  });
  return Ticket;
};