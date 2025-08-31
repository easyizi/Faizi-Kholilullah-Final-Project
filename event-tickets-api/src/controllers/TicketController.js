// PATCH: controllers/TicketController.js
const { sequelize, Event, Attendee, Ticket } = require('../../models');

class TicketController {
  static async purchase(req, res) {
    const t = await sequelize.transaction();
    try {
      const { eventId, quantity = 1 } = req.body;
      const user = req.user;

      if (user.role !== 'ATTENDEE') {
        await t.rollback();
        return res.status(403).json({ message: 'Only ATTENDEE can purchase' });
      }

      const event = await Event.findByPk(eventId, { transaction: t, lock: t.LOCK.UPDATE });
      if (!event) {
        await t.rollback();
        return res.status(404).json({ message: 'Event not found' });
      }

      let attendee = await Attendee.findOne({ where: { email: user.email }, transaction: t });
      if (!attendee) {
        attendee = await Attendee.create({ name: user.name || user.email, email: user.email }, { transaction: t });
      }

      if (typeof event.capacity === 'number') {
        const sold = await Ticket.count({ where: { EventId: event.id }, transaction: t });
        if (sold + quantity > event.capacity) {
          await t.rollback();
          return res.status(400).json({ message: 'Event sold out' });
        }
      }

      await Ticket.create({ EventId: event.id, AttendeeId: attendee.id, quantity }, { transaction: t });
      await t.commit();
      res.status(201).json({ message: 'Purchased' });
    } catch (e) {
      await t.rollback();
      res.status(400).json({ message: e.message || 'Purchase failed' });
    }
  }
}
module.exports = TicketController;
