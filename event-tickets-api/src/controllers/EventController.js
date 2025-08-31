// PATCH: controllers/EventController.js
const { Event } = require('../../models');

class EventController {
  static async list(req, res) {
    const rows = await Event.findAll({ order: [['createdAt', 'DESC']] });
    res.json(rows);
  }
  static async detail(req, res) {
    const row = await Event.findByPk(req.params.id);
    if (!row) return res.status(404).json({ message: 'Not found' });
    res.json(row);
  }
  static async create(req, res) {
    try {
      const OrganizerId = req.user.role === 'ORGANIZER' ? req.user.id : (req.body.OrganizerId || req.user.id);
      const payload = { ...req.body, OrganizerId };
      const row = await Event.create(payload);
      res.status(201).json(row);
    } catch (e) {
      res.status(400).json({ message: 'Create failed', error: e.message });
    }
  }
  static async update(req, res) {
    try {
      const row = await Event.findByPk(req.params.id);
      if (!row) return res.status(404).json({ message: 'Not found' });
      if (req.user.role === 'ORGANIZER' && row.OrganizerId !== req.user.id) {
        return res.status(403).json({ message: 'Forbidden: not your event' });
      }
      await row.update(req.body);
      res.json(row);
    } catch (e) {
      res.status(400).json({ message: 'Update failed', error: e.message });
    }
  }
  static async destroy(req, res) {
    try {
      const row = await Event.findByPk(req.params.id);
      if (!row) return res.status(404).json({ message: 'Not found' });
      if (req.user.role === 'ORGANIZER' && row.OrganizerId !== req.user.id) {
        return res.status(403).json({ message: 'Forbidden: not your event' });
      }
      await row.destroy();
      res.json({ message: 'Deleted' });
    } catch (e) {
      res.status(400).json({ message: 'Delete failed', error: e.message });
    }
  }
}
module.exports = EventController;
