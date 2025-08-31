// PATCH: routes/events.js
const router = require('express').Router();
const EventController = require('../controllers/EventController');
const { requireAuth, requireRole } = require('../middlewares/auth');

router.get('/', EventController.list);
router.get('/:id', EventController.detail);

router.post('/',  requireAuth, requireRole(['ADMIN','ORGANIZER']), EventController.create);
router.put('/:id', requireAuth, requireRole(['ADMIN','ORGANIZER']), EventController.update);
router.delete('/:id', requireAuth, requireRole(['ADMIN','ORGANIZER']), EventController.destroy);

module.exports = router;
