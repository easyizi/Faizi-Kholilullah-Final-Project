const router = require('express').Router();
const AuthController = require('../controllers/AuthController');
const { requireAuth } = require('../middlewares/auth');

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', requireAuth, AuthController.me);

module.exports = router;
