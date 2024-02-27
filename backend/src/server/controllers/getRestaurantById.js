const Restaurant = require("../../models/restaurant");

const viewRestaurantById = async (req, res) => {
  const restaurantId = req.params.id;
  const userRole = req.user.role;

  try {
    // Check if the user is authorized to view restaurant details
    if (userRole !== 'admin' ) {
      return res.status(401).json({ message: 'You are not authorized to perform this action' });
    }

    // Find the restaurant by ID
    const restaurant = await Restaurant.findById(restaurantId);

    // If the restaurant is found, return it
    if (restaurant) {
      return res.status(200).json({Message: restaurant });
    } else {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
  } catch (error) {
    // Handle errors
    console.error(`Error fetching restaurant details: ${error}`);
    return res.status(500).json({ message: error.message });
  }
};

module.exports = viewRestaurantById;
