const Restaurant = require("../../models/restaurant");
const errorHandler = require("../middlewares/handleError");

const addRestaurant = async (req, res) => {
    try {
        const userRole = req.user.role;
      console.log(req.body)
        if (userRole == "admin") {
          const { description, name, location, phoneNumber } =
            req.body;
          const newRestaurant = new Restaurant({
            name,
            description,
            location,
            phoneNumber,
          });
  
          const savedRestaurant = await newRestaurant.save();
  
          if (savedRestaurant)
            return res
              .status(201)
              .json({ message: "Restaurant created successfully" });
          else
            return res
              .status(500)
              .json({ message: "Failed to create restaurant" });
        } else return res.status(401).json({ message: "Unauthorized access" });
      } catch (error) {
        console.error(error);
        return res.status(500).json({ error: error.message });
      }
    
};

module.exports = addRestaurant;
