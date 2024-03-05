const Restaurant = require('../../models/restaurant');
const Product = require('../../models/product');

exports.search = async (req, res) => {
  try {
    const query = req.query.q;

    const restaurantResults = await Restaurant.find({ name: { $regex: query, $options: 'i' } });
    const productResults = await Product.find({ name: { $regex: query, $options: 'i' } });

    res.status(200).json({ restaurants: restaurantResults, products: productResults });
  } catch (error) {
    console.error('Error searching:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};