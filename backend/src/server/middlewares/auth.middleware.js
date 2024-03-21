const User = require("../../models/user");
const Restaurant = require("../../models/restaurant");
const jwt = require("jsonwebtoken");

class AuthMiddleware {
  static async authenticateUser(req, res, next) {
    try {
      // const token = req.header("Authorization");
      const token = req.cookies.foodieToken;

      if (!token) {
        return res.status(401).json({ msg: "No Token, authorization denied, Login again" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      let user;
      if (decoded.user.role === "restaurant") {
        user = await Restaurant.findById(decoded.user.id);
      } else {
        user = await User.findById(decoded.user.id);
      }

      if (!user) {
        return res.status(401).json({ msg: "Token is not valid" });
      }
      req.user = user;
      next();
    } catch (err) {
      return res.status(401).json({ msg: "Token is not valid" });
    }
  }
}

module.exports = AuthMiddleware;
