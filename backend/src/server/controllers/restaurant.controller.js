// const fs = require("fs").promises;
const bcrypt = require("bcryptjs");
const Product = require("../../models/product");
const Restaurant = require("../../models/restaurant");
// const errorHandler = require("../middlewares/handleError");
const sendEmailNotification = require("./email.controller");
const { uploadImage } = require('../../config/cloudinary');

class RestaurantController {
  static async createRestaurant(req, res) {
    try {
      const userRole = req.user.role;
      if (userRole == "admin") {
        const { description, name, location, phoneNumber, email } = req.body;
        let password = "123456789";
        const salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);

        const newRestaurant = new Restaurant({
          name,
          location,
          phoneNumber,
          description,
          email,
          password: hashedPassword,
          role: "restaurant",
        });

        const savedRestaurant = await newRestaurant.save();

        if (savedRestaurant) {
          const mailOptions = {
            from: "olaoluofficial@gmail.com",
            to: [savedRestaurant.email],
            subject: "Your Restaurant Account Created",
            text: `Your Restaurant has been created successfully.

            Your default password is "123456789". Please note that you will be required to change this password.

            Welcome onboard!!!
            `,
          };

          sendEmailNotification(mailOptions);
          return res.status(201).json({
            message: "Restaurant created successfully",
            data: savedRestaurant,
          });
        } else {
          return res
            .status(500)
            .json({ message: "Failed to create restaurant" });
        }
      } else return res.status(401).json({ message: "Unauthorized access" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: error.message });
    }
  }

  static async getRestaurants(req, res) {
    try {
      const allRestaurants = await Restaurant.find({});

      if (allRestaurants.length === 0) {
        return res.status(404).json({ message: "No restaurants found" });
      }

      return res.status(200).json({ restaurants: allRestaurants });
    } catch (error) {
      console.error(`Error in fetching restaurants: ${error}`);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  static async deleteRestaurant(req, res) {
    const restaurantId = req.params.id;
    try {
      const restaurant = await Restaurant.findById({ _id: restaurantId });

      if (!restaurant) {
        res.status(404).json({ message: "Restaurant not found" });
      } else {
        const deleteRestaurant = await Restaurant.findByIdAndDelete({
          _id: restaurantId,
        });
        if (deleteRestaurant) {
          await Product.deleteMany({ restaurant: restaurantId });
        }
        res.status(200).json({ message: `Restaurant deleted` });
      }
    } catch (error) {
      res.status(401).json(`Error in deleting restaurant: ${error}`);
    }
  }

  static async getRestaurant(req, res) {
    try {
      const restaurantId = req.params.id;
      const userRole = req.user.role;
      if (userRole !== "admin") {
        return res.status(401).json({ message: "You are not authorized to perform this action" });
      }

      const restaurant = await Restaurant.findById(restaurantId);

      if (restaurant) {
        return res.status(200).json({ Message: restaurant });
      } else {
        return res.status(404).json({ message: "Restaurant not found" });
      }
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  static async getRestaurantProducts(req, res) {
    try {
      const restaurantId = req.user.id;

      const products = await Product.find({
        restaurant: restaurantId,
      }).populate("restaurant", "name location");

      if (products.length === 0) {
        return res.status(404).json({ message: "No products found for this restaurant" });
      }

      return res.status(200).json({ products: products });
    } catch (error) {
      return res.status(500).json({ message: "Error getting products" });
    }
  }

  static async getRestaurantByRegNo(req, res) {
    const registeredBy = req.user.registrationNo;

    try {
      // Check if the user is authorized to view restaurant details
      // if (userRole !== 'admin' ) {
      //   return res.status(401).json({ message: 'You are not authorized to perform this action' });
      // }

      // Find the restaurant by ID
      const restaurant = await Restaurant.find(registeredBy);

      if (restaurant) {
        return res.status(200).json({ message: restaurant });
      } else {
        return res.status(404).json({ message: "Restaurant not found" });
      }
    } catch (error) {
      console.error(`Error fetching restaurant details: ${error}`);
      return res.status(500).json({ message: error.message });
    }
  }

  static async addProduct(req, res) {
    const userRole = req.user.role;
    const productImages = req.files;
    const restaurantId = req.user.id;
    const { name, description, price, minimumPrice } = req.body;

    if (userRole !== "restaurant") {
      return res.status(401).json({ message: "You are not authorized to perform this action" });
    }

    try {
      let productPictures = [];

      for (const file of productImages) {
        const imageUrl = await uploadImage(file.path, 'product_pictures');
        productPictures.push(imageUrl);
      }

      const product = new Product({
        restaurant: restaurantId,
        name: name,
        description,
        price,
        productPictures,
        minimumPrice,
      });

      await product.save();

      return res.status(201).json({ message: "Product uploaded successfully" });
    } catch (error) {
      return res.status(500).json({ message: 'Error adding products' });
    }
  }
}

module.exports = RestaurantController;
