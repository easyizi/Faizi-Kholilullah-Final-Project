const router = require('express').Router();
const AttendeeController = require('../controllers/AttendeeController');

router.post('/', AttendeeController.create);
router.get('/', AttendeeController.list);
router.get('/:id', AttendeeController.detail);

module.exports = router;
