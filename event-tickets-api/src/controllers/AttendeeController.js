const { Attendee } = require('../../models');

class AttendeeController {
  static async create(req, res, next) {
    try { const data = await Attendee.create(req.body); res.status(201).json(data); }
    catch (err) { next(err); }
  }
  static async list(req, res, next) {
    try { const data = await Attendee.findAll({ order: [['id','ASC']] }); res.json(data); }
    catch (err) { next(err); }
  }
  static async detail(req, res, next) {
    try {
      const data = await Attendee.findByPk(+req.params.id);
      if (!data) return res.status(404).json({ message: 'Attendee not found' });
      res.json(data);
    } catch (err) { next(err); }
  }
}
module.exports = AttendeeController;
