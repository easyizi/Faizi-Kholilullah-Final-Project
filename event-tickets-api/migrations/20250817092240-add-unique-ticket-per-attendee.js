'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Tickets',{
      fields: ['EventId', 'AttendeeId'],
      type :'unique',
      name :'unique_ticket_per_attendee_per_event'
    })
  },

  async down (queryInterface, Sequelize) {
  await queryInterface.removeConstraint('Tickets',
  'unique_ticket_per_attendee_per_event');}
};
