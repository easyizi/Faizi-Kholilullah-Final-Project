// PATCH: routes/tickets.js
const router = require('express').Router();
const { requireAuth, requireRole } = require('../middlewares/auth');
const TicketController = require('../controllers/TicketController');

router.post('/purchase', requireAuth, requireRole(['ATTENDEE']), TicketController.purchase);

module.exports = router;
