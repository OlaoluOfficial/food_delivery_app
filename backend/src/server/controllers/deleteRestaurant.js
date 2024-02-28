const Product = require("../../models/product");
const Restaurant = require("../../models/restaurant");


const DeleteRestaurant = async (req, res) => {
  const restaurantId = req.params.id;
//   console.log(restaurantId);
  try {
    const restaurant = await Restaurant.findById({ _id: restaurantId });

    if (!restaurant) {
      res.status(422).json({Message:"Invalid Id"});
    } else {
      
      const deleteRestaurant = await Restaurant.findByIdAndDelete({
        _id: restaurantId,
      });
      
      if(deleteRestaurant){
          
           await Product.deleteMany({
            restaurant: restaurantId,
          });

      }
      res.status(201).json(`Restaurant deleted`);
    }
  } catch (error) {
    console.log(error)
    res
      .status(401)
      .json(`Error in deleting restaurant: ${error}`);
  }
};
module.exports = DeleteRestaurant;
