'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('Events', 'OrganizerId', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.addConstraint('Events', {
      fields: ['OrganizerId'],
      type: 'foreign key',
      name: 'fk_events_organizer',
      references: { table: 'Users', field: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'RESTRICT'
    });
  },
  async down(queryInterface) {
    await queryInterface.removeConstraint('Events', 'fk_events_organizer');
    await queryInterface.removeColumn('Events', 'OrganizerId');
  }
};
