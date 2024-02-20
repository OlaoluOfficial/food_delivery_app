const User = require('../../models/user');
const jwt = require('jsonwebtoken');

class AuthMiddleware {
  static async authenticateUser(req, res, next) {
    try {
      const token = req.header('Authorization');
  
      if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.user.id);

      if (!user) {
        return res.status(401).json({ msg: 'Token is not valid' });
      }
      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ msg: 'Token is not valid' });
    }
  }
}

module.exports = AuthMiddleware;
