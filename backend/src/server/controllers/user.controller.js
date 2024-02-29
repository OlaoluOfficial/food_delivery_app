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

  static async updateUser (req, res) {
    try {
      const userId = req.user.id;
      const updateData = req.body;
      const updatedUser = await User.findByIdAndUpdate(
        userId,
        updateData,
        { new: true }
      );
  
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json(updatedUser);
    } catch (err) {
      console.error('Error updating user:', err);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = UserController;
