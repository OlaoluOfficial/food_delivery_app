const express = require("express");
const RestaurantController = require("../controllers/restaurant.controller");
const AuthMiddleware = require("../middlewares/auth.middleware");
// const { uploadProducts } = require("../../validators/uploadFile");
const { upload } = require('../../config/cloudinary')

const routes = express.Router();

routes.get("/", RestaurantController.getRestaurants);
routes.get(
  "/:id",
  AuthMiddleware.authenticateUser,
  RestaurantController.getRestaurant
);
routes.post(
  "/",
  AuthMiddleware.authenticateUser,
  RestaurantController.createRestaurant
);
routes.delete(
  "/:id",
  AuthMiddleware.authenticateUser,
  RestaurantController.deleteRestaurant
);
routes.get("/:id/products", RestaurantController.getRestaurantProducts);
routes.post(
  "/addProducts",
  AuthMiddleware.authenticateUser,
  // uploadProducts.array("productImages", 3),
  upload.array('productImages', 5),
  RestaurantController.addProduct
); // Upload image for product
// todo: getRestaurantByRegNo

module.exports = routes;
