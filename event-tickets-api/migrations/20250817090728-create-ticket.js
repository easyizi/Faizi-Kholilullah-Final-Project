'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Tickets', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        unique:true
      },
      status: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: 'BOOKED'
      },
      purchasedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn('NOW')
      },
      EventId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references : { model :'Events', key: 'id'}, onDelete:'CASCADE'
      },
      AttendeeId: {
        type: Sequelize.INTEGER,
        allowNull:false,
        references : { model :'Attendees', key: 'id'}, onDelete: 'CASCADE'

      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Tickets');
  }
};