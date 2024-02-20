const User = require('../../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

class AuthController {
  static async register(req, res) {
    try {
      let { username, password, email, phone, role} = req.body;
      let user = await User.findOne({ email });
      if (user) {
        return res.status(400).json({ msg: 'User already exists' });
      }
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      user = new User({
        username,
        password,
        email,
        phone,
        role,
      });

      await user.save();
  
      res.status(201).json({ status: 200, message: "User created successfully", data: user });
    } catch (error) {
      console.log(error.message)
      return new Error('Could not create user')
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: 360000 });
      res.status(200).json({ message: 'Login Successful', data: { user, token }})
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
}

module.exports = AuthController;

