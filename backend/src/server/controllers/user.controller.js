const User = require('../../models/user');

class UserController {
  static async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.id).select('-password');

      if (!user) {
        return res.status(404).json({ msg: 'User profile not found' });
      }
  
      res.json(user);
    } catch (error) {
      return new Error('Could not create user')
    }
  }
}

module.exports = UserController;

