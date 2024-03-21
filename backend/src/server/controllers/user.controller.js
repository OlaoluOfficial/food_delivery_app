const User = require("../../models/user");

class UserController {
  static async getProfile(req, res) {
    try {
      const user = await User.findById(req.user.id).select("-password");
      if (!user) {
        return res.status(404).json({ msg: "User profile not found" });
      }
      res.json(user);
    } catch (error) {
      return new Error("Could not get user profile");
    }
  }

  static async updateUser(req, res) {
    try {
      const userId = req.user.id;
      const updateData = req.body;
      const updatedUser = await User.findByIdAndUpdate(userId, updateData, {
        new: true,
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      res.status(200).json(updatedUser);
    } catch (err) {
      res.status(500).json({ message: "Error updating user" });
    }
  }

  static async getDeliveryGuys(req, res) {
    try {
      const users = await User.find({ role: "delivery", isDeleted: false });
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ message: "Error getting users!" });
    }
  }

  static async deleteUser(req, res) {
    try {
      const { userId } = req.params;
      const { role } = req.user;

      if (role !== 'admin') {
       return res.status(401).json({ message: 'You are not allowed here' })
      }
      const user = await User.findByIdAndUpdate(userId, { isDeleted: true });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      res.status(500).json({ message: 'Error deleting user' });
    }
  }
}

module.exports = UserController;
