const express = require('express');
const RestaurantController = require('../controllers/restaurant.controller');
const AuthMiddleware = require('../middlewares/auth.middleware');
const { upload } = require('../../config/cloudinary');

const routes = express.Router();

routes.get('/', RestaurantController.getRestaurants);
routes.get('/products', AuthMiddleware.authenticateUser, RestaurantController.getRestaurantProducts);
routes.get('/:id', AuthMiddleware.authenticateUser, RestaurantController.getRestaurant);
routes.post('/', AuthMiddleware.authenticateUser, RestaurantController.createRestaurant);
routes.delete('/:id', AuthMiddleware.authenticateUser, RestaurantController.deleteRestaurant);
routes.post('/addProducts', AuthMiddleware.authenticateUser, upload.array('productImages', 5), RestaurantController.addProduct);

module.exports = routes;
