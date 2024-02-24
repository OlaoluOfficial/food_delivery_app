const Product = require("../../models/product");

const viewProductsByRestaurant = async (req, res) => {
  try {
    const restaurantId = req.params.id;

    console.log(restaurantId)
    const products = await Product.find({ restaurant: restaurantId }).populate(
      "restaurant",
      "name location"
    );
    console.log(products);

    if (products.length === 0) {
      return res.status(404).json({ message: "No products found for this restaurant" });
    }

    return res.status(200).json({ products: products });
  } catch (error) {
    console.error(`Error in fetching products: ${error}`);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = viewProductsByRestaurant;
