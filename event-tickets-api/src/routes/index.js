const router = require('express').Router();
router.use('/auth', require('./auth'));
router.use('/events', require('./events'));
router.use('/attendees', require('./attendees'));
router.use('/tickets', require('./tickets'));
module.exports = router;
