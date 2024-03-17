const Product = require('../../models/product');

class SearchController {
  static async search (req, res) {
    try {
      const query = req.query.q;

      const productResults = await Product.find({ name: { $regex: query, $options: 'i' } });
  
      res.status(200).json({ products: productResults });
    } catch (error) {
      console.error('Error searching:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}

module.exports = SearchController;
