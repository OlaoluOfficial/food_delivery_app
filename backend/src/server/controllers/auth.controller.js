const User = require("../../models/user");
const Restaurant = require("../../models/restaurant");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const errorHandler = require("../middlewares/handleError");
require("dotenv").config();

class AuthController {
  static async register(req, res) {
    try {
      let { password, email, phone, role, username, address } = req.body;

      if (role == "delivery") {
        let password = "123456789";
        const salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);

        let user = new User({
          username,
          password: hashedPassword,
          email,
          phone,
          role,
          address,
        });

        await user.save();

        return res.status(201).json({
          status: 200,
          message: "User created successfully",
          data: user,
        });
      } else {
        const salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);

        let user = new User({
          username,
          password: hashedPassword,
          email,
          phone,
          role,
          address,
        });

        await user.save();

        return res.status(201).json({
          status: 200,
          message: "User created successfully",
          data: user,
        });
      }
    } catch (error) {
      console.log(error);
      const errors = errorHandler.dbSchemaErrors(error);
      return res.status(403).json({ Message: errors });
    }
  }

  static async login(req, res) {
    try {
      const { email, password, role } = req.body;
      let user;
      if (role === "restaurant") {
        user = await Restaurant.findOne({ email });
      } else {
        user = await User.findOne({ email });
      }
      if (!user) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      // initiate the resp object
      let resp;
      const payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: 3600000,
      });

      if (role == "restaurant" || role == "delivery") {
        if (password === "123456789") {
          resp = {
            code: 419,
            status: "success",
            message: "Logged in! Now change your password!!!",
            token,
          };
          res.cookie("foodieToken", token, { maxAge: 1000 * 60 * 60 });
          return res.status(resp.code).json(resp);
        }
      }
      res.cookie("foodieToken", token, { maxAge: 1000 * 60 * 60 });

      const { password: userPassword, ...userDataWithoutPassword } = user.toObject();

      resp = {
        code: 200,
        status: "success",
        message: "Login Successful",
        data: { user: userDataWithoutPassword, token },
      };

      return res.status(resp.code).json(resp);
    } catch (err) {
      console.error(err.message);
      return res.status(500).send("Error logging in!");
    }
  }

  static async changePassword(req, res) {
    const userId = req.user.id;
    const { currentPassword, newPassword } = req.body;

    try {
      let userExist;
      if (req.user.role === "restaurant") {
        userExist = await Restaurant.findById(userId);
      } else {
        userExist = await User.findById(userId);
      }
      if (!userExist)
        return res.status(404).json({ message: "User not found" });

      let verifyPassword = await bcrypt.compare(
        currentPassword,
        userExist.password
      );
      if (verifyPassword) {
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(newPassword, salt);

        // Update the password for the correct model
        if (req.user.role === "restaurant") {
          await Restaurant.findByIdAndUpdate(
            userId,
            { password: hashedPassword },
            { new: true }
          );
        } else {
          await User.findByIdAndUpdate(
            userId,
            { password: hashedPassword },
            { new: true }
          );
        }
        return res.status(201).json({ message: "Password changed successfully" });
      } else
        return res.status(403).json({ message: "Current password is incorrect" });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Error changing password" });
    }
  }

  static async logout(req, res) {
    try {
      res.clearCookie("foodieToken");
      res.status(200).json({ message: "Logout Successful" });
    } catch (error) {
      console.error(error.message);
      return res.status(500).send("Error logging out!");
    }
  }
}

module.exports = AuthController;
