const Restaurant = require("../../models/restaurant");
const User = require("../../models/user");
const errorHandler = require("../middlewares/handleError");

const addRestaurant = async (req, res) => {
  try {
    const userRole = req.user.role;
    const regID = req.user.registrationNo;
    // console.log(userRole);
    if (userRole == "admin" || userRole == "restaurant") {
      const { description, name, location, registrationID } = req.body;

      if (!description || !name || !location || !registrationID)
        return res.status(400).json({ message: "Missing required fields" });

      if (registrationID !== regID && userRole == "restaurant")
        return res.status(422).json({ message: "Invalid Registration ID." });
      else if (userRole === "admin") {
        let user = await User.findOne({
           registrationNo: registrationID 
        });
        if (!user )
          return res
            .status(404)
            .json({ message: "Registration number not found!" });
      } 


        const newRestaurant = new Restaurant({
          description,
          name,
          location,
          registeredBy: registrationID,
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
        
      
    }
    
    else return res.status(401).json({ message: "Unauthorized access" });
  } catch (error) {
    const errors = errorHandler.RestaurantSchemaErrors(error);
    console.error(errors);
    return res.status(500).json({ error: errors.message });
  }
};

module.exports = addRestaurant;
