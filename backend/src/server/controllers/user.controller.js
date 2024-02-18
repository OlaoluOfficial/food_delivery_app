const User = require('../../models/user');
const bcrypt = require('bcryptjs')

class UserController {
  static async createUser(req, res) {
    try {
      const { username, password, email, phone } = req.body;

      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = new User({username, hashedPassword, email, phone});

      await newUser.save();
      res.status(201).json({ status: 200, message: "User created successfully", data: newUser });
    } catch (error) {
      return new Error('Could not create user')
    }
  }
}

module.exports = UserController;

