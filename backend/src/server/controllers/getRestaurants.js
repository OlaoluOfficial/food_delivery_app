const Restaurant = require("../../models/restaurant");

const getRestaurants = async (req, res) => {
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
};

module.exports = getRestaurants;
