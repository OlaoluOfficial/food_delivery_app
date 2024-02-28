const express = require('express');
const createRestaurant = require('../controllers/addRestaurant');
const getProductsByRestaurantId = require('../controllers/getRestaurantProductById');
const addProduct = require('../controllers/addProducts');
const getRestaurantById = require('../controllers/getRestaurantById');
// const getProductById = require('../controllers/getProductById');
const getAllRestaurants = require('../controllers/getRestaurants');
const AuthMiddleware = require('../middlewares/auth.middleware');
const deleteRestaurant = require('../controllers/deleteRestaurant');
const {
    // upload,
    uploadProducts,
  } = require("../../validators/uploadFile");

const routes = express.Router();

// Post sections

// /api/restaurants (POST): Add a new restaurant (admin only).

routes.post('/api/v1/createrestaurants', AuthMiddleware.authenticateUser, createRestaurant );
routes.post('/api/v1/restaurants/:id/addProducts', AuthMiddleware.authenticateUser, uploadProducts.array( 'productImages',3 ), addProduct); // Upload image for product
routes.get('/api/v1/allrestaurants', getAllRestaurants);
routes.get('/api/v1/restaurants/:id',AuthMiddleware.authenticateUser, getRestaurantById);
routes.get('/api/v1/restaurants/:id/products', getProductsByRestaurantId );
routes.delete('/api/v1/deleterestaurant/:id', AuthMiddleware.authenticateUser, deleteRestaurant);
 

module.exports= routes;