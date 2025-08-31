const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User } = require('../../models');

const SALT_ROUNDS = +process.env.BCRYPT_SALT_ROUNDS || 10;

function signToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, role: user.role, name: user.name },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN || '1d' }
  );
}

class AuthController {
  static async register(req, res, next) {
    try {
      const { name, email, password, role } = req.body;
      if (!email || !password) return res.status(400).json({ message: 'email & password required' });
      const exists = await User.findOne({ where: { email } });
      if (exists) return res.status(409).json({ message: 'Email already registered' });

      const passwordHash = await bcrypt.hash(password, SALT_ROUNDS);
      const user = await User.create({ name, email, passwordHash, role: role || 'USER' });
      const token = signToken(user);
      res.status(201).json({ user, token });
    } catch (e) { next(e); }
  }

  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      if (!user) return res.status(401).json({ message: 'Invalid credentials' });

      const ok = await bcrypt.compare(password, user.passwordHash);
      if (!ok) return res.status(401).json({ message: 'Invalid credentials' });

      const token = signToken(user);
      res.json({ user, token });
    } catch (e) { next(e); }
  }

  static async me(req, res) {
    res.json({ user: req.user });
  }
}

module.exports = AuthController;
