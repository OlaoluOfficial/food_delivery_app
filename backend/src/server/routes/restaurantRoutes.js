const express = require('express');
const createRestaurant = require('../controllers/addRestaurant');
const getProductsByRestaurantId = require('../controllers/getRestaurantProductById');
const addProduct = require('../controllers/addProducts');
const getRestaurantById = require('../controllers/getRestaurantById');
// const getProductById = require('../controllers/getProductById');
const getAllRestaurants = require('../controllers/getRestaurants');
const AuthMiddleware = require('../middlewares/auth.middleware');
const {
    // upload,
    uploadProducts,
  } = require("../../validators/uploadFile");

const routes = express.Router();

// Post sections

// /api/restaurants (POST): Add a new restaurant (admin only).

routes.post('/api/createrestaurants', AuthMiddleware.authenticateUser, createRestaurant );
routes.post('/api/restaurants/:id/addProducts', AuthMiddleware.authenticateUser, uploadProducts.array( 'productImages',3 ), addProduct); // Upload image for product
routes.get('/api/allrestaurants', getAllRestaurants);
routes.get('/api/restaurants/:id',AuthMiddleware.authenticateUser, getRestaurantById);
routes.get('/api/restaurants/:id/products', getProductsByRestaurantId );
 

module.exports= routes;