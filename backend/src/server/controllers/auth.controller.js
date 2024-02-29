const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorHandler = require("../middlewares/handleError");
require("dotenv").config();

// function generateRandomRegistrationNumber(length) {
//   const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
//   let registrationNumber = "";
//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * characters.length);
//     registrationNumber += characters.charAt(randomIndex);
//   }
//   return registrationNumber;
// }
class AuthController {
  static async register(req, res) {
    try {
      let { username, password, email, phone, role, address } = req.body;

      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
      let user = new User({
        username,
        password,
        email,
        phone,
        role,
        address
      });

      await user.save();

      return res
        .status(201)
        .json({
          status: 200,
          message: "User created successfully",
          data: user,
        });
    } catch (error) {
      const errors = errorHandler.dbSchemaErrors(error);
      // console.log(errors)
      return res.status(403).json({ Message: errors });
    }
  }

  static async login(req, res) {
    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      if (user.role == 'restaurant') {
        if (password === '123456789') {
          return res.status(419).json({ msg: "Please change your password!"})
        }
      }
      const payload = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 3600000,
      });
      res.cookie("foodieToken", token, { maxAge: 1000 * 60 * 60 });

      return res
        .status(200)
        .json({ message: "Login Successful", data: { user, token } });
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Server Error");
    }
  }

  static async changePassword (req, res) {
    const userId = req.user.id;
    const value = req.body;
        
    try {
      const userExist = await User.findById({ _id: userId });
      // console.log(userExist);
      let verifyPassword = await bcrypt.compare(
        value.currentPassword,
        userExist.password
      );
      if (verifyPassword) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(value.newPassword, salt);
        const restaurant = await User.findByIdAndUpdate(
          { _id: userId },
          { password: hashedPassword },
          { new: true }
        );
        if(restaurant)
        return res.status(201).json({ message: "Password changed successfully" });
      } else  return res.status(403).json({ message: "Current password is incorrect" });
    } catch (error) {
      console.log(error);
     return res.status(417).json({ Error: error });
    }
  }
  
}

module.exports = AuthController;
